# Pro Resume Builder

Things to complete for Certification:

- User Add (done)
- User Profile (Change Password, Update User Information)
- complete zod schema for resume
- Resume List with Search
- Resume Edit
- Delete Resume
- Download Resume
- AI on Experience, Projects

- implement validation of joi on server side

- [Pro Resume Builder](#pro-resume-builder)
  - [Purpose](#purpose)
  - [Technology Stack](#technology-stack)
    - [Frontend (Client)](#frontend-client)
    - [Backend (Server)](#backend-server)
  - [Modules and Features](#modules-and-features)
    - [Client-side Modules](#client-side-modules)
    - [Server-side Modules](#server-side-modules)
  - [How to Run the Project](#how-to-run-the-project)
    - [Prerequisites](#prerequisites)
    - [1. Backend Setup](#1-backend-setup)
    - [2. Frontend Setup](#2-frontend-setup)

A full-stack application designed to help users create professional, ATS-friendly resumes with ease, featuring AI-powered content generation and comprehensive user management.

## Purpose

The Pro Resume Builder aims to streamline the resume creation process. It allows users to input their personal information, education, work experience, skills, projects, and certifications, then generates a professional resume. Key features include:

- **AI-Powered Content Generation**: Assists users in writing professional summaries, experience descriptions, and project descriptions.
- **User Authentication**: Secure login, registration, email verification, and password management.
- **Resume Management**: Create, edit, preview, and save multiple resumes.
- **Admin Panel**: For managing users and viewing reports (admin-specific features).
- **PDF Export**: Download generated resumes and users list as PDF files.

## Technology Stack

The project is built using a modern full-stack architecture, leveraging the following technologies:

### Frontend (Client)

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Shadcn UI**: A collection of reusable components built with Radix UI and Tailwind CSS.
- **React Hook Form**: For efficient and flexible form management.
- **Zod**: For schema validation.
- **Redux Toolkit**: For predictable state management.
- **React Query (TanStack Query)**: For server state management and data fetching.
- **Axios**: A promise-based HTTP client for making API requests.
- **Luxon**: For advanced date and time manipulation.
- **jspdf & jspdf-autotable**: For client-side PDF generation.
- **html2canvas-pro**: For capturing HTML elements as images for PDF generation.
- **react-to-print**: For easy printing of React components.

### Backend (Server)

- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: For hashing and salting passwords.
- **jsonwebtoken**: For implementing JSON Web Tokens (JWT) for authentication.
- **Multer**: A Node.js middleware for handling `multipart/form-data`, primarily used for file uploads.
- **Nodemailer**: For sending emails (e.g., for email verification, password reset).
- **OpenAI API**: Integrated for AI-powered text generation.
- **dotenv**: For managing environment variables.
- **joi**: For server-side schema validation.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **morgan**: HTTP request logger middleware.
- **helmet**: Helps secure Express apps by setting various HTTP headers.

## Modules and Features

### Client-side Modules

- **Authentication**:
  - User registration with email verification.
  - User login and session management.
  - Forgot password and reset password functionality with OTP.
- **Resume Forms**:
  - Multi-step form for collecting personal information, education, experience, skills, projects, and certifications.
  - Real-time resume preview.
  - Integration with AI for generating content for various sections.
- **Resume Management**:
  - Dashboard to view and manage created resumes.
  - Option to save resumes as drafts.
  - PDF export of finalized resumes.
  - Print functionality for resumes.
- **Admin Panel**:
  - Dashboard overview for administrators.
  - User management (add, edit, view, block/unblock users).
  - User data export to PDF.
  - User profile management (change password, update profile information).

### Server-side Modules

- **Auth Module**: Handles user registration, login, token refresh, email verification, and password reset flows.
- **User Module**: Manages user data, including profile updates, role-based access control, and user listing/reporting for admins.
- **Resume Module**: Provides RESTful API endpoints for creating, retrieving, updating, and deleting resume data.
- **AI Module**: Exposes an API for generating professional text content (summaries, experience, projects) using the OpenAI API.
- **File Uploads**: Manages profile picture uploads for users.
- **Email Service**: Integrates Nodemailer for sending transactional emails.

## How to Run the Project

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js**: Ensure you have Node.js (LTS version recommended) installed.
- **pnpm**: The project uses `pnpm` as its package manager. If you don't have it, install it globally:

  ```bash
  npm install -g pnpm
  ```

- **MongoDB**: Have a MongoDB instance running (local or cloud-hosted).

### 1. Backend Setup

1. **Navigate to the server directory**:

   ```bash
   cd server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file**:
   Copy the `env.example` file and rename it to `.env`. Fill in the required environment variables:

   ```env
   port=_
   DB_URL="mongodb://localhost:27017/ResumeBuilder" # Your MongoDB connection string
   SALT_ROUND=10 # A number between 1-10 for bcrypt salt rounds

   # Email (for Nodemailer - example using Mailtrap for development)
   SMTP_SERVICE="gmail" # e.g., "gmail", "outlook", "yahoo"
   SMTP_EMAIL="your_email@example.com" # Your email address
   SMTP_PASS="your_email_app_password" # Your email app password or Mailtrap password

   # JWT
   JWT_SECRET="supersecretjwtkey" # A strong, random secret key
   JWT_DURATION="1h" # e.g., "1h", "7d"
   JWT_RT_DURATION_IN_DAYS=7 # Refresh token duration in days

   # AI (OpenAI API)
   AI_URL="https://api.openai.com/v1" # OpenAI API base URL
   AI_KEY="your_openai_api_key" # Your OpenAI API Key
   AI_MODEL="gpt-3.5-turbo" # e.g., "gpt-3.5-turbo", "gpt-4"
   ```

   **Note on Email**: For development, you can use a service like [Mailtrap](https://mailtrap.io/) to catch emails without actually sending them. Update `server/services/mailer.js` with your Mailtrap credentials or other SMTP details.

4. **Start the backend server**:

   ```bash
   pnpm dev
   ```

   The server should start on `http://localhost:_` (or the port specified in your `.env`).

### 2. Frontend Setup

1. **Navigate to the client directory**:

   ```bash
   cd ../client
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Create a `.env` file**:
   Copy the `env.example` file and rename it to `.env`. Fill in the API URL:

   ```env
   VITE_API_URL="http://localhost:_" # Must match your backend server URL
   ```

4. **Start the frontend development server**:

```bash
  pnpm dev
```

The client application should open in your browser, the port specified in `client/vite.config.ts`.

You should now have both the frontend and backend running, and you can start using the Pro Resume Builder application.

## Potential Features and Future Updates

- More Resume Templates: Expand the library of professional and modern resume templates to offer more design choices.
- Customizable Sections: Allow users to add, remove, or reorder sections in their resume (e.g., awards, publications, volunteer work).
- Drag-and-Drop Interface: Implement a more intuitive drag-and-drop interface for arranging resume sections and content.
- Version History: Allow users to save different versions of their resumes and revert to previous states.
- 