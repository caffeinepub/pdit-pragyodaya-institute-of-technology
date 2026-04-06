import {
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  IndianRupee,
  Layers,
  Monitor,
  Palette,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import type { PageType } from "../components/Navbar";

const courses = [
  {
    id: 1,
    icon: Code,
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
    feeNum: 8000,
    students: "320+",
    rating: 4.8,
    color: "from-blue-500 to-blue-700",
    iconBg: "bg-blue-100 text-blue-600",
    badge: "Popular",
  },
  {
    id: 2,
    icon: Layers,
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
    feeNum: 15000,
    students: "180+",
    rating: 4.9,
    color: "from-purple-500 to-purple-700",
    iconBg: "bg-purple-100 text-purple-600",
    badge: "Best Value",
  },
  {
    id: 3,
    icon: TrendingUp,
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
    feeNum: 6000,
    students: "250+",
    rating: 4.7,
    color: "from-green-500 to-green-700",
    iconBg: "bg-green-100 text-green-600",
    badge: "Fast Track",
  },
  {
    id: 4,
    icon: Palette,
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
    feeNum: 5000,
    students: "200+",
    rating: 4.7,
    color: "from-pink-500 to-pink-700",
    iconBg: "bg-pink-100 text-pink-600",
    badge: "Creative",
  },
  {
    id: 5,
    icon: Monitor,
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
    feeNum: 4000,
    students: "400+",
    rating: 4.6,
    color: "from-orange-500 to-orange-700",
    iconBg: "bg-orange-100 text-orange-600",
    badge: "Foundation",
  },
  {
    id: 6,
    icon: Briefcase,
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
    feeNum: 3000,
    students: "150+",
    rating: 4.8,
    color: "from-cyan-500 to-cyan-700",
    iconBg: "bg-cyan-100 text-cyan-600",
    badge: "Quick Start",
  },
];

interface CoursesPageProps {
  onNavigate: (page: PageType) => void;
}

export default function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <main className="pt-20">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`courses.item.${i + 1}`}
                className="bg-white rounded-3xl shadow-card overflow-hidden hover:shadow-card-hover transition-all duration-300"
              >
                {/* Card Header */}
                <div
                  className={`bg-gradient-to-r ${course.color} p-6 relative`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                        <course.icon className="w-8 h-8 text-white" />
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
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {course.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 mt-5">
                    <div className="flex items-center gap-1.5 text-white/80 text-sm">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-white/80 text-sm">
                      <Users className="w-4 h-4" />
                      {course.students} enrolled
                    </div>
                    <div className="flex items-center gap-1.5 text-white/80 text-sm">
                      <Star className="w-4 h-4" fill="white" />
                      {course.rating}
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
                      setExpandedId(expandedId === course.id ? null : course.id)
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
                        <ChevronDown className="w-4 h-4" /> View Topics Covered
                      </>
                    )}
                  </button>

                  {expandedId === course.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-2 mb-4"
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

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="w-5 h-5 text-pdit-indigo" />
                      <span className="text-2xl font-bold text-pdit-indigo">
                        {course.fee.replace("₹", "")}
                      </span>
                      <span className="text-gray-400 text-sm ml-1">
                        / full course
                      </span>
                    </div>
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
              </motion.div>
            ))}
          </div>

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
