import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Code,
  Globe,
  Layers,
  Monitor,
  Palette,
  Quote,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import type { PageType } from "../components/Navbar";

const courseHighlights = [
  {
    icon: Code,
    title: "Web Development",
    desc: "HTML, CSS, JavaScript & React",
    duration: "3 months",
    fee: "₹8,000",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Layers,
    title: "Full Stack Development",
    desc: "MERN Stack — MongoDB to React",
    duration: "6 months",
    fee: "₹15,000",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    desc: "SEO, Social Media & Google Ads",
    duration: "2 months",
    fee: "₹6,000",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Photoshop, Illustrator & Canva",
    duration: "2 months",
    fee: "₹5,000",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Monitor,
    title: "Computer Applications",
    desc: "MS Office, Excel & Tally",
    duration: "3 months",
    fee: "₹4,000",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Briefcase,
    title: "Freelancing Skills",
    desc: "Upwork, Fiverr & Remote Work",
    duration: "1 month",
    fee: "₹3,000",
    color: "bg-cyan-100 text-cyan-600",
  },
];

const stats = [
  { value: "1000+", label: "Students Trained", icon: Users },
  { value: "95%", label: "Placement Rate", icon: TrendingUp },
  { value: "6+", label: "Courses Offered", icon: BookOpen },
  { value: "50+", label: "Partner Companies", icon: Award },
];

const whyChoose = [
  {
    icon: Zap,
    title: "Industry-Ready Curriculum",
    desc: "Courses designed with industry experts to match real-world job requirements and the latest tech trends.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    desc: "Learn from working professionals with 5–15 years of industry experience in their respective domains.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: Shield,
    title: "Placement Support",
    desc: "Dedicated placement cell, mock interviews, resume building, and connections to 50+ hiring partners.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Globe,
    title: "Certified Credentials",
    desc: "Industry-recognized certificates that are valued by employers across India and internationally.",
    color: "bg-cyan-100 text-cyan-600",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    course: "Full Stack Development",
    company: "TCS Digital",
    text: "PDIT transformed my career completely. The Full Stack course was incredibly well-structured and the practical projects gave me real-world experience. Got placed in TCS within 2 months of completion!",
    rating: 5,
    avatar: "RS",
  },
  {
    name: "Priya Verma",
    course: "Digital Marketing",
    company: "Freelancer (5 LPA)",
    text: "I was a commerce graduate with zero tech knowledge. PDIT's Digital Marketing course gave me the skills to build my own agency. Now earning ₹5 LPA working from home!",
    rating: 5,
    avatar: "PV",
  },
  {
    name: "Amit Kumar",
    course: "Web Development",
    company: "Infosys",
    text: "The instructors at PDIT are fantastic. They don't just teach theory — they solve real problems and teach you how to think like a developer. Best investment I've made in my career.",
    rating: 5,
    avatar: "AK",
  },
];

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a1660 0%, #2d2994 40%, #1e6bb8 100%)",
        }}
        data-ocid="home.section"
      >
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #06B6D4 0%, transparent 50%), 
                             radial-gradient(circle at 80% 20%, #4F46E5 0%, transparent 40%),
                             url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-4 max-w-7xl relative z-10 pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 text-sm px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                India's Fastest Growing Tech Institute
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Build Your Career{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #67E8F9, #06B6D4)",
                  }}
                >
                  in Technology
                </span>
              </h1>

              <p className="text-lg text-indigo-200 mb-8 leading-relaxed max-w-lg">
                Join Pragyodaya Institute of Technology and acquire
                industry-ready skills in Web Development, Digital Marketing,
                Graphic Design & more. Transform your future today.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("admission");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  data-ocid="hero.enroll_now.primary_button"
                  className="flex items-center gap-2 bg-pdit-indigo hover:bg-pdit-indigo-dark text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  Enroll Now
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("franchise");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  data-ocid="hero.franchise.secondary_button"
                  className="flex items-center gap-2 border-2 border-pdit-cyan text-pdit-cyan hover:bg-pdit-cyan hover:text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
                >
                  Open Franchise
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-5">
                {[
                  { text: "Government Recognized", icon: CheckCircle },
                  { text: "Industry Certified", icon: Award },
                  { text: "100% Practical", icon: Zap },
                ].map(({ text, icon: Icon }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-indigo-200 text-sm"
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-3xl blur-2xl" />
                <img
                  src="/assets/generated/hero-pdit.dim_1200x600.jpg"
                  alt="PDIT Technology Training"
                  className="relative rounded-3xl shadow-2xl w-full object-cover"
                  style={{ maxHeight: "420px" }}
                />
                {/* Floating stats card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-lg leading-none">
                        1000+
                      </div>
                      <div className="text-gray-500 text-xs">
                        Students Placed
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Star
                        className="w-5 h-5 text-indigo-600"
                        fill="currentColor"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-lg leading-none">
                        4.9/5
                      </div>
                      <div className="text-gray-500 text-xs">
                        Student Rating
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-cyan-300" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {value}
                </div>
                <div className="text-indigo-300 text-xs md:text-sm mt-1">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section-padding bg-white" data-ocid="courses.section">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-pdit-indigo text-sm px-4 py-2 rounded-full mb-4 font-medium">
              <BookOpen className="w-4 h-4" />
              Our Programs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Industry-Leading <span className="text-gradient">Courses</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Choose from our expertly crafted courses and kickstart your career
              in technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseHighlights.map((course, i) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div
                  className={`w-12 h-12 ${course.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <course.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{course.desc}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    ⏱ {course.duration}
                  </span>
                  <span className="text-pdit-indigo font-bold text-lg">
                    {course.fee}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate("admission");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  data-ocid="courses.enroll.button"
                  className="w-full bg-indigo-50 hover:bg-pdit-indigo hover:text-white text-pdit-indigo font-semibold text-sm py-2.5 rounded-xl transition-all duration-200"
                >
                  Enroll Now
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => {
                onNavigate("courses");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              data-ocid="home.view_all_courses.button"
              className="inline-flex items-center gap-2 text-pdit-indigo font-semibold hover:gap-3 transition-all duration-200"
            >
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose PDIT */}
      <section className="section-padding" style={{ background: "#F9FAFB" }}>
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-50 text-pdit-cyan text-sm px-4 py-2 rounded-full mb-4 font-medium">
              <Star className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes PDIT <span className="text-gradient">Different</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We go beyond textbooks to deliver transformative learning
              experiences.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-pdit-indigo text-sm px-4 py-2 rounded-full mb-4 font-medium">
              <Quote className="w-4 h-4" />
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student <span className="text-gradient">Achievements</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Real stories from real students who transformed their careers with
              PDIT.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={String(idx)}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t.course} • {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 gradient-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of students who already transformed their careers.
              Admissions open for the next batch.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  onNavigate("admission");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                data-ocid="cta.enroll.primary_button"
                className="bg-white text-pdit-indigo font-bold px-10 py-4 rounded-full text-base hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Enroll Now — Limited Seats
              </button>
              <button
                type="button"
                onClick={() => {
                  onNavigate("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                data-ocid="cta.contact.secondary_button"
                className="border-2 border-white/60 text-white font-semibold px-10 py-4 rounded-full text-base hover:bg-white/10 transition-all duration-300"
              >
                Talk to a Counsellor
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
