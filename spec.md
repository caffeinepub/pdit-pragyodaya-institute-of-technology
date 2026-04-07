# PDIT - Pragyodaya Institute of Technology

## Current State
Fresh rebuild. No existing application files. Rebuilding the full PDIT portal from scratch based on the complete conversation history and all implemented features.

## Requested Changes (Diff)

### Add
- Full public website: Home, About, Courses, Admission, Franchise, Contact pages
- Role-based authentication (admin/student) with demo credentials
- Student dashboard: stats, course progress, attendance, announcements, profile editor
- Admin panel: stats, students, admissions, franchise leads, contacts, courses, brochure requests, leads management
- Dynamic courses backend: create/edit/delete courses with fees and color themes
- Dual lead-generation popup system:
  - Course Brochure Popup: triggered by "Download Brochure" or auto after 8s; fields: name, email, phone, select course, message
  - Franchise Brochure Popup: triggered by "Get Franchise Brochure" or auto after 10s; fields: name, email, phone, city, investment budget, message
- Brochure management: admin can set PDF URL per course and for franchise
- Leads dashboard in admin: view all leads, filter by Course/Franchise, export CSV
- Smart popup behavior: show once per session using localStorage
- Floating WhatsApp button
- Sticky navbar with login/logout state and role badge
- Indigo gradient footer

### Modify
- N/A (fresh rebuild)

### Remove
- N/A (fresh rebuild)

## Implementation Plan
1. Select `authorization` and `blob-storage` components
2. Generate Motoko backend with:
   - User roles (admin/student)
   - Courses CRUD with fees, color, brochure URL
   - Lead capture (course and franchise leads)
   - Admission, franchise, contact form submissions
   - Announcements
   - Student profiles and course progress
3. Build frontend:
   - Public pages: Home, About, Courses, Admission, Franchise, Contact
   - Auth: Login/Register pages with demo credential cards
   - Student dashboard
   - Admin panel with all tabs
   - Dual popup system with localStorage session logic
   - Responsive design: Indigo #4F46E5, Cyan #06B6D4, bg #F9FAFB, Poppins/Inter fonts
   - Floating WhatsApp button
   - Sticky navbar
