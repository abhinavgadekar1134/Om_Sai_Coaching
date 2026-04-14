import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "staff", "student"],
      default: "student",
    },
    phone: { type: String },
    address: { type: String },
    profileImage: { type: String },
    // For students
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    // For staff
    salary: { type: Number, default: 0 },
    salaryHistory: [
      {
        amount: Number,
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ["paid", "pending"], default: "paid" },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    longDescription: { type: String },
    price: { type: Number, required: true },
    duration: { type: String },
    batchStartDate: { type: Date },
    color: { type: String, enum: ["blue", "red", "green", "emerald", "purple", "orange"], default: "blue" },
    features: [{ type: String }],
    achievements: [{ type: String }],
    hasNotes: { type: Boolean, default: true },
    hasMentorship: { type: Boolean, default: true },
    installmentsEnabled: { type: Boolean, default: false },
    installmentCount: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);

const studentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: { type: String },
    address: { type: String },
    totalFees: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 },
    admissionDate: { type: Date, default: Date.now },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);

const staffSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    phone: { type: String },
    address: { type: String },
    salary: { type: Number, default: 0 },
    department: { type: String },
    joinDate: { type: Date, default: Date.now },
    subjects: { type: String, default: "" },
    education: { type: String, default: "" },
    salaryHistory: [
      {
        amount: Number,
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ["paid", "pending"], default: "paid" },
      },
    ],
  },
  { timestamps: true, strict: false }
);

export const Staff = mongoose.model("Staff", staffSchema);

const paymentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["cash", "online"], default: "cash" },
    status: { type: String, enum: ["paid", "pending", "due"], default: "paid" },
    dueDate: { type: Date },
    transactionId: { type: String },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    fileUrl: { type: String },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);

const testimonialSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, default: 5 },
    image: { type: String },
  },
  { timestamps: true }
);

export const Testimonial = mongoose.model("Testimonial", testimonialSchema);

const successStorySchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true },
    achievement: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const SuccessStory = mongoose.model("SuccessStory", successStorySchema);

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
