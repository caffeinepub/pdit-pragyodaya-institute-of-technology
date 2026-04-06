# PDIT - Pragyodaya Institute of Technology

## Current State
The app already has a fully built public-facing marketing website with:
- 6 pages: Home, About, Courses, Admission, Franchise, Contact
- Backend stores: admissions, franchise inquiries, contact messages
- Sticky navbar, footer, WhatsApp button
- Color palette: Indigo (#4F46E5), Cyan (#06B6D4), Light BG (#F9FAFB), Poppins/Inter font

## Requested Changes (Diff)

### Add
- **Authentication system**: Username/password login (no Internet Identity). Demo credentials:
  - Admin: username `admin` / password `admin123`
  - Student: username `student` / password `student123`
- **Register page**: Students can register with name, email, username, password, course selection
- **Login page**: Clean login form with role auto-detection. After login, redirect to correct dashboard.
- **Student Dashboard** (`/dashboard/student`):
  - Sidebar: Dashboard, My Courses, Assignments, Results, Profile
  - Overview cards: Enrolled courses, attendance %, upcoming classes
  - Enrolled courses list with progress bars
  - Recent announcements/notices
  - Profile section: view and edit personal info
- **Admin Panel** (`/dashboard/admin`):
  - Sidebar: Dashboard, Students, Admissions, Franchise Leads, Contact Messages, Courses
  - Overview stats: total students, pending admissions, franchise inquiries, messages
  - Students table: list all registered students, view/manage
  - Admissions table: view all admission form submissions from backend
  - Franchise leads table: view franchise inquiry submissions
  - Contact messages table: view contact form messages
  - Courses management: list of courses offered
- **Navbar update**: Add Login/Register button for unauthenticated users; show user avatar + logout for authenticated users
- **Demo credentials shown on login page**

### Modify
- `App.tsx`: Add routing for login, register, student dashboard, admin panel pages
- `Navbar.tsx`: Add auth-aware Login/Logout button
- Backend: Add user registration, login (username+password hashed), user profiles, student enrollment data, and seed demo users

### Remove
- Nothing removed

## Implementation Plan
1. Update backend (main.mo): add User type with role (admin/student), username/password auth, registerUser, loginUser, getStudents, getUserProfile, updateUserProfile. Seed demo admin and student accounts.
2. Update backend.d.ts accordingly
3. Add new frontend pages: LoginPage, RegisterPage, StudentDashboard, AdminPanel
4. Update App.tsx to handle auth state and routing to dashboards
5. Update Navbar to show login/logout based on auth state
6. Wire all admin panel tables to live backend data (admissions, franchise, contacts)
