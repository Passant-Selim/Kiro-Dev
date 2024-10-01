# User Login & Signup Feature

This project implements a user login & signup feature with the following functionalities:

- Users can register with their full name, email, phone number, password, and upload an ID document.
- Verification email is sent to the user's email upon registration. Users need to verify their accounts by following the verification link.
- Users cannot login until their accounts are verified.
- After successful verification, users are greeted with a welcome screen displaying their name.
- Users can log in using their email and password.
- Implements a chat screen using Next.js and Express with Socket.IO for group chat functionality. Each user's name is displayed with their messages.

## Deployment

The frontend of this project is deployed on Vercel.

Frontend App Link: https://kiro-dev-xi.vercel.app/

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm run dev`.

## Technologies Used

- Next.js
- Express.js
- Socket.IO
- MongoDB (or your preferred database)
- Nodemailer (for sending verification emails)

## Folder Structure

- `/client`: Contains the frontend code.
- `/server`: Contains the backend code.

