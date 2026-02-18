export interface TimelineEntry {
  year: number;
  endYear?: number | 'Present';
  title: string;
  org: string;
  stream: 'data' | 'sales' | 'poker';
  highlights: string[];
}

export const timeline: TimelineEntry[] = [
  {
    year: 2004,
    endYear: 2014,
    title: 'Professional Poker',
    org: 'Self-Employed',
    stream: 'poker',
    highlights: [
      'Full-time professional for a decade',
      'Featured in Card Player Magazine',
      'Risk assessment, game theory, bankroll management',
      'Pattern recognition & opponent modeling',
    ],
  },
  {
    year: 2013,
    endYear: 2014,
    title: 'Real Estate & Investment',
    org: 'Big Dog Investment Properties',
    stream: 'sales',
    highlights: [
      'Real estate investment & property management',
      'Deal sourcing, negotiation, portfolio growth',
      'Tenant relations & lease management',
      'Market analysis & acquisition strategy',
    ],
  },
  {
    year: 2014,
    title: 'District Sales Manager',
    org: 'Verizon 4G Wireless',
    stream: 'sales',
    highlights: [
      'Turned worst-performing store to #1 in region',
      'Led teams of 15+; P&L ownership',
      'Enterprise B2B & solution selling',
      'Hiring, training, and KPI management',
    ],
  },
  {
    year: 2016,
    endYear: 2018,
    title: 'Strategy & Operations Lead',
    org: 'Dream Stay',
    stream: 'sales',
    highlights: [
      'Scaled portfolio from 10 to 50 properties (5\u00D7 growth)',
      'Pricing optimization & operations systems',
      'Guest communications & revenue management',
      'Built processes that ran at scale without added headcount',
    ],
  },
  {
    year: 2018,
    title: 'Engineering Pivot',
    org: 'Hack Reactor @ Galvanize',
    stream: 'data',
    highlights: [
      'Software Engineering Immersive',
      'Co-founded Let\'s Go! (React Native app)',
      'Full-stack internship at Represent Dev Agency',
      'Python, JavaScript, React, Node.js',
    ],
  },
  {
    year: 2019,
    endYear: 2021,
    title: 'Data Scientist / TSE',
    org: 'MightyHive',
    stream: 'data',
    highlights: [
      'Data science models (scikit-learn, TensorFlow)',
      'Marketing attribution & audience insights',
      'Automated reporting \u2014 BigQuery, Data Studio, Python',
      'Technical solutions bridging client needs & engineering',
    ],
  },
  {
    year: 2021,
    endYear: 2025,
    title: 'Senior Data Engineer',
    org: 'Monks (S4Capital)',
    stream: 'data',
    highlights: [
      'Promoted from DE to Senior DE in 2 years',
      '60M+ records/day pipelines on GCP',
      'Led $1M+ contract expansions via technical demos',
      'BQML models, dbt, Airflow, Dataflow, Looker',
    ],
  },
  {
    year: 2025,
    title: 'Co-founder & Principal Architect',
    org: 'Three Bears Data',
    stream: 'data',
    highlights: [
      'OptiMeasure \u2014 cookieless attribution engine',
      'AI-Augmentation Portal for non-technical users',
      'Full-stack platform: Next.js, Three.js, GA4, AI',
    ],
  },
  {
    year: 2025,
    endYear: 'Present',
    title: 'Founder & Principal Architect',
    org: 'Rezzed.ai',
    stream: 'data',
    highlights: [
      'Building tools for developers who code with AI',
      'CacheBash \u2014 MCP server with 16 tools',
      'Multi-agent orchestration & developer workflows',
      'TypeScript, Cloud Run, Firestore, Flutter',
    ],
  },
];
