# CipherNotes Frontend

## Overview

The CipherNotes frontend is a clean and minimal web interface that allows users to create private notes, share them securely using a unique link, unlock them with a password, and generate AI-powered summaries after unlocking.

## Future Improvements

### 1. Google OAuth-Based Authentication and User Tagging

Introduce optional user authentication using Google OAuth to provide each user with a unique system-generated username such as `john@cipher` or `ram@cipher`.

With authentication in place:

* Notes can support **user tagging at creation time**.
* Only tagged users will be authorized to view a note.
* This significantly improves security by ensuring that **possession of the link alone is not sufficient** to access the content.
* With user-based access control, the current password-based mechanism can be safely eliminated or made optional.

This approach enables identity-based note sharing while keeping the onboarding flow simple.

---

### 2. One-Time Access Notes with Access Revocation

Introduce support for **one-time access notes** where permissions are revoked immediately after the first successful view.

This feature would require users to be authenticated. Once a tagged or authorized user accesses the note:

* The backend records the access event.
* The user’s permission to view the note is revoked instantly.
* Any subsequent attempts by the same user are denied.

This ensures strong privacy guarantees for highly sensitive notes and avoids reliance on client-side mechanisms.

---

### 3. Access Insights, Rate Limiting, and Presence Awareness

Since notes are intentionally short (up to 500 characters), full real-time collaborative editing provides limited value. Instead, collaboration can be reimagined around **visibility and security insights**.

Potential enhancements include:

* Displaying which users are currently viewing a note.
* A simple dashboard for note creators showing:

  * Number of times a link was opened
  * Number of successful reads
  * Number of failed password attempts
* Rate limiting password attempts to prevent brute-force access.

These improvements provide meaningful insights, improve security, and add practical value without overengineering collaboration features.

---



## Features

### 1. Create a Private Note

* Users can create a note with a **maximum length of 500 characters**, where **only non-space characters are counted**.
* Empty submissions and invalid inputs are handled with clear validation messages.
* Before saving a note, users are required to provide:

  * A **password**, which will be needed later to unlock the note.
  * An **expiry period (in days)**. If no value is provided, the system defaults the expiry to **7 days**.
* On successful creation:

  * A unique `noteId` is generated.
  * This `noteId` is appended to an array stored in `localStorage` under a `cipherId` key, allowing the frontend to track notes created by the user.

### 2. View a Note via Shared URL

* When a user visits a shared note URL, they are redirected to the note viewing page.
* The frontend handles multiple states:

  * If the note does not exist, a **“Note not found”** message is displayed.
  * If the note has expired, an **“Note expired”** message is shown.
  * If the note exists and is valid, the content is **not shown immediately**.
* The user must enter the correct password to unlock the note.
* On successful password verification, the note content is displayed.

### 3. AI-Powered Note Summarization

* Once a note is unlocked, a **“Summarize this note”** button is displayed.
* On click:

  * The note content is sent to the backend.
  * The backend generates an AI-based summary.
  * The summarized content is returned and displayed below the original note.
* Loading states and API failures are handled gracefully.

### 4. My Notes Section

* The **My Notes** section retrieves note IDs stored in `localStorage`.
* It displays the list of notes created by the current user on that device.
* A clear warning is shown to the user stating:

  * These notes are visible only because the IDs are stored in the browser’s local storage.
  * Clearing browser data or switching devices will remove access to this list.

---

## Tech Stack

* Framework: Next.js (React)
* Language: TypeScript
* Styling: Tailwind CSS and motion
---

## Environment Setup

Create a `.env.local` file in the root of the frontend project:

```
NEXT_PUBLIC_BACKEND_URL=""
```

For production, replace the value with the deployed backend URL.

---

## Running the Frontend Locally

Install dependencies:

```
bun install
```

Start the development server:

```
bun dev
```

The application will be available at:

```
http://localhost:3000
```
