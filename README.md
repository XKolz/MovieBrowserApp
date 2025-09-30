<!-- # Movie Browser App

## Setup

1. Clone repo
2. Run `npm install`
3. Create `.env` file with your TMDB_API_KEY
4. Run `npx react-native run-android` or `npx react-native run-ios`

## Features

- Browse popular movies
- Search movies by title
- View movie details
- Favorite movies

## Tech Stack

React Native, React Navigation, Context API, Axios, AsyncStorage -->

## **CREATE: `README.md` (in root directory)**

````markdown
# 🎬 Movie Browser App

A beautiful, modern React Native application that allows users to browse, search, and explore movies using The Movie Database (TMDB) API. Built with smooth animations, infinite scroll, and a sleek dark-themed UI.

## 📸 Screenshots

[Add your screenshots here]

## ✨ Features

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

## 🛠️ Tech Stack

- **Framework**: React Native
- **State Management**: React Context API + useReducer
- **Navigation**: React Navigation (Stack Navigator)
- **HTTP Client**: Axios
- **Animations**: React Native Reanimated
- **Storage**: AsyncStorage
- **Environment Variables**: react-native-dotenv
- **API**: The Movie Database (TMDB) API
- **Testing**: Jest

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **React Native CLI**
- **Android Studio** (for Android) or **Xcode** (for iOS)
- **JDK** (Java Development Kit) for Android
- **TMDB API Key** (instructions below)

## 🚀 Installation

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

**⚠️ Important**: Never commit your `.env` file to version control!

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

## 🧪 Testing

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

## 📁 Project Structure

```
MovieBrowserApp/
├── src/
│   ├── components/
│   │   └── MovieCard.js          # Reusable movie card component
│   ├── context/
│   │   └── MovieContext.js       # Global state management
│   ├── screens/
│   │   ├── HomeScreen.js         # Main screen with movie list
│   │   └── DetailsScreen.js      # Movie details screen
│   ├── services/
│   │   └── tmdbApi.js            # API service layer
│   └── utils/
│       └── storage.js            # AsyncStorage utilities
├── __tests__/
│   └── movieReducer.test.js      # Unit tests
├── .env                          # Environment variables (not in repo)
├── App.js                        # Root component
├── babel.config.js               # Babel configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🎨 Key Components

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

## 🔧 Configuration

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

## 🐛 Troubleshooting

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

### API Key Issues

- Ensure your `.env` file is in the root directory
- Verify your API key is correct
- Restart Metro bundler after adding the API key

### Metro Bundler Issues

```bash
npx react-native start --reset-cache
```

## 📚 API Documentation

This app uses [The Movie Database (TMDB) API](https://developers.themoviedb.org/3).

**Endpoints Used:**

- `/movie/popular` - Get popular movies
- `/search/movie` - Search movies
- `/movie/{movie_id}` - Get movie details

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Samuel**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- React Native community for amazing tools and libraries
- Anthropic for technical interview opportunity

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [TMDB API Documentation](https://developers.themoviedb.org/3)
3. Open an issue on GitHub

---
