# Weather LK

A modern weather forecast app for any city or region worldwide, built with Next.js, React, Zustand, Tailwind CSS, and Ant Design.  
Get current weather, hourly and 10-day forecasts, air quality, and more instantly, based on your location or search.

---

## Features

- **Current Weather:** See real-time temperature, humidity, wind, UV index, and air quality for your location.
- **Hourly Forecast:** Interactive chart of temperature trends for the day.
- **10-Day Forecast:** Scrollable daily outlook with weather icons and summaries.
- **Location Search:** Find weather for any city or region worldwide.
- **Automatic Location:** Uses your device's geolocation or falls back to IP-based location.
- **UI:** Clean design using Ant Design and Tailwind CSS..
- **State Management:** Powered by Zustand for fast, simple state updates.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root with your weather API credentials:

```
NEXT_PUBLIC_API_URL=https://your-weather-api-url
NEXT_PUBLIC_API_KEY=your_api_key
```

### 3. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm start` — Start the production server

---

## Tech Stack

- **Next.js 15**
- **React 19**
- **Tailwind CSS 4**
- **Ant Design 5**
- **Recharts** (for charts)
- **Zustand** (state management)
- **TypeScript**

---

## Customization

- **Styling:** Tailwind CSS is used for rapid styling. You can easily add or modify styles in `src/app/globals.css`.
- **Components:** All UI components are in `src/app/components/`.
- **API:** Weather data is fetched from a configurable API (see `.env.local`).

---

## License

This project is for educational and demonstration purposes.
