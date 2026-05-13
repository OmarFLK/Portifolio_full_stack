// literalmente odeio js KKKKKKKKKKKKKK
//nao sei como ta funcionando direito, mas nao mexe KKKKKK
const translations = {
  pt: {
    pageTitle: "Omar Saliba | Portfólio",
    "nav.about": "Sobre",
    "nav.education": "Formação",
    "nav.powerbi": "PowerBI/Artigos",
    "nav.projects": "Projetos",
    "nav.experience": "Experiência",
    "hero.title": "| Omar Saliba — DeV. Full Stack | Data Science - I.A. |",
    "hero.description":
      "Sou profissional da área de tecnologia, apaixonado por avanço tecnológico, formado no Ensino Médio Técnico em TI pelo Senac Aclimação e atualmente cursando Inteligência Artificial e Ciência de Dados no Instituto Mauá de Tecnologia. Possuo duas certificações em Python para Ciência de Dados e em Power BI. Atuo como desenvolvedor full stack, com experiência em três projetos completos, envolvendo desenvolvimento de aplicações, integração de sistemas e soluções orientadas a dados, sempre com foco em lógica, performance e funcionalidade.",
    "resume.pt.title": "Baixar Currículo",
    "resume.pt.subtitle": "Versão PT-BR",
    "resume.en.title": "Download Resume",
    "resume.en.subtitle": "English Version",
    "education.title": "Formação",
    "education.academic":
      '<span class="highlight">Histórico Acadêmico</span><br /><br />Formado no ensino médio técnico em <b>T.I.</b> pelo <b>Senac Aclimação</b> no ano de 2024.<br />Atualmente cursando <b>Inteligência Artificial</b> e <b>Ciência de Dados</b> pelo <b>Instituto Mauá de Tecnologia</b>.',
    "education.additional":
      '<span class="highlight">Informações adicionais</span><br /><br />Idiomas: Inglês básico-intermediário (B1) e Espanhol intermediário (B2).<br />2 cursos concluídos pela <b>Alura</b> em <b>Python</b>, <b>HTML/CSS</b> e <b>GIT/GITHUB</b>.<br />Certificado <b>IMT – Python Para Ciência De Dados</b>.<br />Certificado <b>IMT – Power BI - Básico</b>.<br />Certificado <b>IBM – Web Development Fundamentals</b>.<br />Certificado <b>IBM – Introduction to Cloud Computing</b>.<br />Certificado <b>ALR – Excel Intermediário/Avançado</b>.<br />Certificado <b>ALR – HTML e CSS</b>.<br />Certificado <b>ALR – Python</b>.<br />Certificado <b>ALR – Git/GitHub</b>.<br />Certificado <b>EMED – Melhor Apresentação Gráfica</b>.<br />Certificado <b>EMED – Originalidade de Criação</b>.',
    "languages.title": "Domínio de Idiomas",
    "languages.pt": "Português",
    "languages.es": "Espanhol",
    "languages.en": "Inglês",
    "languages.ar": "Árabe",
    "languages.native": "Nativo",
    "powerbi.title": "PowerBI / Artigos",
    "powerbi.description":
      "Confira meus trabalhos no Behance e artigos no Drive. Links temporários abaixo, serão substituídos depois.",
    "powerbi.drive": "Artigos no Drive",
    "projects.title": "Projetos",
    "projects.educore.title": "EduCore — Sistema de Gestão Acadêmica",
    "projects.educore.description":
      "Aplicação web desenvolvida no primeiro ano da graduação, voltada à gestão de alunos, professores e atividades acadêmicas, construída com HTML, CSS, JavaScript, Node.js e MongoDB.",
    "projects.fincore.title": "FinCore — Plataforma Financeira",
    "projects.fincore.description":
      "Sistema de controle financeiro pessoal desenvolvido com HTML, CSS e JavaScript, focado em simplicidade, clareza e usabilidade.",
    "projects.openlab.title": "OpenSource Lab — Portfólio Open Source",
    "projects.openlab.description":
      "Hub de projetos e soluções em código aberto, voltado à documentação, colaboração e reutilização de aplicações e bibliotecas.",
    "projects.leads.title": "Automação de Enriquecimento de Leads",
    "projects.leads.description":
      "Script de automação em Python para enriquecimento de bases de leads em Excel, realizando busca de informações públicas via LinkedIn/Google para identificação automática de cargos e descrições profissionais, com foco em automação de processos, manipulação de dados e produtividade.",
    "projects.reservas.title": "Sistema de Reservas para Restaurantes",
    "projects.reservas.description":
      "Aplicação web full-stack para gerenciamento inteligente de reservas, desenvolvida com Python, FastAPI, React, PostgreSQL, TailwindCSS e JWT, com foco em autenticação segura, prevenção de conflitos, responsividade e arquitetura escalável.",
    "projects.reservas.media": "Assistir vídeo",
    "projects.link.site": "Site",
    "projects.noSite": "Sem site",
    "projects.placeholder.badge": "Novo projeto",
    "projects.placeholder2.title": "Projeto 05 — Título do projeto",
    "projects.placeholder3.title": "Projeto 06 — Título do projeto",
    "projects.placeholder.description":
      "Espaço reservado para você adicionar a descrição, tecnologias usadas, vídeo ou imagem e links do seu próximo projeto.",
    "projects.placeholder.github": "Adicionar",
    "projects.placeholder.site": "Adicionar",
    "experience.title": "Experiência",
    "experience.support.title": "Assistente de Suporte Técnico e Atendimento ao Cliente",
    "experience.support.description":
      "Atuei como responsável pela montagem, manutenção e configuração de computadores e notebooks, além de prestar suporte técnico direto aos clientes, realizando diagnóstico e resolução de problemas de hardware e software com agilidade, clareza e foco na melhor experiência do usuário.",
    "experience.freelance.title": "Programador autônomo Júnior",
    "experience.freelance.description":
      "Durante o último ano, atuei de forma autônoma no desenvolvimento de soluções digitais e aplicações web, com foco em Python, HTML, CSS, JavaScript e Node.js, criando sistemas completos do back-end ao front-end.",
    "experience.trainee.title": "Trainee na Mauá Júnior | Formação Multidisciplinar",
    "experience.trainee.description":
      "Durante meu período como trainee na Mauá Júnior, passei por diversas áreas como marketing, financeiro e projetos, adquirindo uma visão prática e completa do funcionamento de uma empresa. Essa experiência me ajudou a desenvolver habilidades de trabalho em equipe, organização e comunicação, além de identificar minhas principais competências e direcionar melhor minha atuação profissional, contribuindo diretamente para minha evolução como designer e editor.",
    "experience.consultant.title": "Consultor Tecnológico na Mauá Júnior | Cargo Atual",
    "experience.consultant.description":
      "Como consultor, atuo no desenvolvimento de soluções digitais e inteligência de negócios, unindo experiência em desenvolvimento web, análise de dados e automação de processos com tecnologias como Python, HTML, CSS, JavaScript, SQL, Java, Power BI e Excel. Também desenvolvo sistemas baseados em redes neurais e modelos de linguagem (LLMs), criando soluções inovadoras e personalizadas para empresas parceiras, desde plataformas web e dashboards estratégicos até automações inteligentes que aumentam a eficiência, reduzem custos e geram vantagem competitiva real.",
    "footer.rights": "© Omar Saliba — Todos os direitos reservados",
  },
  es: {
    pageTitle: "Omar Saliba | Portafolio",
    "nav.about": "Sobre mí",
    "nav.education": "Formación",
    "nav.powerbi": "PowerBI/Artículos",
    "nav.projects": "Proyectos",
    "nav.experience": "Experiencia",
    "hero.title": "| Omar Saliba — Dev. Full Stack | Data Science - I.A. |",
    "hero.description":
      "Soy profesional del área de tecnología, apasionado por el avance tecnológico, egresado de la secundaria técnica en TI por Senac Aclimação y actualmente estudio Inteligencia Artificial y Ciencia de Datos en el Instituto Mauá de Tecnología. Cuento con certificaciones en Python para Ciencia de Datos y Power BI. Trabajo como desarrollador full stack, con experiencia en proyectos completos que incluyen desarrollo de aplicaciones, integración de sistemas y soluciones orientadas a datos, siempre con foco en lógica, rendimiento y funcionalidad.",
    "resume.pt.title": "Descargar CV",
    "resume.pt.subtitle": "Versión PT-BR",
    "resume.en.title": "Download Resume",
    "resume.en.subtitle": "English Version",
    "education.title": "Formación",
    "education.academic":
      '<span class="highlight">Historial Académico</span><br /><br />Egresado de la secundaria técnica en <b>T.I.</b> por <b>Senac Aclimação</b> en 2024.<br />Actualmente estudio <b>Inteligencia Artificial</b> y <b>Ciencia de Datos</b> en el <b>Instituto Mauá de Tecnología</b>.',
    "education.additional":
      '<span class="highlight">Información adicional</span><br /><br />Idiomas: Inglés básico-intermedio (B1) y Español intermedio (B2).<br />2 cursos completados en <b>Alura</b> de <b>Python</b>, <b>HTML/CSS</b> y <b>GIT/GITHUB</b>.<br />Certificado <b>IMT – Python Para Ciencia De Datos</b>.<br />Certificado <b>IMT – Power BI - Básico</b>.<br />Certificado <b>IBM – Web Development Fundamentals</b>.<br />Certificado <b>IBM – Introduction to Cloud Computing</b>.<br />Certificado <b>ALR – Excel Intermedio/Avanzado</b>.<br />Certificado <b>ALR – HTML y CSS</b>.<br />Certificado <b>ALR – Python</b>.<br />Certificado <b>ALR – Git/GitHub</b>.<br />Certificado <b>EMED – Mejor Presentación Gráfica</b>.<br />Certificado <b>EMED – Originalidad de Creación</b>.',
    "languages.title": "Dominio de Idiomas",
    "languages.pt": "Portugués",
    "languages.es": "Español",
    "languages.en": "Inglés",
    "languages.ar": "Árabe",
    "languages.native": "Nativo",
    "powerbi.title": "PowerBI / Artículos",
    "powerbi.description":
      "Consulta mis trabajos en Behance y artículos en Drive. Los enlaces temporales de abajo serán reemplazados después.",
    "powerbi.drive": "Artículos en Drive",
    "projects.title": "Proyectos",
    "projects.educore.title": "EduCore — Sistema de Gestión Académica",
    "projects.educore.description":
      "Aplicación web desarrollada en el primer año de la carrera, orientada a la gestión de alumnos, profesores y actividades académicas, construida con HTML, CSS, JavaScript, Node.js y MongoDB.",
    "projects.fincore.title": "FinCore — Plataforma Financiera",
    "projects.fincore.description":
      "Sistema de control financiero personal desarrollado con HTML, CSS y JavaScript, enfocado en simplicidad, claridad y usabilidad.",
    "projects.openlab.title": "OpenSource Lab — Portafolio Open Source",
    "projects.openlab.description":
      "Hub de proyectos y soluciones de código abierto, orientado a documentación, colaboración y reutilización de aplicaciones y bibliotecas.",
    "projects.leads.title": "Automatización de Enriquecimiento de Leads",
    "projects.leads.description":
      "Script de automatización en Python para enriquecer bases de leads en Excel, realizando búsquedas de información pública vía LinkedIn/Google para identificar automáticamente cargos y descripciones profesionales, con foco en automatización de procesos, manipulación de datos y productividad.",
    "projects.reservas.title": "Sistema de Reservas para Restaurantes",
    "projects.reservas.description":
      "Aplicación web full-stack para la gestión inteligente de reservas, desarrollada con Python, FastAPI, React, PostgreSQL, TailwindCSS y JWT, con foco en autenticación segura, prevención de conflictos, responsividad y arquitectura escalable.",
    "projects.reservas.media": "Ver video",
    "projects.link.site": "Sitio",
    "projects.noSite": "Sin sitio",
    "projects.placeholder.badge": "Nuevo proyecto",
    "projects.placeholder2.title": "Proyecto 05 — Título del proyecto",
    "projects.placeholder3.title": "Proyecto 06 — Título del proyecto",
    "projects.placeholder.description":
      "Espacio reservado para agregar la descripción, tecnologías usadas, video o imagen y enlaces de tu próximo proyecto.",
    "projects.placeholder.github": "Agregar",
    "projects.placeholder.site": "Agregar",
    "experience.title": "Experiencia",
    "experience.support.title": "Asistente de Soporte Técnico y Atención al Cliente",
    "experience.support.description":
      "Fui responsable del montaje, mantenimiento y configuración de computadoras y notebooks, además de brindar soporte técnico directo a clientes, realizando diagnóstico y resolución de problemas de hardware y software con agilidad, claridad y foco en la mejor experiencia del usuario.",
    "experience.freelance.title": "Programador autónomo Júnior",
    "experience.freelance.description":
      "Durante el último año trabajé de forma autónoma en el desarrollo de soluciones digitales y aplicaciones web, con foco en Python, HTML, CSS, JavaScript y Node.js, creando sistemas completos del back-end al front-end.",
    "experience.trainee.title": "Trainee en Mauá Júnior | Formación Multidisciplinaria",
    "experience.trainee.description":
      "Durante mi período como trainee en Mauá Júnior, pasé por diversas áreas como marketing, finanzas y proyectos, adquiriendo una visión práctica y completa del funcionamiento de una empresa. Esta experiencia me ayudó a desarrollar habilidades de trabajo en equipo, organización y comunicación, además de identificar mis principales competencias y orientar mejor mi actuación profesional.",
    "experience.consultant.title": "Consultor Tecnológico en Mauá Júnior | Cargo Actual",
    "experience.consultant.description":
      "Como consultor, trabajo en el desarrollo de soluciones digitales e inteligencia de negocios, uniendo experiencia en desarrollo web, análisis de datos y automatización de procesos con tecnologías como Python, HTML, CSS, JavaScript, SQL, Java, Power BI y Excel. También desarrollo sistemas basados en redes neuronales y modelos de lenguaje (LLMs), creando soluciones innovadoras y personalizadas para empresas asociadas.",
    "footer.rights": "© Omar Saliba — Todos los derechos reservados",
  },
  en: {
    pageTitle: "Omar Saliba | Portfolio",
    "nav.about": "About",
    "nav.education": "Education",
    "nav.powerbi": "PowerBI/Articles",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "hero.title": "| Omar Saliba — Full Stack Dev. | Data Science - A.I. |",
    "hero.description":
      "I am a technology professional passionate about technological progress, graduated from the IT technical high school program at Senac Aclimação and currently studying Artificial Intelligence and Data Science at Instituto Mauá de Tecnologia. I hold certifications in Python for Data Science and Power BI. I work as a full stack developer, with experience in complete projects involving application development, system integration and data-driven solutions, always focused on logic, performance and functionality.",
    "resume.pt.title": "Download CV",
    "resume.pt.subtitle": "PT-BR Version",
    "resume.en.title": "Download Resume",
    "resume.en.subtitle": "English Version",
    "education.title": "Education",
    "education.academic":
      '<span class="highlight">Academic Background</span><br /><br />Graduated from the technical high school program in <b>I.T.</b> at <b>Senac Aclimação</b> in 2024.<br />Currently studying <b>Artificial Intelligence</b> and <b>Data Science</b> at <b>Instituto Mauá de Tecnologia</b>.',
    "education.additional":
      '<span class="highlight">Additional Information</span><br /><br />Languages: Basic-intermediate English (B1) and intermediate Spanish (B2).<br />2 completed <b>Alura</b> courses in <b>Python</b>, <b>HTML/CSS</b> and <b>GIT/GITHUB</b>.<br />Certificate <b>IMT – Python for Data Science</b>.<br />Certificate <b>IMT – Power BI - Basic</b>.<br />Certificate <b>IBM – Web Development Fundamentals</b>.<br />Certificate <b>IBM – Introduction to Cloud Computing</b>.<br />Certificate <b>ALR – Intermediate/Advanced Excel</b>.<br />Certificate <b>ALR – HTML and CSS</b>.<br />Certificate <b>ALR – Python</b>.<br />Certificate <b>ALR – Git/GitHub</b>.<br />Certificate <b>EMED – Best Graphic Presentation</b>.<br />Certificate <b>EMED – Originality of Creation</b>.',
    "languages.title": "Language Proficiency",
    "languages.pt": "Portuguese",
    "languages.es": "Spanish",
    "languages.en": "English",
    "languages.ar": "Arabic",
    "languages.native": "Native",
    "powerbi.title": "PowerBI / Articles",
    "powerbi.description":
      "Check out my work on Behance and articles on Drive. The temporary links below will be replaced later.",
    "powerbi.drive": "Articles on Drive",
    "projects.title": "Projects",
    "projects.educore.title": "EduCore — Academic Management System",
    "projects.educore.description":
      "A web application developed during the first year of college, focused on managing students, teachers and academic activities, built with HTML, CSS, JavaScript, Node.js and MongoDB.",
    "projects.fincore.title": "FinCore — Financial Platform",
    "projects.fincore.description":
      "A personal finance control system developed with HTML, CSS and JavaScript, focused on simplicity, clarity and usability.",
    "projects.openlab.title": "OpenSource Lab — Open Source Portfolio",
    "projects.openlab.description":
      "A hub for open-source projects and solutions, focused on documentation, collaboration and reuse of applications and libraries.",
    "projects.leads.title": "Lead Enrichment Automation",
    "projects.leads.description":
      "A Python automation script for enriching Excel lead databases, searching public information through LinkedIn/Google to automatically identify roles and professional descriptions, focused on process automation, data manipulation and productivity.",
    "projects.reservas.title": "Restaurant Reservation System",
    "projects.reservas.description":
      "A full-stack web application for intelligent reservation management, built with Python, FastAPI, React, PostgreSQL, TailwindCSS and JWT, focused on secure authentication, conflict prevention, responsiveness and scalable architecture.",
    "projects.reservas.media": "Watch video",
    "projects.link.site": "Website",
    "projects.noSite": "No site",
    "projects.placeholder.badge": "New project",
    "projects.placeholder2.title": "Project 05 — Project title",
    "projects.placeholder3.title": "Project 06 — Project title",
    "projects.placeholder.description":
      "Reserved space for you to add the description, technologies used, video or image and links for your next project.",
    "projects.placeholder.github": "Add",
    "projects.placeholder.site": "Add",
    "experience.title": "Experience",
    "experience.support.title": "Technical Support and Customer Service Assistant",
    "experience.support.description":
      "I was responsible for assembling, maintaining and configuring computers and notebooks, while also providing direct technical support to customers, diagnosing and solving hardware and software issues with agility, clarity and a focus on the best user experience.",
    "experience.freelance.title": "Junior Freelance Programmer",
    "experience.freelance.description":
      "Over the last year, I worked independently developing digital solutions and web applications, focused on Python, HTML, CSS, JavaScript and Node.js, creating complete systems from back-end to front-end.",
    "experience.trainee.title": "Trainee at Mauá Júnior | Multidisciplinary Training",
    "experience.trainee.description":
      "During my time as a trainee at Mauá Júnior, I worked across areas such as marketing, finance and projects, gaining a practical and complete view of how a company operates. This experience helped me develop teamwork, organization and communication skills, while also identifying my core strengths and improving my professional direction.",
    "experience.consultant.title": "Technology Consultant at Mauá Júnior | Current Role",
    "experience.consultant.description":
      "As a consultant, I work on digital solutions and business intelligence, combining experience in web development, data analysis and process automation with technologies such as Python, HTML, CSS, JavaScript, SQL, Java, Power BI and Excel. I also develop systems based on neural networks and language models (LLMs), creating innovative and customized solutions for partner companies.",
    "footer.rights": "© Omar Saliba — All rights reserved",
  },
};

const languageSwitcher = document.getElementById("language-switcher");
const languageToggle = document.getElementById("language-toggle");
const languageLabel = document.getElementById("language-label");
const languageOptions = document.querySelectorAll("[data-language]");
const languageCurrent = document.getElementById("language-current");
const languageNames = {
  pt: "Português",
  es: "Español",
  en: "English",
};

function setLanguage(language) {
  const dictionary = translations[language] || translations.pt;

  document.documentElement.lang = language === "pt" ? "pt-br" : language;
  document.title = dictionary.pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.dataset.i18nHtml;
    if (dictionary[key]) {
      element.innerHTML = dictionary[key];
    }
  });

  if (languageCurrent) {
    languageCurrent.textContent = language.toUpperCase();
  }

  if (languageLabel) {
    languageLabel.textContent = languageNames[language] || languageNames.pt;
  }

  languageOptions.forEach((option) => {
    const isActive = option.dataset.language === language;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-selected", String(isActive));
  });

  localStorage.setItem("portfolio-language", language);
}

function closeLanguageMenu() {
  if (!languageSwitcher || !languageToggle) return;

  languageSwitcher.classList.remove("open");
  languageToggle.setAttribute("aria-expanded", "false");
}

if (languageSwitcher && languageToggle) {
  setLanguage(localStorage.getItem("portfolio-language") || "pt");

  languageToggle.addEventListener("click", () => {
    const isOpen = languageSwitcher.classList.toggle("open");
    languageToggle.setAttribute("aria-expanded", String(isOpen));
  });

  languageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      setLanguage(option.dataset.language);
      closeLanguageMenu();
      menu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  document.addEventListener("click", (event) => {
    if (!languageSwitcher.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLanguageMenu();
    }
  });
} else {
  setLanguage(localStorage.getItem("portfolio-language") || "pt");
}

setTimeout(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}, 5000);

// botao de aborgui xdd
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
});
// header de vidro tlg ne pai, os sites de design sempre salvando everyone KKKK
const glassHeader = document.querySelector(".glass-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    glassHeader.classList.add("scrolled");
  } else {
    glassHeader.classList.remove("scrolled");
  }
});
// aqui é o gerador das bolinhas de agua, mes AEStétiqui xd
document.querySelectorAll(".bubbles").forEach((side) => {
  for (let i = 0; i < 12; i++) {
    const bubble = document.createElement("span");
    const size = Math.random() * 12 + 6;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 80}px`;
    bubble.style.animationDuration = `${Math.random() * 8 + 6}s`;
    bubble.style.animationDelay = `${Math.random() * 10}s`;

    side.appendChild(bubble);
  }
});
// scroll de agua la
window.addEventListener("scroll", () => {
  const distortion = document.querySelector(".water-distortion");
  const intensity = Math.min(window.scrollY / 300, 2);

  distortion.style.backdropFilter = `blur(${1.2 + intensity}px)`;
});
