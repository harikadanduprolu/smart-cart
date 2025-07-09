# 🛒 Smart Cart 

A cross-platform, AI-assisted **shopping basket app** built with **Expo**, **React Native**, and **TypeScript**. This app allows users to create, manage, and reuse smart shopping baskets, with features like AI recommendations, camera input, haptics, and smooth animations.

---

##  Features

-  **Custom & Reusable Smart Baskets**
-  **AI-powered item suggestions** (based on past usage or recipes)
-  Add items to **cart** or **basket** independently
-  File-based routing via **Expo Router**
-  Tab navigation for Baskets, Recipes, Orders, Settings
-  Styled with **NativeWind (Tailwind CSS for RN)**
-  **Camera access**, 📳 **Haptics**, 🎨 **Linear gradients**, and more
-  Full **TypeScript** support
-  Works on **iOS, Android, and Web**

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Expo SDK 53](https://docs.expo.dev/) |
| Core | React Native 0.79 · React 19 · TypeScript 5.8 |
| Navigation | [Expo Router 5](https://expo.github.io/router) + Bottom Tabs |
| Styling | [NativeWind](https://www.nativewind.dev) + Tailwind-like classes |
| UI / FX | Expo Linear Gradient, Expo Blur, Lucide RN, SVG |
| Native APIs | Camera · Haptics · Gesture Handler · WebView |
| Animation | React Native Reanimated |
| Icons | Lucide + Expo Vector Icons |
| Tooling | Metro · Babel · EAS CLI |

---

## 📁 Project Structure

```bash
.
├── app/                     # Expo Router pages
│   ├── _layout.tsx         # Root navigation layout
│   ├── index.tsx           # Home screen
│   ├── baskets/            # Basket-related screens
│   ├── recipes/            # Recipe-based AI suggestions
│   ├── orders/             # Order history, checkout
│   └── settings/           # App and user settings
├── assets/                 # Images and static assets
├── components/             # Reusable UI components
├── constants/              # Shared constants
├── utils/                  # Helper functions
├── app.json                # Expo app config
├── package.json            # NPM dependencies and scripts
├── tsconfig.json           # TypeScript config
└── eas.json                # EAS build config
