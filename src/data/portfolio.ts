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
  id: 'ai-savings' | 'efficiency' | 'manual-weeks';
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
    heroEyebrow: 'Selected work / 2026',
    heroTitleTop: 'IA, dados e',
    heroTitleSelected: 'software',
    heroTitleBottom: 'em movimento.',
    heroLead:
      'Curso Inteligência Artificial e Ciência de Dados e gosto de pegar problemas meio bagunçados e transformar em sistemas que funcionam — automações, APIs e produtos digitais feitos com lógica, cuidado e curiosidade.',
    heroStatus: 'Sempre aberto a uma boa conversa',
    heroAvailability: 'Projetos, ideias e problemas interessantes são bem-vindos.',
    heroProjects: 'Explorar projetos',
    heroContact: 'Entrar em contato',
    heroResumePt: 'Currículo PT-BR',
    heroResumeEn: 'Resume EN',
    selectedLabel: 'objeto selecionado',
    aboutIndex: '01 / contexto',
    aboutTitle: 'Gosto de entender como as coisas funcionam — e depois fazer funcionar melhor.',
    aboutBody:
      'Minha base veio do Ensino Médio Técnico em TI do Senac Aclimação. Hoje curso Inteligência Artificial e Ciência de Dados no Instituto Mauá de Tecnologia e, no dia a dia, misturo desenvolvimento full stack, automação, dados e experimentos com IA.',
    aboutBody2:
      'Eu gosto da parte em que o problema ainda está meio aberto: faço perguntas, rascunho uma solução, construo, testo e vou ajustando até ela ficar clara e útil.',
    aboutNote: 'Perguntar → rascunhar → construir → testar de verdade',
    projectsIndex: '02 / provas',
    projectsTitle: 'Projetos selecionados',
    projectsIntro:
      'Aqui estão alguns projetos em que fui do “será que dá?” até o código rodando — de automações em Python a aplicações full stack.',
    projectCode: 'Código',
    projectLive: 'Abrir site',
    projectVideo: 'Ver demonstração',
    projectClose: 'Fechar demonstração',
    projectUnavailable: 'Sem site público por enquanto',
    resultsIndex: '03 / impacto',
    resultsEyebrow: 'DO CÓDIGO / PARA A OPERAÇÃO',
    resultsTitle: 'Resultados que viraram impacto real',
    resultsIntro:
      'Código só vale o esforço quando melhora o trabalho de alguém. Estes três resultados saíram da tela e chegaram à operação.',
    resultsLog: 'IMPACT.LOG / 03 RESULTADOS REAIS',
    experienceIndex: '04 / trajetória',
    experienceTitle: 'Experiência, na prática.',
    experienceIntro:
      'Um recorte do que já construí, mantive e aprendi em cada contexto — do suporte técnico à IA e automação.',
    skillsIndex: '05 / ferramentas',
    skillsTitle: 'Ferramentas que entram em jogo',
    skillsIntro:
      'Não coleciono tecnologia por nome. Escolho a stack pelo problema, pelo contexto e pelo que precisa continuar funcionando depois.',
    educationIndex: '06 / base',
    educationTitle: 'A base que continua crescendo',
    educationAcademic: 'Formação acadêmica',
    educationCerts: 'Certificações',
    educationLanguages: 'Idiomas',
    current: 'Em andamento',
    labIndex: '07 / laboratório',
    labTitle: 'Coisas que não cabem só em um card',
    labBody:
      'Dashboards, estudos visuais, artigos e código aberto que fazem parte do mesmo laboratório — só vivem em outros cantos da internet.',
    behance: 'Projetos no Behance',
    drive: 'Artigos no Drive',
    github: 'Laboratório no GitHub',
    contactIndex: '08 / próximo sinal',
    contactTitle: 'Tem um problema difícil, repetitivo ou simplesmente interessante?',
    contactBody:
      'Se envolver IA, automação, dados, APIs ou produto digital, provavelmente vamos ter assunto. Me chama e a gente entende o resto.',
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
    heroEyebrow: 'Selected work / 2026',
    heroTitleTop: 'AI, data and',
    heroTitleSelected: 'software',
    heroTitleBottom: 'in motion.',
    heroLead:
      'I study Artificial Intelligence and Data Science, and I like taking messy problems and turning them into systems that work — automations, APIs, and digital products built with logic, care, and curiosity.',
    heroStatus: 'Always up for a good conversation',
    heroAvailability: 'Projects, ideas, and interesting problems are all welcome.',
    heroProjects: 'Explore projects',
    heroContact: 'Get in touch',
    heroResumePt: 'CV in Portuguese',
    heroResumeEn: 'Resume in English',
    selectedLabel: 'selected object',
    aboutIndex: '01 / context',
    aboutTitle: 'I like figuring out how things work — then making them work better.',
    aboutBody:
      'My foundation came from the IT technical high school program at Senac Aclimação. Today, I study Artificial Intelligence and Data Science at Instituto Mauá de Tecnologia while working across full stack development, automation, data, and AI experiments.',
    aboutBody2:
      'I enjoy the stage where the problem is still open-ended: I ask questions, sketch a solution, build, test, and keep refining it until it feels clear and useful.',
    aboutNote: 'Ask → sketch → build → test for real',
    projectsIndex: '02 / evidence',
    projectsTitle: 'Selected projects',
    projectsIntro:
      'A few projects where I went from “could this work?” to working code — from Python automations to full stack applications.',
    projectCode: 'Source code',
    projectLive: 'Open website',
    projectVideo: 'Watch demo',
    projectClose: 'Close demo',
    projectUnavailable: 'No public website yet',
    resultsIndex: '03 / impact',
    resultsEyebrow: 'FROM CODE / TO OPERATIONS',
    resultsTitle: 'Results that created real impact',
    resultsIntro:
      'Code is worth the effort when it makes someone’s work better. These three results made it past the screen and into day-to-day operations.',
    resultsLog: 'IMPACT.LOG / 03 REAL RESULTS',
    experienceIndex: '04 / journey',
    experienceTitle: 'Experience, in practice.',
    experienceIntro:
      'A snapshot of what I have built, maintained, and learned along the way — from technical support to AI and automation.',
    skillsIndex: '05 / toolkit',
    skillsTitle: 'Tools I bring into the mix',
    skillsIntro:
      'I do not collect tools just for the name. I choose a stack around the problem, the context, and what needs to keep working afterwards.',
    educationIndex: '06 / foundation',
    educationTitle: 'A foundation that keeps growing',
    educationAcademic: 'Academic background',
    educationCerts: 'Certifications',
    educationLanguages: 'Languages',
    current: 'In progress',
    labIndex: '07 / laboratory',
    labTitle: 'Work that does not fit into a single card',
    labBody:
      'Dashboards, visual studies, articles, and open-source code from the same lab — they just live in other corners of the internet.',
    behance: 'Work on Behance',
    drive: 'Articles on Drive',
    github: 'Lab on GitHub',
    contactIndex: '08 / next signal',
    contactTitle: 'Got a problem that is difficult, repetitive, or just plain interesting?',
    contactBody:
      'If it involves AI, automation, data, APIs, or a digital product, we will probably have plenty to talk about. Send me a message and we can figure out the rest.',
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
    heroEyebrow: 'Selected work / 2026',
    heroTitleTop: 'IA, datos y',
    heroTitleSelected: 'software',
    heroTitleBottom: 'en movimiento.',
    heroLead:
      'Estudio Inteligencia Artificial y Ciencia de Datos, y me gusta tomar problemas algo desordenados y convertirlos en sistemas que funcionan: automatizaciones, APIs y productos digitales hechos con lógica, cuidado y curiosidad.',
    heroStatus: 'Siempre dispuesto a una buena conversación',
    heroAvailability: 'Los proyectos, las ideas y los problemas interesantes son bienvenidos.',
    heroProjects: 'Explorar proyectos',
    heroContact: 'Entrar en contacto',
    heroResumePt: 'CV en portugués',
    heroResumeEn: 'CV en inglés',
    selectedLabel: 'objeto seleccionado',
    aboutIndex: '01 / contexto',
    aboutTitle: 'Me gusta entender cómo funcionan las cosas y después hacer que funcionen mejor.',
    aboutBody:
      'Construí mi base en la secundaria técnica en TI de Senac Aclimação. Hoy estudio Inteligencia Artificial y Ciencia de Datos en el Instituto Mauá de Tecnologia mientras trabajo con desarrollo full stack, automatización, datos y experimentos con IA.',
    aboutBody2:
      'Me gusta la etapa en la que el problema todavía está abierto: hago preguntas, bosquejo una solución, construyo, pruebo y la voy afinando hasta que quede clara y útil.',
    aboutNote: 'Preguntar → bosquejar → construir → probar de verdad',
    projectsIndex: '02 / pruebas',
    projectsTitle: 'Proyectos seleccionados',
    projectsIntro:
      'Algunos proyectos en los que pasé de “¿será que funciona?” al código en marcha: desde automatizaciones en Python hasta aplicaciones full stack.',
    projectCode: 'Código',
    projectLive: 'Abrir sitio',
    projectVideo: 'Ver demostración',
    projectClose: 'Cerrar demostración',
    projectUnavailable: 'Sin sitio público por ahora',
    resultsIndex: '03 / impacto',
    resultsEyebrow: 'DEL CÓDIGO / A LA OPERACIÓN',
    resultsTitle: 'Resultados que generaron impacto real',
    resultsIntro:
      'El código vale el esfuerzo cuando mejora el trabajo de alguien. Estos tres resultados salieron de la pantalla y llegaron a la operación.',
    resultsLog: 'IMPACT.LOG / 03 RESULTADOS REALES',
    experienceIndex: '04 / trayectoria',
    experienceTitle: 'Experiencia, en la práctica.',
    experienceIntro:
      'Un recorrido por lo que construí, mantuve y aprendí en cada etapa: desde soporte técnico hasta IA y automatización.',
    skillsIndex: '05 / herramientas',
    skillsTitle: 'Herramientas que entran en juego',
    skillsIntro:
      'No colecciono tecnologías solo por el nombre. Elijo la stack según el problema, el contexto y lo que tendrá que seguir funcionando después.',
    educationIndex: '06 / base',
    educationTitle: 'Una base que sigue creciendo',
    educationAcademic: 'Formación académica',
    educationCerts: 'Certificaciones',
    educationLanguages: 'Idiomas',
    current: 'En curso',
    labIndex: '07 / laboratorio',
    labTitle: 'Cosas que no caben en una sola tarjeta',
    labBody:
      'Dashboards, estudios visuales, artículos y código abierto del mismo laboratorio; simplemente viven en otros rincones de internet.',
    behance: 'Proyectos en Behance',
    drive: 'Artículos en Drive',
    github: 'Laboratorio en GitHub',
    contactIndex: '08 / próxima señal',
    contactTitle: '¿Tienes un problema difícil, repetitivo o simplemente interesante?',
    contactBody:
      'Si tiene que ver con IA, automatización, datos, APIs o un producto digital, seguramente tendremos de qué hablar. Escríbeme y vemos el resto.',
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
    id: 'ai-savings',
    displayValue: {
      pt: '≈ R$ 70 mil',
      en: '≈ R$ 70K',
      es: '≈ R$ 70 mil',
    },
    accessibleLabel: {
      pt: 'Aproximadamente setenta mil reais economizados em gastos com inteligência artificial.',
      en: 'Approximately seventy thousand Brazilian reais saved on AI expenses.',
      es: 'Aproximadamente setenta mil reales brasileños ahorrados en gastos de inteligencia artificial.',
    },
    title: {
      pt: 'Economizados em gastos com IA',
      en: 'Saved on AI expenses',
      es: 'Ahorrados en gastos de IA',
    },
    description: {
      pt: 'Revisei ferramentas, modelos e fluxos de IA para cortar desperdício sem baixar a régua das entregas.',
      en: 'I reviewed AI tools, models, and workflows to cut waste without lowering the bar for delivery.',
      es: 'Revisé herramientas, modelos y flujos de IA para reducir desperdicios sin comprometer la calidad de las entregas.',
    },
    counter: {
      target: 70,
      prefix: { pt: '≈ R$ ', en: '≈ R$ ', es: '≈ R$ ' },
      suffix: { pt: ' mil', en: 'K', es: ' mil' },
    },
  },
  {
    id: 'efficiency',
    displayValue: { pt: '+15%', en: '+15%', es: '+15%' },
    accessibleLabel: {
      pt: 'Quinze por cento de aumento na eficiência operacional.',
      en: 'Fifteen percent increase in operational efficiency.',
      es: 'Quince por ciento de aumento en la eficiencia operativa.',
    },
    title: {
      pt: 'De eficiência operacional',
      en: 'Operational efficiency',
      es: 'De eficiencia operativa',
    },
    description: {
      pt: 'Automatizei etapas repetitivas e construí sistemas que deram mais velocidade à operação e chegaram a um ganho de 15% em eficiência.',
      en: 'I automated repetitive steps and built systems that sped up operations, delivering a 15% gain in efficiency.',
      es: 'Automaticé etapas repetitivas y construí sistemas que aceleraron la operación, alcanzando una mejora del 15% en eficiencia.',
    },
    counter: {
      target: 15,
      prefix: { pt: '+', en: '+', es: '+' },
      suffix: { pt: '%', en: '%', es: '%' },
    },
  },
  {
    id: 'manual-weeks',
    displayValue: { pt: 'Semanas', en: 'Weeks', es: 'Semanas' },
    accessibleLabel: {
      pt: 'Semanas de trabalho manual poupadas.',
      en: 'Weeks of manual work saved.',
      es: 'Semanas de trabajo manual ahorradas.',
    },
    title: {
      pt: 'De trabalho manual poupadas',
      en: 'Of manual work saved',
      es: 'De trabajo manual ahorradas',
    },
    description: {
      pt: 'Troquei rotinas manuais demoradas por fluxos mais rápidos, organizados e confiáveis — semanas que deixaram de ser gastas no repetitivo.',
      en: 'I replaced slow manual routines with faster, more organized, and reliable flows — saving weeks that would otherwise have gone into repetitive work.',
      es: 'Reemplacé rutinas manuales lentas por flujos más rápidos, organizados y confiables: semanas que dejaron de perderse en tareas repetitivas.',
    },
  },
];

export const projects: Project[] = [
  {
    id: 'verithaz',
    index: '01',
    title: {
      pt: 'Verithaz — IA Investigativa',
      en: 'Verithaz — Investigative AI',
      es: 'Verithaz — IA Investigativa',
    },
    description: {
      pt: 'Uma IA investigativa que separa notícias em afirmações, revisa as fontes por trás delas e procura indícios de campanha ou manipulação. As estratégias da dialética erística descritas por Arthur Schopenhauer entram como lente crítica — não como atalho para um veredito automático.',
      en: 'An investigative AI that breaks news into individual claims, reviews the sources behind them, and looks for signs of campaigning or manipulation. The strategies of eristic dialectic described by Arthur Schopenhauer serve as a critical lens — not as a shortcut to an automatic verdict.',
      es: 'Una IA investigativa que separa noticias en afirmaciones, revisa las fuentes que las sustentan y busca indicios de campaña o manipulación. Las estrategias de la dialéctica erística descritas por Arthur Schopenhauer funcionan como lente crítica, no como atajo hacia un veredicto automático.',
    },
    metaLabel: { pt: 'FOCO', en: 'FOCUS', es: 'ENFOQUE' },
    technologies: [
      'IA investigativa',
      'Análise de afirmações',
      'Revisão de fontes',
      'Sinais de manipulação',
    ],
    links: [],
    visual: 'terminal',
  },
  {
    id: 'vira-price',
    index: '02',
    title: {
      pt: 'Vira Price',
      en: 'Vira Price',
      es: 'Vira Price',
    },
    description: {
      pt: 'Uma startup criada para ajudar lojistas a cuidar das listas de fornecedores com menos atrito. A ideia é deixar tudo organizado, fácil de consultar e simples de manter no corre do dia a dia.',
      en: 'A startup built to help retailers manage supplier lists with less friction. The idea is to keep everything organized, easy to consult, and simple to maintain in the middle of day-to-day operations.',
      es: 'Una startup creada para ayudar a los comercios minoristas a gestionar sus listas de proveedores con menos fricción. La idea es mantener todo organizado, fácil de consultar y sencillo de actualizar en el ritmo del día a día.',
    },
    metaLabel: { pt: 'FOCO', en: 'FOCUS', es: 'ENFOQUE' },
    technologies: [
      'Gestão de fornecedores',
      'Listas comerciais',
      'Operação do lojista',
      'Produto para varejo',
    ],
    links: [],
    visual: 'ledger',
  },
  {
    id: 'lead-enrichment',
    index: '03',
    title: {
      pt: 'Automação de Enriquecimento de Leads',
      en: 'Lead Enrichment Automation',
      es: 'Automatización de Enriquecimiento de Leads',
    },
    description: {
      pt: 'Criei este script em Python para tirar o trabalho repetitivo do caminho: ele percorre bases de leads em Excel, busca informações públicas e organiza cargos e descrições profissionais automaticamente.',
      en: 'I built this Python script to take repetitive work out of the way: it goes through Excel lead lists, searches public information, and automatically organizes job titles and professional descriptions.',
      es: 'Creé este script en Python para quitar trabajo repetitivo del camino: recorre bases de leads en Excel, busca información pública y organiza automáticamente cargos y descripciones profesionales.',
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
    id: 'educore',
    index: '04',
    title: {
      pt: 'EduCore — Gestão Acadêmica',
      en: 'EduCore — Academic Management',
      es: 'EduCore — Gestión Académica',
    },
    description: {
      pt: 'Meu projeto do primeiro ano da graduação: uma aplicação web para organizar alunos, professores, notas e atividades acadêmicas.',
      en: 'My first-year college project: a web application for organizing students, teachers, grades, and academic activities.',
      es: 'Mi proyecto del primer año de la carrera: una aplicación web para organizar alumnos, profesores, notas y actividades académicas.',
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
    id: 'open-source-lab',
    index: '05',
    title: {
      pt: 'OpenSource Lab',
      en: 'OpenSource Lab',
      es: 'OpenSource Lab',
    },
    description: {
      pt: 'Um espaço para reunir projetos que outras pessoas podem estudar, reutilizar e melhorar, com documentação, colaboração e código aberto no centro.',
      en: 'A place for projects other people can study, reuse, and improve, with documentation, collaboration, and open source at its core.',
      es: 'Un espacio para reunir proyectos que otras personas pueden estudiar, reutilizar y mejorar, con documentación, colaboración y código abierto en el centro.',
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
    period: { pt: 'Atual', en: 'Current', es: 'Actual' },
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
    label: { pt: 'IA e automação', en: 'AI & automation', es: 'IA y automatización' },
    items: [
      'Python',
      'FastAPI',
      'LLMs',
      'Redes neurais',
      'Selenium',
      'Automação de processos',
      'Análise de texto',
      'Revisão de fontes',
    ],
  },
  {
    id: 'backend',
    label: { pt: 'Back-end e APIs', en: 'Back-end & APIs', es: 'Back-end y APIs' },
    items: ['Java', 'Node.js', 'Express', 'REST APIs', 'JWT', 'Integração de APIs'],
  },
  {
    id: 'data',
    label: { pt: 'Dados e bancos', en: 'Data & databases', es: 'Datos y bases' },
    items: [
      'SQL',
      'MySQL',
      'PostgreSQL',
      'MongoDB',
      'Pandas',
      'Power BI',
      'Excel',
      'Preparação de dados',
      'Visualização de dados',
      'Business Analytics',
    ],
  },
  {
    id: 'frontend',
    label: { pt: 'Interfaces', en: 'Interfaces', es: 'Interfaces' },
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Interfaces responsivas',
      'Vite',
      'Three.js',
      'GSAP',
    ],
  },
  {
    id: 'delivery',
    label: { pt: 'Cloud e entrega', en: 'Cloud & delivery', es: 'Cloud y entrega' },
    items: ['AWS', 'Git', 'GitHub', 'Postman', 'Vercel', 'Cloud computing'],
  },
  {
    id: 'quality',
    label: {
      pt: 'Qualidade e manutenção',
      en: 'Quality & maintenance',
      es: 'Calidad y mantenimiento',
    },
    items: [
      'Diagnóstico e correção de bugs',
      'Manutenção de sistemas',
      'Documentação técnica',
      'Suporte técnico',
      'Vitest',
      'Playwright',
    ],
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
