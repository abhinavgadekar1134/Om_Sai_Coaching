import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import { Resend } from "resend";
import { User, Course, Payment, Note, Event, Testimonial, SuccessStory, Contact, Student, Staff } from "./models.ts";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

// Middleware to verify JWT
export const authenticate = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Middleware to check roles
export const authorize = (roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// Razorpay Routes
router.post("/razorpay/order", authenticate, async (req: any, res: any) => {
  try {
    const { courseId, amount } = req.body;
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/razorpay/verify", authenticate, async (req: any, res: any) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, amount } = req.body;

    // In a real app, you'd verify the signature here using crypto
    // const crypto = await import("crypto");
    // const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
    // hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    // const generated_signature = hmac.digest("hex");
    // if (generated_signature !== razorpay_signature) throw new Error("Invalid signature");

    // Payment successful, update database
    const payment = new Payment({
      student: req.user.id,
      course: courseId,
      amount: amount,
      type: "online",
      status: "paid",
      transactionId: razorpay_payment_id,
    });
    await payment.save();

    // Enroll student in course
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { enrolledCourses: courseId }
    });

    // Send confirmation email
    const user = await User.findById(req.user.id);
    const course = await Course.findById(courseId);

    if (user && course) {
      try {
        await resend.emails.send({
          from: "Om Sai Classes <onboarding@resend.dev>",
          to: user.email,
          subject: "Course Enrollment Confirmation",
          html: `<p>Hello ${user.name},</p><p>You have successfully enrolled in <strong>${course.title}</strong>. Your payment of ₹${amount} has been received.</p><p>Welcome to Om Sai Coaching Classes!</p>`,
        });
      } catch (emailErr) {
        console.error("Email sending failed:", emailErr);
      }

      // WhatsApp Notification (Placeholder logic)
      console.log(`WhatsApp notification would be sent to ${user.phone || "user"} for course ${course.title}`);
    }

    res.json({ success: true, payment });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Auth Routes
router.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Create specialized profile
    if (role === "student") {
      const student = new Student({ user: user._id });
      await student.save();
    } else if (role === "staff") {
      const staff = new Staff({ user: user._id });
      await staff.save();
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// User Routes
router.get("/users", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/users/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Course Routes
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/courses", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Payment Routes
router.get("/payments", authenticate, async (req: any, res: any) => {
  try {
    let query = {};
    if (req.user.role === "student") {
      query = { student: req.user.id };
    }
    const payments = await Payment.find(query).populate("student course");
    res.json(payments);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/payments", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.json(payment);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Note Routes
router.get("/notes", authenticate, async (req: any, res: any) => {
  try {
    let query = {};
    if (req.user.role === "student") {
      const user = await User.findById(req.user.id);
      query = { course: { $in: user?.enrolledCourses } };
    }
    const notes = await Note.find(query).populate("course uploadedBy");
    res.json(notes);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/notes", authenticate, authorize(["admin", "staff"]), async (req: any, res: any) => {
  try {
    const note = new Note({ ...req.body, uploadedBy: req.user.id });
    await note.save();
    res.json(note);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Public Content Routes (Success Stories, Testimonials, Events)
router.get("/success-stories", async (req, res) => {
  const stories = await SuccessStory.find();
  res.json(stories);
});

router.post("/success-stories", authenticate, authorize(["admin"]), async (req, res) => {
  const story = new SuccessStory(req.body);
  await story.save();
  res.json(story);
});

router.get("/testimonials", async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
});

router.post("/testimonials", authenticate, authorize(["admin"]), async (req, res) => {
  const testimonial = new Testimonial(req.body);
  await testimonial.save();
  res.json(testimonial);
});

router.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.post("/events", authenticate, authorize(["admin"]), async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

// Contact Routes
router.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, message: "Message sent successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/contacts", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/contacts/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Staff Management (Admin only)
router.get("/staff", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" }).select("-password");
    res.json(staff);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Course Management (Admin only)
router.put("/courses/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/courses/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Student Management
router.get("/students", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const students = await Student.find().populate("user enrolledCourses");
    res.json(students);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/students", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    // Logic to create both User and Student details if needed
    res.status(400).json({ message: "Use /auth/register to create new students" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/students/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("user enrolledCourses");
    res.json(student);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/students/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      await User.findByIdAndDelete(student.user);
      await Student.findByIdAndDelete(req.params.id);
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Staff Management
router.get("/staff-details", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const staff = await Staff.find().populate("user");
    res.json(staff);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/staff-details/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const updateData = {
      department: req.body.department,
      salary: req.body.salary,
      joinDate: req.body.joinDate,
      subjects: req.body.subjects,
      education: req.body.education
    };
    const staffResult = await Staff.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate("user");
    res.json(staffResult);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/staff-details/:id", authenticate, authorize(["admin"]), async (req, res) => {
  try {
    const staffResult = await Staff.findById(req.params.id);
    if (staffResult) {
      await User.findByIdAndDelete(staffResult.user);
      await Staff.findByIdAndDelete(req.params.id);
    }
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
