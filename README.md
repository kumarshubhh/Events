# Mini Event Tracker

A modern full-stack event management application built with Node.js + MongoDB Atlas backend and React + Tailwind CSS frontend.

## 🚀 Features

- **User Authentication**: Secure signup/login with JWT tokens
- **Event Management**: Create, view, edit, and delete personal events
- **Smart Filtering**: View upcoming, past, or all events
- **Public Sharing**: Generate shareable links for events (no login required)
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Real-time Updates**: Instant UI updates with optimistic rendering

## 🛠 Tech Stack

### Backend
- **Node.js** + **Express** + **TypeScript**
- **MongoDB Atlas** (NoSQL) with **Prisma ORM**
- **JWT Authentication** with bcrypt password hashing
- **Zod** for request validation
- **Helmet** + **CORS** for security

### Frontend  
- **React 18** + **TypeScript**
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Database Choice Justification
**MongoDB Atlas** was chosen over SQL databases because:
- **Flexible Schema**: Events can have varying optional fields
- **JSON-native**: Natural fit for JavaScript/TypeScript stack
- **Cloud-ready**: MongoDB Atlas provides managed hosting, backups, and scaling
- **Developer Experience**: Prisma ORM provides type-safe database access
- **Performance**: Document-based queries are efficient for event filtering

## 📋 Prerequisites

- Node.js >= 18
- MongoDB Atlas account (or local MongoDB instance)

## ⚡ Quick Setup

### 1. Clone Repository
```bash
git clone https://github.com/kumarshubhh/Events.git
cd Events
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string
npx prisma db push
npx prisma generate
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env  # optional: customize API URL
npm run dev
```

### 4. Open Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Health Check: http://localhost:4000/health

## 🔧 Environment Variables

### Backend (.env)
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/events?retryWrites=true&w=majority"
JWT_SECRET="your-super-secret-jwt-key"
PORT=4000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:4000/api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login user

### Events (Protected)
- `GET /api/events` - List user events
- `GET /api/events?filter=upcoming|past` - Filter events
- `POST /api/events` - Create new event
- `GET /api/events/:id` - Get specific event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/share` - Generate share link

### Public
- `GET /api/events/public/:token` - View shared event (no auth)

## 🏗 Architecture

```
Events/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Auth middleware
│   │   └── utils/          # JWT utilities
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── .env.example        # Environment template
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/         # Route components
│   │   ├── components/    # Reusable UI components
│   │   └── lib/           # API client
│   └── .env.example       # Environment template
└── README.md
```

## 🔒 Security Features

- **JWT Authentication**: Stateless token-based auth
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Zod schema validation
- **CORS Protection**: Configurable origins
- **Helmet Security**: HTTP security headers
- **Authorization**: User-scoped data access

## 🚢 Deployment

### Backend (Railway/Render)
1. Connect GitHub repository
2. Set environment variables (DATABASE_URL, JWT_SECRET)
3. Deploy from `backend/` directory

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Set environment variable: `VITE_API_URL=https://your-api.domain.com/api`

## 🔄 Development Scripts

### Backend
```bash
npm run dev      # Development server with hot reload
npm run build    # Compile TypeScript
npm start        # Production server
```

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

## 🎯 Trade-offs & Assumptions

### Trade-offs Made
- **MongoDB over SQL**: Chosen for flexibility and cloud-native features
- **JWT over Sessions**: Stateless auth for better scalability
- **Client-side token storage**: Simpler implementation, suitable for demo
- **No refresh tokens**: Shorter JWT expiry recommended for production

### Production Considerations
- Add refresh token mechanism for better security
- Implement rate limiting for API endpoints
- Add comprehensive logging and monitoring
- Set up automated backups for MongoDB
- Use environment-specific JWT secrets
- Add email verification for user registration

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the Full-Stack Developer Challenge**
