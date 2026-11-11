import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Bug,
  CloudCog,
  ContactRound,
  Database,
  Download,
  FileText,
  GitFork,
  Mail,
  MessageCircle,
  PanelsTopLeft,
  Play,
} from 'lucide-react';
import { useLocale } from '../app/locale';
import {
  capabilityGroups,
  certifications,
  education,
  experiences,
  languages,
  localize,
  localizeTechnology,
  projects,
  resultMetrics,
  socialLinks,
  type Project,
} from '../data/portfolio';
import { ProjectMediaDialog } from '../components/projects/ProjectMediaDialog';
import { TechnologyMarquee } from '../components/ui/TechnologyMarquee';
import { BrandLogo } from '../components/ui/BrandLogo';
import { ScribbleArrow, SectionHeading, StaticSignalStar } from '../components/ui/Graphics';
import styles from './PortfolioSections.module.css';

const capabilityIcons = {
  ai: Braces,
  backend: CloudCog,
  data: Database,
  frontend: PanelsTopLeft,
  delivery: ArrowUpRight,
  quality: Bug,
} as const;

function ProjectArtwork({ project }: { project: Project }) {
  const { locale } = useLocale();
  const flows: Record<string, string[]> = {
    'maua-ia': ['Parquet / DuckDB', 'QueryPlan + RAG', 'Gemma 3 27B'],
    pendi: ['React', 'FastAPI + RAG', 'Gemma 27B'],
    semob: ['Flutter', 'Dart / Shelf', 'PostgreSQL + MongoDB'],
    'avenida-tintas': ['JavaScript', 'Python / APIs', 'MySQL + ERP'],
    'tech-hub': ['AI Agents', 'RAG', 'AWS / CI/CD'],
    pricing: ['React / TypeScript', 'Flask / OpenAI', 'PostgreSQL'],
  };
  return (
    <div className={styles.artwork} aria-hidden="true">
      <div className={styles.artworkChrome}>
        <span>{project.id.toUpperCase()}</span>
        <span>
          {project.index} / {String(projects.length).padStart(2, '0')}
        </span>
      </div>
      <div className={styles.projectDiagram}>
        {(flows[project.id] ?? project.technologies.slice(0, 3)).map((label, i) => (
          <div key={label}>
            <span>0{i + 1}</span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>
      <div className={styles.artworkFooter}>{localize(project.status!, locale)}</div>
    </div>
  );
}

function SectionIntro({
  index,
  title,
  body,
  id,
}: {
  index: string;
  title: string;
  body: string;
  id?: string;
  tone?: 'ink' | 'paper';
}) {
  return (
    <SectionHeading
      className={styles.sectionIntro}
      index={index}
      title={title}
      intro={<p>{body}</p>}
      id={id}
      tone="dark"
    />
  );
}

export function Hero() {
  const { locale, text } = useLocale();
  const roles = {
    pt: ['Engenharia de IA.', 'Dados e automação.'],
    en: ['AI engineering.', 'Data & automation.'],
    es: ['Ingeniería de IA.', 'Datos y automatización.'],
  };
  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.heroTopline} data-hero>
        <p>{text.heroEyebrow}</p>
        <p>SÃO PAULO, BRASIL / 2026</p>
      </div>
      <div className={styles.heroComposition}>
        <div className={styles.heroStatement}>
          <p className={styles.heroName} data-hero>
            OMAR SALIBA
          </p>
          <h1 id="hero-title" data-hero>
            <span>{roles[locale][0]}</span>
            <span>{roles[locale][1]}</span>
          </h1>
          <p className={styles.heroLead} data-hero>
            {text.heroLead}
          </p>
          <div className={styles.heroActions} data-hero>
            <a className={styles.primaryAction} href="#projects">
              {text.heroProjects}
              <ArrowDownRight aria-hidden="true" />
            </a>
            <a className={styles.textAction} href="/Curriculo_Omar_Saliba.pdf" download>
              <Download aria-hidden="true" />
              {text.heroResumePt}
            </a>
          </div>
          <div className={styles.resumeLinks} data-hero>
            <a href={socialLinks.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight aria-hidden="true" />
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className={styles.heroVisual} aria-hidden="true">
          <div className={styles.orbit}>
            <span />
            <span />
            <span />
            <strong>
              <BrandLogo className={styles.orbitBrand} />
              <span>AI / DATA / CLOUD</span>
            </strong>
          </div>
          <div className={styles.visualCaption}>
            <span>01 — IDEIA</span>
            <span>02 — SISTEMA</span>
          </div>
        </div>
      </div>
      <TechnologyMarquee />
      <div className={styles.heroFooter}>
        <span>OneBox / DNE</span>
        <span>Mauá Júnior</span>
        <span>Instituto Mauá de Tecnologia</span>
      </div>
    </section>
  );
}

export function About() {
  const { text } = useLocale();

  return (
    <section
      className={styles.about}
      id="about"
      aria-labelledby="about-title"
      data-draw
      data-star-safe="about"
      data-star-waypoint="about"
    >
      <div className={styles.aboutLabel} data-reveal>
        <span>ASK</span>
        <span>BUILD</span>
        <span>REFINE</span>
      </div>
      <div className={styles.aboutCopy} data-reveal data-star-protected>
        <p className={styles.sectionIndex}>{text.aboutIndex}</p>
        <h2 id="about-title">{text.aboutTitle}</h2>
        <div className={styles.aboutColumns}>
          <p>{text.aboutBody}</p>
          <p>{text.aboutBody2}</p>
        </div>
        <p className={styles.handNote}>{text.aboutNote}</p>
      </div>
      <ScribbleArrow className={styles.scribbleArrow} direction="downRight" />
    </section>
  );
}

export function Projects() {
  const { locale, text } = useLocale();

  return (
    <section
      className={styles.projects}
      id="projects"
      aria-labelledby="projects-title"
      data-star-waypoint="projects"
    >
      <SectionIntro
        index={text.projectsIndex}
        title={text.projectsTitle}
        body={text.projectsIntro}
        id="projects-title"
        tone="paper"
      />

      <div className={styles.projectList} data-star-safe="projects">
        {projects.map((project, index) => {
          const hasLiveLink = project.links.some((link) => link.kind === 'live');

          return (
            <article
              className={styles.project}
              data-featured={index === 0}
              data-visual={project.visual}
              data-project-id={project.id}
              data-star-protected
              data-reveal
              key={project.id}
            >
              <div className={styles.projectCopy}>
                <p className={styles.projectIndex}>
                  <span>{project.index}</span>
                  <span>{project.status ? localize(project.status, locale) : 'PROJECT'}</span>
                </p>
                <h3>{localize(project.title, locale)}</h3>
                <p className={styles.projectDescription}>{localize(project.description, locale)}</p>
                <p className={styles.projectOutcome}>
                  {project.outcome ? localize(project.outcome, locale) : null}
                </p>
                <p className={styles.techLine}>
                  <span>{project.metaLabel ? localize(project.metaLabel, locale) : 'STACK'}</span>
                  {project.technologies
                    .map((technology) => localizeTechnology(technology, locale))
                    .join(' · ')}
                </p>
                <div className={styles.projectLinks}>
                  {project.links.map((link) => (
                    <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                      {link.kind === 'github' ? <GitFork aria-hidden="true" /> : null}
                      {link.kind === 'video' ? <Play aria-hidden="true" /> : null}
                      {link.kind === 'live' ? <ArrowUpRight aria-hidden="true" /> : null}
                      {link.kind === 'github'
                        ? text.projectCode
                        : link.kind === 'live'
                          ? text.projectLive
                          : text.projectVideo}
                    </a>
                  ))}
                  {project.localVideo ? (
                    <ProjectMediaDialog
                      projectTitle={localize(project.title, locale)}
                      videoSrc={project.localVideo}
                      triggerLabel={text.projectVideo}
                      closeLabel={text.projectClose}
                      dialogTitle={text.mediaDialogTitle}
                    />
                  ) : null}
                  {!hasLiveLink && project.links.length > 0 ? (
                    <span className={styles.unavailable}>{text.projectUnavailable}</span>
                  ) : null}
                </div>
              </div>
              <div className={styles.projectVisual}>
                <ProjectArtwork project={project} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Results() {
  const { locale, text } = useLocale();

  return (
    <section
      className={styles.results}
      id="resultados"
      aria-labelledby="resultados-title"
      data-star-waypoint="results"
    >
      <div className={styles.resultsGrid} aria-hidden="true" />

      <div className={styles.resultsHeader}>
        <div className={styles.resultsHeadingMeta} data-star-protected>
          <p className={styles.sectionIndex}>{text.resultsIndex}</p>
          <p>{text.resultsEyebrow}</p>
        </div>
        <div className={styles.resultsHeadingCopy} data-star-protected>
          <h2 id="resultados-title">{text.resultsTitle}</h2>
          <p>{text.resultsIntro}</p>
        </div>
        <div className={styles.resultsStaticStar} aria-hidden="true" data-star-anchor="results">
          <StaticSignalStar />
          <span>
            {localize(
              {
                pt: 'IMPACTO / VERIFICADO',
                en: 'IMPACT / VERIFIED',
                es: 'IMPACTO / VERIFICADO',
              },
              locale,
            )}
          </span>
        </div>
      </div>

      <div className={styles.resultsPanel} data-star-protected data-star-waypoint="results-metrics">
        {resultMetrics.map((metric, index) => (
          <article
            className={styles.resultMetric}
            data-primary={index === 0}
            data-result-metric
            data-result-id={metric.id}
            key={metric.id}
          >
            <div className={styles.metricChrome} aria-hidden="true">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{metric.id.toUpperCase()}</span>
            </div>
            <strong className={styles.metricValue} aria-hidden="true">
              {metric.counter ? (
                <>
                  {localize(metric.counter.prefix, locale)}
                  <span data-result-counter={metric.counter.target}>{metric.counter.target}</span>
                  {localize(metric.counter.suffix, locale)}
                </>
              ) : (
                localize(metric.displayValue, locale)
              )}
            </strong>
            <span className="sr-only">{localize(metric.accessibleLabel, locale)}</span>
            <h3>{localize(metric.title, locale)}</h3>
            <p>{localize(metric.description, locale)}</p>
          </article>
        ))}
      </div>

      <div className={styles.resultsFooter} data-result-line>
        <span>{text.resultsLog}</span>
        <span aria-hidden="true">COST ↓ / SPEED ↑ / MANUAL WORK ↓</span>
      </div>
    </section>
  );
}

export function Experience() {
  const { locale, text } = useLocale();

  return (
    <section
      className={styles.experience}
      id="experience"
      aria-labelledby="experience-title"
      data-star-waypoint="experience"
    >
      <SectionIntro
        index={text.experienceIndex}
        title={text.experienceTitle}
        body={text.experienceIntro}
        id="experience-title"
      />

      <ol className={styles.experienceLedger} data-star-safe="experience" data-star-protected>
        {experiences.map((experience, index) => (
          <li key={experience.id} data-reveal>
            <span className={styles.ledgerNode} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className={styles.experienceMeta}>
              <p>{localize(experience.period, locale)}</p>
              <p>{experience.organization}</p>
            </div>
            <div className={styles.experienceBody}>
              <h3>{localize(experience.role, locale)}</h3>
              <p>{localize(experience.description, locale)}</p>
              <p className={styles.techLine}>
                <span>TOOLS</span>
                {experience.technologies
                  .map((technology) => localizeTechnology(technology, locale))
                  .join(' · ')}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Skills() {
  const { locale, text } = useLocale();

  return (
    <section
      className={styles.skills}
      id="skills"
      aria-labelledby="skills-title"
      data-star-waypoint="skills"
    >
      <SectionIntro
        index={text.skillsIndex}
        title={text.skillsTitle}
        body={text.skillsIntro}
        id="skills-title"
        tone="paper"
      />
      <div className={styles.capabilityMap}>
        <div className={styles.capabilityCore} data-reveal>
          <span>OMAR.SYS</span>
          <strong>
            BUILDING
            <br />
            SYSTEMS
          </strong>
          <small>INPUT → LOGIC → OUTPUT</small>
        </div>
        {capabilityGroups.map((group, index) => {
          const Icon = capabilityIcons[group.id as keyof typeof capabilityIcons] ?? Braces;
          return (
            <article
              className={styles.capabilityGroup}
              data-position={index}
              data-reveal
              key={group.id}
            >
              <div>
                <Icon aria-hidden="true" />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{localize(group.label, locale)}</h3>
              <p>
                {group.items
                  .map((technology) => localizeTechnology(technology, locale))
                  .join(' / ')}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Education() {
  const { locale, text } = useLocale();

  return (
    <section
      className={styles.education}
      id="education"
      aria-labelledby="education-title"
      data-star-waypoint="education"
    >
      <SectionIntro
        index={text.educationIndex}
        title={text.educationTitle}
        body={`${text.educationAcademic} / ${text.educationCerts} / ${text.educationLanguages}`}
        id="education-title"
      />

      <div className={styles.educationGrid} data-star-safe="education">
        <div className={styles.academicRecords} data-reveal>
          <h3>{text.educationAcademic}</h3>
          {education.map((item, index) => (
            <article key={item.institution}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h4>{item.institution}</h4>
                <p>{localize(item.program, locale)}</p>
                <small>{localize(item.period, locale)}</small>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.languageRecords} data-reveal>
          <h3>{text.educationLanguages}</h3>
          {languages.map((item, index) => (
            <div key={localize(item.language, locale)}>
              <span>{localize(item.language, locale)}</span>
              <strong>{localize(item.level, locale)}</strong>
              <i style={{ '--level': `${[100, 72, 52, 24][index]}%` } as React.CSSProperties} />
            </div>
          ))}
        </div>

        <div className={styles.certificationRecords} data-reveal>
          <h3>{text.educationCerts}</h3>
          <ol>
            {certifications.map((certification, index) => (
              <li key={certification}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {certification}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Laboratory() {
  const { locale, text } = useLocale();
  const links = [
    {
      label: localize(
        {
          pt: 'Automação de prospecção',
          en: 'Prospecting automation',
          es: 'Automatización de prospección',
        },
        locale,
      ),
      href: 'https://github.com/OmarFLK/script_automa-o_planilha_python',
      detail: {
        pt: 'ESTUDOS VISUAIS / UI',
        en: 'VISUAL STUDIES / UI',
        es: 'ESTUDIOS VISUALES / UI',
      },
      icon: PanelsTopLeft,
    },
    {
      label: localize(
        {
          pt: 'Estatística e análise de dados',
          en: 'Statistics & data analysis',
          es: 'Estadística y análisis de datos',
        },
        locale,
      ),
      href: 'https://github.com/OmarFLK/atividade01_ICD203',
      detail: {
        pt: 'ARTIGOS / PESQUISA',
        en: 'ARTICLES / RESEARCH',
        es: 'ARTÍCULOS / INVESTIGACIÓN',
      },
      icon: FileText,
    },
    {
      label: text.github,
      href: socialLinks.github,
      detail: {
        pt: 'CÓDIGO / CÓDIGO ABERTO',
        en: 'CODE / OPEN SOURCE',
        es: 'CÓDIGO / CÓDIGO ABIERTO',
      },
      icon: GitFork,
    },
  ];

  return (
    <section
      className={styles.laboratory}
      id="laboratory"
      aria-labelledby="laboratory-title"
      data-star-waypoint="laboratory"
    >
      <SectionIntro
        index={text.labIndex}
        title={text.labTitle}
        body={text.labBody}
        id="laboratory-title"
        tone="paper"
      />
      <div className={styles.labLinks}>
        {links.map(({ label, href, detail, icon: Icon }, index) => (
          <a href={href} target="_blank" rel="noreferrer" key={href} data-reveal>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <Icon aria-hidden="true" />
            <strong>{label}</strong>
            <small>{localize(detail, locale)}</small>
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const { text } = useLocale();

  return (
    <section
      className={styles.contact}
      id="contact"
      aria-labelledby="contact-title"
      data-star-waypoint="contact"
    >
      <div className={styles.contactLiquid} aria-hidden="true" />
      <p className={styles.sectionIndex} data-reveal>
        {text.contactIndex}
      </p>
      <div className={styles.contactLayout} data-star-safe="contact" data-star-protected>
        <div data-reveal>
          <h2 id="contact-title">{text.contactTitle}</h2>
          <p>{text.contactBody}</p>
        </div>
        <div className={styles.contactActions} data-reveal>
          <a href={socialLinks.email}>
            <Mail aria-hidden="true" />
            {text.contactEmail}
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            {text.contactWhatsapp}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className={styles.contactSocials} aria-label={text.socialLabel} data-reveal>
        <span>{text.socialLabel}</span>
        <a href={socialLinks.github} target="_blank" rel="noreferrer">
          <GitFork aria-hidden="true" /> GitHub
        </a>
        <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
          <ContactRound aria-hidden="true" /> LinkedIn
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  const { text } = useLocale();

  return (
    <footer className={styles.footer}>
      <p>
        <BrandLogo className={styles.footerBrand} />© {new Date().getFullYear()} OMAR SALIBA —{' '}
        {text.rights}
      </p>
      <p>{text.footerNote}</p>
      <a href="#top">
        {text.backTop}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </footer>
  );
}
