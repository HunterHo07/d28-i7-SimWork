'use client';

/**
 * SimWork dummy data for the MVP
 */

// Testimonials data
export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "HR Director, TechCorp",
    image: "/assets/testimonials/sarah.jpg",
    quote: "SimWork has transformed our hiring process. We've reduced mis-hires by 72% and cut onboarding time in half.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Engineering Manager, DataFlow",
    image: "/assets/testimonials/michael.jpg",
    quote: "The developer simulation is incredibly realistic. It's like watching candidates work in our actual environment before we hire them.",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica Williams",
    role: "Learning & Development, FinTech Inc",
    image: "/assets/testimonials/jessica.jpg",
    quote: "Our training completion rates jumped from 34% to 91% after implementing SimWork. The gamified approach makes all the difference.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "CTO, StartupX",
    image: "/assets/testimonials/david.jpg",
    quote: "As a startup, every hire is critical. SimWork helps us identify candidates who can truly perform, not just interview well.",
    rating: 5,
  },
  {
    id: 5,
    name: "Emily Nguyen",
    role: "Design Lead, CreativeHub",
    image: "/assets/testimonials/emily.jpg",
    quote: "The design challenges in SimWork are spot-on. We can actually see how designers think and work through real problems.",
    rating: 4,
  },
];

// Features data
export const features = [
  {
    id: 1,
    title: "Immersive 3D Environment",
    description: "Navigate a realistic office space with different departments and role-specific workstations.",
    icon: "CubeTransparentIcon",
  },
  {
    id: 2,
    title: "AI-Powered Tasks",
    description: "Dynamic challenges that adapt to user performance and provide personalized feedback.",
    icon: "BoltIcon",
  },
  {
    id: 3,
    title: "Multi-Role Support",
    description: "Simulations for developers, designers, project managers, data analysts, and more.",
    icon: "UsersIcon",
  },
  {
    id: 4,
    title: "Real-Time Analytics",
    description: "Comprehensive dashboards tracking performance metrics, skills, and improvement areas.",
    icon: "ChartBarIcon",
  },
  {
    id: 5,
    title: "OCR Asset Evaluation",
    description: "Submit design work and get AI-powered feedback on visual assets and creative solutions.",
    icon: "DocumentTextIcon",
  },
  {
    id: 6,
    title: "Embedded Tools",
    description: "Integrated IDE, design canvas, and data tools that mirror real-world applications.",
    icon: "WrenchScrewdriverIcon",
  },
];

// Pricing plans
export const pricingPlans = [
  {
    id: "individual",
    name: "Individual",
    description: "Perfect for professionals looking to upskill or prepare for interviews.",
    price: 29,
    billingPeriod: "month",
    features: [
      "Access to all simulations",
      "Personal progress tracking",
      "Basic analytics",
      "Export performance reports",
      "Community forum access",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    id: "team",
    name: "Team",
    description: "Ideal for small teams and growing companies.",
    price: 99,
    billingPeriod: "month",
    perSeat: true,
    minSeats: 5,
    features: [
      "All Individual features",
      "Team management dashboard",
      "Custom scenarios",
      "Comparative analytics",
      "Shared resources",
      "Priority support",
    ],
    cta: "Contact Sales",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Comprehensive solution for large organizations.",
    price: 249,
    billingPeriod: "month",
    perSeat: true,
    minSeats: 20,
    features: [
      "All Team features",
      "Custom integration",
      "Advanced analytics",
      "White-labeling",
      "Dedicated support",
      "Custom role development",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

// Demo roles
export const demoRoles = [
  {
    id: "developer",
    title: "Developer",
    description: "Write code, debug issues, and build features in a simulated IDE environment.",
    icon: "CodeBracketIcon",
    color: "blue",
    tasks: [
      "Fix a bug in a React component",
      "Implement a new API endpoint",
      "Optimize database queries",
      "Create a responsive layout",
      "Write unit tests for a function",
    ],
  },
  {
    id: "designer",
    title: "Designer",
    description: "Create UI designs, mockups, and visual assets in a simulated design environment.",
    icon: "PaintBrushIcon",
    color: "purple",
    tasks: [
      "Design a landing page",
      "Create a logo for a brand",
      "Design a mobile app interface",
      "Create an icon set",
      "Design a color palette",
    ],
  },
  {
    id: "pm",
    title: "Project Manager",
    description: "Plan projects, manage resources, and track progress in a simulated PM environment.",
    icon: "ClipboardDocumentListIcon",
    color: "green",
    tasks: [
      "Create a project timeline",
      "Allocate resources to tasks",
      "Manage stakeholder expectations",
      "Handle scope changes",
      "Conduct a sprint planning session",
    ],
  },
  {
    id: "data",
    title: "Data Analyst",
    description: "Analyze data, create visualizations, and derive insights in a simulated data environment.",
    icon: "ChartPieIcon",
    color: "yellow",
    tasks: [
      "Clean and prepare a dataset",
      "Create data visualizations",
      "Perform statistical analysis",
      "Build a dashboard",
      "Generate a report with insights",
    ],
  },
  {
    id: "ai",
    title: "AI Engineer",
    description: "Design prompts, fine-tune models, and create AI applications in a simulated AI environment.",
    icon: "CpuChipIcon",
    color: "red",
    tasks: [
      "Design effective prompts",
      "Debug AI model outputs",
      "Create a chatbot workflow",
      "Implement content moderation",
      "Optimize token usage",
    ],
  },
];

// Competitor comparison
export const competitors = [
  {
    id: "simwork",
    name: "SimWork",
    features: {
      immersiveEnvironment: true,
      multiRoleSupport: true,
      realTimeAnalytics: true,
      aiAdaptivity: true,
      ocrAssetEvaluation: true,
      embeddedTools: true,
      gamification: true,
      realWorldTasks: true,
    },
  },
  {
    id: "coderpad",
    name: "CoderPad",
    features: {
      immersiveEnvironment: false,
      multiRoleSupport: false,
      realTimeAnalytics: true,
      aiAdaptivity: false,
      ocrAssetEvaluation: false,
      embeddedTools: true,
      gamification: false,
      realWorldTasks: true,
    },
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    features: {
      immersiveEnvironment: false,
      multiRoleSupport: false,
      realTimeAnalytics: true,
      aiAdaptivity: false,
      ocrAssetEvaluation: false,
      embeddedTools: true,
      gamification: true,
      realWorldTasks: false,
    },
  },
  {
    id: "pluralsight",
    name: "Pluralsight",
    features: {
      immersiveEnvironment: false,
      multiRoleSupport: true,
      realTimeAnalytics: true,
      aiAdaptivity: false,
      ocrAssetEvaluation: false,
      embeddedTools: false,
      gamification: false,
      realWorldTasks: false,
    },
  },
];

// Stats
export const stats = [
  {
    id: 1,
    value: 72,
    suffix: "%",
    label: "Reduction in mis-hires",
  },
  {
    id: 2,
    value: 3,
    suffix: "x",
    label: "Faster onboarding",
  },
  {
    id: 3,
    value: 91,
    suffix: "%",
    label: "Training completion rate",
  },
  {
    id: 4,
    value: 68,
    suffix: "%",
    label: "Cost savings",
  },
];
