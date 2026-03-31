# Email Forwarder - Setup Guide

## Project Overview

This is a full-stack Email Forwarder application built with:

- **Backend**: Node.js + Express + Nodemailer (Gmail SMTP)
- **Frontend**: React + Vite

## Prerequisites

- Node.js (v16 or higher)
- npm or pnpm package manager
- Gmail account with 2FA enabled
- Gmail App Password (for SMTP authentication)

## Getting Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Go to "App Passwords" section
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character password
6. Copy this password for your `.env` file

## Setup Instructions

### 1. Backend Setup

#### Step 1: Navigate to backend folder

```bash
cd backend
```

#### Step 2: Install dependencies

```bash
pnpm install
# or
npm install
```

#### Step 3: Create `.env` file

Create a `.env` file in the `backend` folder and add:

```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Important**: Replace `your-email@gmail.com` with your actual Gmail address and `your-gmail-app-password` with the 16-character password from Google.

#### Step 4: Start the backend server

```bash
pnpm run dev
# or
npm run dev
```

The server will run on `http://localhost:3000`

### 2. Frontend Setup

#### Step 1: Navigate to frontend folder

```bash
cd frontend/email-forwarder
```

#### Step 2: Install dependencies

```bash
pnpm install
# or
npm install
```

#### Step 3: Create `.env.local` file (Optional)

If you want to change the API URL, create a `.env.local` file:

```
VITE_API_URL=http://localhost:3000
```

By default, the API URL is hardcoded to `http://localhost:3000`, so this is optional.

#### Step 4: Start the development server

```bash
pnpm run dev
# or
npm run dev
```

The frontend will typically run on `http://localhost:5173`

## Environment Variables Explained

### Backend (.env)

| Variable      | Required | Description                      | Example                       |
| ------------- | -------- | -------------------------------- | ----------------------------- |
| `SMTP_USER`   | ✅ Yes   | Gmail address for sending emails | `your-email@gmail.com`        |
| `SMTP_PASS`   | ✅ Yes   | Gmail App Password (16 chars)    | `abcd efgh ijkl mnop`         |
| `PORT`        | ❌ No    | Server port (default: 3000)      | `3000`                        |
| `NODE_ENV`    | ❌ No    | Environment mode                 | `development` or `production` |
| `CORS_ORIGIN` | ❌ No    | Allowed frontend origin          | `http://localhost:5173`       |

### Frontend (.env.local)

| Variable       | Required | Description          | Example                 |
| -------------- | -------- | -------------------- | ----------------------- |
| `VITE_API_URL` | ❌ No    | Backend API base URL | `http://localhost:3000` |

## Running Both Services Simultaneously

### Option 1: Two Terminal Windows

- Terminal 1: `cd backend && pnpm dev`
- Terminal 2: `cd frontend/email-forwarder && pnpm dev`

### Option 2: Using Concurrently (Root Level)

From the root directory, you can use a tool like `concurrently` to run both services.

## Testing the Application

1. Open `http://localhost:5173` in your browser
2. Fill in the email form:
   - **To**: Recipient's email address
   - **Subject**: Email subject
   - **Message**: Email body
3. Click the send button
4. Check the recipient's inbox

## Troubleshooting

### "Failed to send email"

- Verify Gmail credentials are correct
- Ensure Gmail App Password (not regular password) is used
- Check if 2FA is enabled on your Gmail account
- Verify SMTP settings in backend code (port 587 is correct)

### "CORS error"

- Ensure `CORS_ORIGIN` in backend matches your frontend URL
- By default, CORS is enabled for all origins

### Backend won't start

- Check if port 3000 is already in use
- Try changing `PORT` in `.env` to a different port (e.g., 5000)
- Clear `node_modules` and reinstall: `rm -rf node_modules && pnpm install`

### Frontend can't connect to backend

- Verify backend server is running on `http://localhost:3000`
- Check browser console for CORS or network errors
- Ensure `VITE_API_URL` matches your backend URL

## Project Structure

```
EmailForwarder/
├── backend/
│   ├── index.js          # Express server & email logic
│   ├── package.json      # Backend dependencies
│   ├── .env              # Environment variables (KEEP SECRET!)
│   └── .env.example      # Template for .env file
│
├── frontend/
│   └── email-forwarder/
│       ├── src/
│       │   ├── App.jsx   # Main React component
│       │   └── ...
│       ├── package.json  # Frontend dependencies
│       ├── vite.config.js # Vite configuration
│       └── .env.local    # Optional environment variables
│
└── SETUP.md              # This file
```

## Security Notes

⚠️ **Important Security Reminders:**

1. **Never commit `.env` files to git** - They contain sensitive credentials
2. **Use `.env.example`** - Share this template instead of actual `.env`
3. **Gmail App Passwords** - These are different from your regular Gmail password and safer for application use
4. **Production Deployment** - Set `NODE_ENV=production` and use proper environment variable management services

## Next Steps

- Customize the email template in `backend/index.js`
- Add email validation in the frontend
- Deploy to a cloud service (Heroku, Vercel, EC2, etc.)
- Implement database to store email history
