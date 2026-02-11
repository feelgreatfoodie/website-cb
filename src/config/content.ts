export const hero = {
  headline: 'CHRISTIAN BOURLIER',
  subheadline: 'TECHNICAL SOLUTIONS PARTNER',
  hook: 'I build the system AND close the deal.',
  cta: 'Quest Start',
} as const;

export const journey = {
  title: 'THE RARE COMBINATION',
  subtitle: 'Three streams. One operator.',
  streams: [
    {
      id: 'data',
      label: 'Data Engineering',
      years: 8,
      color: 'stream1',
      skills: ['Python', 'SQL', 'GCP', 'BigQuery', 'Data Modeling'],
      description:
        'Architecture, ETL/ELT pipelines, 60M+ daily records, attribution models for Fortune 500 clients.',
    },
    {
      id: 'sales',
      label: 'Sales Leadership',
      years: 20,
      color: 'stream2',
      skills: [
        'Enterprise Sales',
        'Solution Selling',
        'Team Building',
        'Executive Communication',
        'Deal Strategy',
      ],
      description:
        '$500K+ contract expansions, client relationships that turn into partnerships.',
    },
    {
      id: 'poker',
      label: 'Professional Poker',
      years: 10,
      color: 'stream3',
      skills: [
        'Risk Assessment',
        'Pattern Recognition',
        'Game Theory',
        'Emotional Discipline',
        'Reading People',
      ],
      description:
        'A decade of high-stakes decision-making under uncertainty. Knowing when to fold matters.',
    },
  ],
} as const;

export const workshop = {
  title: 'CURRENTLY BUILDING',
  tagline: 'POCs in days, not quarters.',
  projects: [
    {
      name: 'OptiMeasure',
      description: 'Cookieless attribution engine — MMM lite',
      problem:
        'Cookie deprecation is breaking attribution; black-box solutions self-inflate contribution.',
      whyNow: 'Privacy regs accelerating — marketers need trust.',
      tags: ['Marketing Analytics', 'Privacy-First', 'ML'],
    },
    {
      name: 'CacheBash',
      description: 'Mobile app to connect mobile to desktop CLI',
      problem:
        'Claude Code users are desk-bound — step away and lose momentum/context.',
      whyNow: "AI-assisted dev exploding, async doesn't exist.",
      tags: ['Mobile', 'CLI', 'Developer Tools'],
      cliCommands: [
        'cachebash sync --remote',
        'cachebash run "npm test"',
        'cachebash deploy --production',
        'cachebash logs --tail 100',
      ],
    },
    {
      name: 'AI-Augmentation Portal',
      description: 'SPA to empower AI workflows in everyday tasks',
      problem:
        "People adopt AI tools but can't systematically integrate into workflows.",
      whyNow: "Everyone's experimenting, few compound gains.",
      tags: ['AI/ML', 'Enterprise', 'Integration'],
    },
  ],
} as const;

export const bossfight = {
  title: 'THE EQUATION',
  equation: [
    'Problem',
    'Technical Depth',
    'Business Acumen',
    'Poker Instincts',
    'Solution',
  ],
  approach: {
    title: 'THE APPROACH',
    steps: ['Diagnose', 'POC', 'Iterate', 'Deploy'],
    taglines: [
      'Diagnose first, build second.',
      'POCs in days, not quarters.',
      'I build people who build systems.',
    ],
  },
  testimonial: {
    quote:
      'Christian brings both technical excellence and great team spirit... a natural leader who motivates his team to accomplish their goals.',
    author: 'Brianna Mersey',
    role: 'VP Data',
  },
} as const;

export const footer = {
  signoff: 'Strength and Honour.',
  links: {
    email: 'christianbourlier@gmail.com',
    phone: '(310) 963-5282',
    linkedin: 'https://linkedin.com/in/christianbourlier',
    website: 'christianbourlier.com',
  },
} as const;
