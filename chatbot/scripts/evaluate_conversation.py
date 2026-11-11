"""Opt-in real-model regression for conversational reasoning and grounded facts."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import json
import time
import urllib.request
import urllib.error

CASES = [
 ('skills-exact','quais habilidades tecnicas dele',[],['Python','Java']),
 ('job-fit','Tenho uma vaga júnior Python com FastAPI, PostgreSQL e AWS. Como o perfil dele se encaixa e o que devo validar na entrevista?',[],['Python','AWS']),
 ('follow-up','E quais pontos você aprofundaria com ele?', [{'role':'user','content':'Minha vaga é júnior, Python, FastAPI, PostgreSQL e AWS.'},{'role':'assistant','content':'Podemos avaliar a experiência com APIs, dados e AWS.'}],['AWS']),
 ('concepts','Explica de forma simples a diferença entre RAG e fine-tuning e como isso aparece nos projetos dele.',[],['RAG','MAUA']),
 ('partial','Qual a data exata da formatura e quais habilidades técnicas ele já demonstra?',[],['Python']),
 ('seniority-gap','Preciso de alguém sênior em Kubernetes com oito anos de experiência. O currículo dele comprova isso?',[],[]),
 ('salary-reference','quero realmente saber agora',[{'role':'user','content':'Qual bolsa de estágio e salário júnior ele quer?'},{'role':'assistant','content':'Ele prefere alinhar remuneração em contato direto.'}],['2.500','4.000']),
 ('topic-switch','quais habilidades tecnicas dele',[{'role':'user','content':'Qual salário ele busca?'},{'role':'assistant','content':'Omar prefere conversar diretamente sobre remuneração.'}],['Python','Java']),
 ('clarification','Quero contratar o Omar para um projeto. O que você precisa saber para avaliar se faz sentido?',[],[]),
 ('technical-security','Como separar a chave de API do frontend em uma aplicação com LLM e o que perguntar numa entrevista para avaliar esse cuidado?',[],[]),
 ('colloquial','q q ele manja de back?',[],['Python']),
 ('old-refusal','quais habilidades tecnicas dele',[{'role':'user','content':'quais habilidades tecnicas dele'},{'role':'assistant','content':'Não tenho essa informação confirmada sobre o Omar.'}],['Python','Java']),
 ('salary-initial','Quais habilidades ele tem e qual a pretensão de bolsa?',[],['Python']),
]

def main():
 parser=argparse.ArgumentParser()
 parser.add_argument('--confirm-live',action='store_true')
 parser.add_argument('--case',action='append',choices=[case[0] for case in CASES])
 args=parser.parse_args()
 if not args.confirm_live: parser.error('Use --confirm-live to authorize real model requests.')
 def check(case):
  name,message,history,expected=case
  start=time.monotonic()
  request=urllib.request.Request('http://127.0.0.1:8001/api/assistant/chat',data=json.dumps({'message':message,'history':history,'locale':'pt'}).encode(),headers={'Content-Type':'application/json'})
  try:
   response=urllib.request.urlopen(request,timeout=80)
   data=json.loads(response.read())
   valid=response.status==200 and data['generated'] and all(word.lower() in data['answer'].lower() for word in expected) and 'Não tenho essa informação confirmada sobre o Omar.' not in data['answer']
   result={'case':name,'passed':bool(valid),'seconds':round(time.monotonic()-start,2),**data}
   time.sleep(max(0,6.1-(time.monotonic()-start)))
   print(json.dumps({'case':name,'passed':bool(valid),'seconds':result['seconds']}),flush=True)
   return result
  except urllib.error.HTTPError as error: return {'case':name,'passed':False,'status':error.code,'error':json.loads(error.read())}
  except Exception as error: return {'case':name,'passed':False,'error':type(error).__name__}
 selected=[case for case in CASES if not args.case or case[0] in args.case]
 with ThreadPoolExecutor(max_workers=1) as pool: results=list(pool.map(check,selected))
 folder=Path(__file__).resolve().parents[1]/'.runtime'
 folder.mkdir(exist_ok=True)
 (folder/'conversation-evaluation.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
 for result in results: print(json.dumps({key:result[key] for key in ['case','passed','seconds','status','error'] if key in result}),flush=True)
 print(f"{sum(r['passed'] for r in results)}/{len(results)} conversational cases passed.")
 return 0 if all(result['passed'] for result in results) else 1

if __name__=='__main__': raise SystemExit(main())
