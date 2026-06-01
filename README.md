# Watchly Full-Stack Movie Watchlist App

**Overview**

WatchMovie is a full-stack application built for users to search for movies, manage a personalized watchlist, and view detailed information.

---

## Setup Instructions

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/akhanal222/watchMovie
cd watchMovie

```
### 2. Install Backend Dependencies

```bash
npm install
```


### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 4. Create a .env file in the root folder:

```bash
TMDB_API_KEY=your_tmdb_key
JWT_SECRET=your_secret
DATABASE_URL=your_postgres_url
```

### 5. Run backend
```bash
node server.js
```

### 6. Run frontend
```bash
cd frontend
npm run dev
```

---
## Deployed App URL

Live App: https://ak-watchly.onrender.com/

GitHub Repo: https://github.com/akhanal222/watchMovie/tree/deploy

## Design Choices

I chose React (Vite) for the frontend. For the backend, I used Node.js + Express, since it integrates cleanly with REST APIs and is easy to structure with controllers and routes. My database is PostgreSQL where I store watchlists, user accounts, and movie data.

## Challenges

During development, the biggest challenges came from:

Handling client-side routing during deployment

Fixing CORS issues between frontend and backend

Structuring authentication securely with JWT

Integrating TMDB API, especially with missing fields or inconsistent movie data

At first, deploying as a Static Site + API didn’t work, because React Router broke when refreshing pages.
Later, I switched to deploying both frontend and backend together as one Web Service on Render (the same method used in class). After adding the adjusting everything deployed correctly.

---
## Learning Outcomes

###### 1. How to build a full-stack app from scratch

###### 2.  How REST routes (GET/POST/PUT/DELETE) connect to SQL queries

###### 3. How to use JWT for authentication

###### 4. How to integrate external APIs like TMDB

###### 5. How to solve deployment problems and use Render effectively


## Future Improvements

###### 1. Add support for TV series (trending shows, seasons, episodes)

###### 2. Where to watch information using TMDB watch-provider API

###### 3.  Personalized recommendations based on watch history

##### 4. User reviews & ratings etc.


##### Final Presentation Link : 
[Final Presentation Video](https://uncg-my.sharepoint.com/:v:/g/personal/a_khanal_uncg_edu/IQATTydLjukIT7cjOIWObmGxATNqh2fx__ZFvGthUMJkkyw)



