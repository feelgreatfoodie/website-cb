export const hero = {
  headline: 'CHRISTIAN BOURLIER',
  subheadline: 'ARCHITECT. STRATEGIST. OPERATOR.',
  hook: 'I build the system AND close the deal.',
  cta: 'Journey Onward',
  availability: 'Open to opportunities',
} as const;

export const journey = {
  title: 'THREE STREAMS',
  subtitle: 'Where they converge is where it gets interesting.',
  streams: [
    {
      id: 'data',
      label: 'AI Solutions & Engineering',
      years: 8,
      color: 'stream1',
      skills: [
        'MCP Development',
        'Agentic Workflows (ReAct)',
        'System Prompt Engineering',
        'LLM-as-a-judge',
        'Vertex AI',
        'Anthropic API',
        'RAG Pipelines',
        'Multi-Model Orchestration',
        'Structured Output Validation',
        'Context Caching Strategies',
        'Python',
        'TypeScript',
        'SQL',
        'React',
        'Next.js',
        'GCP',
        'BigQuery',
        'Docker',
        'REST APIs',
      ],
      description:
        'AI systems design, agentic workflows, full-stack engineering, and data pipelines. From LLM prototype to production.',
    },
    {
      id: 'sales',
      label: 'Sales Leadership',
      years: 20,
      color: 'stream2',
      skills: [
        'Mentoring',
        'Exec Comms',
        'Consultative Selling',
        'Negotiation',
        'Change Mgmt',
        'Go-to-Market',
        'Account Mgmt',
        'Stakeholder Mgmt',
        'Biz Analysis',
        'Tech Translation',
        'Deal Strategy',
        'Enterprise Sales',
        'Team Building',
        'Solution Selling',
        'Revenue Growth',
        'Client Retention',
        'Presentations',
        'P&L Ownership',
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
        'Winning',
        'Sometimes Losing',
        'Risk Assessment',
        'Pattern Recognition',
        'Game Theory',
        'Emotional Discipline',
        'Reading People',
        'Bankroll Mgmt',
        'Decisions in Uncertainty',
        'Variance Mgmt',
        'Opponent Modeling',
        'EV Analysis',
        'Probabilistic Thinking',
        'Table Selection',
        'Position & Leverage',
        'Self-Employment',
      ],
      description:
        'A decade of high-stakes decision-making under uncertainty. Knowing when to fold matters.',
    },
  ],
} as const;

export const streamTestimonials: Record<string, { quote: string; author: string; role: string }> = {
  data: {
    quote: 'A highly skilled senior data engineer with strong expertise in pipelining complex data sources, GCP, BQML and the broader Google ecosystem.',
    author: 'Brianna Mersey',
    role: 'VP Data',
  },
  sales: {
    quote: "One of the smartest, hardest working, inspiring, and motivating team leaders I've ever hired.",
    author: 'Malek Bishawi',
    role: 'Global Sales & Business Development',
  },
  poker: {
    quote: 'He is a born leader, a man of true integrity and loyalty, and he brings out the best in those around him.',
    author: 'Matthew Walvick',
    role: 'Healthcare Technology Physician',
  },
};

export const competencies = {
  title: 'CORE COMPETENCIES',
  hub: [
    { id: 'data-arch', label: 'DATA Architecture', icon: 'database' },
    { id: 'ai-hi', label: 'AI+HI Solutions', icon: 'brain' },
    { id: 'exec-rel', label: 'EXECUTIVE Relationships', icon: 'handshake' },
    { id: 'rapid-proto', label: 'RAPID Prototyping', icon: 'rocket' },
    { id: 'team-build', label: 'TEAM Building', icon: 'users' },
    { id: 'biz-strategy', label: 'BUSINESS Strategy', icon: 'chart' },
  ],
} as const;

export const openTo = {
  title: 'OPEN TO',
  subtitle: 'Roles where I deliver the most impact.',
  roles: [
    {
      title: 'AI Strategy & Transformation Lead',
      description:
        'Defining AI roadmaps that connect technical capability to business outcomes. Not just what AI can do — what it should do for your organization.',
      brings: [
        'AI Roadmaps',
        'Change Management',
        'Executive Education',
        'Use Case Prioritization',
        'Pilot-to-Production',
        'Organizational Readiness',
        'ROI Frameworks',
      ],
    },
    {
      title: 'AI/ML Solutions Engineer',
      description:
        'Building production ML systems end-to-end. From data pipelines through model serving, with the engineering rigor to keep them running at scale.',
      brings: [
        'Production AI',
        'Rapid Prototyping',
        'Prompt Engineering',
        'Data Pipelines',
        'Model Evaluation',
        'Workflow Automation',
        'Human-in-the-Loop',
      ],
    },
    {
      title: 'Solutions Architect',
      description:
        'Designing cloud-native data architectures on GCP. BigQuery, Dataform, Cloud Functions, Vertex AI — the full stack, tailored to your constraints.',
      brings: [
        'System Design',
        'GCP Architecture',
        'Client-Facing Discovery',
        'Integration Planning',
        'Technical Risk Assessment',
      ],
    },
    {
      title: 'Technical Account Manager',
      description:
        'Bridging the gap between technical teams and executive stakeholders. Two decades of sales meets deep engineering fluency.',
      brings: [
        'Enterprise Relationships',
        'Stakeholder Management',
        'Trust Building',
        'Customer Advocacy',
        'Solution Scoping',
        'Contract Expansion',
      ],
    },
  ],
} as const;

export const workshop = {
  title: 'CURRENTLY BUILDING',
  tagline: 'POCs in days, not quarters.',
  projects: [
    {
      name: 'Rezzed.ai',
      description: 'Rezzing tools and systems for developers who code with AI',
      problem:
        'AI-assisted development is exploding but tooling for multi-agent orchestration barely exists.',
      whyNow: 'Developers need infrastructure that keeps up with how they actually build.',
      tags: ['AI/ML', 'Developer Tools', 'MCP'],
      image: '/rezzed-preview.svg',
      url: 'https://rezzed.ai',
    },
    {
      name: 'CacheBash',
      description: 'Your AI agents control panel, from your phone.',
      problem:
        'AI agents need you at your desk. Leave and the conversation ends — questions unanswered, sessions hang, momentum lost.',
      whyNow: 'AI-assisted development is exploding. The tooling assumes you never leave your chair.',
      tags: ['MCP Server', 'Mobile', 'AI DevTools'],
      image: '/cachebash-preview.svg',
      url: 'https://rezzed.ai/cachebash',
      cliCommands: [
        'cachebash sync --remote',
        'cachebash run "npm test"',
        'cachebash deploy --production',
        'cachebash logs --tail 100',
      ],
    },
    {
      name: 'OptiMeasure',
      description: 'Cookieless attribution engine — Marketing Mix Modeling lite',
      problem:
        'Cookie deprecation is breaking attribution; black-box solutions self-inflate contribution.',
      whyNow: 'Privacy regs accelerating — marketers need trust.',
      tags: ['Marketing Analytics', 'Privacy-First'],
      image: '/optimeasure-preview.svg',
      url: 'https://optimeasure.io',
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
  testimonials: [
    {
      quote:
        'A highly skilled senior data engineer with strong expertise in pipelining complex data sources, GCP, BQML and the broader Google ecosystem. He consistently delivered scalable, efficient solutions while making collaboration easy and enjoyable. Christian brings both technical excellence and great team spirit!',
      author: 'Brianna Mersey',
      role: 'VP Data',
    },
    {
      quote:
        'A naturally curious and technically adept person. He has the capacity to not only complete assigned work but to go more in-depth on topics. Christian is a natural leader who motivates his team to accomplish their goals and have fun doing it. He is an exceptional individual who functions well in both the technical and people realms.',
      author: 'Craig Quincy',
      role: 'Engineering Leader',
    },
    {
      quote:
        'Christian has been terrific to work with. I value his energy for learning, teaching others, and creating an environment where everyone has fun. His thoroughness and attention to detail were key to making a great product. I\'d love to be on a team with him in the future!',
      author: 'Eric Budd',
      role: 'Engineering Data Director',
    },
    {
      quote:
        'One of the smartest, hardest working, inspiring, and motivating team leaders I\'ve ever hired. He\'s very well organized and methodical in his approach, and understands how to build a streamlined, effective, and highly productive business. Christian would be an asset to any team!',
      author: 'Malek Bishawi',
      role: 'Global Sales & Business Development',
    },
    {
      quote:
        'Christian has a stellar personality that draws people in — colleagues enjoy his presence, and clients delight in his genuine, warm temperament. His outstanding commitment to clientele and incredible work ethic are evident at all times.',
      author: 'Sumer Anelli',
      role: 'Convention Services Manager',
    },
    {
      quote:
        'He is a born leader, a man of true integrity and loyalty, and he brings out the best in those around him. Attributes which make him a valuable friend and allow him to excel in business.',
      author: 'Matthew Walvick',
      role: 'Healthcare Technology Physician',
    },
    {
      quote:
        'He has a quality that\'s hard to teach and even harder to find. He is genuine. He is outcome-driven. And he makes the people around him feel seen, heard, and respected. You don\'t just get someone who does the job. You get someone who improves the room. That\'s what creates lasting results.',
      author: 'Rich Luby',
      role: 'Career Services Director',
    },
  ],
} as const;

export const implementation = {
  title: 'IMPLEMENTATION',
  subtitle: 'The tools I ship with.',
  skills: [
    { name: 'Python', category: 'language' },
    { name: 'TypeScript', category: 'language' },
    { name: 'SQL', category: 'language' },
    { name: 'JavaScript', category: 'language' },
    { name: 'GCP', category: 'cloud' },
    { name: 'BigQuery', category: 'cloud' },
    { name: 'Cloud Functions', category: 'cloud' },
    { name: 'Vertex AI', category: 'cloud' },
    { name: 'dbt', category: 'data' },
    { name: 'Airflow', category: 'data' },
    { name: 'Dataform', category: 'data' },
    { name: 'Looker', category: 'data' },
    { name: 'LangChain', category: 'ai' },
    { name: 'Claude API', category: 'ai' },
    { name: 'scikit-learn', category: 'ai' },
    { name: 'TensorFlow', category: 'ai' },
  ],
  certifications: [
    { name: 'GCP Professional Data Engineer', badge: '/gcp-pde.webp' },
    { name: 'GCP Professional Cloud Architect', badge: '/gcp-pca.webp' },
  ],
} as const;

export const writing = {
  title: 'LATEST WRITING',
  subtitle: 'Thoughts on data, AI, and building things that matter.',
  ctaLabel: 'View all posts on Medium',
  profileUrl: 'https://medium.com/@christianbourlier',
} as const;

export const oneSheeter = {
  title: 'GRAB THE ONE-SHEETER',
  subtitle: 'Print-ready. Take me with you.',
  ctaLabel: 'Download PDF',
} as const;

export const contact = {
  title: "LET'S CONNECT",
  subtitle: 'Drop a line. I\'ll follow up.',
  ctaLabel: 'Send Message',
  successMessage: 'Message sent — I\'ll be in touch soon.',
} as const;

export const smartCta = {
  stages: [
    { sections: ['journey', 'competencies', 'opento'], label: "See What I'm Building", target: '#workshop', icon: 'arrow' },
    { sections: ['workshop'], label: 'The Proof', target: '#bossfight', icon: 'eye' },
    { sections: ['bossfight', 'implementation'], label: 'Grab the One-Sheeter', target: '#onesheeter', icon: 'download' },
    { sections: ['writing'], label: "Let's Connect", target: '#contact', icon: 'envelope' },
  ],
  hiddenSections: ['hero', 'contact'],
} as const;

export const intentOverrides: Record<string, {
  subheadline?: string;
  availability?: string;
  ctaLabel?: string;
}> = {
  recruiter: {
    subheadline: 'PRINCIPAL AI ARCHITECT | MCP SERVER AUTHOR',
    availability: 'Available for Q2 2026 engagements',
  },
  client: {
    subheadline: 'AI SOLUTIONS ARCHITECT | PRODUCTION GENAI SYSTEMS',
    availability: 'Booking discovery calls',
    ctaLabel: 'See My Work',
  },
  engineer: {
    subheadline: 'AI ARCHITECT & MCP SERVER AUTHOR',
    availability: 'Open to collaborations',
  },
};

/** Decode the obfuscated email address at runtime */
export function decodeEmail(): string {
  return atob(footer.links.emailEncoded);
}

export const footer = {
  signoff: '',
  links: {
    // Base64-encoded to prevent scraping from static HTML
    emailEncoded: 'Y2hyaXN0aWFuYm91cmxpZXJAZ21haWwuY29t',
    linkedin: 'https://linkedin.com/in/christianbourlier',
    github: 'https://github.com/feelgreatfoodie',
    medium: 'https://medium.com/@christianbourlier',
    rezzedai: 'https://rezzed.ai',
    website: 'christianbourlier.com',
  },
  sections: [
    { label: 'Hero', anchor: '#hero' },
    { label: 'Journey', anchor: '#journey' },
    { label: 'Open To', anchor: '#opento' },
    { label: 'Workshop', anchor: '#workshop' },
    { label: 'Endgame', anchor: '#bossfight' },
    { label: 'Writing', anchor: '#writing' },
    { label: 'Contact', anchor: '#contact' },
  ],
} as const;
