export type Locale = 'pt' | 'en' | 'es';
export type LocalizedText = Record<Locale, string>;

export interface ExternalLink {
  label: string;
  href: string;
  kind: 'github' | 'live' | 'video';
}

export interface Project {
  id: string;
  index: string;
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
  links: ExternalLink[];
  localVideo?: string;
  visual: 'signal' | 'ledger' | 'terminal' | 'paper' | 'grid';
}

export interface Experience {
  id: string;
  role: LocalizedText;
  organization: string;
  period: LocalizedText;
  description: LocalizedText;
  technologies: string[];
}

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
};

export const copy = {
  pt: {
    pageTitle: 'Omar Saliba — IA, automação, dados e desenvolvimento',
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      experience: 'Experiência',
      skills: 'Ferramentas',
      education: 'Formação',
      contact: 'Contato',
    },
    menu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    skip: 'Pular para o conteúdo',
    heroEyebrow: 'Selected work / 2026',
    heroTitleTop: 'IA, dados e',
    heroTitleSelected: 'software',
    heroTitleBottom: 'em movimento.',
    heroLead:
      'Estudante de Inteligência Artificial e Ciência de Dados que constrói automações, APIs e produtos digitais com atenção à engenharia e ao design.',
    heroStatus: 'Disponível para conversar',
    heroLocation: 'Santo André, SP',
    heroProjects: 'Explorar projetos',
    heroContact: 'Entrar em contato',
    heroResumePt: 'Currículo PT-BR',
    heroResumeEn: 'Resume EN',
    selectedLabel: 'objeto selecionado',
    aboutIndex: '01 / contexto',
    aboutTitle: 'Curiosidade técnica com vontade de colocar coisas no mundo.',
    aboutBody:
      'Sou formado no Ensino Médio Técnico em TI pelo Senac Aclimação e curso Inteligência Artificial e Ciência de Dados no Instituto Mauá de Tecnologia. Meu trabalho cruza desenvolvimento full stack, automação, dados e experimentação com IA.',
    aboutBody2:
      'Gosto de transformar problemas abertos em sistemas claros: entender o contexto, projetar a arquitetura, construir, medir e melhorar.',
    aboutNote: 'Pensar → prototipar → construir → revisar',
    projectsIndex: '02 / provas',
    projectsTitle: 'Projetos selecionados',
    projectsIntro:
      'Sistemas e experimentos reais — de automações em Python a aplicações full stack.',
    projectCode: 'Código',
    projectLive: 'Abrir site',
    projectVideo: 'Ver demonstração',
    projectClose: 'Fechar demonstração',
    projectUnavailable: 'Sem site publicado',
    experienceIndex: '03 / trajetória',
    experienceTitle: 'Experiência em registro',
    experienceIntro:
      'Responsabilidades, contextos e tecnologias — sem inflar cargo, resultado ou data.',
    skillsIndex: '04 / ferramentas',
    skillsTitle: 'Stack por função',
    skillsIntro:
      'Tecnologia é meio. Organizo as ferramentas pelo tipo de problema que ajudam a resolver.',
    educationIndex: '05 / base',
    educationTitle: 'Formação e repertório',
    educationAcademic: 'Formação acadêmica',
    educationCerts: 'Certificações',
    educationLanguages: 'Idiomas',
    current: 'Em andamento',
    labIndex: '06 / laboratório',
    labTitle: 'Dados, artigos e experimentos',
    labBody: 'Uma extensão do portfólio para dashboards, estudos visuais, artigos e código aberto.',
    behance: 'Projetos no Behance',
    drive: 'Artigos no Drive',
    github: 'Laboratório no GitHub',
    contactIndex: '07 / próximo sinal',
    contactTitle: 'Tem um problema interessante para construir?',
    contactBody:
      'Estou sempre aberto a conversar sobre IA, automação, dados, APIs e produtos digitais.',
    contactEmail: 'Enviar e-mail',
    contactWhatsapp: 'Conversar no WhatsApp',
    socialLabel: 'Outros canais',
    backTop: 'Voltar ao topo',
    footerNote: 'Projetado e desenvolvido por Omar Saliba.',
    rights: 'Todos os direitos reservados.',
    mediaDialogTitle: 'Demonstração do projeto',
  },
  en: {
    pageTitle: 'Omar Saliba — AI, automation, data and development',
    nav: {
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
      skills: 'Toolkit',
      education: 'Education',
      contact: 'Contact',
    },
    menu: 'Open menu',
    closeMenu: 'Close menu',
    skip: 'Skip to content',
    heroEyebrow: 'Selected work / 2026',
    heroTitleTop: 'AI, data and',
    heroTitleSelected: 'software',
    heroTitleBottom: 'in motion.',
    heroLead:
      'Artificial Intelligence and Data Science student building automations, APIs and digital products with equal care for engineering and design.',
    heroStatus: 'Open to conversations',
    heroLocation: 'Santo André, Brazil',
    heroProjects: 'Explore projects',
    heroContact: 'Get in touch',
    heroResumePt: 'CV in Portuguese',
    heroResumeEn: 'Resume in English',
    selectedLabel: 'selected object',
    aboutIndex: '01 / context',
    aboutTitle: 'Technical curiosity with the urge to ship real things.',
    aboutBody:
      'I graduated from the IT technical high school program at Senac Aclimação and study Artificial Intelligence and Data Science at Instituto Mauá de Tecnologia. My work connects full stack development, automation, data and AI experimentation.',
    aboutBody2:
      'I like turning open-ended problems into clear systems: understand the context, design the architecture, build, measure and improve.',
    aboutNote: 'Think → prototype → build → review',
    projectsIndex: '02 / evidence',
    projectsTitle: 'Selected projects',
    projectsIntro:
      'Real systems and experiments — from Python automations to full stack applications.',
    projectCode: 'Source code',
    projectLive: 'Open website',
    projectVideo: 'Watch demo',
    projectClose: 'Close demo',
    projectUnavailable: 'No published website',
    experienceIndex: '03 / journey',
    experienceTitle: 'Experience ledger',
    experienceIntro:
      'Responsibilities, contexts and technologies — without inflating roles, outcomes or dates.',
    skillsIndex: '04 / toolkit',
    skillsTitle: 'Stack by purpose',
    skillsIntro: 'Technology is a means. I organize tools by the kind of problem they help solve.',
    educationIndex: '05 / foundation',
    educationTitle: 'Education and repertoire',
    educationAcademic: 'Academic background',
    educationCerts: 'Certifications',
    educationLanguages: 'Languages',
    current: 'In progress',
    labIndex: '06 / laboratory',
    labTitle: 'Data, articles and experiments',
    labBody:
      'An extension of the portfolio for dashboards, visual studies, articles and open-source code.',
    behance: 'Work on Behance',
    drive: 'Articles on Drive',
    github: 'Lab on GitHub',
    contactIndex: '07 / next signal',
    contactTitle: 'Have an interesting problem to build?',
    contactBody:
      'I am always open to conversations about AI, automation, data, APIs and digital products.',
    contactEmail: 'Send an email',
    contactWhatsapp: 'Chat on WhatsApp',
    socialLabel: 'Other channels',
    backTop: 'Back to top',
    footerNote: 'Designed and developed by Omar Saliba.',
    rights: 'All rights reserved.',
    mediaDialogTitle: 'Project demonstration',
  },
  es: {
    pageTitle: 'Omar Saliba — IA, automatización, datos y desarrollo',
    nav: {
      about: 'Sobre mí',
      projects: 'Proyectos',
      experience: 'Experiencia',
      skills: 'Herramientas',
      education: 'Formación',
      contact: 'Contacto',
    },
    menu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    skip: 'Saltar al contenido',
    heroEyebrow: 'Selected work / 2026',
    heroTitleTop: 'IA, datos y',
    heroTitleSelected: 'software',
    heroTitleBottom: 'en movimiento.',
    heroLead:
      'Estudiante de Inteligencia Artificial y Ciencia de Datos que construye automatizaciones, APIs y productos digitales con atención a la ingeniería y al diseño.',
    heroStatus: 'Disponible para conversar',
    heroLocation: 'Santo André, Brasil',
    heroProjects: 'Explorar proyectos',
    heroContact: 'Entrar en contacto',
    heroResumePt: 'CV en portugués',
    heroResumeEn: 'Resume en inglés',
    selectedLabel: 'objeto seleccionado',
    aboutIndex: '01 / contexto',
    aboutTitle: 'Curiosidad técnica con ganas de lanzar cosas reales.',
    aboutBody:
      'Me gradué del programa técnico de secundaria en TI de Senac Aclimação y estudio Inteligencia Artificial y Ciencia de Datos en el Instituto Mauá de Tecnologia. Mi trabajo conecta desarrollo full stack, automatización, datos y experimentación con IA.',
    aboutBody2:
      'Me gusta convertir problemas abiertos en sistemas claros: entender el contexto, diseñar la arquitectura, construir, medir y mejorar.',
    aboutNote: 'Pensar → prototipar → construir → revisar',
    projectsIndex: '02 / pruebas',
    projectsTitle: 'Proyectos seleccionados',
    projectsIntro:
      'Sistemas y experimentos reales — desde automatizaciones en Python hasta aplicaciones full stack.',
    projectCode: 'Código',
    projectLive: 'Abrir sitio',
    projectVideo: 'Ver demostración',
    projectClose: 'Cerrar demostración',
    projectUnavailable: 'Sin sitio publicado',
    experienceIndex: '03 / trayectoria',
    experienceTitle: 'Experiencia en registro',
    experienceIntro:
      'Responsabilidades, contextos y tecnologías — sin inflar cargos, resultados ni fechas.',
    skillsIndex: '04 / herramientas',
    skillsTitle: 'Stack por función',
    skillsIntro:
      'La tecnología es un medio. Organizo las herramientas por el tipo de problema que ayudan a resolver.',
    educationIndex: '05 / base',
    educationTitle: 'Formación y repertorio',
    educationAcademic: 'Formación académica',
    educationCerts: 'Certificaciones',
    educationLanguages: 'Idiomas',
    current: 'En curso',
    labIndex: '06 / laboratorio',
    labTitle: 'Datos, artículos y experimentos',
    labBody:
      'Una extensión del portafolio para dashboards, estudios visuales, artículos y código abierto.',
    behance: 'Proyectos en Behance',
    drive: 'Artículos en Drive',
    github: 'Laboratorio en GitHub',
    contactIndex: '07 / próxima señal',
    contactTitle: '¿Tienes un problema interesante para construir?',
    contactBody:
      'Siempre estoy abierto a conversar sobre IA, automatización, datos, APIs y productos digitales.',
    contactEmail: 'Enviar correo',
    contactWhatsapp: 'Hablar por WhatsApp',
    socialLabel: 'Otros canales',
    backTop: 'Volver arriba',
    footerNote: 'Diseñado y desarrollado por Omar Saliba.',
    rights: 'Todos los derechos reservados.',
    mediaDialogTitle: 'Demostración del proyecto',
  },
} as const;

export const projects: Project[] = [
  {
    id: 'lead-enrichment',
    index: '01',
    title: {
      pt: 'Automação de Enriquecimento de Leads',
      en: 'Lead Enrichment Automation',
      es: 'Automatización de Enriquecimiento de Leads',
    },
    description: {
      pt: 'Script em Python que automatiza o enriquecimento de bases em Excel, pesquisa informações públicas e organiza cargos e descrições profissionais para reduzir trabalho manual.',
      en: 'A Python script that automates Excel database enrichment, searches public information and structures roles and professional descriptions to reduce manual work.',
      es: 'Script en Python que automatiza el enriquecimiento de bases en Excel, busca información pública y organiza cargos y descripciones profesionales para reducir trabajo manual.',
    },
    technologies: ['Python', 'Selenium', 'Pandas', 'Excel'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/script_automa-o_planilha_python',
        kind: 'github',
      },
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/watch?v=m5FC2Qysmaw',
        kind: 'video',
      },
    ],
    visual: 'signal',
  },
  {
    id: 'restaurant-reservations',
    index: '02',
    title: {
      pt: 'Sistema de Reservas para Restaurantes',
      en: 'Restaurant Reservation System',
      es: 'Sistema de Reservas para Restaurantes',
    },
    description: {
      pt: 'Aplicação full stack para gerenciamento de reservas, com autenticação JWT, prevenção de conflitos, interface responsiva e arquitetura preparada para evolução.',
      en: 'A full stack reservation management application with JWT authentication, conflict prevention, a responsive interface and an architecture designed to evolve.',
      es: 'Aplicación full stack para gestionar reservas, con autenticación JWT, prevención de conflictos, interfaz responsive y arquitectura preparada para evolucionar.',
    },
    technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'JWT'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/sistemaReservaRestaurantes',
        kind: 'github',
      },
      {
        label: 'Website',
        href: 'https://sistema-reserva-restaurantes.vercel.app',
        kind: 'live',
      },
      {
        label: 'YouTube',
        href: 'https://www.youtube.com/watch?v=mqfGfd3WbR8',
        kind: 'video',
      },
    ],
    visual: 'ledger',
  },
  {
    id: 'open-source-lab',
    index: '03',
    title: {
      pt: 'OpenSource Lab',
      en: 'OpenSource Lab',
      es: 'OpenSource Lab',
    },
    description: {
      pt: 'Hub de projetos e soluções em código aberto, voltado a documentação, colaboração e reutilização de aplicações e bibliotecas.',
      en: 'A hub for open-source projects and solutions focused on documentation, collaboration and the reuse of applications and libraries.',
      es: 'Hub de proyectos y soluciones de código abierto, enfocado en documentación, colaboración y reutilización de aplicaciones y bibliotecas.',
    },
    technologies: ['Open source', 'Documentação', 'Colaboração'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/Portifolio_full_stack',
        kind: 'github',
      },
      {
        label: 'Website',
        href: 'https://fullstackdevomar.vercel.app',
        kind: 'live',
      },
    ],
    localVideo: '/assets/videos/opensourceexp.mp4',
    visual: 'terminal',
  },
  {
    id: 'educore',
    index: '04',
    title: {
      pt: 'EduCore — Gestão Acadêmica',
      en: 'EduCore — Academic Management',
      es: 'EduCore — Gestión Académica',
    },
    description: {
      pt: 'Aplicação web desenvolvida no primeiro ano da graduação para gerenciar alunos, professores, notas e atividades acadêmicas.',
      en: 'A web application built during the first year of college to manage students, teachers, grades and academic activities.',
      es: 'Aplicación web desarrollada durante el primer año de la carrera para gestionar alumnos, profesores, notas y actividades académicas.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/Projeto_Poliedro_OFABA',
        kind: 'github',
      },
      {
        label: 'YouTube',
        href: 'https://youtu.be/K9OxcgAbmo8',
        kind: 'video',
      },
    ],
    localVideo: '/assets/videos/eduexp.mp4',
    visual: 'paper',
  },
  {
    id: 'fincore',
    index: '05',
    title: {
      pt: 'FinCore — Plataforma Financeira',
      en: 'FinCore — Financial Platform',
      es: 'FinCore — Plataforma Financiera',
    },
    description: {
      pt: 'Sistema de controle financeiro pessoal desenvolvido com foco em simplicidade, clareza e usabilidade.',
      en: 'A personal finance control system developed with a focus on simplicity, clarity and usability.',
      es: 'Sistema de control financiero personal desarrollado con foco en simplicidad, claridad y usabilidad.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/FinCore',
        kind: 'github',
      },
      {
        label: 'YouTube',
        href: 'https://youtu.be/UhHdgLxBPW4',
        kind: 'video',
      },
    ],
    localVideo: '/assets/videos/finexp.mp4',
    visual: 'grid',
  },
];

export const experiences: Experience[] = [
  {
    id: 'onebox',
    role: {
      pt: 'Estagiário em IA e Automação',
      en: 'AI & Automation Intern',
      es: 'Pasante de IA y Automatización',
    },
    organization: 'OneBox - DNE',
    period: { pt: 'Atual', en: 'Current', es: 'Actual' },
    description: {
      pt: 'Desenvolvimento e manutenção de soluções de IA e automação com serviços da AWS; criação e integração de APIs REST com Java, Python e FastAPI; manutenção de sistemas, correção de bugs e integração com MySQL e PostgreSQL.',
      en: 'Developing and maintaining AI and automation solutions with AWS services; building and integrating REST APIs with Java, Python and FastAPI; maintaining systems, fixing bugs and integrating MySQL and PostgreSQL.',
      es: 'Desarrollo y mantenimiento de soluciones de IA y automatización con servicios de AWS; creación e integración de APIs REST con Java, Python y FastAPI; mantenimiento de sistemas, corrección de errores e integración con MySQL y PostgreSQL.',
    },
    technologies: ['AWS', 'Java', 'Python', 'FastAPI', 'REST APIs', 'MySQL', 'PostgreSQL'],
  },
  {
    id: 'maua-consultant',
    role: {
      pt: 'Consultor Tecnológico',
      en: 'Technology Consultant',
      es: 'Consultor Tecnológico',
    },
    organization: 'Mauá Júnior',
    period: { pt: 'Atual', en: 'Current', es: 'Actual' },
    description: {
      pt: 'Desenvolvimento de soluções digitais, análise de dados e automação de processos para empresas parceiras, incluindo aplicações web, dashboards, scripts e experimentos com redes neurais e modelos de linguagem.',
      en: 'Development of digital solutions, data analysis and process automation for partner companies, including web applications, dashboards, scripts and experiments with neural networks and language models.',
      es: 'Desarrollo de soluciones digitales, análisis de datos y automatización de procesos para empresas asociadas, incluyendo aplicaciones web, dashboards, scripts y experimentos con redes neuronales y modelos de lenguaje.',
    },
    technologies: ['Python', 'Java', 'SQL', 'Power BI', 'JavaScript', 'LLMs'],
  },
  {
    id: 'maua-trainee',
    role: {
      pt: 'Trainee — Formação Multidisciplinar',
      en: 'Trainee — Multidisciplinary Training',
      es: 'Trainee — Formación Multidisciplinaria',
    },
    organization: 'Mauá Júnior',
    period: { pt: 'Formação interna', en: 'Internal training', es: 'Formación interna' },
    description: {
      pt: 'Passagem por marketing, financeiro e projetos para compreender a operação de uma empresa júnior e desenvolver comunicação, organização e trabalho em equipe.',
      en: 'Rotation through marketing, finance and projects to understand a junior company operation and develop communication, organization and teamwork.',
      es: 'Rotación por marketing, finanzas y proyectos para comprender la operación de una empresa júnior y desarrollar comunicación, organización y trabajo en equipo.',
    },
    technologies: ['Projetos', 'Comunicação', 'Organização'],
  },
  {
    id: 'sao-judas',
    role: {
      pt: 'Assistente Técnico de TI',
      en: 'IT Technical Assistant',
      es: 'Asistente Técnico de TI',
    },
    organization: 'São Judas Technologies',
    period: { pt: '01/2024', en: '01/2024', es: '01/2024' },
    description: {
      pt: 'Montagem, manutenção e configuração de computadores e notebooks, suporte direto a clientes e diagnóstico de problemas de hardware e software.',
      en: 'Assembly, maintenance and configuration of computers and notebooks, direct customer support and diagnosis of hardware and software issues.',
      es: 'Montaje, mantenimiento y configuración de computadoras y notebooks, soporte directo a clientes y diagnóstico de problemas de hardware y software.',
    },
    technologies: ['Hardware', 'Software', 'Suporte técnico'],
  },
];

export const capabilityGroups = [
  {
    id: 'ai',
    label: { pt: 'IA e automação', en: 'AI & automation', es: 'IA y automatización' },
    items: ['Python', 'FastAPI', 'LLMs', 'Redes neurais', 'Selenium'],
  },
  {
    id: 'backend',
    label: { pt: 'Back-end e APIs', en: 'Back-end & APIs', es: 'Back-end y APIs' },
    items: ['Java', 'Node.js', 'Express', 'REST APIs', 'JWT'],
  },
  {
    id: 'data',
    label: { pt: 'Dados e bancos', en: 'Data & databases', es: 'Datos y bases' },
    items: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Pandas', 'Power BI', 'Excel'],
  },
  {
    id: 'frontend',
    label: { pt: 'Interfaces', en: 'Interfaces', es: 'Interfaces' },
    items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    id: 'delivery',
    label: { pt: 'Cloud e entrega', en: 'Cloud & delivery', es: 'Cloud y entrega' },
    items: ['AWS', 'Git', 'GitHub', 'Postman', 'Vercel'],
  },
] satisfies Array<{ id: string; label: LocalizedText; items: string[] }>;

export const education = [
  {
    institution: 'Instituto Mauá de Tecnologia',
    program: {
      pt: 'Inteligência Artificial e Ciência de Dados',
      en: 'Artificial Intelligence and Data Science',
      es: 'Inteligencia Artificial y Ciencia de Datos',
    },
    period: { pt: 'Em andamento', en: 'In progress', es: 'En curso' },
  },
  {
    institution: 'Senac Aclimação',
    program: {
      pt: 'Ensino Médio Técnico em Tecnologia da Informação',
      en: 'Technical High School Program in Information Technology',
      es: 'Secundaria Técnica en Tecnología de la Información',
    },
    period: { pt: 'Concluído em 2024', en: 'Completed in 2024', es: 'Completado en 2024' },
  },
] satisfies Array<{ institution: string; program: LocalizedText; period: LocalizedText }>;

export const certifications = [
  'IBM Web Development Fundamentals',
  'IBM Introduction to Cloud Computing',
  'IMT Python para Ciência de Dados',
  'IMT Power BI — Básico',
  'USP/MBX Introdução ao Python e Machine Learning',
  'ALR Excel Intermediário/Avançado',
  'ALR HTML e CSS',
  'ALR Python',
  'ALR Git/GitHub',
  'EMED Melhor Apresentação Gráfica',
  'EMED Originalidade de Criação',
];

export const languages = [
  {
    language: { pt: 'Português', en: 'Portuguese', es: 'Portugués' },
    level: { pt: 'Nativo', en: 'Native', es: 'Nativo' },
  },
  {
    language: { pt: 'Espanhol', en: 'Spanish', es: 'Español' },
    level: { pt: 'B2 — Intermediário', en: 'B2 — Intermediate', es: 'B2 — Intermedio' },
  },
  {
    language: { pt: 'Inglês', en: 'English', es: 'Inglés' },
    level: {
      pt: 'A2–B1 — Intermediário inicial',
      en: 'A2–B1 — Lower intermediate',
      es: 'A2–B1 — Intermedio inicial',
    },
  },
  {
    language: { pt: 'Árabe', en: 'Arabic', es: 'Árabe' },
    level: { pt: 'A1 — Básico', en: 'A1 — Basic', es: 'A1 — Básico' },
  },
] satisfies Array<{ language: LocalizedText; level: LocalizedText }>;

export const socialLinks = {
  github: 'https://github.com/OmarFLK',
  linkedin: 'https://www.linkedin.com/in/omar-saliba-28b870230/',
  whatsapp: 'https://wa.me/5511948485194',
  behance: 'https://www.behance.net/flokuz',
  drive: 'https://drive.google.com/drive/folders/1CNYAGPPW9hi4tpLE_kTS-E526aJl8nvN?usp=sharing',
  email: 'mailto:contatoomarabdalah@gmail.com',
};

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale];
}
