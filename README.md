# Student Task Manager

A comprehensive task management application built with Expo and React Native, designed specifically for students to manage their academic tasks, collaborate with peers, and stay organized.

## Features

### 📋 Task Management
- Create, edit, and delete tasks
- Set task priorities (Low, Medium, High)
- Track task progress
- Set due dates and reminders
- Categorize tasks by subject
- Add tags for better organization
- Track task completion status

### 👥 Collaboration
- Share tasks with classmates
- Add collaborators to tasks
- View shared tasks in a dedicated tab
- Real-time collaboration updates
- Private collaboration settings

### 📅 Calendar Integration
- View tasks in a calendar format
- Daily, weekly view options
- Due date tracking
- Overdue task notifications
- Upcoming task reminders

### 📊 Dashboard
- Overview of all tasks
- Progress tracking
- Category-wise task distribution
- Priority-based task sorting
- Quick access to important tasks

### ⚙️ Settings & Customization
- Dark/Light theme support
- Notification preferences
- Privacy settings
- Profile management
- Data sync options

## Technical Stack

- **Framework**: Expo SDK 52.0.30
- **Navigation**: Expo Router 4.0.17
- **UI Components**: React Native core components
- **Icons**: Lucide React Native
- **State Management**: React Context API
- **Date Handling**: React Native Calendar Strip

## Project Structure

```
app/
├── _layout.tsx                 # Root layout configuration
├── +not-found.tsx             # 404 error page
├── (tabs)/                    # Tab-based navigation
│   ├── _layout.tsx            # Tab navigation configuration
│   ├── index.tsx              # Home dashboard
│   ├── tasks.tsx              # Task management
│   ├── calendar.tsx           # Calendar view
│   ├── collaborate.tsx        # Collaboration features
│   └── settings.tsx           # App settings
├── settings/                  # Settings screens
│   ├── profile.tsx            # User profile
│   ├── notifications.tsx      # Notification settings
│   ├── theme.tsx             # Theme customization
│   ├── privacy.tsx           # Privacy settings
│   ├── help.tsx              # Help & support
│   └── data-sync.tsx         # Data synchronization
├── task/                     # Task-related screens
│   ├── [id].tsx              # Task details
│   ├── edit/[id].tsx         # Task editing
│   └── new.tsx               # New task creation
components/                   # Reusable components
├── Header.tsx                # App header
├── TaskCard.tsx              # Task display card
└── ProgressBar.tsx           # Progress indicator
context/                     # Application context
├── TaskContext.tsx           # Task management state
└── ThemeContext.tsx         # Theme management
types/                      # TypeScript definitions
└── task.ts                  # Task-related types
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- Web platform is the primary target
- Uses Expo managed workflow
- Follows React Native best practices
- Implements responsive design
- Handles cross-platform compatibility

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Acknowledgments

- Built with Expo and React Native
- Uses Unsplash for stock images
- Icons provided by Lucide React Native
- Calendar integration with React Native Calendar Strip