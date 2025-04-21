# Emergency Response System

A real-time emergency response system with hospital routing capabilities.

## Features

- Emergency reporting interface for users to submit emergency details
- Control room interface for managing emergencies
- Hospital interface for hospitals to respond to emergencies
- Real-time updates using Socket.io
- Photo upload functionality
- Vehicle number tracking

## Interfaces

1. **Emergency Person Interface** (`/emergency.html`)
   - Submit emergency details
   - Upload photos
   - Provide vehicle information
   - Receive hospital assignment

2. **Control Room Interface** (`/control.html`)
   - View emergency details
   - Assign hospitals to emergencies
   - Monitor emergency status

3. **Hospital Interface** (`/hospital`)
   - View emergency requests
   - Accept or reject emergencies
   - Provide hospital information and ETA

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. Access the interfaces at:
   - Emergency Interface: http://localhost:3000/emergency.html
   - Control Room: http://localhost:3000/control.html
   - Hospital Interface: http://localhost:3000/hospital

## Technologies Used

- Node.js
- Express.js
- Socket.io
- HTML/CSS/JavaScript 