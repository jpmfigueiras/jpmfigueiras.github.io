import type { Translation } from '../types'

export const pt: Translation = {
  nav: {
    about: 'Sobre',
    work: 'Projetos',
    experience: 'Experiência',
    contact: 'Contacto',
    language: 'Idioma',
    theme: 'Alternar modo escuro',
    main: 'Principal',
  },
  hero: {
    status: 'Disponível · Braga, PT · UTC+0',
    lines: ['Construo', 'plataformas partilhadas.', 'Agora protejo-as.'],
    tag: 'Mestrado em Cibersegurança · IPVC',
    ctaWork: 'Ver projetos',
    ctaContact: 'Falar comigo',
  },
  about: {
    paragraphs: [
      'Sou o Joel, developer full-stack de Braga. Interessa-me software que aguenta tráfego real e atacantes reais.',
      'Cheguei ao software por um caminho pouco habitual. Durante cinco anos inspecionei veículos, onde se segue a checklist e nunca se aprova o que não se verificou. Continuo a trabalhar assim.',
      'Desde então criei uma app Android de raiz, escrevi microserviços em C# e passei três anos como único web developer na PluggableAi, responsável por tudo, do front end em React ao deployment na Azure. O que mais gostava era de pensar no que podia correr mal, e por isso estou a fazer um mestrado em cibersegurança.',
    ],
    facts: ['clubes de futebol na minha plataforma', 'anos como único web developer', 'anos a inspecionar veículos'],
    portraitAlt: 'Joel Figueiras',
  },
  stack: {
    label: 'Arquitetura',
    title: 'Um código, muitos clubes, uma fronteira que importa.',
    layer: 'Camada',
    theme: 'tokens de tema',
    auth: 'auth por tenant',
    infra: 'partilhado · stateless · autoscaling',
    tag: 'Fronteira de confiança',
    caption:
      'Cada clube tem a sua identidade visual e o seu schema de base de dados, partilhando a mesma API e o mesmo deployment com autoscaling. Cada pedido tem de provar a que tenant pertence antes de tocar nos dados.',
    tableLabel: 'Camadas da plataforma por tenant',
  },
  work: {
    label: 'Projetos',
    title: 'O que construí e pus em produção.',
    projects: {
      fanzone: {
        stat: 'clubes em produção',
        title: 'FanZone — plataforma de fan engagement',
        desc: 'Web app multi-tenant e backoffice para clubes de futebol, incluindo clubes portugueses e o CD Leganés. Os adeptos acompanham eventos ao vivo e votam no Fan of the Match; os clubes gerem tudo no backoffice.',
        bullets: [
          <>
            Criei de raiz um design system por clube: papéis de cor semânticos como CSS custom properties com{' '}
            <code>@theme</code> do Tailwind v4, refatorado em mais de 30 ficheiros.
          </>,
          'Migrei o data fetching para TanStack Query com uma camada de queries centralizada, eliminando bugs de dados desatualizados e de invalidação de cache.',
          'Escolhi polling adaptativo em vez de WebSockets para eventos ao vivo, adequado a um deployment stateless e escalado horizontalmente na Azure.',
          'Tornei o servidor a única fonte de verdade para o estado dos eventos e corrigi bugs de fuso horário com offsets ISO 8601 na API.',
          'Construí a ponte entre a web app e as apps nativas dos clubes para a navegação interna.',
        ],
      },
      mobileLogistic: {
        stat: 'criada de raiz',
        title: 'Mobile Logistic — app Android',
        desc: 'App de logística para Android, desenvolvida em Kotlin na Wave Solutions e testada em empresas clientes, com microserviços em C# que também escrevi.',
      },
      trading: {
        stat: 'gestão de posição',
        title: 'Motor de decisão de trading — projeto pessoal',
        desc: 'Motor modular em Python que apoia decisões de trading sem operar sozinho: fontes de dados intercambiáveis, indicadores, pontuação ponderada de sinais e dimensionamento de posição baseado na volatilidade.',
      },
    },
  },
  experience: {
    label: 'Experiência',
    title: 'Onde trabalhei.',
    entries: [
      {
        when: '2023 — 2026',
        title: 'Full-stack Web Developer',
        org: 'PluggableAi · único web developer',
        desc: 'Responsável pela plataforma web de ponta a ponta: front end, API, base de dados multi-schema, deployment e autoscaling na Azure. Apliquei práticas OWASP à autenticação e autorização entre tenants.',
      },
      {
        when: 'Antes de 2023',
        title: 'Software Developer',
        org: 'Wave Solutions',
        desc: 'Desenvolvi a app Android Mobile Logistic em Kotlin e os microserviços em C# que a suportam.',
      },
      { when: 'Antes de 2023', title: 'Full-stack Developer (estágio)', org: '4Dev' },
      {
        when: '2016 — 2021',
        title: 'Inspetor de Veículos',
        org: 'CTIB Braga',
        desc: 'Cinco anos de inspeção metódica, onde um defeito que escapa tem consequências reais. O mesmo hábito que levo para code review e threat modelling.',
        stamp: 'Inspecionado · Aprovado',
      },
    ],
  },
  education: {
    label: 'Formação e segurança',
    title: 'De construir sistemas a defendê-los.',
    entries: [
      {
        when: '2025 — agora',
        title: 'Mestrado em Cibersegurança',
        org: 'Instituto Politécnico de Viana do Castelo',
        desc: 'Inclui o desenho de um sistema de gestão de segurança da informação segundo a ISO 27001. Tese em preparação sobre segurança de IoT e infraestrutura distribuída.',
      },
      {
        when: 'Licenciatura',
        title: 'Licenciatura em Engenharia de Sistemas Informáticos',
        org: 'IPCA — Instituto Politécnico do Cávado e do Ave',
      },
    ],
    cards: [
      {
        label: 'Aplicado',
        title: 'Isolamento de tenants',
        desc: 'Autenticação, autorização e separação de dados num sistema multi-tenant em produção.',
      },
      {
        label: 'Formação',
        title: 'Segurança web',
        desc: 'Labs da PortSwigger Web Security Academy e salas de TryHackMe focadas em web.',
      },
      { label: 'Certificação', title: 'CompTIA Security+', desc: 'A preparar o exame.' },
      {
        label: 'Objetivo',
        title: 'Arquitetura de segurança',
        desc: 'Desenhar sistemas seguros pela estrutura, não por remendos.',
      },
    ],
  },
  contact: {
    label: 'Contacto',
    title: 'Vamos construir algo seguro.',
    sub: 'Disponível para funções full-stack e AppSec no Dubai, Suíça, Reino Unido e resto da Europa.',
    copy: 'Copiar email',
    copied: 'Copiado ✓',
  },
  footer: { off: 'Fora do teclado: padel, boxe, natação.' },
}
