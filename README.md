# User Authentication App

A React Native authentication application built using TypeScript, Context API, React Navigation, and AsyncStorage.
This project demonstrates a complete authentication flow with local data persistence, including Signup, Login, and Home screens.

The goal of this project is to showcase React Native best practices, reusable components, and clean architecture.

 **Features**

**User Signup**
Create a new account using:
Name
Email
Password
Validates required fields before saving
Stores user data locally using AsyncStorage

**User Login**
Login with registered credentials
Validates email and password
Displays error message if credentials are incorrect

**Home Screen**
Displays logged-in user information
Shows:Name,Email
Includes Logout functionality

**Password Visibility Toggle**
Password input supports Show / Hide password
Improves usability during authentication

**Persistent Login (Session Storage)**
Uses AsyncStorage to persist login session
User remains logged in after restarting the app

**Tech Stack**
React Native
TypeScript
React Navigation
Context API
AsyncStorage
Functional Components
React Hooks

**Project Architecture**
The project follows a modular folder structure for better scalability and maintainability.

UserAuthenticationApp
│
├── src
│   ├── components
│   │   └── PasswordInput.tsx
│   │
│   ├── context
│   │   └── AuthContext.tsx
│   │
│   ├── navigation
│   │   └── AppNavigator.tsx
│   │
│   ├── screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   └── HomeScreen.tsx
│   │
│   ├── types
│       └── authTypes.ts
|       |___vector.icon.d.ts
|      
│   
│    
│
├── App.tsx
├── package.json
└── README.md
**Authentication Flow**
Signup Screen
     ↓
Login Screen
     ↓
Home Screen
     ↓
Logout

## Installation

Clone the repository:
**git clone https://github.com/m1r1r2/UserAuthenticationApp.git**

Navigate to the project directory:
 **cd UserAuthenticationApp**

Install dependencies:
**npm install**

## Running the Application

 **Run on Android**
 npx react-native run-android

**Run on iOS**
cd ios
pod install
cd ..
npx react-native run-ios

**Validation**
The application performs basic validation for:
Empty fields
Email format
Password presence
Appropriate error messages are shown to guide the user.

## Folder Description
- **components** – Reusable UI components (e.g., PasswordInput)
- **context** – Global state management using Context API
- **navigation** – Navigation setup using React Navigation
- **screens** – Application screens such as Login, Signup, and Home
- **types** – TypeScript interfaces and type definitions
- **assets/icons** – Application icons or image assets used in the UI

