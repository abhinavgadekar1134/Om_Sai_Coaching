import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Course, Student, Staff, User } from "./models.ts";
import apiRoutes from "./routes.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Update CORS to allow requests from any origin
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (MONGODB_URI) {
  mongoose
    .connect(MONGODB_URI)
    .then(async () => {
      console.log("Connected to MongoDB");
      await seedCourses();
      await migrateProfiles();
    })
    .catch((err) => console.error("MongoDB connection error:", err));
} else {
  console.warn("MONGODB_URI not found in environment variables. Database features will not work.");
}

async function migrateProfiles() {
  try {
    const users = await User.find();
    for (const user of users) {
      if (user.role === "student") {
        const studentExists = await Student.findOne({ user: user._id });
        if (!studentExists) {
          await new Student({ user: user._id }).save();
          console.log(`Created student profile for ${user.email}`);
        }
      } else if (user.role === "staff") {
        const staffExists = await Staff.findOne({ user: user._id });
        if (!staffExists) {
          await new Staff({ 
            user: user._id,
            department: "General",
            salary: 0,
            subjects: "Needs Update",
            education: "Needs Update"
          }).save();
          console.log(`Created staff profile for ${user.email}`);
        } else {
          await Staff.updateOne(
            { _id: staffExists._id },
            { 
              $set: { 
                subjects: staffExists.subjects || "Needs Update",
                education: staffExists.education || "Needs Update"
              } 
            }
          );
        }
      }
    }
  } catch (err) {
    console.error("Migration error:", err);
  }
}

async function seedCourses() {
  try {
    const count = await Course.countDocuments();
    if (count === 0) {
      console.log("Seeding courses...");
      const initialCourses = [
        {
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
          title: "11th Standard",
          category: "Boards",
          description: "Building a strong foundation for 11th Standard Science and Commerce streams.",
          longDescription: "The 11th Standard is a crucial bridge year. We focus on building fundamental concepts that are essential for 12th boards and competitive exams. Students get detailed notes for all subjects.",
          price: 30000,
          duration: "1 Year",
          color: "green",
          features: ["Concept Building", "Regular Assessments", "Stream-specific Focus", "Interactive Learning", "Subject Notes"],
          achievements: ["Solid Conceptual Base", "Smooth Transition to 12th", "Improved Academic Performance"]
        }
      ];
      await Course.insertMany(initialCourses);
      console.log("Successfully seeded courses");
    }
  } catch (err) {
    console.error("Error seeding courses:", err);
  }
}

// API Routes
app.use("/api", apiRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Om Sai Coaching Classes API is running" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
