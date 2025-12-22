 LoanLink | Microloan Management System

LoanLink is a specialized web-based microloan request, review, and approval management system. It provides a streamlined ecosystem for small financial organizations, NGOs, and microloan providers to manage applications, verification, and repayments in one unified platform.

 Live URL

View LoanLink Live

 Purpose

Many small financial organizations struggle to maintain loan applications, verification, approvals, EMI schedules, and repayments manually. LoanLink automates this process, providing clear roles for Borrowers, Managers, and Admins to ensure financial transparency and operational efficiency.

 Key Features

 Role-Based Dashboards

Borrower (User): Apply for loans, track application status (Pending/Approved/Rejected), pay application fees via Stripe, and view repayment history.

Manager (Loan Officer): Create/Manage loan packages, review borrower applications, and approve/reject requests with timestamps.

Admin (Superuser): Manage user roles (Borrower/Manager), suspend/unsuspend accounts with feedback, and curate "Home Page" featured loans.

 Financial Integration

Stripe Payment Gateway: Integrated payment for a fixed $10 loan application fee.

Transaction Logs: View detailed payment info (Transaction ID, Date) via modals after successful payment.

🛠 Modern UI/UX

Responsive Design: Fully optimized for mobile, tablet, and desktop.

Theme Customization: Toggle between Light and Dark modes.

Visual Analytics: Interactive charts and graphs within dashboards for quick data visualization.

Animations: Smooth page transitions and element entries powered by Framer-Motion.

Security & Validation

Authentication: Firebase/JWT-based login with password complexity rules (Uppercase, Lowercase, 6+ characters).

Private Routes: Protected pages ensuring only authorized roles access specific dashboard features.

Account Controls: Admin-driven suspension system with mandatory feedback logs.

 Tech Stack & NPM Packages

Category

Technology

Framework

React 19, React Router 7

Styling

Tailwind CSS 4, Lucide React (Icons)

State/Data

TanStack React Query v5, Axios

Database

MongoDB

Auth/Backend

Firebase, JWT, Dotenv

Forms/Validation

React Hook Form

Notifications

React-Toastify / SweetAlert2



Environment Configuration:
Create a .env file in the root and add your credentials:

VITE_FIREBASE_API_KEY=your_key
VITE_STRIPE_PUBLIC_KEY=your_key
VITE_API_BASE_URL=your_mongodb_api


Run Development Server:

npm run dev


 Route Map

/ - Home Page (Hero, Featured Loans, Feedback)

/all-loans - Grid view of all loan products

/login / /register - Authentication with role selection

/loan-details/:id - Detailed loan info & application trigger (Private)

/dashboard/profile - Universal profile management

/dashboard/manage-users - Admin user management (Role toggle/Suspend)

/dashboard/add-loan - Manager loan creation

/dashboard/my-loans - Borrower loan tracking

 Contact & Support

Project Name: LoanLink

Developer: [Your Name]

Repository: [GitHub Link]

Created for the Microloan Management Assignment.