export interface Category {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
  }[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    subcategories: [
      { id: 'react', name: 'React' },
      { id: 'vue', name: 'Vue' },
      { id: 'angular', name: 'Angular' },
      { id: 'nextjs', name: 'Next.js' },
      { id: 'css', name: 'CSS / Tailwind' },
      { id: 'typescript-frontend', name: 'TypeScript во фронтенде' },
      { id: 'testing-frontend', name: 'Тестирование UI' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    subcategories: [
      { id: 'node', name: 'Node.js' },
      { id: 'nestjs', name: 'NestJS' },
      { id: 'python-backend', name: 'Python / Django / FastAPI' },
      { id: 'java-backend', name: 'Java / Spring' },
      { id: 'dotnet-backend', name: '.NET / C#' },
      { id: 'go-backend', name: 'Go' },
      { id: 'api-design', name: 'REST / GraphQL API' },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps / Infra',
    subcategories: [
      { id: 'docker', name: 'Docker' },
      { id: 'kubernetes', name: 'Kubernetes' },
      { id: 'ci-cd', name: 'CI/CD' },
      { id: 'monitoring', name: 'Мониторинг и логи' },
      { id: 'cloud', name: 'Облака (AWS / GCP / Azure)' },
      { id: 'infra-as-code', name: 'Infrastructure as Code (Terraform)' },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    subcategories: [
      { id: 'react-native', name: 'React Native' },
      { id: 'flutter', name: 'Flutter' },
      { id: 'android', name: 'Android (Kotlin / Java)' },
      { id: 'ios', name: 'iOS (Swift)' },
      { id: 'mobile-architecture', name: 'Архитектура мобильных приложений' },
    ],
  },
  {
    id: 'gamedev',
    name: 'GameDev',
    subcategories: [
      { id: 'unity', name: 'Unity' },
      { id: 'unreal', name: 'Unreal Engine' },
      { id: 'game-design', name: 'Геймдизайн' },
      { id: 'graphics', name: 'Графика и шейдеры' },
    ],
  },
  {
    id: 'databases',
    name: 'Базы данных',
    subcategories: [
      { id: 'sql', name: 'SQL (PostgreSQL / MySQL)' },
      { id: 'nosql', name: 'NoSQL (MongoDB / Redis)' },
      { id: 'db-design', name: 'Проектирование БД' },
      { id: 'db-performance', name: 'Производительность и оптимизация запросов' },
    ],
  },
  {
    id: 'one-c',
    name: '1C',
    subcategories: [
      { id: 'one-c-config', name: 'Конфигурирование' },
      { id: 'one-c-integration', name: 'Интеграции' },
      { id: 'one-c-performance', name: 'Производительность и оптимизация' },
    ],
  },
  {
    id: 'testing',
    name: 'Тестирование',
    subcategories: [
      { id: 'unit-tests', name: 'Юнит-тесты' },
      { id: 'e2e-tests', name: 'E2E-тесты' },
      { id: 'qa', name: 'Ручное тестирование / QA' },
      { id: 'performance-tests', name: 'Нагрузочное тестирование' },
    ],
  },
  {
    id: 'architecture',
    name: 'Архитектура и паттерны',
    subcategories: [
      { id: 'clean-architecture', name: 'Clean Architecture' },
      { id: 'ddd', name: 'DDD' },
      { id: 'microservices', name: 'Микросервисы' },
      { id: 'event-driven', name: 'Event-driven архитектура' },
    ],
  },
  {
    id: 'career',
    name: 'Карьера и софт-скиллы',
    subcategories: [
      { id: 'interview', name: 'Собеседования' },
      { id: 'growth', name: 'План развития' },
      { id: 'management', name: 'Менеджмент и тимлидство' },
      { id: 'product-thinking', name: 'Продуктовое мышление' },
    ],
  },
];
