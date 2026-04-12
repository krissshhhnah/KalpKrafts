export interface Course {
  id: string;
  title: string;
  level: string;
  costCredits: number;
  unlockedByDefault: boolean;
  description: string;
  markdownFile: string;
}

export const COURSES: Course[] = [
  {
    id: 'system-design',
    title: 'System Design Masterclass',
    level: 'Architecture',
    costCredits: 0,
    unlockedByDefault: true,
    description: 'Learn the core principles of horizontal scaling, microservices, load balancing, and database shading essential for FAANG interviews.',
    markdownFile: 'system-design.md'
  },
  {
    id: 'cloud-native',
    title: 'Kubernetes Orchestration',
    level: 'DevOps',
    costCredits: 50,
    unlockedByDefault: false,
    description: 'Master container orchestration, Pods, Deployments, Services, and ingress scaling strategies for modern cloud deployments.',
    markdownFile: 'kubernetes.md'
  },
  {
    id: 'advanced-react',
    title: 'Advanced React Patterns',
    level: 'Senior Frontend',
    costCredits: 50,
    unlockedByDefault: false,
    description: 'Dive deep into React Server Components, concurrent rendering, memory optimization, and custom hooks.',
    markdownFile: 'react-patterns.md'
  }
];
