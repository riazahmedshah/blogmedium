# WordNest 🪺

A modern blogging platform where ideas find their home. Built with Cloudflare Workers backend and React frontend.

![WordNest Banner](https://via.placeholder.com/1200x400?text=WordNest+Banner)

## ✨ Features

### 🏗️ Backend (Hono/Cloudflare Workers)
- 🔐 JWT Authentication with Bcrypt hashing
- ✍️ CRUD Operations for Blog Posts
- 🖼️ Image Uploads with Cloudflare R2 Storage
- 🛡️ Zod Validation for all endpoints
- 🗄️ Prisma ORM with PostgreSQL

### 🎨 Frontend (React + shadcn/ui)
- 📝 Rich Text Editor (React Quill)
- ✨ Beautiful UI with shadcn components
- 🔄 Real-time updates
- 🌓 Light/Dark mode
- 📱 Fully responsive design

## 🛠️ Tech Stack

**Backend:**
- [Hono.js](https://hono.dev/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- TypeScript
- [Prisma](https://www.prisma.io/)
- PostgreSQL
- [Zod](https://zod.dev/)
- JWT + Bcrypt
- R2 Storage

**Frontend:**
- React 18
- [tanstack-query](https://tanstack.com/query/latest)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Quill](https://www.npmjs.com/package/react-quill)
- [React Router](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm/pnpm/yarn
- Cloudflare account
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/riazahmedshah/wordnest.git
cd wordnest
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

**Backend (.env):**
```env
DATABASE_URL="your-postgresql-connection-string"
```

**Backend (.dev.vars):**
```env
JWT_SECRET="your-jwt-secret-key"
CLOUDFLARE_ACCOUNT_ID="your-cloudflare-account-id"
CLOUDFLARE_ACCESS_KEY_ID="your-r2-access-key"
CLOUDFLARE_SECRET_ACCESS_KEY="your-r2-secret-key"
R2_BUCKET_NAME="your-r2-bucket-name"
```

**Frontend (.env):**
```env
VITE_API_URL="https://your-worker-subdomain.your-subdomain.workers.dev"
```

4. Set up the database:
```bash
cd backend
npx prisma generate
npx prisma db push
```

5. Deploy the backend to Cloudflare Workers:
```bash
cd backend
npm run deploy
```

6. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## 🔧 Configuration

### Cloudflare Workers Setup

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Update `wrangler.toml` with your configuration:
```toml
name = "wordnest-backend"
main = "src/index.ts"
compatibility_date = "2023-12-01"

[env.production]
vars = { ENVIRONMENT = "production" }
```

### Database Schema

The application uses the following main entities:

- **User**: Authentication and user management
- **Post**: Blog posts with rich content
- **Category**: Post categorization
- **Comment**: User comments on posts [future..]

## 🎯 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/me` - Get current user

### Posts
- `GET /api/v1/blog/bulk` - Get all posts
- `GET /api/v1/blog/:id` - Get specific post
- `POST /api/v1/blog/create` - Create new post
- `PUT /api/v1/blog/:id` - Update post
- `DELETE /api/v1/blog/:id` - Delete post

### Upload
- `/api/v1/user/update` - Upload images to R2 storage

## 🎨 UI Components

The frontend uses shadcn/ui components for a consistent design system:

- **Button**: Primary and secondary actions
- **Card**: Content containers
- **Input**: Form inputs
- **Textarea**: Multi-line text input
- **Dialog**: Modal dialogs
- **Toast**: Notification messages

## 🔐 Authentication Flow

1. User registers/logs in
2. JWT token is generated and stored
3. Token is included in API requests
4. Middleware validates token on protected routes
5. User session is maintained client-side

## 📸 Image Upload

Images are uploaded to Cloudflare R2 storage:

1. User selects image in editor
2. Image is uploaded to `/api/v1/user/update` endpoint with other update details, also
3. Image is uploaded to `/api/v1/blog/create` endpoint with other fields
3. File is stored in R2 bucket
4. Public URL is returned
5. URL is embedded in post content

## 🌐 Deployment

### Backend (Cloudflare Workers)
```bash
cd backend
npm run deploy
```

### Frontend (Cloudflare Pages)
```bash
cd frontend
npm run build
# Upload dist folder to Cloudflare Pages
```

## 📝 Usage

1. **Register/Login**: Create an account or sign in
2. **Create Post**: Use the rich text editor to write posts
3. **Add Images**: Upload images directly in the editor
4. **Publish**: Share your posts with the community

## 🔍 Environment Variables

### Backend Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID | ✅ |
| `CLOUDFLARE_ACCESS_KEY_ID` | R2 access key ID | ✅ |
| `CLOUDFLARE_SECRET_ACCESS_KEY` | R2 secret access key | ✅ |
| `R2_BUCKET_NAME` | R2 bucket name for images | ✅ |

### Frontend Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | ✅ |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

If you have any questions or need help with setup, please:

1. Check the [Issues](https://github.com/riazahmedshah/wordnest/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact: [riazahmedshah@example.com](mailto:riyazsh360@example.com)
---

**Built with ❤️ by [Riaz Ahmed Shah](https://github.com/riazahmedshah)**