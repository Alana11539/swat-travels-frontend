# SWAT Travels - Frontend

A modern, responsive web application for browsing and booking travel packages, built with React, Vite, and TailwindCSS.

## 🚀 Features

- **Modern UI/UX**: Clean and intuitive interface with smooth animations
- **Tour Browsing**: Browse available tours with detailed information
- **User Authentication**: Secure login and registration system
- **Booking System**: Easy tour booking with customization options
- **Admin Dashboard**: Manage tours, bookings, and users
- **Responsive Design**: Works seamlessly on all devices
- **Contact Form**: Easy communication with support
- **Review System**: Read and write tour reviews
- **Protected Routes**: Secure pages requiring authentication

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Running backend API (see backend README)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alana11539/swat-travels-frontend.git
   cd swat-travels-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_UPLOADS_URL=http://localhost:5000/uploads
   ```

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure

```
swat-travels-frontend/
├── public/              # Static assets
├── src/
│   ├── api/            # API integration
│   │   ├── axios.js    # Axios configuration
│   │   └── tours.js    # Tour API calls
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # Reusable components
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── home/       # Home page components
│   │       ├── CTASection.jsx
│   │       ├── FeedbackSection.jsx
│   │       ├── HeroSection.jsx
│   │       ├── ServicesSection.jsx
│   │       ├── StatsSection.jsx
│   │       ├── TestimonialsSection.jsx
│   │       └── WhyChooseSection.jsx
│   ├── context/        # React Context
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── about.jsx
│   │   ├── admin.jsx
│   │   ├── bookingSummary.jsx
│   │   ├── cheackOut.jsx
│   │   ├── contact.jsx
│   │   ├── customization.jsx
│   │   ├── layout.jsx
│   │   ├── login.jsx
│   │   ├── page.jsx
│   │   ├── signUp.jsx
│   │   └── tours.jsx
│   ├── styles/         # CSS modules
│   ├── App.jsx         # Main App component
│   ├── App.css         # Global styles
│   ├── main.jsx        # Application entry point
│   └── index.css       # Base styles
├── .gitignore
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── README.md           # This file
└── vite.config.js      # Vite configuration
```

## 🎨 Key Components

### Pages
- **Home**: Landing page with hero section, services, statistics, testimonials
- **Tours**: Browse all available tours with filtering options
- **Tour Details**: Detailed view of individual tours
- **Booking**: Tour booking interface with date selection
- **Checkout**: Payment and confirmation page
- **Profile**: User profile management
- **Admin Dashboard**: Manage platform content (Admin only)
- **About**: Company information
- **Contact**: Contact form and information

### Components
- **Header**: Navigation bar with authentication status
- **Footer**: Site footer with links and information
- **ProtectedRoute**: Route wrapper for authenticated pages
- **HeroSection**: Eye-catching landing section
- **ServicesSection**: Display services offered
- **TestimonialsSection**: Customer reviews and feedback
- **StatsSection**: Company statistics and achievements

## 🔌 API Integration

The frontend communicates with the backend API through Axios. Base configuration is in `/src/api/axios.js`.

### Authentication
- JWT tokens stored in localStorage
- Automatic token refresh
- Protected routes redirect to login

### API Endpoints Used
- `/api/users/*` - User authentication and profile
- `/api/tours/*` - Tour listings and details
- `/api/bookings/*` - Booking management
- `/api/reviews/*` - Tour reviews
- `/api/contact` - Contact form submissions
- `/api/admin/*` - Admin operations

## 🎨 Styling

The project uses:
- **CSS Modules** for component-specific styles
- **Global CSS** for common styles
- **Responsive Design** with mobile-first approach
- **React Icons** for iconography

## 🔐 Authentication Flow

1. User logs in with credentials
2. Backend returns JWT tokens (access + refresh)
3. Tokens stored in localStorage
4. Access token sent with each request
5. Automatic refresh when token expires
6. Protected routes check authentication status

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🧪 Testing

Currently, no testing framework is configured.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Alana11539** - *Initial work*

---

Made with ❤️ for SWAT Travels
