import { useState, type CSSProperties } from 'react';
import { BrainCircuit, Database, Layers3, Network, Pause, Play, Settings2 } from 'lucide-react';
import { useLocale } from '../../app/locale';
import styles from './TechnologyMarquee.module.css';
import { technologyLogos } from '../../data/technologies';

// Brand symbols are local SVG assets. Concepts use symbols rather than invented brand logos.

const concepts = [
  { label: 'RAG', Icon: Network },
  { label: 'Fine-tuning', Icon: Settings2 },
  { label: 'Embeddings', Icon: Layers3 },
  { label: 'AI Agents', Icon: BrainCircuit },
  { label: 'SQL / ETL', Icon: Database },
];

export function TechnologyMarquee() {
  const { locale } = useLocale();
  const [paused, setPaused] = useState(false);
  const text = {
    pt: {
      label: 'Tecnologias e ferramentas de IA',
      pause: 'Pausar faixa de tecnologias',
      resume: 'Retomar faixa de tecnologias',
    },
    en: {
      label: 'Technologies and AI tools',
      pause: 'Pause technology strip',
      resume: 'Resume technology strip',
    },
    es: {
      label: 'Tecnologías y herramientas de IA',
      pause: 'Pausar franja de tecnologías',
      resume: 'Reanudar franja de tecnologías',
    },
  }[locale];

  return (
    <div className={styles.marquee} data-paused={paused} data-technology-marquee>
      <span className="sr-only">
        {text.label}: {technologyLogos.map(([name]) => name).join(', ')},{' '}
        {concepts.map(({ label }) => label).join(', ')}.
      </span>
      <div className={styles.viewport} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div className={styles.group} key={copy}>
              {technologyLogos.map(([name, slug]) => (
                <div className={styles.item} key={slug}>
                  <span
                    className={styles.logo}
                    style={{ '--logo': `url("/assets/logos/${slug}.svg")` } as CSSProperties}
                  />
                  <span>{name}</span>
                </div>
              ))}
              {concepts.map(({ label, Icon }) => (
                <div className={styles.item} key={label}>
                  <Icon />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        className={styles.control}
        type="button"
        aria-pressed={paused}
        aria-label={paused ? text.resume : text.pause}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </div>
  );
}
