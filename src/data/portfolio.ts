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
  metaLabel?: LocalizedText;
  technologies: string[];
  links: ExternalLink[];
  localVideo?: string;
  outcome?: LocalizedText;
  status?: LocalizedText;
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

export interface ResultMetric {
  id: string;
  displayValue: LocalizedText;
  accessibleLabel: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  counter?: {
    target: number;
    prefix: LocalizedText;
    suffix: LocalizedText;
  };
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
      results: 'Resultados',
      experience: 'Experiência',
      skills: 'Ferramentas',
      education: 'Formação',
      contact: 'Contato',
    },
    menu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    skip: 'Pular para o conteúdo',
    heroEyebrow: 'Engenharia de IA · Dados · AWS',
    heroTitleTop: 'IA, dados e',
    heroTitleSelected: 'software',
    heroTitleBottom: 'em movimento.',
    heroLead:
      'Sou estudante de IA e Ciência de Dados na Mauá, estagiário na OneBox e consultor na Mauá Júnior. Construo APIs, automações e aplicações com IA — dos dados à infraestrutura.',
    heroStatus: 'Sempre aberto a uma boa conversa',
    heroAvailability: 'Projetos, ideias e problemas interessantes são bem-vindos.',
    heroProjects: 'Ver projetos',
    heroContact: 'Entrar em contato',
    heroResumePt: 'Baixar currículo',
    heroResumeEn: 'Resume EN',
    selectedLabel: 'objeto selecionado',
    aboutIndex: '03 / sobre',
    aboutTitle: 'Sobre',
    aboutBody:
      'Estudo Inteligência Artificial e Ciência de Dados no Instituto Mauá de Tecnologia. Minha base técnica veio do Senac Aclimação; hoje conecto estatística e álgebra linear à construção de software.',
    aboutBody2:
      'Trabalho com automação e APIs na AWS na OneBox, e com soluções para empresas na Mauá Júnior. Meu foco é engenharia de IA: preparar dados, integrar modelos, avaliar resultados e operar os sistemas por trás deles.',
    aboutNote: 'Perguntar → rascunhar → construir → testar de verdade',
    projectsIndex: '01 / projetos',
    projectsTitle: 'Projetos selecionados',
    projectsIntro:
      'Uma seleção de aplicações com IA, plataformas de dados e software em produção. O problema, minha contribuição e o estado de cada entrega.',
    projectCode: 'Código',
    projectLive: 'Abrir site',
    projectVideo: 'Ver demonstração',
    projectClose: 'Fechar demonstração',
    projectUnavailable: 'Sem site público por enquanto',
    resultsIndex: '02 / resultados',
    resultsEyebrow: 'DO CÓDIGO / PARA A OPERAÇÃO',
    resultsTitle: 'Resultados que viraram impacto real',
    resultsIntro:
      'Resultados de projetos e da experiência profissional. O contexto e o trabalho por trás de cada melhoria.',
    resultsLog: 'IMPACT.LOG / 05 RESULTADOS',
    experienceIndex: '04 / trajetória',
    experienceTitle: 'Experiência',
    experienceIntro:
      'Um recorte do que já construí, mantive e aprendi em cada contexto — do suporte técnico à IA e automação.',
    skillsIndex: '05 / ferramentas',
    skillsTitle: 'Uma stack, quatro frentes.',
    skillsIntro:
      'Tecnologias usadas em projetos e fundamentos que continuo aprofundando. QLoRA e adaptação de modelos fazem parte dos meus estudos atuais.',
    educationIndex: '06 / base',
    educationTitle: 'A base que continua crescendo',
    educationAcademic: 'Formação acadêmica',
    educationCerts: 'Certificações',
    educationLanguages: 'Idiomas',
    current: 'Em andamento',
    labIndex: '07 / laboratório',
    labTitle: 'Mais do meu trabalho',
    labBody: 'Outros projetos, estudos e referências que complementam esta seleção.',
    behance: 'Projetos no Behance',
    drive: 'Artigos no Drive',
    github: 'Laboratório no GitHub',
    contactIndex: '08 / próximo sinal',
    contactTitle: 'Vamos construir algo útil?',
    contactBody:
      'Para conversar sobre IA, dados, automação ou um projeto de software, me encontre por aqui.',
    contactEmail: 'Enviar e-mail',
    contactWhatsapp: 'Conversar no WhatsApp',
    socialLabel: 'Outros canais',
    backTop: 'Voltar ao topo',
    footerNote: 'Pensado, desenhado e colocado no ar por Omar Saliba.',
    rights: 'Todos os direitos reservados.',
    mediaDialogTitle: 'Demonstração do projeto',
  },
  en: {
    pageTitle: 'Omar Saliba — AI, automation, data and development',
    nav: {
      about: 'About',
      projects: 'Projects',
      results: 'Results',
      experience: 'Experience',
      skills: 'Toolkit',
      education: 'Education',
      contact: 'Contact',
    },
    menu: 'Open menu',
    closeMenu: 'Close menu',
    skip: 'Skip to content',
    heroEyebrow: 'AI Engineering · Data · AWS',
    heroTitleTop: 'AI, data and',
    heroTitleSelected: 'software',
    heroTitleBottom: 'in motion.',
    heroLead:
      'AI and Data Science student at Mauá, intern at OneBox and technology consultant at Mauá Júnior. I build APIs, automation and AI applications — from data to infrastructure.',
    heroStatus: 'Always up for a good conversation',
    heroAvailability: 'Projects, ideas, and interesting problems are all welcome.',
    heroProjects: 'View projects',
    heroContact: 'Get in touch',
    heroResumePt: 'Download CV · Portuguese',
    heroResumeEn: 'Resume in English',
    selectedLabel: 'selected object',
    aboutIndex: '03 / about',
    aboutTitle: 'About',
    aboutBody:
      'I study Artificial Intelligence and Data Science at Instituto Mauá de Tecnologia. My technical foundation started at Senac Aclimação; today I connect statistics and linear algebra to software engineering.',
    aboutBody2:
      'I work with automation and AWS APIs at OneBox, and business solutions at Mauá Júnior. My focus is AI engineering: preparing data, integrating models, evaluating results and operating the systems behind them.',
    aboutNote: 'Ask → sketch → build → test for real',
    projectsIndex: '01 / projects',
    projectsTitle: 'Selected projects',
    projectsIntro:
      'Selected AI applications, data platforms and production software. The problem, my contribution and the status of each delivery.',
    projectCode: 'Source code',
    projectLive: 'Open website',
    projectVideo: 'Watch demo',
    projectClose: 'Close demo',
    projectUnavailable: 'No public website yet',
    resultsIndex: '02 / results',
    resultsEyebrow: 'FROM CODE / TO OPERATIONS',
    resultsTitle: 'Results that created real impact',
    resultsIntro:
      'Results from projects and professional experience. The context and work behind each improvement.',
    resultsLog: 'IMPACT.LOG / 05 RESULTS',
    experienceIndex: '04 / journey',
    experienceTitle: 'Experience',
    experienceIntro:
      'A snapshot of what I have built, maintained, and learned along the way — from technical support to AI and automation.',
    skillsIndex: '05 / toolkit',
    skillsTitle: 'One stack, four areas.',
    skillsIntro:
      'Tools used in projects and foundations I continue to develop. QLoRA and model adaptation are part of my current studies.',
    educationIndex: '06 / foundation',
    educationTitle: 'A foundation that keeps growing',
    educationAcademic: 'Academic background',
    educationCerts: 'Certifications',
    educationLanguages: 'Languages',
    current: 'In progress',
    labIndex: '07 / laboratory',
    labTitle: 'More of my work',
    labBody: 'More projects, studies and references that complement this selection.',
    behance: 'Work on Behance',
    drive: 'Articles on Drive',
    github: 'Lab on GitHub',
    contactIndex: '08 / next signal',
    contactTitle: 'Let’s build something useful.',
    contactBody: 'Get in touch to talk about AI, data, automation or a software project.',
    contactEmail: 'Send an email',
    contactWhatsapp: 'Chat on WhatsApp',
    socialLabel: 'Other channels',
    backTop: 'Back to top',
    footerNote: 'Thought through, designed, and shipped by Omar Saliba.',
    rights: 'All rights reserved.',
    mediaDialogTitle: 'Project demonstration',
  },
  es: {
    pageTitle: 'Omar Saliba — IA, automatización, datos y desarrollo',
    nav: {
      about: 'Sobre mí',
      projects: 'Proyectos',
      results: 'Resultados',
      experience: 'Experiencia',
      skills: 'Herramientas',
      education: 'Formación',
      contact: 'Contacto',
    },
    menu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    skip: 'Saltar al contenido',
    heroEyebrow: 'Ingeniería de IA · Datos · AWS',
    heroTitleTop: 'IA, datos y',
    heroTitleSelected: 'software',
    heroTitleBottom: 'en movimiento.',
    heroLead:
      'Estudiante de IA y Ciencia de Datos en Mauá, pasante en OneBox y consultor en Mauá Júnior. Construyo APIs, automatizaciones y aplicaciones con IA, desde los datos hasta la infraestructura.',
    heroStatus: 'Siempre dispuesto a una buena conversación',
    heroAvailability: 'Los proyectos, las ideas y los problemas interesantes son bienvenidos.',
    heroProjects: 'Ver proyectos',
    heroContact: 'Entrar en contacto',
    heroResumePt: 'Descargar CV · Portugués',
    heroResumeEn: 'CV en inglés',
    selectedLabel: 'objeto seleccionado',
    aboutIndex: '03 / sobre mí',
    aboutTitle: 'Sobre mí',
    aboutBody:
      'Estudio Inteligencia Artificial y Ciencia de Datos en el Instituto Mauá de Tecnologia. Mi base técnica comenzó en Senac Aclimação; hoy conecto estadística y álgebra lineal con la ingeniería de software.',
    aboutBody2:
      'Trabajo con automatización y APIs en AWS en OneBox y soluciones empresariales en Mauá Júnior. Mi foco es ingeniería de IA: preparar datos, integrar modelos, evaluar resultados y operar los sistemas.',
    aboutNote: 'Preguntar → bosquejar → construir → probar de verdad',
    projectsIndex: '01 / proyectos',
    projectsTitle: 'Proyectos seleccionados',
    projectsIntro:
      'Aplicaciones con IA, plataformas de datos y software en producción. El problema, mi contribución y el estado de cada entrega.',
    projectCode: 'Código',
    projectLive: 'Abrir sitio',
    projectVideo: 'Ver demostración',
    projectClose: 'Cerrar demostración',
    projectUnavailable: 'Sin sitio público por ahora',
    resultsIndex: '02 / resultados',
    resultsEyebrow: 'DEL CÓDIGO / A LA OPERACIÓN',
    resultsTitle: 'Resultados que generaron impacto real',
    resultsIntro:
      'Resultados de proyectos y experiencia profesional. El contexto y el trabajo detrás de cada mejora.',
    resultsLog: 'IMPACT.LOG / 05 RESULTADOS',
    experienceIndex: '04 / trayectoria',
    experienceTitle: 'Experiencia',
    experienceIntro:
      'Un recorrido por lo que construí, mantuve y aprendí en cada etapa: desde soporte técnico hasta IA y automatización.',
    skillsIndex: '05 / herramientas',
    skillsTitle: 'Un stack, cuatro áreas.',
    skillsIntro:
      'Herramientas de los proyectos y fundamentos que sigo profundizando. QLoRA y adaptación de modelos forman parte de mis estudios actuales.',
    educationIndex: '06 / base',
    educationTitle: 'Una base que sigue creciendo',
    educationAcademic: 'Formación académica',
    educationCerts: 'Certificaciones',
    educationLanguages: 'Idiomas',
    current: 'En curso',
    labIndex: '07 / laboratorio',
    labTitle: 'Más de mi trabajo',
    labBody: 'Otros proyectos, estudios y referencias que complementan esta selección.',
    behance: 'Proyectos en Behance',
    drive: 'Artículos en Drive',
    github: 'Laboratorio en GitHub',
    contactIndex: '08 / próxima señal',
    contactTitle: '¿Construimos algo útil?',
    contactBody: 'Hablemos de IA, datos, automatización o un proyecto de software.',
    contactEmail: 'Enviar correo',
    contactWhatsapp: 'Hablar por WhatsApp',
    socialLabel: 'Otros canales',
    backTop: 'Volver arriba',
    footerNote: 'Pensado, diseñado y publicado por Omar Saliba.',
    rights: 'Todos los derechos reservados.',
    mediaDialogTitle: 'Demostración del proyecto',
  },
} as const;

export const resultMetrics: ResultMetric[] = [
  {
    id: 'avenida-inventory',
    displayValue: {
      pt: '1,5 dia → 2h',
      en: '1.5 days → 2h',
      es: '1,5 días → 2h',
    },
    accessibleLabel: {
      pt: 'Leitura completa do estoque: de um dia e meio para duas horas.',
      en: 'Full inventory reading: from one and a half days to two hours.',
      es: 'Lectura completa del inventario: de un día y medio a dos horas.',
    },
    title: {
      pt: 'ERP · Avenida Tintas',
      en: 'ERP · Avenida Tintas',
      es: 'ERP · Avenida Tintas',
    },
    description: {
      pt: 'Com o ERP que desenvolvi, a leitura de 100% do estoque da Avenida Tintas passou de um dia e meio para cerca de duas horas.',
      en: 'With the ERP I developed, reading the entire Avenida Tintas inventory went from one and a half days to about two hours.',
      es: 'Con el ERP que desarrollé, la lectura del 100% del inventario de Avenida Tintas pasó de un día y medio a unas dos horas.',
    },
  },
  {
    id: 'onebox-login',
    displayValue: {
      pt: '−72,7%',
      en: '−72.7%',
      es: '−72,7%',
    },
    accessibleLabel: {
      pt: 'Redução de 72,7% no tempo de login: de 55 para 15 segundos.',
      en: '72.7% less login time: from 55 to 15 seconds.',
      es: 'Reducción del 72,7% en el tiempo de login: de 55 a 15 segundos.',
    },
    title: {
      pt: 'Login · OneBox / DNE',
      en: 'Login · OneBox / DNE',
      es: 'Login · OneBox / DNE',
    },
    description: {
      pt: 'No estágio, analisei e otimizei queries SQL para reduzir o login de 55 para 15 segundos: 40 segundos a menos por acesso.',
      en: 'During my internship, I analyzed and optimized SQL queries to reduce login time from 55 to 15 seconds: 40 seconds saved per login.',
      es: 'Durante las prácticas, analicé y optimicé consultas SQL para reducir el login de 55 a 15 segundos: 40 segundos menos por acceso.',
    },
  },
  {
    id: 'ai-savings',
    displayValue: {
      pt: '3 dias → 1h',
      en: '3 days → 1h',
      es: '3 días → 1h',
    },
    accessibleLabel: {
      pt: 'Prospecção automatizada',
      en: 'Automated prospecting',
      es: 'Prospección automatizada',
    },
    title: {
      pt: 'Prospecção automatizada',
      en: 'Automated prospecting',
      es: 'Prospección automatizada',
    },
    description: {
      pt: 'Automação em Python, Selenium e pandas substituiu três dias de trabalho manual por cerca de uma hora.',
      en: 'Python, Selenium and pandas replaced three days of manual work with about one hour.',
      es: 'Python, Selenium y pandas sustituyeron tres días de trabajo manual por cerca de una hora.',
    },
  },
  {
    id: 'efficiency',
    displayValue: {
      pt: '600+',
      en: '600+',
      es: '600+',
    },
    accessibleLabel: {
      pt: 'Leads consolidados',
      en: 'Consolidated leads',
      es: 'Leads consolidados',
    },
    title: {
      pt: 'Leads consolidados',
      en: 'Consolidated leads',
      es: 'Leads consolidados',
    },
    description: {
      pt: 'Dados de prospecção organizados em planilha pelo mesmo fluxo de automação. Resultado registrado no currículo.',
      en: 'Prospecting data organized in a spreadsheet by the same automation workflow. Result documented in my CV.',
      es: 'Datos de prospección organizados en una hoja con el mismo flujo. Resultado documentado en el CV.',
    },
  },
  {
    id: 'manual-weeks',
    displayValue: {
      pt: '91.108',
      en: '91,108',
      es: '91.108',
    },
    accessibleLabel: {
      pt: 'Registros de viagens',
      en: 'Trip records',
      es: 'Registros de viajes',
    },
    title: {
      pt: 'Registros de viagens',
      en: 'Trip records',
      es: 'Registros de viajes',
    },
    description: {
      pt: 'Base canônica preservada pelo importador SEMOB, com deduplicação e rastreabilidade das fontes.',
      en: 'Canonical dataset preserved by the SEMOB importer, with deduplication and source traceability.',
      es: 'Base canónica preservada por el importador SEMOB, con deduplicación y trazabilidad.',
    },
  },
];

export const projects: Project[] = [
  {
    id: 'maua-ia',
    index: '01',
    title: {
      pt: 'MAUA IA — Analista de mobilidade',
      en: 'MAUA AI — Mobility analyst',
      es: 'MAUA IA — Analista de movilidad',
    },
    description: {
      pt: 'Consultar dados de transporte em linguagem natural sem abrir mão da precisão. Integrei Gemma 3 27B, RAG local e consultas validadas em DuckDB, com contexto separado por usuário.',
      en: 'Public transport analysis in natural language, with accuracy in mind. I integrated Gemma 3 27B, local RAG and validated DuckDB queries, with isolated user context.',
      es: 'Análisis de transporte en lenguaje natural. Integré Gemma 3 27B, RAG local y consultas validadas en DuckDB, con contexto aislado por usuario.',
    },
    status: {
      pt: 'IA + dados',
      en: 'AI + data',
      es: 'IA + datos',
    },
    outcome: {
      pt: '10 tabelas canônicas em Parquet. Pipeline QLoRA preparado; treinamento ainda não executado.',
      en: '10 canonical Parquet tables. QLoRA pipeline prepared; training has not been run.',
      es: '10 tablas canónicas en Parquet. Pipeline QLoRA preparado; entrenamiento aún no ejecutado.',
    },
    technologies: ['Python', 'FastAPI', 'React', 'Gemma', 'RAG', 'DuckDB'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/MAUA_IA',
        kind: 'github',
      },
    ],
    visual: 'terminal',
  },
  {
    id: 'pendi',
    index: '02',
    title: {
      pt: 'Pendi — Cuidado que aproxima',
      en: 'Pendi — Care that connects',
      es: 'Pendi — Cuidado que conecta',
    },
    description: {
      pt: 'Projeto vencedor em equipe do Hackathon IMT–São Camilo. Desenvolvi fluxos autenticados, APIs e conversas com IA e RAG por perfil para aproximar famílias e equipes no cuidado oncológico pediátrico.',
      en: 'Team-winning project at the IMT–São Camilo Hackathon. I developed authenticated flows, APIs and role-aware AI conversations with RAG for families and pediatric oncology care teams.',
      es: 'Proyecto ganador en equipo del Hackathon IMT–São Camilo. Desarrollé flujos autenticados, APIs y conversaciones con IA y RAG por perfil para familias y equipos de oncología pediátrica.',
    },
    status: {
      pt: 'Vencedor de hackathon',
      en: 'Hackathon winner',
      es: 'Ganador de hackathon',
    },
    outcome: {
      pt: 'Demonstração acadêmica publicada com dados fictícios. Não validado para uso clínico.',
      en: 'Published academic demonstration with fictional data. Not validated for clinical use.',
      es: 'Demostración académica publicada con datos ficticios. No validado para uso clínico.',
    },
    technologies: ['React', 'FastAPI', 'Gemma', 'RAG', 'PostgreSQL'],
    links: [
      {
        label: 'Demo',
        href: 'https://hackatongamifica-o.vercel.app',
        kind: 'live',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/hackaton_gamifica-o',
        kind: 'github',
      },
    ],
    visual: 'paper',
  },
  {
    id: 'semob',
    index: '03',
    title: {
      pt: 'SEMOB — Operação de transporte',
      en: 'SEMOB — Transport operations',
      es: 'SEMOB — Operación de transporte',
    },
    description: {
      pt: 'Dados operacionais de São Caetano do Sul em um portal com filtros, relatórios e exportações. Atuei no app Flutter, na API Dart e na importação versionada, com PostgreSQL para identidade e MongoDB para transporte.',
      en: 'São Caetano do Sul transport data in a portal with filters, reports and exports. I worked on the Flutter app, Dart API and versioned imports, with PostgreSQL for identity and MongoDB for transport.',
      es: 'Datos de transporte de São Caetano do Sul en un portal con filtros, informes y exportaciones. Trabajé en Flutter, API Dart e importación versionada, con PostgreSQL y MongoDB.',
    },
    status: {
      pt: 'Plataforma de dados',
      en: 'Data platform',
      es: 'Plataforma de datos',
    },
    outcome: {
      pt: '91.108 registros de viagens preservados. Ponte para IA preparada; conexão de produção depende do contrato da API.',
      en: '91,108 trip records preserved. AI bridge prepared; production connection awaits the API contract.',
      es: '91.108 registros de viajes preservados. Puente de IA preparado; conexión de producción pendiente del contrato de API.',
    },
    technologies: ['Flutter', 'Dart', 'PostgreSQL', 'MongoDB', 'ETL'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/Projeto_Integrador_SEMOB',
        kind: 'github',
      },
    ],
    visual: 'grid',
  },
  {
    id: 'avenida-tintas',
    index: '04',
    title: {
      pt: 'Avenida Tintas — Estoque e ERP',
      en: 'Avenida Tintas — Inventory & ERP',
      es: 'Avenida Tintas — Inventario y ERP',
    },
    description: {
      pt: 'Notas fiscais, estoque e integrações com ERP em uma única solução. Desenvolvi o sistema integralmente e mantenho a aplicação e sua infraestrutura na nuvem.',
      en: 'Invoices, inventory and ERP integrations in one solution. I developed the complete system and maintain the application and its cloud infrastructure.',
      es: 'Facturas, inventario e integraciones ERP en una solución. Desarrollé el sistema completo y mantengo la aplicación y su infraestructura en la nube.',
    },
    status: {
      pt: 'Em produção — código privado',
      en: 'In production — private source',
      es: 'En producción — código privado',
    },
    outcome: {
      pt: 'Em produção na Avenida Tintas: leitura completa do estoque de 1 dia e meio para cerca de 2 horas. Código privado.',
      en: 'In production at Avenida Tintas: full inventory reading from 1.5 days to about 2 hours. Private source.',
      es: 'En producción en Avenida Tintas: lectura completa del inventario de 1,5 días a unas 2 horas. Código privado.',
    },
    technologies: ['Python', 'JavaScript', 'MySQL', 'REST APIs'],
    links: [],
    visual: 'ledger',
  },
  {
    id: 'tech-hub',
    index: '05',
    title: {
      pt: 'Tech Hub — IA e infraestrutura AWS',
      en: 'Tech Hub — AI & AWS infrastructure',
      es: 'Tech Hub — IA e infraestructura AWS',
    },
    description: {
      pt: 'Hub tecnológico da Mauá Júnior planejado para conectar agentes de IA, memória organizacional com RAG e fluxos automatizados em infraestrutura AWS.',
      en: 'Mauá Júnior technology hub planned to connect AI agents, organizational memory with RAG and automated workflows on AWS infrastructure.',
      es: 'Hub tecnológico de Mauá Júnior previsto para conectar agentes de IA, memoria organizacional con RAG y flujos automatizados en infraestructura AWS.',
    },
    status: {
      pt: 'Em desenvolvimento',
      en: 'In development',
      es: 'En desarrollo',
    },
    outcome: {
      pt: 'Planejamento definido; implementação pendente. Escopo previsto: orquestração de agentes, RAG, AWS e CI/CD.',
      en: 'Planning defined; implementation pending. Planned scope: agent orchestration, RAG, AWS and CI/CD.',
      es: 'Planificación definida; implementación pendiente. Alcance previsto: orquestación de agentes, RAG, AWS y CI/CD.',
    },
    metaLabel: { pt: 'Stack prevista', en: 'Planned stack', es: 'Stack previsto' },
    technologies: ['AI Agents', 'RAG', 'AWS', 'CI/CD'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/mjr-techhub-ai-orchestration-cloud',
        kind: 'github',
      },
    ],
    visual: 'grid',
  },
  {
    id: 'pricing',
    index: '06',
    title: {
      pt: 'Calculadora de precificação — Mauá Júnior',
      en: 'Pricing calculator — Mauá Júnior',
      es: 'Calculadora de precios — Mauá Júnior',
    },
    description: {
      pt: 'Aplicação para simular preços de projetos a partir de horas, custos, margem e complexidade. Desenvolvi a integração entre interface, regras de negócio e um assistente de IA para apoiar a decisão comercial.',
      en: 'An application to simulate project prices from hours, costs, margin and complexity. I developed the integration between the interface, business rules and an AI assistant to support commercial decisions.',
      es: 'Aplicación para simular precios de proyectos según horas, costes, margen y complejidad. Desarrollé la integración entre interfaz, reglas de negocio y un asistente de IA para apoyar decisiones comerciales.',
    },
    status: {
      pt: 'MVP funcional',
      en: 'Functional MVP',
      es: 'MVP funcional',
    },
    outcome: {
      pt: 'Memória de cálculo auditável, referência histórica por mediana e integração com monday.com. IA como apoio à análise de escopo e preço.',
      en: 'Auditable calculations, historical median references and monday.com integration. AI supports scope and pricing analysis.',
      es: 'Cálculos auditables, referencias históricas por mediana e integración con monday.com. IA para apoyar el análisis de alcance y precio.',
    },
    technologies: ['React', 'TypeScript', 'Flask', 'PostgreSQL', 'OpenAI'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/OmarFLK/calculadoraPrecificacaoMJR',
        kind: 'github',
      },
    ],
    visual: 'ledger',
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
    period: { pt: 'jul/2026 — atual', en: 'Jul 2026 — present', es: 'jul/2026 — actual' },
    description: {
      pt: 'No estágio, trabalho com IA e automação dentro de sistemas que já precisam funcionar no mundo real. Uso serviços da AWS, Java, Python e FastAPI para criar e integrar APIs REST; também mantenho sistemas, investigo e corrijo bugs e trabalho com MySQL e PostgreSQL.',
      en: 'In my internship, I work with AI and automation in systems that already need to perform in the real world. I use AWS services, Java, Python, and FastAPI to build and integrate REST APIs; I also maintain systems, investigate and fix bugs, and work with MySQL and PostgreSQL.',
      es: 'En mis prácticas, trabajo con IA y automatización en sistemas que ya tienen que funcionar en el mundo real. Uso servicios de AWS, Java, Python y FastAPI para crear e integrar APIs REST; también mantengo sistemas, investigo y corrijo errores, y trabajo con MySQL y PostgreSQL.',
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
    period: { pt: 'abr/2026 — atual', en: 'Apr 2026 — present', es: 'abr/2026 — actual' },
    description: {
      pt: 'Na Mauá Júnior, transformo necessidades de empresas parceiras em entregas práticas: aplicações web, dashboards, scripts, análises e automações. Também experimento com redes neurais e LLMs quando elas realmente fazem sentido para o problema.',
      en: 'At Mauá Júnior, I turn partner companies’ needs into practical deliverables: web applications, dashboards, scripts, analysis, and automations. I also experiment with neural networks and LLMs when they genuinely fit the problem.',
      es: 'En Mauá Júnior, convierto las necesidades de empresas asociadas en entregas prácticas: aplicaciones web, dashboards, scripts, análisis y automatizaciones. También experimento con redes neuronales y LLMs cuando realmente encajan con el problema.',
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
      pt: 'Antes de atuar como consultor, passei por marketing, financeiro e projetos para entender a empresa júnior por dentro. Foi onde ganhei mais organização, comunicação e experiência de trabalhar em equipe.',
      en: 'Before becoming a consultant, I rotated through marketing, finance, and projects to understand how the junior company worked from the inside. That was where I strengthened my organization, communication, and teamwork.',
      es: 'Antes de trabajar como consultor, pasé por marketing, finanzas y proyectos para entender la empresa júnior desde dentro. Allí fortalecí mi organización, comunicación y trabajo en equipo.',
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
      pt: 'Uma experiência bem mão na massa: montei, configurei e fiz manutenção em computadores e notebooks, atendi clientes e diagnostiquei problemas de hardware e software.',
      en: 'A very hands-on role: I assembled, configured, and maintained computers and notebooks, supported customers, and diagnosed hardware and software issues.',
      es: 'Una experiencia muy práctica: monté, configuré y mantuve computadoras y notebooks, atendí clientes y diagnostiqué problemas de hardware y software.',
    },
    technologies: ['Hardware', 'Software', 'Suporte técnico'],
  },
];

export const capabilityGroups = [
  {
    id: 'ai',
    label: {
      pt: 'IA e aprendizado de máquina',
      en: 'AI & machine learning',
      es: 'IA y aprendizaje automático',
    },
    items: ['LLMs', 'RAG', 'Embeddings', 'Gemma / Qwen', 'scikit-learn', 'QLoRA (estudo)'],
  },
  {
    id: 'data',
    label: {
      pt: 'Dados e fundamentos',
      en: 'Data & foundations',
      es: 'Datos y fundamentos',
    },
    items: [
      'SQL',
      'Pandas / NumPy',
      'DuckDB / Parquet',
      'Estatística',
      'Álgebra linear',
      'PostgreSQL / MongoDB',
    ],
  },
  {
    id: 'backend',
    label: {
      pt: 'Backend e aplicações',
      en: 'Backend & applications',
      es: 'Backend y aplicaciones',
    },
    items: ['Python', 'Java', 'FastAPI', 'REST APIs', 'React', 'Flutter'],
  },
  {
    id: 'delivery',
    label: {
      pt: 'AWS e infraestrutura',
      en: 'AWS & infrastructure',
      es: 'AWS e infraestructura',
    },
    items: ['ECS / EC2', 'Lambda', 'S3 / SQS', 'RDS', 'CloudWatch', 'Docker / CI/CD'],
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
  'AWS — Introdução à Engenharia de IA',
  'IBM Web Development Fundamentals',
  'IBM Introduction to Cloud Computing',
  'IMT Data Preparation and Visualization for Business Analytics — 40h · 1º semestre de 2026',
  'IMT Engenharia de Software na Prática — 40h · 1º semestre de 2026',
  'IMT A Bolsa de Valores no Brasil e seus ativos financeiros — 40h · 1º semestre de 2026',
  'IMT Python para Ciência de Dados — 40h · 2º semestre de 2025',
  'IMT Power BI — Básico — 40h · 2º semestre de 2025',
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
      pt: 'B1 — Intermediário',
      en: 'B1 — Intermediate',
      es: 'B1 — Intermedio',
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

const technologyLabels: Record<string, LocalizedText> = {
  'Open source': { pt: 'Código aberto', en: 'Open source', es: 'Código abierto' },
  Documentação: { pt: 'Documentação', en: 'Documentation', es: 'Documentación' },
  Colaboração: { pt: 'Colaboração', en: 'Collaboration', es: 'Colaboración' },
  'IA investigativa': {
    pt: 'IA investigativa',
    en: 'Investigative AI',
    es: 'IA investigativa',
  },
  'Análise de afirmações': {
    pt: 'Análise de afirmações',
    en: 'Claim analysis',
    es: 'Análisis de afirmaciones',
  },
  'Revisão de fontes': {
    pt: 'Revisão de fontes',
    en: 'Source review',
    es: 'Revisión de fuentes',
  },
  'Sinais de manipulação': {
    pt: 'Sinais de manipulação',
    en: 'Manipulation signals',
    es: 'Señales de manipulación',
  },
  'Gestão de fornecedores': {
    pt: 'Gestão de fornecedores',
    en: 'Supplier management',
    es: 'Gestión de proveedores',
  },
  'Listas comerciais': {
    pt: 'Listas comerciais',
    en: 'Supplier lists',
    es: 'Listas de proveedores',
  },
  'Operação do lojista': {
    pt: 'Operação do lojista',
    en: 'Retail operations',
    es: 'Operación minorista',
  },
  'Produto para varejo': {
    pt: 'Produto para varejo',
    en: 'Retail product',
    es: 'Producto para retail',
  },
  Projetos: { pt: 'Projetos', en: 'Projects', es: 'Proyectos' },
  Comunicação: { pt: 'Comunicação', en: 'Communication', es: 'Comunicación' },
  Organização: { pt: 'Organização', en: 'Organization', es: 'Organización' },
  'Suporte técnico': {
    pt: 'Suporte técnico',
    en: 'Technical support',
    es: 'Soporte técnico',
  },
  'Redes neurais': { pt: 'Redes neurais', en: 'Neural networks', es: 'Redes neuronales' },
  'Automação de processos': {
    pt: 'Automação de processos',
    en: 'Process automation',
    es: 'Automatización de procesos',
  },
  'Análise de texto': {
    pt: 'Análise de texto',
    en: 'Text analysis',
    es: 'Análisis de texto',
  },
  'Integração de APIs': {
    pt: 'Integração de APIs',
    en: 'API integration',
    es: 'Integración de APIs',
  },
  'Preparação de dados': {
    pt: 'Preparação de dados',
    en: 'Data preparation',
    es: 'Preparación de datos',
  },
  'Visualização de dados': {
    pt: 'Visualização de dados',
    en: 'Data visualization',
    es: 'Visualización de datos',
  },
  'Interfaces responsivas': {
    pt: 'Interfaces responsivas',
    en: 'Responsive interfaces',
    es: 'Interfaces adaptables',
  },
  'Cloud computing': {
    pt: 'Computação em nuvem',
    en: 'Cloud computing',
    es: 'Computación en la nube',
  },
  'Diagnóstico e correção de bugs': {
    pt: 'Diagnóstico e correção de bugs',
    en: 'Bug diagnosis and fixes',
    es: 'Diagnóstico y corrección de errores',
  },
  'Manutenção de sistemas': {
    pt: 'Manutenção de sistemas',
    en: 'System maintenance',
    es: 'Mantenimiento de sistemas',
  },
  'Documentação técnica': {
    pt: 'Documentação técnica',
    en: 'Technical documentation',
    es: 'Documentación técnica',
  },
};

export function localize(value: LocalizedText, locale: Locale): string {
  return value[locale];
}

export function localizeTechnology(value: string, locale: Locale): string {
  return technologyLabels[value]?.[locale] ?? value;
}
