# Mora-Click 🍽️

A comprehensive canteen management system for university campuses, enabling students and staff to browse menus, place orders, and manage canteen operations efficiently.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Email Verification](#email-verification)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🎓 For Students/Staff
- **User Registration & Authentication** with email verification
- **Browse Multiple Canteens** (Civil, Engineering, Staff canteens)
- **View Real-time Menus** with availability status
- **Today's Specials** section
- **User Reviews & Ratings** for food items
- **Profile Management** with update capabilities
- **Role-based Access** (Student, Lecturer, Non-Academic Staff)

### 🏪 For Canteen Managers
- **Menu Management** (Add, Edit, Delete food items)
- **Real-time Availability Toggle** for menu items
- **Category Management** (Main Meals, Short Eats, Beverages, Specials)
- **Image Upload** with Cloudinary integration
- **Dashboard Analytics** and order management

### 🔧 Technical Features
- **Responsive Design** for mobile and desktop
- **Real-time Updates** with automatic data refresh
- **Image Optimization** with Cloudinary
- **Email Notifications** for registration and orders
- **JWT Authentication** with secure token management
- **Data Validation** for all user inputs
- **Password Encryption** with bcrypt

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Cloudinary** - Image management
- **Multer** - File upload handling

### Additional Tools
- **Firebase** - Push notifications (FCM)
- **Validator** - Data validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Mora-Click/
├── Frontend/                 # React frontend application
│   ├── public/              # Public assets
│   ├── src/
│   │   ├── Components/      # Reusable components
│   │   │   ├── ReviewForm.jsx
│   │   │   └── ReviewList.jsx
│   │   ├── Pages/           # Main page components
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Account.jsx
│   │   │   ├── Welcome.jsx
│   │   │   ├── VerifyEmail.jsx
│   │   │   ├── CivilCanteen.jsx
│   │   │   ├── StaffCanteen.jsx
│   │   │   ├── GodaUda.jsx
│   │   │   └── GodaYata.jsx
│   │   ├── Canteen_Level/   # Canteen management interface
│   │   │   ├── menu/
│   │   │   ├── home/
│   │   │   ├── additem/
│   │   │   ├── Fooditemedit/
│   │   │   ├── deletionpopup/
│   │   │   └── account/
│   │   ├── assets/          # Images and static files
│   │   └── utils/           # Utility functions
│   └── package.json
├── Backend/                 # Node.js backend application
│   ├── controllers/         # Business logic
│   │   ├── authcontroll.js
│   │   ├── usercontroll.js
│   │   ├── menucontroll.js
│   │   ├── specialcontroll.js
│   │   └── reviewcontroll.js
│   ├── models/              # Database schemas
│   │   ├── userModel.js
│   │   ├── menuModel.js
│   │   ├── specialModel.js
│   │   └── reviewModel.js
│   ├── Routes/              # API routes
│   │   ├── authRoute.js
│   │   ├── userRoute.js
│   │   ├── menuRoute.js
│   │   ├── specialRoute.js
│   │   └── reviewRoute.js
│   ├── middleware/          # Custom middleware
│   │   └── verification.js
│   ├── validation/          # Input validation
│   │   └── userValidation.js
│   ├── utils/               # Utility functions
│   │   └── firebaseUtils.js
│   ├── .env                 # Environment variables
│   ├── server.js            # Main server file
│   └── package.json
└── README.md                # Project documentation
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/mora-click.git
cd mora-click
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

### 4. Environment Configuration
Create a `.env` file in the Backend directory:

```env
# Database
DB_URL=mongodb://localhost:27017/mora-click
# or for MongoDB Atlas:
# DB_URL=mongodb+srv://username:password@cluster.mongodb.net/mora-click

# JWT Secret
Secret_Key=your_super_secret_jwt_key_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Firebase Configuration (optional)
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 5. Start the Application

#### Development Mode
```bash
# Start backend (from Backend directory)
npm run dev

# Start frontend (from Frontend directory)
npm start
```

#### Production Mode
```bash
# Build frontend
cd Frontend
npm run build

# Start backend
cd ../Backend
npm start
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_URL` | MongoDB connection string | ✅ |
| `Secret_Key` | JWT secret key | ✅ |
| `EMAIL_USER` | Email service username | ✅ |
| `EMAIL_PASS` | Email service password | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary API key | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | ✅ |
| `PORT` | Server port (default: 5000) | ❌ |

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "FName": "John",
  "LName": "Doe",
  "Email": "john.doe@example.com",
  "Password": "SecurePass123!",
  "Role": "Student",
  "Faculty": "Engineering",
  "Gender": "Male",
  "DOB": "2000-01-15",
  "PNumber": "0771234567",
  "Depernment": "Computer Science and Engineering"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "Email": "john.doe@example.com",
  "Password": "SecurePass123!"
}
```

### User Endpoints

#### Get User Profile
```http
GET /user/getuser?_id={userId}
Authorization: Bearer {token}
```

#### Update User Profile
```http
PUT /user/updateuser
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "contact": "0771234567"
}
```

#### Email Verification
```http
GET /user/verify/{token}
```

### Menu Endpoints

#### Get Menu by Canteen
```http
GET /menu/getmenu?canteen_id={canteenId}
```

#### Add Menu Item
```http
POST /menu/insertfooditem
Content-Type: multipart/form-data
Authorization: Bearer {token}

{
  "canteen_id": "canteenId",
  "catogery": "main",
  "name": "Rice and Curry",
  "price": "350",
  "description": "Traditional Sri Lankan meal",
  "image": [file]
}
```

#### Update Item Availability
```http
PUT /menu/updateavailable?canteen_id={canteenId}&catogery={category}&_id={itemId}
Authorization: Bearer {token}
```

### Special Items Endpoints

#### Get Special Items
```http
GET /special/getItembyId?canteen_id={canteenId}
```

#### Add Special Item
```http
POST /special/insertSpecialItem
Content-Type: multipart/form-data
Authorization: Bearer {token}

{
  "canteen_id": "canteenId",
  "name": "Today's Special",
  "price": "450",
  "description": "Chef's special for today",
  "image": [file]
}
```

### Review Endpoints

#### Get Reviews for Item
```http
GET /review/getReviews?itemId={itemId}&itemType={itemType}
```

#### Add Review
```http
POST /review/addReview
Authorization: Bearer {token}
Content-Type: application/json

{
  "itemId": "itemId",
  "itemType": "menu",
  "rating": 5,
  "comment": "Excellent food!"
}
```

## 🎯 Usage

### For Students/Staff

1. **Registration**: Sign up with university email
2. **Email Verification**: Check email and click verification link
3. **Login**: Access the platform with credentials
4. **Browse Canteens**: Select from available canteens
5. **View Menus**: See real-time menu availability
6. **Leave Reviews**: Rate and review food items

### For Canteen Managers

1. **Login**: Use canteen manager credentials
2. **Manage Menu**: Add, edit, or delete food items
3. **Toggle Availability**: Turn items on/off in real-time
4. **Upload Images**: Add photos to food items
5. **View Analytics**: Monitor orders and reviews

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Registration**: User registers and receives verification email
2. **Email Verification**: User clicks link to verify account
3. **Login**: User receives JWT token upon successful login
4. **Protected Routes**: Token required for authenticated endpoints
5. **Token Expiry**: Tokens expire after 24 hours

### Token Structure
```javascript
{
  "user_id": "userId",
  "role": "Student",
  "iat": 1642781234,
  "exp": 1642867634
}
```

## 📧 Email Verification

### Process Flow
1. User registers with email address
2. System generates JWT verification token
3. Email sent with verification link
4. User clicks link to verify account
5. Account activated and user can login

### Email Configuration
The system uses Nodemailer with Gmail SMTP:

```javascript
// Email configuration in backend
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## 🗄️ Database Schema

### User Schema
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  username: String,
  password: String (hashed),
  role: String, // "Student", "Lecturer", "Non Academic Staff"
  faculty: String,
  e_mail: String,
  contact: String,
  gender: String,
  depernment: String,
  dob: Date,
  verified: Boolean,
  verificationToken: String,
  FCMToken: String
}
```

### Menu Schema
```javascript
{
  _id: ObjectId,
  canteen_id: String,
  main: [
    {
      _id: ObjectId,
      name: String,
      price: Number,
      image: String,
      description: String,
      available: Boolean
    }
  ],
  short_eat: [...],
  beverage: [...]
}
```

### Special Items Schema
```javascript
{
  _id: ObjectId,
  canteen_id: String,
  name: String,
  price: Number,
  image: String,
  description: String,
  available: Boolean,
  createdAt: Date
}
```

### Review Schema
```javascript
{
  _id: ObjectId,
  itemId: ObjectId,
  itemType: String, // "menu" or "special"
  userId: ObjectId,
  rating: Number, // 1-5
  comment: String,
  createdAt: Date
}
```

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd Frontend
npm test
```

### Test Coverage
- Unit tests for controllers
- Integration tests for API endpoints
- Frontend component tests
- Authentication flow tests

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop computers (1024px+)

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
cd Frontend
npm run build
# Deploy build folder
```

### Backend Deployment (Heroku/Railway)
```bash
cd Backend
# Set environment variables in hosting platform
# Deploy with git or platform-specific method
```

### Environment Variables for Production
- Set all required environment variables
- Use MongoDB Atlas for database
- Configure CORS for production domains

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Write tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- 📧 Email: support@moraclick.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/mora-click/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/mora-click/wiki)

## 🏆 Acknowledgments

- University of Moratuwa for the inspiration
- Contributors and developers
- Open source community

---

**Made with ❤️ for University of Moratuwa community**
