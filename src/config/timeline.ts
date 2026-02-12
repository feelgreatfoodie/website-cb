export interface TimelineEntry {
  year: number;
  title: string;
  org: string;
  stream: 'data' | 'sales' | 'poker';
  highlights: string[];
}

export const timeline: TimelineEntry[] = [
  {
    year: 2004,
    title: 'Enterprise Sales Launch',
    org: 'Lanier Worldwide / Ricoh',
    stream: 'sales',
    highlights: [
      'B2B hardware/software sales',
      'President\'s Club qualifier',
      'Enterprise account management',
    ],
  },
  {
    year: 2007,
    title: 'Sales Leadership',
    org: 'Various',
    stream: 'sales',
    highlights: [
      'Team building & mentoring',
      '$500K+ contract expansions',
      'Consultative selling methodology',
    ],
  },
  {
    year: 2011,
    title: 'Professional Poker',
    org: 'Self-Employed',
    stream: 'poker',
    highlights: [
      'Full-time professional player',
      'Risk assessment & bankroll management',
      'Pattern recognition & game theory',
    ],
  },
  {
    year: 2018,
    title: 'Data Engineering Pivot',
    org: 'Galvanize',
    stream: 'data',
    highlights: [
      'Full-stack web development immersive',
      'Python, JavaScript, React, Node.js',
    ],
  },
  {
    year: 2019,
    title: 'Data Engineering',
    org: 'Various',
    stream: 'data',
    highlights: [
      'GCP Professional Data Engineer',
      'BigQuery, Airflow, dbt',
      'ETL/ELT pipeline architecture',
    ],
  },
  {
    year: 2022,
    title: 'Solutions Architecture',
    org: 'Various',
    stream: 'data',
    highlights: [
      'GCP Professional Cloud Architect',
      'AI/ML integration',
      'Full-stack product development',
    ],
  },
  {
    year: 2024,
    title: 'Technical Solutions Partner',
    org: 'Independent',
    stream: 'data',
    highlights: [
      'OptiMeasure, CacheBash, AI Portal',
      'Vertex AI, LangChain',
      'POCs in days, not quarters',
    ],
  },
];
