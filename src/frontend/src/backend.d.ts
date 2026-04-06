import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
    getAdmissions(): Promise<{
        ok: Array<AdmissionRecord>;
    }>;
    getAllStudents(): Promise<{
        ok: Array<UserProfile>;
    }>;
    getAnnouncements(): Promise<{
        ok: Array<Announcement>;
    }>;
    getCallerUserRole(): Promise<UserRole>;
    getContactMessages(): Promise<{
        ok: Array<ContactRecord>;
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
    submitContact(name: string, email: string, phone: string, message: string): Promise<{
        ok: bigint;
    }>;
    submitFranchiseInquiry(name: string, phone: string, email: string, city: string, investment: string, message: string): Promise<{
        ok: bigint;
    }>;
    updateStudentProgress(username: string, progress: bigint): Promise<boolean>;
    updateUserProfile(username: string, fullName: string, email: string, phone: string): Promise<{
        ok: UserProfile;
    }>;
}
