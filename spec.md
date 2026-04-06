# PDIT - Pragyodaya Institute of Technology

## Current State
- Public website with 6 pages: Home, About, Courses, Admission, Franchise, Contact
- Login/Register with demo credentials (admin/admin123, student/student123)
- Student dashboard and Admin panel
- Courses are hardcoded in the frontend CoursesPage.tsx (6 courses with fees, duration, topics)
- Backend has no course management - no CRUD for courses
- No brochure system exists yet
- Admin panel shows students, admissions, franchise leads, contact messages, and announcements

## Requested Changes (Diff)

### Add
- **Course type in backend**: id, title, subtitle, description, duration, fee (text), badge, topics (array), color, isActive
- **Backend course CRUD**: createCourse, updateCourse, deleteCourse (admin-only), getCourses (public)
- **BrochureRequest type**: id, name, phone, email, courseId, courseName, timestamp
- **Backend brochure endpoint**: submitBrochureRequest (public) - saves lead data before allowing download
- **Admin panel - Course Management tab**: Table of courses with Edit/Delete buttons, "Add New Course" button
- **Course Create/Edit modal**: Form fields for title, subtitle, description, duration, fee (in ₹), badge, topics (comma-separated), color theme selector
- **Brochure Download button**: On each course card in CoursesPage, a "Download Brochure" button
- **Brochure Request Popup**: Modal that appears when clicking "Download Brochure" - fields: Full Name, Phone, Email - on submit saves to backend and triggers PDF/text brochure download for that specific course
- **Admin panel - Brochure Requests tab**: Table of all brochure download leads
- **Courses page becomes dynamic**: Fetches courses from backend instead of hardcoded array; falls back to default courses if none exist

### Modify
- **AdminPanel.tsx**: Add "Courses" tab and "Brochure Requests" tab
- **CoursesPage.tsx**: Add "Download Brochure" button per card, add brochure popup modal, load courses from backend
- **backend main.mo**: Add Course and BrochureRequest types, CRUD endpoints

### Remove
- Nothing removed; hardcoded course array becomes a fallback/seed

## Implementation Plan
1. Update backend main.mo with Course type, BrochureRequest type, course CRUD functions, submitBrochureRequest function, seed 6 default courses
2. Regenerate backend.d.ts bindings
3. Update CoursesPage.tsx to load courses from backend, add Download Brochure button per course, add BrochurePopup modal component
4. Update AdminPanel.tsx to add Courses management tab (create/edit/delete form) and Brochure Requests tab
5. Generate brochure as a text/HTML blob and trigger browser download on successful form submit
