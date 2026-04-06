import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  BookOpen,
  Briefcase,
  GraduationCap,
  Home,
  Loader2,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type {
  AdmissionRecord,
  Announcement,
  ContactRecord,
  FranchiseRecord,
  UserProfile,
} from "../backend.d";
import type { PageType } from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useActor } from "../hooks/useActor";

type SectionType =
  | "dashboard"
  | "students"
  | "admissions"
  | "franchise"
  | "messages"
  | "announcements";

interface AdminPanelProps {
  onNavigate: (page: PageType) => void;
}

function EmptyState({
  icon: Icon,
  message,
}: { icon: React.ElementType; message: string }) {
  return (
    <div className="text-center py-12" data-ocid="admin.empty_state">
      <Icon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}

function formatDate(ts: bigint) {
  try {
    return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "N/A";
  }
}

export default function AdminPanel({ onNavigate }: AdminPanelProps) {
  const { currentUser, logout } = useAuth();
  const { actor, isFetching } = useActor();
  const [activeSection, setActiveSection] = useState<SectionType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [students, setStudents] = useState<UserProfile[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>([]);
  const [franchise, setFranchise] = useState<FranchiseRecord[]>([]);
  const [messages, setMessages] = useState<ContactRecord[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  // Progress updater
  const [progressEdits, setProgressEdits] = useState<Record<string, string>>(
    {},
  );
  const [updatingProgress, setUpdatingProgress] = useState<string | null>(null);

  // New announcement
  const [annForm, setAnnForm] = useState({ title: "", content: "" });
  const [addingAnn, setAddingAnn] = useState(false);

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    Promise.all([
      actor.getAllStudents().catch(() => ({ ok: [] })),
      actor.getAdmissions().catch(() => ({ ok: [] })),
      actor.getFranchiseInquiries().catch(() => ({ ok: [] })),
      actor.getContactMessages().catch(() => ({ ok: [] })),
      actor.getAnnouncements().catch(() => ({ ok: [] })),
    ])
      .then(([s, a, f, m, ann]) => {
        setStudents((s as any).ok ?? []);
        setAdmissions((a as any).ok ?? []);
        setFranchise((f as any).ok ?? []);
        setMessages((m as any).ok ?? []);
        setAnnouncements((ann as any).ok ?? []);
      })
      .catch(() => {
        toast.error("Failed to load data.");
      })
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  const handleUpdateProgress = async (username: string) => {
    if (!actor) return;
    const val = Number.parseInt(progressEdits[username] ?? "0", 10);
    if (Number.isNaN(val) || val < 0 || val > 100) {
      toast.error("Progress must be 0-100.");
      return;
    }
    setUpdatingProgress(username);
    try {
      await actor.updateStudentProgress(username, BigInt(val));
      setStudents((prev) =>
        prev.map((s) =>
          s.username === username ? { ...s, progress: BigInt(val) } : s,
        ),
      );
      toast.success("Progress updated!");
    } catch {
      toast.error("Failed to update progress.");
    } finally {
      setUpdatingProgress(null);
    }
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !annForm.title.trim() || !annForm.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }
    setAddingAnn(true);
    try {
      const result = await actor.addAnnouncement(
        annForm.title,
        annForm.content,
        currentUser?.fullName ?? "Admin",
      );
      if (result?.ok !== undefined) {
        const newAnn: Announcement = {
          id: result.ok,
          title: annForm.title,
          content: annForm.content,
          postedBy: currentUser?.fullName ?? "Admin",
          timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        };
        setAnnouncements((prev) => [newAnn, ...prev]);
        setAnnForm({ title: "", content: "" });
        toast.success("Announcement posted!");
      }
    } catch {
      toast.error("Failed to post announcement.");
    } finally {
      setAddingAnn(false);
    }
  };

  const navItems: {
    id: SectionType;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }[] = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
    {
      id: "students",
      label: "Students",
      icon: <Users className="w-4 h-4" />,
      count: students.filter((s) => s.role !== "admin").length,
    },
    {
      id: "admissions",
      label: "Admissions",
      icon: <BookOpen className="w-4 h-4" />,
      count: admissions.length,
    },
    {
      id: "franchise",
      label: "Franchise Leads",
      icon: <Briefcase className="w-4 h-4" />,
      count: franchise.length,
    },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageSquare className="w-4 h-4" />,
      count: messages.length,
    },
    {
      id: "announcements",
      label: "Announcements",
      icon: <Bell className="w-4 h-4" />,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center shadow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">PDIT Admin</div>
            <div className="text-slate-400 text-[10px]">Management Panel</div>
          </div>
        </div>
      </div>

      {/* Admin User */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-amber-500 text-white font-semibold text-sm">
              {currentUser?.fullName?.charAt(0)?.toUpperCase() ?? "A"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-semibold truncate">
              {currentUser?.fullName ?? "Admin"}
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-0 text-[10px] px-2 py-0 mt-0.5">
              Administrator
            </Badge>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1" data-ocid="admin.nav.panel">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveSection(item.id);
              setSidebarOpen(false);
            }}
            data-ocid={`admin.${item.id}.link`}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeSection === item.id
                ? "bg-white/15 text-white shadow-sm"
                : "text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="flex-1 text-left">{item.label}</span>
            {item.count !== undefined && item.count > 0 && (
              <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 space-y-2 border-t border-white/10">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          data-ocid="admin.back_to_website.link"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-white hover:bg-red-500/20 transition-all"
          data-ocid="admin.logout.button"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-gradient-to-b from-[#1e293b] to-[#0f172a] flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-[#1e293b] to-[#0f172a] z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              aria-label="Open sidebar"
              data-ocid="admin.menu.button"
            >
              <Home className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-gray-900 capitalize">
                {navItems.find((n) => n.id === activeSection)?.label ??
                  "Dashboard"}
              </h1>
              <p className="text-xs text-gray-500">PDIT Admin Panel</p>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-700 border-0">
            Administrator
          </Badge>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {loading && (
            <div
              className="flex items-center justify-center py-16"
              data-ocid="admin.loading_state"
            >
              <Loader2 className="w-6 h-6 animate-spin text-pdit-indigo" />
            </div>
          )}

          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                {activeSection === "dashboard" && (
                  <div
                    className="space-y-6"
                    data-ocid="admin.dashboard.section"
                  >
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                      <h2 className="text-xl font-bold">
                        Welcome, {currentUser?.fullName ?? "Admin"} 👋
                      </h2>
                      <p className="text-slate-300 text-sm mt-1">
                        Here's an overview of PDIT's activity.
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          label: "Total Students",
                          value: students.filter((s) => s.role !== "admin")
                            .length,
                          icon: <Users className="w-5 h-5" />,
                          color: "text-pdit-indigo bg-indigo-50",
                        },
                        {
                          label: "Admissions",
                          value: admissions.length,
                          icon: <BookOpen className="w-5 h-5" />,
                          color: "text-emerald-600 bg-emerald-50",
                        },
                        {
                          label: "Franchise Leads",
                          value: franchise.length,
                          icon: <Briefcase className="w-5 h-5" />,
                          color: "text-amber-600 bg-amber-50",
                        },
                        {
                          label: "Messages",
                          value: messages.length,
                          icon: <Mail className="w-5 h-5" />,
                          color: "text-cyan-600 bg-cyan-50",
                        },
                      ].map((stat) => (
                        <Card
                          key={stat.label}
                          className="border-0 shadow-card rounded-2xl"
                          data-ocid="admin.stats.card"
                        >
                          <CardContent className="p-4">
                            <div
                              className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}
                            >
                              {stat.icon}
                            </div>
                            <div className="text-2xl font-bold text-gray-900">
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {stat.label}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Recent Admissions */}
                    <Card className="border-0 shadow-card rounded-2xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold">
                          Recent Admissions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {admissions.length === 0 ? (
                          <EmptyState
                            icon={BookOpen}
                            message="No admissions yet."
                          />
                        ) : (
                          <div className="overflow-x-auto">
                            <Table data-ocid="admin.admissions.table">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Course</TableHead>
                                  <TableHead>City</TableHead>
                                  <TableHead>Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {admissions.slice(0, 5).map((a, i) => (
                                  <TableRow
                                    key={String(a.id)}
                                    data-ocid={`admin.admissions.item.${i + 1}`}
                                  >
                                    <TableCell className="font-medium">
                                      {a.name}
                                    </TableCell>
                                    <TableCell>{a.course}</TableCell>
                                    <TableCell>{a.city}</TableCell>
                                    <TableCell className="text-gray-500 text-sm">
                                      {formatDate(a.timestamp)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeSection === "students" && (
                  <div className="space-y-6" data-ocid="admin.students.section">
                    <h2 className="text-xl font-bold text-gray-900">
                      Students (
                      {students.filter((s) => s.role !== "admin").length})
                    </h2>
                    <Card className="border-0 shadow-card rounded-2xl">
                      <CardContent className="p-0">
                        {students.filter((s) => s.role !== "admin").length ===
                        0 ? (
                          <div className="p-6">
                            <EmptyState
                              icon={Users}
                              message="No students registered yet."
                            />
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <Table data-ocid="admin.students.table">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Course</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead>Progress</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Update</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {students
                                  .filter((s) => s.role !== "admin")
                                  .map((s, i) => (
                                    <TableRow
                                      key={s.username}
                                      data-ocid={`admin.students.item.${i + 1}`}
                                    >
                                      <TableCell>
                                        <div className="font-medium">
                                          {s.fullName}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                          @{s.username}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-sm">
                                        {s.course}
                                      </TableCell>
                                      <TableCell className="text-sm text-gray-600">
                                        {s.email}
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-2 min-w-[100px]">
                                          <Progress
                                            value={Number(s.progress)}
                                            className="h-2 flex-1"
                                          />
                                          <span className="text-xs text-gray-500">
                                            {Number(s.progress)}%
                                          </span>
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Badge
                                          className={
                                            s.isActive
                                              ? "bg-emerald-100 text-emerald-700 border-0"
                                              : "bg-red-100 text-red-700 border-0"
                                          }
                                        >
                                          {s.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                      </TableCell>
                                      <TableCell>
                                        <div className="flex items-center gap-1.5">
                                          <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            placeholder={String(
                                              Number(s.progress),
                                            )}
                                            value={
                                              progressEdits[s.username] ?? ""
                                            }
                                            onChange={(e) =>
                                              setProgressEdits((p) => ({
                                                ...p,
                                                [s.username]: e.target.value,
                                              }))
                                            }
                                            className="h-8 w-16 text-xs rounded-lg"
                                            data-ocid={`admin.progress.input.${i + 1}`}
                                          />
                                          <Button
                                            size="sm"
                                            onClick={() =>
                                              handleUpdateProgress(s.username)
                                            }
                                            disabled={
                                              updatingProgress === s.username
                                            }
                                            className="h-8 px-2 gradient-primary text-white border-0 text-xs rounded-lg"
                                            data-ocid={`admin.progress.save_button.${i + 1}`}
                                          >
                                            {updatingProgress === s.username ? (
                                              <Loader2 className="w-3 h-3 animate-spin" />
                                            ) : (
                                              "Set"
                                            )}
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeSection === "admissions" && (
                  <div
                    className="space-y-6"
                    data-ocid="admin.admissions.section"
                  >
                    <h2 className="text-xl font-bold text-gray-900">
                      Admissions ({admissions.length})
                    </h2>
                    <Card className="border-0 shadow-card rounded-2xl">
                      <CardContent className="p-0">
                        {admissions.length === 0 ? (
                          <div className="p-6">
                            <EmptyState
                              icon={BookOpen}
                              message="No admission applications yet."
                            />
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <Table data-ocid="admin.admissions.table">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Course</TableHead>
                                  <TableHead>City</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {admissions.map((a, i) => (
                                  <TableRow
                                    key={String(a.id)}
                                    data-ocid={`admin.admissions.item.${i + 1}`}
                                  >
                                    <TableCell className="font-medium">
                                      {a.name}
                                    </TableCell>
                                    <TableCell>{a.course}</TableCell>
                                    <TableCell>{a.city}</TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                      {a.email}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                      {a.phone}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                      {formatDate(a.timestamp)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeSection === "franchise" && (
                  <div
                    className="space-y-6"
                    data-ocid="admin.franchise.section"
                  >
                    <h2 className="text-xl font-bold text-gray-900">
                      Franchise Leads ({franchise.length})
                    </h2>
                    <Card className="border-0 shadow-card rounded-2xl">
                      <CardContent className="p-0">
                        {franchise.length === 0 ? (
                          <div className="p-6">
                            <EmptyState
                              icon={Briefcase}
                              message="No franchise inquiries yet."
                            />
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <Table data-ocid="admin.franchise.table">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>City</TableHead>
                                  <TableHead>Investment</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {franchise.map((f, i) => (
                                  <TableRow
                                    key={String(f.id)}
                                    data-ocid={`admin.franchise.item.${i + 1}`}
                                  >
                                    <TableCell className="font-medium">
                                      {f.name}
                                    </TableCell>
                                    <TableCell>{f.city}</TableCell>
                                    <TableCell>
                                      <Badge className="bg-amber-100 text-amber-700 border-0">
                                        {f.investment}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                      {f.email}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                      {f.phone}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                      {formatDate(f.timestamp)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeSection === "messages" && (
                  <div className="space-y-6" data-ocid="admin.messages.section">
                    <h2 className="text-xl font-bold text-gray-900">
                      Contact Messages ({messages.length})
                    </h2>
                    <Card className="border-0 shadow-card rounded-2xl">
                      <CardContent className="p-0">
                        {messages.length === 0 ? (
                          <div className="p-6">
                            <EmptyState
                              icon={MessageSquare}
                              message="No messages yet."
                            />
                          </div>
                        ) : (
                          <div className="overflow-x-auto">
                            <Table data-ocid="admin.messages.table">
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Email</TableHead>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Message</TableHead>
                                  <TableHead>Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {messages.map((m, i) => (
                                  <TableRow
                                    key={String(m.id)}
                                    data-ocid={`admin.messages.item.${i + 1}`}
                                  >
                                    <TableCell className="font-medium">
                                      {m.name}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                      {m.email}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                      {m.phone}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600 max-w-xs">
                                      <p className="line-clamp-2">
                                        {m.message}
                                      </p>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                      {formatDate(m.timestamp)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeSection === "announcements" && (
                  <div
                    className="space-y-6"
                    data-ocid="admin.announcements.section"
                  >
                    <h2 className="text-xl font-bold text-gray-900">
                      Announcements
                    </h2>

                    {/* Add New */}
                    <Card className="border-0 shadow-card rounded-2xl border-l-4 border-l-pdit-indigo">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Plus className="w-4 h-4 text-pdit-indigo" />
                          Post New Announcement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form
                          onSubmit={handleAddAnnouncement}
                          className="space-y-3"
                        >
                          <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-gray-700">
                              Title
                            </Label>
                            <Input
                              placeholder="Announcement title"
                              value={annForm.title}
                              onChange={(e) =>
                                setAnnForm((p) => ({
                                  ...p,
                                  title: e.target.value,
                                }))
                              }
                              className="h-11 rounded-xl"
                              data-ocid="admin.announcement.title.input"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-gray-700">
                              Content
                            </Label>
                            <Textarea
                              placeholder="Write announcement content..."
                              value={annForm.content}
                              onChange={(e) =>
                                setAnnForm((p) => ({
                                  ...p,
                                  content: e.target.value,
                                }))
                              }
                              className="rounded-xl resize-none"
                              rows={3}
                              data-ocid="admin.announcement.content.textarea"
                            />
                          </div>
                          <Button
                            type="submit"
                            disabled={addingAnn}
                            className="gradient-primary text-white border-0 rounded-xl hover:opacity-90"
                            data-ocid="admin.announcement.submit_button"
                          >
                            {addingAnn ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                Posting...
                              </>
                            ) : (
                              <>
                                <Plus className="mr-2 h-4 w-4" /> Post
                                Announcement
                              </>
                            )}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>

                    {/* List */}
                    {announcements.length === 0 ? (
                      <Card
                        className="border-0 shadow-card rounded-2xl"
                        data-ocid="admin.announcements.empty_state"
                      >
                        <CardContent className="py-12">
                          <EmptyState
                            icon={Bell}
                            message="No announcements posted yet."
                          />
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-3">
                        {announcements.map((ann, i) => (
                          <Card
                            key={String(ann.id)}
                            className="border-0 shadow-card rounded-2xl"
                            data-ocid={`admin.announcements.item.${i + 1}`}
                          >
                            <CardContent className="p-5">
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                                  <Bell className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900">
                                    {ann.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {ann.content}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-2">
                                    Posted by {ann.postedBy}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
}
