import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Course {
    id: bigint;
    fee: string;
    title: string;
    duration: string;
    description: string;
    isActive: boolean;
    colorKey: string;
    topics: Array<string>;
    badge: string;
    subtitle: string;
}
export interface FranchiseRecord {
    id: bigint;
    city: string;
    name: string;
    investment: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface ContactRecord {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
}
export interface Announcement {
    id: bigint;
    title: string;
    postedBy: string;
    content: string;
    timestamp: bigint;
}
export interface AdmissionRecord {
    id: bigint;
    city: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
    phone: string;
    course: string;
}
export interface UserProfile {
    id: bigint;
    username: string;
    enrolledDate: bigint;
    password: string;
    role: string;
    fullName: string;
    isActive: boolean;
    email: string;
    progress: bigint;
    phone: string;
    course: string;
}
export interface BrochureRequest {
    id: bigint;
    name: string;
    email: string;
    timestamp: bigint;
    phone: string;
    courseName: string;
    courseId: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAnnouncement(title: string, content: string, postedBy: string): Promise<{
        ok: bigint;
    }>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCourse(title: string, subtitle: string, description: string, duration: string, fee: string, badge: string, topics: Array<string>, colorKey: string): Promise<bigint>;
    deleteCourse(id: bigint): Promise<boolean>;
    getAdmissions(): Promise<{
        ok: Array<AdmissionRecord>;
    }>;
    getAllStudents(): Promise<{
        ok: Array<UserProfile>;
    }>;
    getAnnouncements(): Promise<{
        ok: Array<Announcement>;
    }>;
    getBrochureRequests(): Promise<Array<BrochureRequest>>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessages(): Promise<{
        ok: Array<ContactRecord>;
    }>;
    getCourses(): Promise<{
        ok: Array<Course>;
    }>;
    getFranchiseInquiries(): Promise<{
        ok: Array<FranchiseRecord>;
    }>;
    getStudentProgress(username: string): Promise<bigint>;
    getUserProfile(username: string): Promise<{
        ok: UserProfile;
    }>;
    isCallerAdmin(): Promise<boolean>;
    loginUser(username: string, password: string): Promise<{
        ok: UserProfile;
    }>;
    registerUser(username: string, password: string, fullName: string, email: string, phone: string, course: string): Promise<{
        ok: UserProfile;
    }>;
    submitAdmission(name: string, phone: string, email: string, course: string, city: string, message: string): Promise<{
        ok: bigint;
    }>;
    submitBrochureRequest(name: string, phone: string, email: string, courseId: bigint | null, courseName: string): Promise<bigint>;
    submitContact(name: string, email: string, phone: string, message: string): Promise<{
        ok: bigint;
    }>;
    submitFranchiseInquiry(name: string, phone: string, email: string, city: string, investment: string, message: string): Promise<{
        ok: bigint;
    }>;
    updateCourse(id: bigint, title: string, subtitle: string, description: string, duration: string, fee: string, badge: string, topics: Array<string>, colorKey: string): Promise<boolean>;
    updateStudentProgress(username: string, progress: bigint): Promise<boolean>;
    updateUserProfile(username: string, fullName: string, email: string, phone: string): Promise<{
        ok: UserProfile;
    }>;
}
