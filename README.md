## **CREATE: `README.md` (in root directory)**

````markdown
# Movie Browser App

A beautiful, modern React Native application that allows users to browse, search, and explore movies using The Movie Database (TMDB) API. Built with smooth animations, infinite scroll, and a sleek dark-themed UI.

## Screenshots

[Add your screenshots here]

## Features

### Core Features

- **Browse Popular Movies**: View an endless list of popular movies with infinite scroll
- **Search Functionality**: Real-time search with instant results as you type
- **Movie Details**: Comprehensive movie information including:
  - Full poster images
  - Title and overview
  - Release date and runtime
  - Genres with styled chips
  - Average user ratings
- **Smooth Animations**: Beautiful entrance animations and transitions throughout the app
- **Dark Theme UI**: Modern, eye-friendly dark interface with gradient overlays

### Bonus Features Implemented

- **Favorite Movies**: Save your favorite movies with persistent storage using AsyncStorage
- **Infinite Scroll**: Seamlessly load more movies as you scroll
- **Optimized Search**: Debounced search with clear button for better UX
- **Responsive Design**: Adapts to different screen sizes

## Tech Stack

- **Framework**: React Native
- **State Management**: React Context API + useReducer
- **Navigation**: React Navigation (Stack Navigator)
- **HTTP Client**: Axios
- **Animations**: React Native Reanimated
- **Storage**: AsyncStorage
- **Environment Variables**: react-native-dotenv
- **API**: The Movie Database (TMDB) API
- **Testing**: Jest

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android) or **Xcode** (for iOS)
- **JDK** (Java Development Kit) for Android
- **TMDB API Key** (instructions below)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/MovieBrowserApp.git
cd MovieBrowserApp
```
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Get Your TMDB API Key

1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create a free account or log in
3. Go to **Settings** → **API** → **Create** → **Developer**
4. Fill out the form and accept the terms
5. Copy your **API Key (v3 auth)**

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following content (replace with your actual API key):

```env
TMDB_API_KEY=your_api_key_here
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
```

**Important**: Never commit your `.env` file to version control!

### 5. Install iOS Dependencies (iOS only)

```bash
cd ios
pod install
cd ..
```

## 📱 Running the App

### Android

```bash
npx react-native run-android
```

**Note**: Make sure you have an Android emulator running or a physical device connected.

### iOS

```bash
npx react-native run-ios
```

**Note**: iOS development requires macOS and Xcode.

### Start Metro Bundler (if not started automatically)

```bash
npm start
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Project Structure

```
MovieBrowserApp/
├── src/
│   ├── components/
│   │   └── MovieCard.js
│   ├── context/
│   │   └── MovieContext.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   └── DetailsScreen.js
│   ├── services/
│   │   └── tmdbApi.js
│   └── utils/
│       └── storage.js
├── __tests__/
│   └── movieReducer.test.js
├── .env
├── App.tsx
├── babel.config.js
├── package.json
└── README.md
```

## Key Components

### HomeScreen

- Displays popular movies in a grid layout
- Search bar with real-time filtering
- Infinite scroll pagination
- Loading states and empty state handling

### DetailsScreen

- Full movie information display
- Favorite toggle functionality
- Smooth animations on mount
- Genre chips and metadata badges

### MovieCard

- Animated card component
- Poster image with gradient overlay
- Rating and release year display
- Optimized for grid layout

## Configuration

### Babel Configuration

The project uses `react-native-dotenv` for environment variables and `react-native-reanimated` for animations. Configuration is in `babel.config.js`.

### Navigation

React Navigation is configured with a Stack Navigator for seamless transitions between Home and Details screens.

### State Management

Uses React Context API with useReducer pattern for predictable state updates:

- Movies list management
- Search results
- Favorites
- Loading states

## Troubleshooting

### Build Errors

**Clear cache and rebuild:**

```bash
npm start -- --reset-cache
cd android && ./gradlew clean
cd ..
npx react-native run-android
```

**iOS specific:**

```bash
cd ios
pod deintegrate
pod install
cd ..
npx react-native run-ios
```

### Metro Bundler Issues

```bash
npx react-native start --reset-cache
```

## API Documentation

This app uses [The Movie Database (TMDB) API](https://developers.themoviedb.org/3).

**Endpoints Used:**

- `/movie/popular` - Get popular movies
- `/search/movie` - Search movies
- `/movie/{movie_id}` - Get movie details

---
