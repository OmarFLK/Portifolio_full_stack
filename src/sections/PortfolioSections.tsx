import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
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
  projects,
  socialLinks,
  type Project,
} from '../data/portfolio';
import { ProjectMediaDialog } from '../components/projects/ProjectMediaDialog';
import {
  BoundingBoxFrame,
  ScribbleArrow,
  SectionHeading,
  StaticSignalStar,
  SystemNotice,
} from '../components/ui/Graphics';
import styles from './PortfolioSections.module.css';

const capabilityIcons = {
  ai: Braces,
  backend: CloudCog,
  data: Database,
  frontend: PanelsTopLeft,
  delivery: ArrowUpRight,
} as const;

function ProjectArtwork({ project }: { project: Project }) {
  if (project.visual === 'signal') {
    return (
      <div className={`${styles.artwork} ${styles.signalArtwork}`} aria-hidden="true">
        <div className={styles.artworkChrome}>
          <span>LEAD_SCAN.PY</span>
          <span>RUN 01</span>
        </div>
        <div className={styles.signalCore}>
          <span className={styles.signalTarget} />
          <span className={styles.signalSweep} />
          <strong>SEARCH</strong>
          <small>PUBLIC DATA / STRUCTURED</small>
        </div>
        <div className={styles.dataRows}>
          <span>NAME</span>
          <span>ROLE</span>
          <span>COMPANY</span>
          <span>STATUS</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </div>
      </div>
    );
  }

  if (project.visual === 'ledger') {
    return (
      <div className={`${styles.artwork} ${styles.ledgerArtwork}`} aria-hidden="true">
        <div className={styles.artworkChrome}>
          <span>RESERVATIONS / LIVE</span>
          <span>02</span>
        </div>
        <div className={styles.bookingDate}>
          <span>19</span>
          <div>
            <strong>TABLE 04</strong>
            <small>20:30 — 04 GUESTS</small>
          </div>
        </div>
        <div className={styles.bookingSlots}>
          {['18:00', '19:00', '20:30', '21:15'].map((slot, index) => (
            <span key={slot} data-active={index === 2}>
              {slot}
            </span>
          ))}
        </div>
        <div className={styles.bookingFooter}>
          <span>JWT VERIFIED</span>
          <span>NO CONFLICTS</span>
        </div>
      </div>
    );
  }

  if (project.visual === 'terminal') {
    return (
      <div className={`${styles.artwork} ${styles.terminalArtwork}`} aria-hidden="true">
        <div className={styles.artworkChrome}>
          <span>opensource.lab</span>
          <span>main</span>
        </div>
        <div className={styles.terminalCopy}>
          <span>
            <i>01</i> const knowledge = open(
          </span>
          <span>
            <i>02</i> &nbsp;&nbsp;documentation,
          </span>
          <span>
            <i>03</i> &nbsp;&nbsp;collaboration,
          </span>
          <span>
            <i>04</i> &nbsp;&nbsp;reuse
          </span>
          <span>
            <i>05</i> );
          </span>
          <strong>BUILD TO SHARE_</strong>
        </div>
      </div>
    );
  }

  if (project.visual === 'paper') {
    return (
      <div className={`${styles.artwork} ${styles.paperArtwork}`} aria-hidden="true">
        <div className={styles.paperSheet}>
          <span className={styles.paperStamp}>EDU / 04</span>
          <strong>
            ACADEMIC
            <br />
            RECORD
          </strong>
          <span>STUDENTS</span>
          <span>TEACHERS</span>
          <span>GRADES</span>
          <div className={styles.paperMark}>E</div>
        </div>
        <div className={styles.paperTape}>FIRST YEAR / BUILD</div>
      </div>
    );
  }

  return (
    <div className={`${styles.artwork} ${styles.gridArtwork}`} aria-hidden="true">
      <div className={styles.artworkChrome}>
        <span>FINCORE / OVERVIEW</span>
        <span>05</span>
      </div>
      <div className={styles.financeTotal}>
        <small>BALANCE</small>
        <strong>R$ 4.820</strong>
        <span>CONTROL / CLARITY</span>
      </div>
      <div className={styles.financeBars}>
        {[46, 78, 58, 92, 64, 84].map((height, index) => (
          <span key={index} style={{ '--bar-height': `${height}%` } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}

function SectionIntro({
  index,
  title,
  body,
  id,
  tone = 'ink',
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
      tone={tone === 'paper' ? 'dark' : 'light'}
    />
  );
}

export function Hero() {
  const { text } = useLocale();

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroLiquid} aria-hidden="true" data-liquid="hero">
        <span className={styles.heroLiquidNoise} />
      </div>

      <div className={styles.heroTopline} data-hero>
        <p>{text.heroEyebrow}</p>
        <p>OMAR SALIBA / SANTO ANDRÉ</p>
      </div>

      <div className={styles.heroComposition}>
        <div className={styles.heroName} data-hero>
          <span>OMAR</span>
          <span>SALIBA</span>
        </div>

        <div className={styles.staticStar} aria-hidden="true" data-hero>
          <StaticSignalStar />
          <span>STATIC / LIGHT MODE</span>
        </div>

        <div className={styles.heroStatement}>
          <p className={styles.heroAreas} data-hero>
            AI / AUTOMATION / DATA / SOFTWARE
          </p>
          <h1 id="hero-title" data-hero>
            <span>{text.heroTitleTop}</span>
            <BoundingBoxFrame
              className={styles.selectedWord}
              inline
              label={text.selectedLabel}
              measurement="W: 100% / H: AUTO"
              variant="ink"
              showMiddleHandles
            >
              {text.heroTitleSelected}
            </BoundingBoxFrame>
            <span>{text.heroTitleBottom}</span>
          </h1>
          <p className={styles.heroLead} data-hero>
            {text.heroLead}
          </p>
          <div className={styles.heroActions} data-hero>
            <a className={styles.primaryAction} href="#projects">
              {text.heroProjects}
              <ArrowDownRight aria-hidden="true" />
            </a>
            <a className={styles.textAction} href="#contact">
              {text.heroContact}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <SystemNotice
          ariaLabel={text.heroStatus}
          className={styles.statusNotice}
          eyebrow="STATUS.SYS"
          statusLabel="ONLINE"
          title={text.heroStatus}
          tone="light"
        >
          <span>{text.heroLocation}</span>
        </SystemNotice>
      </div>

      <div className={styles.resumeLinks} data-hero>
        <a href="/Curriculo_OmarSaliba_PT-BR.pdf" download>
          <Download aria-hidden="true" />
          {text.heroResumePt}
        </a>
        <a href="/Curriculo_OmarSaliba_ENG.pdf" download>
          <Download aria-hidden="true" />
          {text.heroResumeEn}
        </a>
      </div>
    </section>
  );
}

export function About() {
  const { text } = useLocale();

  return (
    <section className={styles.about} id="about" aria-labelledby="about-title" data-draw>
      <div className={styles.aboutLabel} data-reveal>
        <span>BUILD</span>
        <span>MEASURE</span>
        <span>IMPROVE</span>
      </div>
      <div className={styles.aboutCopy} data-reveal>
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
    <section className={styles.projects} id="projects" aria-labelledby="projects-title">
      <SectionIntro
        index={text.projectsIndex}
        title={text.projectsTitle}
        body={text.projectsIntro}
        id="projects-title"
        tone="paper"
      />

      <div className={styles.projectList}>
        {projects.map((project, index) => {
          const hasLiveLink = project.links.some((link) => link.kind === 'live');

          return (
            <article
              className={styles.project}
              data-featured={index === 0}
              data-visual={project.visual}
              data-reveal
              key={project.id}
            >
              <div className={styles.projectCopy}>
                <p className={styles.projectIndex}>
                  <span>{project.index}</span>
                  <span>PROJECT / {project.visual.toUpperCase()}</span>
                </p>
                <h3>{localize(project.title, locale)}</h3>
                <p className={styles.projectDescription}>{localize(project.description, locale)}</p>
                <p className={styles.techLine}>
                  <span>STACK</span>
                  {project.technologies.join(' · ')}
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
                  {!hasLiveLink ? (
                    <span className={styles.unavailable}>{text.projectUnavailable}</span>
                  ) : null}
                </div>
              </div>
              <div className={styles.projectVisual}>
                {index === 0 ? (
                  <BoundingBoxFrame
                    className={styles.selectedArtwork}
                    label="SELECTED / 01"
                    measurement="LIVE OBJECT"
                    variant="paper"
                    showMiddleHandles
                  >
                    <ProjectArtwork project={project} />
                  </BoundingBoxFrame>
                ) : (
                  <ProjectArtwork project={project} />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Experience() {
  const { locale, text } = useLocale();

  return (
    <section className={styles.experience} id="experience" aria-labelledby="experience-title">
      <SectionIntro
        index={text.experienceIndex}
        title={text.experienceTitle}
        body={text.experienceIntro}
        id="experience-title"
      />

      <ol className={styles.experienceLedger}>
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
                {experience.technologies.join(' · ')}
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
    <section className={styles.skills} id="skills" aria-labelledby="skills-title">
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
              <p>{group.items.join(' / ')}</p>
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
    <section className={styles.education} id="education" aria-labelledby="education-title">
      <SectionIntro
        index={text.educationIndex}
        title={text.educationTitle}
        body={`${text.educationAcademic} / ${text.educationCerts} / ${text.educationLanguages}`}
        id="education-title"
      />

      <div className={styles.educationGrid}>
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
  const { text } = useLocale();
  const links = [
    {
      label: text.behance,
      href: socialLinks.behance,
      detail: 'VISUAL STUDIES / UI',
      icon: PanelsTopLeft,
    },
    {
      label: text.drive,
      href: socialLinks.drive,
      detail: 'ARTICLES / RESEARCH',
      icon: FileText,
    },
    {
      label: text.github,
      href: socialLinks.github,
      detail: 'CODE / OPEN SOURCE',
      icon: GitFork,
    },
  ];

  return (
    <section className={styles.laboratory} aria-labelledby="laboratory-title">
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
            <small>{detail}</small>
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
    <section className={styles.contact} id="contact" aria-labelledby="contact-title">
      <div className={styles.contactLiquid} aria-hidden="true" />
      <p className={styles.sectionIndex} data-reveal>
        {text.contactIndex}
      </p>
      <div className={styles.contactLayout}>
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
        © {new Date().getFullYear()} OMAR SALIBA — {text.rights}
      </p>
      <p>{text.footerNote}</p>
      <a href="#top">
        {text.backTop}
        <ArrowUpRight aria-hidden="true" />
      </a>
    </footer>
  );
}
