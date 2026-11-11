import { mkdir, writeFile } from 'node:fs/promises';
import {
  projects,
  experiences,
  resultMetrics,
  capabilityGroups,
  education,
  certifications,
  languages,
  copy,
  socialLinks,
} from '../src/data/portfolio.ts';

const locales = ['pt', 'en', 'es'];
const localized = (fn) => Object.fromEntries(locales.map((locale) => [locale, fn(locale)]));
const docs = [];
const add = (id, title, url, content, tags = []) => docs.push({ id, title, url, content, tags });
add(
  'profile',
  { pt: 'Sobre Omar', en: 'About Omar', es: 'Sobre Omar' },
  '/#about',
  localized((l) => `${copy[l].heroLead}\n${copy[l].aboutBody}\n${copy[l].aboutBody2}`),
  ['perfil', 'profile', 'resumo', 'summary', 'quem', 'who'],
);
for (const p of projects)
  add(
    `project-${p.id}`,
    p.title,
    p.links.find((link) => link.kind === 'github')?.href ?? '/#projects',
    localized(
      (l) =>
        `${p.status[l]}. ${p.description[l]}\n${p.outcome[l]}\n${p.metaLabel?.[l] ?? 'Stack'}: ${p.technologies.join(', ')}. ${p.links.map((link) => `${link.label}: ${link.href}`).join(' ')}`,
    ),
    ['projeto', 'project', p.id, ...p.technologies],
  );
for (const exp of experiences)
  add(
    `experience-${exp.id}`,
    localized((l) => `${exp.role[l]} · ${exp.organization}`),
    '/#experience',
    localized(
      (l) =>
        `${exp.organization}. ${exp.role[l]}. ${exp.period[l]}. ${exp.description[l]}\nTecnologias: ${exp.technologies.join(', ')}`,
    ),
    ['experiência', 'experience', 'estágio', 'internship', exp.organization, ...exp.technologies],
  );
for (const metric of resultMetrics)
  add(
    `result-${metric.id}`,
    metric.title,
    '/#resultados',
    localized((l) => `${metric.title[l]}: ${metric.displayValue[l]}. ${metric.description[l]}`),
    ['resultados', 'results', 'impacto', 'metrics', 'redução', 'tempo', 'performance'],
  );
for (const group of capabilityGroups)
  add(
    `skill-${group.id}`,
    group.label,
    '/#skills',
    localized((l) => `${group.label[l]}: ${group.items.join(', ')}. ${copy[l].skillsIntro}`),
    ['stack', 'skills', 'ferramentas', ...group.items],
  );
add(
  'education',
  { pt: 'Formação acadêmica', en: 'Education', es: 'Formación' },
  '/#education',
  localized((l) =>
    education.map((e) => `${e.institution}: ${e.program[l]} — ${e.period[l]}`).join('\n'),
  ),
  ['formação', 'education', 'graduação', 'faculdade', 'maua', 'senac'],
);
add(
  'certifications',
  { pt: 'Certificações e capacitações', en: 'Certifications', es: 'Certificaciones' },
  '/#education',
  localized(() => certifications.join('\n')),
  ['cursos', 'certificados', 'certifications', 'aws'],
);
add(
  'languages',
  { pt: 'Idiomas', en: 'Languages', es: 'Idiomas' },
  '/#education',
  localized((l) => languages.map((v) => `${v.language[l]}: ${v.level[l]}`).join('\n')),
  ['idiomas', 'inglês', 'english', 'espanhol', 'spanish', 'arabic', 'árabe'],
);
add(
  'contact',
  { pt: 'Contato profissional', en: 'Contact', es: 'Contacto' },
  '/#contact',
  localized(
    () =>
      `Email: ${socialLinks.email.replace('mailto:', '')}. LinkedIn: ${socialLinks.linkedin}. GitHub: ${socialLinks.github}. WhatsApp: ${socialLinks.whatsapp}. Currículo atualizado em português: /Curriculo_Omar_Saliba.pdf.`,
  ),
  ['contato', 'contact', 'email', 'currículo', 'resume', 'linkedin', 'github'],
);
await mkdir(new URL('../chatbot/knowledge/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../chatbot/knowledge/portfolio.json', import.meta.url),
  JSON.stringify({ schema_version: 1, documents: docs }, null, 2) + '\n',
);
console.log(
  `Exported ${docs.length} professional knowledge documents. No credentials or raw conversations included.`,
);
