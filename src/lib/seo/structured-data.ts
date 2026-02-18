export function getStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://christianbourlier.com/#person',
        name: 'Christian Bourlier',
        givenName: 'Christian',
        familyName: 'Bourlier',
        description:
          'Principal AI & Data Solutions Architect. MCP Server Author. Production GenAI systems on Claude, Gemini & Vertex AI. I build the system AND close the deal.',
        jobTitle: [
          'Principal AI & Data Solutions Architect',
          'MCP Server Author',
          'AI Solutions Architect',
          'Data Engineer',
          'Technical Account Manager',
        ],
        url: 'https://christianbourlier.com',
        image: 'https://christianbourlier.com/opengraph-image',
        sameAs: [
          'https://linkedin.com/in/christianbourlier',
          'https://medium.com/@christianbourlier',
          'https://rezzed.ai',
          'https://github.com/feelgreatfoodie',
        ],
        knowsAbout: [
          'Technical Engineering',
          'Solutions Architecture',
          'AI/ML',
          'Machine Learning',
          'GCP',
          'Google Cloud Platform',
          'BigQuery',
          'Vertex AI',
          'LangChain',
          'Python',
          'TypeScript',
          'Enterprise Sales',
          'Cloud Architecture',
          'Data Pipelines',
          'ETL',
          'SQL',
          'Terraform',
          'Next.js',
          'Technical Account Management',
          'Model Context Protocol (MCP)',
          'MCP Server Development',
          'Production GenAI Systems',
          'Claude API',
          'Gemini',
          'Anthropic',
          'LLM Orchestration',
          'Agentic Workflows',
          'Multi-Agent Systems',
          'RAG Pipelines',
          'Prompt Engineering',
          'AI Strategy',
        ],
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'certification',
            name: 'Google Cloud Professional Data Engineer',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Google Cloud',
            },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: 'certification',
            name: 'Google Cloud Professional Cloud Architect',
            recognizedBy: {
              '@type': 'Organization',
              name: 'Google Cloud',
            },
          },
        ],
        hasOccupation: [
          {
            '@type': 'Occupation',
            name: 'Principal AI & Data Solutions Architect',
            occupationLocation: {
              '@type': 'Country',
              name: 'US',
            },
            skills:
              'Cloud Architecture, GCP, Vertex AI, BigQuery, Terraform, Python, TypeScript, MCP Server Development, Claude API, LLM Orchestration, Agentic Workflows',
          },
          {
            '@type': 'Occupation',
            name: 'Data Engineer',
            occupationLocation: {
              '@type': 'Country',
              name: 'US',
            },
            skills:
              'Data Pipelines, ETL, BigQuery, SQL, Python, GCP, Machine Learning',
          },
        ],
      },
      {
        '@type': 'WebSite',
        name: 'Christian Bourlier',
        description:
          'Personal portfolio of Christian Bourlier — Principal AI & Data Solutions Architect, MCP Server Author. Production GenAI systems on Claude, Gemini & Vertex AI.',
        url: 'https://christianbourlier.com',
        publisher: {
          '@id': 'https://christianbourlier.com/#person',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://christianbourlier.com' },
          { '@type': 'ListItem', position: 2, name: 'Journey', item: 'https://christianbourlier.com/#journey' },
          { '@type': 'ListItem', position: 3, name: 'Competencies', item: 'https://christianbourlier.com/#competencies' },
          { '@type': 'ListItem', position: 4, name: 'Open To', item: 'https://christianbourlier.com/#opento' },
          { '@type': 'ListItem', position: 5, name: 'Workshop', item: 'https://christianbourlier.com/#workshop' },
          { '@type': 'ListItem', position: 6, name: 'Writing', item: 'https://christianbourlier.com/#writing' },
          { '@type': 'ListItem', position: 7, name: 'Contact', item: 'https://christianbourlier.com/#contact' },
        ],
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Brianna Mersey' },
        reviewBody: 'A highly skilled senior data engineer with strong expertise in pipelining complex data sources, GCP, BQML and the broader Google ecosystem. He consistently delivered scalable, efficient solutions while making collaboration easy and enjoyable.',
        itemReviewed: { '@id': 'https://christianbourlier.com/#person' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Craig Quincy' },
        reviewBody: 'A naturally curious and technically adept person. Christian is a natural leader who motivates his team to accomplish their goals and have fun doing it. He is an exceptional individual who functions well in both the technical and people realms.',
        itemReviewed: { '@id': 'https://christianbourlier.com/#person' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Eric Budd' },
        reviewBody: 'Christian has been terrific to work with. I value his energy for learning, teaching others, and creating an environment where everyone has fun. His thoroughness and attention to detail were key to making a great product.',
        itemReviewed: { '@id': 'https://christianbourlier.com/#person' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is an MCP Server and why does it matter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'MCP (Model Context Protocol) servers let AI agents like Claude access external tools, data, and services securely. As an MCP Server Author, Christian builds production-grade MCP servers that give AI agents real-world capabilities — from database access to API orchestration.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are production GenAI systems?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Production GenAI systems go beyond prototypes — they are enterprise-grade AI applications built on Claude, Gemini, and Vertex AI that handle real workloads at scale. This includes RAG pipelines, multi-agent orchestration, agentic workflows, and LLM-powered automation with proper monitoring, error handling, and cost optimization.',
            },
          },
        ],
      },
    ],
  };
}
