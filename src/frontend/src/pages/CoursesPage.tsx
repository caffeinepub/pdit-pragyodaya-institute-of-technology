import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  FileDown,
  IndianRupee,
  Layers,
  Loader2,
  Monitor,
  Palette,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
import type { Course } from "../backend.d";
import type { PageType } from "../components/Navbar";
import { useActor } from "../hooks/useActor";

// ── Fallback static courses ──────────────────────────────────────────────────
const FALLBACK_COURSES: Course[] = [
  {
    id: BigInt(1),
    title: "Web Development",
    subtitle: "Build beautiful, interactive websites",
    description:
      "Master the art of web development from scratch. Learn HTML5, CSS3, JavaScript (ES6+), and React to build professional, responsive websites. Includes hands-on projects and portfolio development.",
    topics: [
      "HTML5 & CSS3 Fundamentals",
      "JavaScript & ES6+",
      "React.js & Hooks",
      "Responsive Design",
      "Git & GitHub",
      "Project Portfolio",
    ],
    duration: "3 months",
    fee: "₹8,000",
    badge: "Popular",
    colorKey: "#3B82F6",
    isActive: true,
  },
  {
    id: BigInt(2),
    title: "Full Stack Development",
    subtitle: "Build complete web applications",
    description:
      "Become a complete web developer with the MERN stack. From database design to API development to beautiful frontends — this comprehensive course covers everything you need to build production-ready applications.",
    topics: [
      "MongoDB & Mongoose",
      "Express.js & REST APIs",
      "React.js Advanced",
      "Node.js Backend",
      "Authentication & Security",
      "Deployment & DevOps",
    ],
    duration: "6 months",
    fee: "₹15,000",
    badge: "Best Value",
    colorKey: "#7C3AED",
    isActive: true,
  },
  {
    id: BigInt(3),
    title: "Digital Marketing",
    subtitle: "Grow brands in the digital world",
    description:
      "Learn to drive business growth through digital channels. Master SEO, social media marketing, Google Ads, content marketing, and email automation. Includes real campaign management.",
    topics: [
      "SEO & Content Strategy",
      "Google Ads & Analytics",
      "Social Media Marketing",
      "Facebook & Instagram Ads",
      "Email Marketing",
      "Marketing Analytics",
    ],
    duration: "2 months",
    fee: "₹6,000",
    badge: "Fast Track",
    colorKey: "#059669",
    isActive: true,
  },
  {
    id: BigInt(4),
    title: "Graphic Design",
    subtitle: "Create stunning visual content",
    description:
      "Develop your creative skills with industry-standard tools. Learn Adobe Photoshop, Illustrator, and Canva to create logos, social media content, brochures, and brand identities.",
    topics: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva Pro",
      "Logo Design",
      "Brand Identity",
      "Social Media Graphics",
    ],
    duration: "2 months",
    fee: "₹5,000",
    badge: "Creative",
    colorKey: "#DB2777",
    isActive: true,
  },
  {
    id: BigInt(5),
    title: "Computer Applications",
    subtitle: "Essential skills for every profession",
    description:
      "Build a strong foundation in computer applications for office productivity. Master MS Office suite, accounting with Tally, internet fundamentals, and basic computer operations.",
    topics: [
      "MS Word & Excel",
      "PowerPoint & Presentations",
      "Tally ERP 9",
      "Internet & Email",
      "Data Entry Skills",
      "Google Workspace",
    ],
    duration: "3 months",
    fee: "₹4,000",
    badge: "Foundation",
    colorKey: "#EA580C",
    isActive: true,
  },
  {
    id: BigInt(6),
    title: "Freelancing Skills",
    subtitle: "Build your independent career",
    description:
      "Start earning online as a freelancer. Learn to set up profiles on Upwork, Fiverr, and Freelancer, build a winning portfolio, find clients, manage projects, and grow your freelancing income.",
    topics: [
      "Upwork & Fiverr Setup",
      "Profile Optimization",
      "Proposal Writing",
      "Client Management",
      "Payment Methods",
      "Growing Your Business",
    ],
    duration: "1 month",
    fee: "₹3,000",
    badge: "Quick Start",
    colorKey: "#0891B2",
    isActive: true,
  },
];

// ── Icon mapper ───────────────────────────────────────────────────────────────
function getCourseIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("web")) return Code;
  if (t.includes("full stack") || t.includes("fullstack")) return Layers;
  if (t.includes("digital")) return TrendingUp;
  if (t.includes("graphic")) return Palette;
  if (t.includes("computer")) return Monitor;
  if (t.includes("freelanc")) return Briefcase;
  return BookOpen;
}

// ── Brochure HTML generator ───────────────────────────────────────────────────
function generateBrochureHTML(course: Course): string {
  const topicsList = course.topics
    .map((t) => `<li style="margin:6px 0;">${t}</li>`)
    .join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${course.title} Brochure – PDIT</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #F9FAFB; color: #1F2937; }
    .cover {
      background: linear-gradient(135deg, ${course.colorKey} 0%, ${course.colorKey}cc 100%);
      color: white;
      padding: 60px 48px 48px;
    }
    .institute-tag { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.8; margin-bottom: 12px; }
    .course-title { font-size: 40px; font-weight: 800; line-height: 1.2; margin-bottom: 12px; }
    .course-subtitle { font-size: 18px; opacity: 0.85; margin-bottom: 32px; }
    .meta { display: flex; gap: 32px; flex-wrap: wrap; }
    .meta-item { background: rgba(255,255,255,0.15); border-radius: 12px; padding: 14px 20px; }
    .meta-label { font-size: 11px; letter-spacing: 1px; text-transform: uppercase; opacity: 0.75; }
    .meta-value { font-size: 22px; font-weight: 700; margin-top: 4px; }
    .body { padding: 48px; }
    .section-title { font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: ${course.colorKey}; font-weight: 700; margin-bottom: 16px; }
    .description { font-size: 16px; line-height: 1.7; color: #374151; margin-bottom: 40px; }
    .topics { background: white; border-radius: 16px; padding: 28px; box-shadow: 0 2px 16px rgba(0,0,0,0.06); margin-bottom: 40px; }
    .topics ul { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
    .topics li::before { content: '✓ '; color: ${course.colorKey}; font-weight: 700; }
    .topics li { font-size: 15px; color: #4B5563; }
    .cta { background: linear-gradient(135deg, ${course.colorKey} 0%, ${course.colorKey}cc 100%); color: white; border-radius: 16px; padding: 36px 28px; text-align: center; }
    .cta h3 { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
    .cta p { opacity: 0.9; margin-bottom: 20px; }
    .enroll-btn { display: inline-block; background: white; color: ${course.colorKey}; font-weight: 700; padding: 12px 36px; border-radius: 50px; font-size: 15px; text-decoration: none; }
    .footer { text-align: center; padding: 24px; color: #9CA3AF; font-size: 13px; border-top: 1px solid #E5E7EB; }
  </style>
</head>
<body>
  <div class="cover">
    <div class="institute-tag">Pragyodaya Institute of Technology (PDIT)</div>
    <div class="course-title">${course.title}</div>
    <div class="course-subtitle">${course.subtitle}</div>
    <div class="meta">
      <div class="meta-item">
        <div class="meta-label">Duration</div>
        <div class="meta-value">${course.duration}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Course Fee</div>
        <div class="meta-value">${course.fee}</div>
      </div>
      ${course.badge ? `<div class="meta-item"><div class="meta-label">Badge</div><div class="meta-value">${course.badge}</div></div>` : ""}
    </div>
  </div>
  <div class="body">
    <div class="section-title">About This Course</div>
    <div class="description">${course.description}</div>
    <div class="section-title">Topics Covered</div>
    <div class="topics">
      <ul>${topicsList}</ul>
    </div>
    <div class="cta">
      <h3>Ready to Start Your Journey?</h3>
      <p>Join hundreds of students who have transformed their careers with PDIT</p>
      <span class="enroll-btn">Enroll Now</span>
    </div>
  </div>
  <div class="footer">
    Pragyodaya Institute of Technology (PDIT) &bull; Delhi, India &bull; Contact: +91-XXXXXXXXXX
  </div>
</body>
</html>`;
}

// ── Brochure Popup ────────────────────────────────────────────────────────────
interface BrochurePopupProps {
  course: Course | null;
  open: boolean;
  onClose: () => void;
}

function BrochurePopup({ course, open, onClose }: BrochurePopupProps) {
  const { actor } = useActor();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      errs.phone = "Enter a valid 10-digit phone number.";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (!course) return;
    setSubmitting(true);
    try {
      if (actor) {
        await actor.submitBrochureRequest(
          form.name.trim(),
          form.phone.trim(),
          form.email.trim(),
          course.id,
          course.title,
        );
      }
      // Generate & download brochure
      const html = generateBrochureHTML(course);
      const blob = new Blob([html], { type: "text/html" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${course.title.replace(/\s+/g, "-")}-Brochure-PDIT.html`;
      a.click();
      URL.revokeObjectURL(a.href);

      toast.success("Brochure downloaded! Our team will contact you soon.");
      setForm({ name: "", phone: "", email: "" });
      setErrors({});
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setErrors({});
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-md w-full" data-ocid="brochure.dialog">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Get {course?.title} Brochure
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            Fill in your details to receive the brochure
          </DialogDescription>
        </DialogHeader>

        {course && (
          <div
            className="rounded-xl p-3 mb-2 text-white text-sm font-medium flex items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${course.colorKey}, ${course.colorKey}cc)`,
            }}
          >
            <FileDown className="w-5 h-5 shrink-0" />
            <span>{course.subtitle}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="brochure-name"
              className="text-sm font-medium text-gray-700"
            >
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="brochure-name"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="h-11 rounded-xl"
              data-ocid="brochure.name.input"
            />
            {errors.name && (
              <p
                className="text-red-500 text-xs"
                data-ocid="brochure.name.error_state"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="brochure-phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="brochure-phone"
              type="tel"
              placeholder="e.g. 9876543210"
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              className="h-11 rounded-xl"
              data-ocid="brochure.phone.input"
            />
            {errors.phone && (
              <p
                className="text-red-500 text-xs"
                data-ocid="brochure.phone.error_state"
              >
                {errors.phone}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="brochure-email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="brochure-email"
              type="email"
              placeholder="e.g. rahul@example.com"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              className="h-11 rounded-xl"
              data-ocid="brochure.email.input"
            />
            {errors.email && (
              <p
                className="text-red-500 text-xs"
                data-ocid="brochure.email.error_state"
              >
                {errors.email}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 rounded-xl gradient-primary text-white border-0 font-semibold text-sm hover:opacity-90"
            data-ocid="brochure.submit_button"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <FileDown className="mr-2 h-4 w-4" />
                Download Brochure
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Page skeleton ─────────────────────────────────────────────────────────────
function CourseSkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-card overflow-hidden animate-pulse">
      <div className="h-36 bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="flex justify-between pt-4">
          <div className="h-8 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-200 rounded w-32" />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
interface CoursesPageProps {
  onNavigate: (page: PageType) => void;
}

export default function CoursesPage({ onNavigate }: CoursesPageProps) {
  const { actor, isFetching } = useActor();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [expandedId, setExpandedId] = useState<bigint | null>(null);

  // Brochure popup
  const [brochureCourse, setBrochureCourse] = useState<Course | null>(null);
  const [brochureOpen, setBrochureOpen] = useState(false);

  React.useEffect(() => {
    if (isFetching) return;
    if (!actor) {
      setCourses(FALLBACK_COURSES);
      setLoadingCourses(false);
      return;
    }
    setLoadingCourses(true);
    actor
      .getCourses()
      .then((res) => {
        const list = res?.ok ?? [];
        setCourses(list.length > 0 ? list : FALLBACK_COURSES);
      })
      .catch(() => {
        setCourses(FALLBACK_COURSES);
      })
      .finally(() => setLoadingCourses(false));
  }, [actor, isFetching]);

  const openBrochure = (course: Course) => {
    setBrochureCourse(course);
    setBrochureOpen(true);
  };

  return (
    <main className="pt-20">
      {/* Brochure Popup */}
      <BrochurePopup
        course={brochureCourse}
        open={brochureOpen}
        onClose={() => setBrochureOpen(false)}
      />

      {/* Header */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a1660 0%, #2d2994 60%, #1e6bb8 100%)",
        }}
      >
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 text-sm px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4" />
              All Courses
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Learning Path
            </h1>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
              6 professionally designed courses to match your goals and budget.
              All include certification and placement support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20" style={{ background: "#F9FAFB" }}>
        <div className="container mx-auto px-4 max-w-7xl">
          {loadingCourses ? (
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              data-ocid="courses.loading_state"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <CourseSkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {courses
                .filter((c) => c.isActive)
                .map((course, i) => {
                  const Icon = getCourseIcon(course.title);
                  const gradientStyle = {
                    background: `linear-gradient(135deg, ${course.colorKey}, ${course.colorKey}cc)`,
                  };

                  return (
                    <motion.div
                      key={String(course.id)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      data-ocid={`courses.item.${i + 1}`}
                      className="bg-white rounded-3xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300"
                    >
                      {/* Card Header */}
                      <div className="p-6 relative" style={gradientStyle}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <div className="text-white/70 text-xs font-medium mb-1">
                                {course.subtitle}
                              </div>
                              <h3 className="text-xl font-bold text-white">
                                {course.title}
                              </h3>
                            </div>
                          </div>
                          {course.badge && (
                            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium shrink-0">
                              {course.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-5 mt-5">
                          <div className="flex items-center gap-1.5 text-white/80 text-sm">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1.5 text-white/80 text-sm">
                            <Users className="w-4 h-4" />
                            Certified
                          </div>
                          <div className="flex items-center gap-1.5 text-white/80 text-sm">
                            <Star className="w-4 h-4" fill="white" />
                            4.8
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {course.description}
                        </p>

                        {/* Toggle Topics */}
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(
                              expandedId === course.id ? null : course.id,
                            )
                          }
                          data-ocid="courses.topics.toggle"
                          className="flex items-center gap-2 text-pdit-indigo text-sm font-medium mb-4 hover:text-pdit-indigo-dark transition-colors"
                        >
                          {expandedId === course.id ? (
                            <>
                              <ChevronUp className="w-4 h-4" /> Hide Topics
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" /> View Topics
                              Covered
                            </>
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedId === course.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="grid grid-cols-2 gap-2 mb-4 overflow-hidden"
                            >
                              {course.topics.map((topic) => (
                                <div
                                  key={topic}
                                  className="flex items-center gap-2 text-gray-600 text-sm"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                                  {topic}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-3 flex-wrap">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-5 h-5 text-pdit-indigo" />
                            <span className="text-2xl font-bold text-pdit-indigo">
                              {course.fee.replace("₹", "")}
                            </span>
                            <span className="text-gray-400 text-sm ml-1">
                              / full course
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => openBrochure(course)}
                              data-ocid={`courses.brochure.button.${i + 1}`}
                              className="flex items-center gap-1.5 border border-pdit-indigo text-pdit-indigo hover:bg-indigo-50 font-medium px-4 py-2 rounded-full text-sm transition-all duration-200"
                            >
                              <FileDown className="w-4 h-4" />
                              Brochure
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                onNavigate("admission");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              data-ocid="courses.enroll.button"
                              className="bg-pdit-indigo hover:bg-pdit-indigo-dark text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200 hover:shadow-lg hover:scale-105"
                            >
                              Enroll Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          )}

          {/* Bottom Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-white rounded-2xl p-8 text-center shadow-card"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Not Sure Which Course to Pick?
            </h3>
            <p className="text-gray-500 mb-5">
              Talk to our career counsellors for free. We'll help you choose the
              right path based on your background and goals.
            </p>
            <button
              type="button"
              onClick={() => {
                onNavigate("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              data-ocid="courses.counsellor.button"
              className="bg-pdit-indigo text-white font-semibold px-8 py-3 rounded-full hover:bg-pdit-indigo-dark hover:shadow-lg transition-all duration-200"
            >
              Free Career Counselling
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
