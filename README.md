Digital Health Wallet
Digital Health Wallet is a full-stack web application designed to help users securely manage their medical records (PDFs/Images) and track daily health vitals like heart rate and blood pressure through interactive visualizations.

Tech Stack
Frontend: React.js, Tailwind CSS, Lucide-React (Icons), Recharts (Data Visualization)
Backend: Node.js, Express.js
Database: SQLite 
Authentication: JSON Web Tokens (JWT) & BcryptJS (Password Hashing)
File Handling: Multer (Middleware for multipart/form-data)

** Setup Instructions**
**1. Prerequisites**

Node.js (v16.0.0 or higher)
npm (comes with Node.js)

**2. Backend Setup**
   
Navigate to the server directory:
cd server
Install dependencies:
npm install
Create a .env file in the server folder and add your secrets:
JWT_SECRET=your_secret_key_here

Important: Manually create an uploads folder to store files:
mkdir uploads
Start the backend server: node index.js

**3. Frontend Setup**


Open a new terminal and navigate to the client directory:
cd client/myapp
Install dependencies:
npm install
Start the React development server:
npm start

**API Documentation**

**Authentication**

1.Method: POST
Endpoint: /api/users/register
Description:Register a new user

2.Method: POST
Endpoint: /api/auth/login
Description:Authenticate user & return JWT

**Reports**

1.Method: POST
Endpoint: /api/reports/upload
Description:Upload a medical file (File + Category)

2.Method: GET
Endpoint: /api/reports
Description:Fetch all reports for the logged-in user

**Vitals**

1.Method: POST
Endpoint: /api/vitals/add
Description:Log new health metrics (BP, Heart Rate)

2.Method: GET
Endpoint: /api/vitals
Description:Fetch historical data for charts

