export interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  color: "red" | "green" | "blue" | "orange" | "purple" | "emerald";
  features: string[];
  achievements: string[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "IIT-JEE Advanced",
    category: "Competitive",
    description: "Comprehensive coaching for Physics, Chemistry, and Mathematics for JEE Advanced aspirants.",
    longDescription: "Our IIT-JEE Advanced course is designed to provide students with a deep understanding of complex concepts. We focus on problem-solving techniques and time management skills essential for cracking one of the toughest exams in the world. Students receive comprehensive notes for each subject.",
    price: 45000,
    duration: "1 Year",
    color: "blue",
    features: ["Daily Practice Papers", "Weekly Mock Tests", "Personalized Mentorship", "Doubt Solving Sessions", "Comprehensive Subject Notes"],
    achievements: ["Admission to Top IITs", "Strong Analytical Skills", "Mastery over PCM", "Competitive Edge"]
  },
  {
    id: 2,
    title: "NEET Medical",
    category: "Competitive",
    description: "Specialized coaching for Biology, Physics, and Chemistry for medical entrance exams.",
    longDescription: "The NEET Medical course at Om Sai Classes emphasizes conceptual clarity in Biology and Physics. Our expert faculty ensures that students are well-prepared for the competitive medical entrance landscape. Detailed notes for all subjects are provided.",
    price: 40000,
    duration: "1 Year",
    color: "red",
    features: ["NCERT Focused Learning", "Regular Test Series", "Expert Biology Faculty", "Anatomy Workshops", "Subject-wise Notes"],
    achievements: ["Admission to Premier Medical Colleges", "Deep Biological Understanding", "Clinical Reasoning Skills"]
  },
  {
    id: 3,
    title: "CET Classes",
    category: "Competitive",
    description: "Focused preparation for State Common Entrance Tests with emphasis on speed and accuracy.",
    longDescription: "Our CET course is tailored for students aiming for state-level engineering and pharmacy colleges. We provide intensive training on speed and accuracy to help students score their best. Includes dedicated notes for every subject.",
    price: 30000,
    duration: "6 Months",
    color: "green",
    features: ["State Syllabus Coverage", "Speed Building Drills", "Mock CET Exams", "Short-cut Techniques", "Full Subject Notes"],
    achievements: ["Top State Ranks", "Speed & Accuracy Mastery", "Admission to State Engineering Colleges"]
  },
  {
    id: 4,
    title: "12th Standard",
    category: "Boards",
    description: "Intensive coaching for 12th Board exams (Science/Commerce) with focus on high scores.",
    longDescription: "Our 12th Standard program covers the entire board syllabus with multiple revisions and preliminary exams. We ensure students are confident and well-prepared for their board examinations. Subject-wise notes are a key part of the curriculum.",
    price: 35000,
    duration: "1 Year",
    color: "blue",
    features: ["Board Syllabus Mastery", "Previous Year Paper Solving", "Regular Revisions", "Preliminary Exams", "Handwritten Notes"],
    achievements: ["Excellent Board Percentages", "Strong Foundation for Degree", "Academic Confidence"]
  },
  {
    id: 5,
    title: "11th Standard",
    category: "Boards",
    description: "Building a strong foundation for 11th Standard Science and Commerce streams.",
    longDescription: "The 11th Standard is a crucial bridge year. We focus on building fundamental concepts that are essential for 12th boards and competitive exams. Students get detailed notes for all subjects.",
    price: 30000,
    duration: "1 Year",
    color: "green",
    features: ["Concept Building", "Regular Assessments", "Stream-specific Focus", "Interactive Learning", "Subject Notes"],
    achievements: ["Solid Conceptual Base", "Smooth Transition to 12th", "Improved Academic Performance"]
  },
  {
    id: 6,
    title: "8th Standard",
    category: "Foundation",
    description: "Strengthening core subjects for 8th standard students to prepare for high school.",
    longDescription: "Our 8th Standard course focuses on Mathematics, Science, and English. We aim to build a strong academic base and develop critical thinking skills. Notes for each subject are provided to aid learning.",
    price: 15000,
    duration: "1 Year",
    color: "orange",
    features: ["Core Subject Focus", "Mental Ability Training", "Regular Quizzes", "Parent-Teacher Meetings", "Simplified Notes"],
    achievements: ["Strong School Performance", "Critical Thinking Skills", "Preparation for High School"]
  },
  {
    id: 7,
    title: "7th Standard",
    category: "Foundation",
    description: "Nurturing young minds with a focus on fundamental concepts and school excellence.",
    longDescription: "The 7th Standard course is designed to make learning enjoyable and effective. We focus on clarity of concepts and building a habit of regular study. Includes easy-to-understand notes for all subjects.",
    price: 12000,
    duration: "1 Year",
    color: "purple",
    features: ["Interactive Teaching", "Concept Clarity", "Regular Homework Help", "Skill Development", "Subject-wise Notes"],
    achievements: ["Improved School Grades", "Love for Learning", "Strong Basic Knowledge"]
  }
];
