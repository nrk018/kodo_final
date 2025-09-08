# Kōdo - Gamified Coding Learning Platform

Kōdo is a gamified coding learning platform that helps users learn to code through quests, challenges, and rewards. The platform includes features like user authentication, coin system, quests, achievements, and more.

## Features

- **User Authentication**: Sign up and login functionality with secure password hashing
- **Coin System**: Purchase coins to unlock premium features and content
- **User Profile**: Track XP, level, coins, and daily streak
- **Quests**: Complete coding challenges to earn rewards
- **Interactive UI**: Modern, game-inspired interface with animations

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM with SQLite (can be configured for other databases)
- **Authentication**: Custom authentication with bcrypt password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd kodo_final
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up the database

```bash
npx prisma generate
npx prisma db push
```

4. Seed the database with initial data

```bash
npm run prisma:seed
```

5. Start the development server

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app`: Next.js app directory with pages and API routes
- `/components`: React components
- `/lib`: Utility functions and database client
- `/prisma`: Database schema and migrations
- `/public`: Static assets

## API Routes

### Authentication

- `POST /api/auth/signup`: Create a new user account
- `POST /api/auth/login`: Authenticate a user

### User

- `GET /api/user/profile`: Get user profile
- `PATCH /api/user/profile`: Update user profile

### Coins

- `GET /api/coins/packages`: Get available coin packages
- `POST /api/coins/purchase`: Purchase a coin package

## Testing

To test the authentication and coin purchase flow:

```bash
node test-flow.js
```

## Future Enhancements

- Real payment integration
- Social features and multiplayer challenges
- Code editor integration
- Mobile app version

## License

MIT