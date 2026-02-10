export interface Project {
  name: string;
  url: string;
  status: 'Production' | 'Personal';
  type: string;
  description: string;
  techStack: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

export const PROJECTS: Project[] = [
  {
    name: 'LanUp',
    url: 'https://lanup.digital',
    status: 'Production',
    type: 'Web App',
    description: 'Production web application',
    techStack: []
  },
  {
    name: 'EducarAM',
    url: 'https://sistemaeducaram.online/login',
    status: 'Production',
    type: 'Web App',
    description: 'Production web application',
    techStack: []
  },
  {
    name: 'Zordix',
    url: 'https://zordix-ui.vercel.app',
    status: 'Production',
    type: 'Discord Bot + Web UI',
    description: 'Discord bot with web interface',
    techStack: []
  },
  {
    name: 'iBook',
    url: 'https://ibook-orcin.vercel.app/login',
    status: 'Production',
    type: 'Web + Mobile App',
    description: 'Web and mobile application',
    techStack: []
  },
  {
    name: 'Fawkes Tecnologia',
    url: 'https://fawkestecnologia.digital',
    status: 'Production',
    type: 'Institutional',
    description: 'Institutional website',
    techStack: []
  },
  {
    name: 'Portfolio',
    url: 'https://jose-rui.vercel.app',
    status: 'Personal',
    type: 'Portfolio',
    description: 'Personal portfolio website',
    techStack: []
  }
];

export const EXPERIENCE: Experience[] = [
  {
    company: 'Bemol',
    role: 'Software Engineer',
    period: 'Mar 2024 – Present',
    location: 'Remote',
    achievements: [
      'Built and maintained scalable RESTful APIs using C# and .NET',
      'Used Entity Framework with PostgreSQL running in Docker',
      'Integrated Azure services including Service Bus, Application Insights and Container Registry',
      'Deployed and managed applications using Azure Kubernetes Service (AKS)',
      'Refactored legacy systems ensuring system stability during modernization',
      'Worked with SAP integrations (RFCs) and internal system improvements'
    ]
  },
  {
    company: 'UneCont',
    role: 'Backend Developer',
    period: 'Sep 2024 – Nov 2024',
    location: 'Remote',
    achievements: [
      'Worked on system maintenance and issue resolution in fiscal automation platforms',
      'Developed and maintained applications using .NET Framework 4.8',
      'Built integrations using HttpClient and SOAP services',
      'Ensured system stability and operational continuity'
    ]
  },
  {
    company: 'Hooney+',
    role: 'Fullstack Developer',
    period: 'Apr 2024 – Sep 2024',
    location: 'Remote',
    achievements: [
      'Developed scalable APIs using NestJS and TypeScript',
      'Worked with PostgreSQL and Prisma ORM',
      'Contributed to mobile features using React Native',
      'Collaborated with cross-functional teams in agile routines'
    ]
  },
  {
    company: 'Fawkes Tecnologia',
    role: 'Fullstack Developer',
    period: 'Jan 2024 – Dec 2024',
    location: 'Remote',
    achievements: [
      'Hosted and managed Docker containers on AWS EC2',
      'Implemented CI/CD pipelines using GitHub Actions',
      'Built GraphQL APIs using AWS Amplify',
      'Integrated Amazon S3 for media storage',
      'Developed mobile apps using React Native with Clean Architecture',
      'Managed Google Play Store deployments'
    ]
  },
  {
    company: 'Bemol Digital',
    role: 'Software Engineer Intern',
    period: 'Mar 2023 – Mar 2024',
    location: 'Brazil',
    achievements: [
      'Migrated a legacy Node.js API to a scalable .NET service',
      'Integrated third-party services for document validation',
      'Created CI/CD pipelines for automated deployments',
      'Wrote internal technical documentation on Azure Wiki'
    ]
  },
  {
    company: 'IFAM',
    role: 'Junior Web Developer',
    period: 'Jan 2020 – Dec 2020',
    location: 'Brazil',
    achievements: [
      'Built a web-based inventory management system',
      'Developed frontend using Vue.js and Bootstrap',
      'Implemented backend using PHP with PDO',
      'Used MySQL for data persistence'
    ]
  }
];

export const INFRASTRUCTURE_SKILLS = [
  'Docker & containerized applications',
  'Nginx reverse proxy',
  'HTTPS & SSL certificates',
  'Linux servers via SSH',
  'AWS S3 & S3-compatible storage',
  'Azure Service Bus',
  'Azure Functions',
  'Azure Kubernetes Service (AKS)',
  'Azure App Registrations',
  'MongoDB & relational databases',
  'Vercel deployments',
  'CI/CD pipelines (GitHub Actions, Azure DevOps)'
];
