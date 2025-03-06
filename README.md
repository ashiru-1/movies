# 🎬 Movie Search App created by David Adesola Ashiru (CYPHER)
davidadesola007@gmail.com

## 📌 Overview
The Movie Search App is a simple React application that allows users to search for movies using the **OMDb API**. It provides movie details like title, rating, release year, and language.

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ashiru-1/movie-search-app.git
cd movie-search-app
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up API Key
- Get a free API key from **[OMDb API](https://www.omdbapi.com/apikey.aspx)**.
- Create a `.env` file in the root folder and add:
  ```env
  VITE_OMDB_API_KEY=your_api_key_here
  ```
- Restart your development server after adding the API key.

### 4️⃣ Run the App
```bash
npm run dev
```
This will start the app on `http://localhost:5173/` (default Vite port).

---

## ✨ Features List
✔ **Search for movies** by title (partial matches supported)  
✔ **Displays movie details** (title, rating, release year, language)  
✔ **Shows popular movies** on the homepage  
✔ **Handles errors gracefully** (e.g., incorrect IMDb ID, no results found)  
✔ **Loads more than 10 movies** using pagination  
✔ **Implements debounced search** to avoid API overloading

---

## 🔑 API Key Setup Guide
The app fetches movie data using **OMDb API**. You must **set up an API key** to use the app.

1️⃣ **Sign up** for a free API key at [OMDb API](https://www.omdbapi.com/apikey.aspx).  
2️⃣ Copy the key and add it to your `.env` file:  
   ```env
   VITE_OMDB_API_KEY=your_api_key_here
   ```
3️⃣ Restart the development server to apply changes.

---

## 🛠 Tech Stack
- **Frontend:** React, Vite  
- **Styling:** Tailwind CSS 
- **API:** OMDb API  
