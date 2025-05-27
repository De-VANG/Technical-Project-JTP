<h1 align="center">🎮 Game Recommender Website 🎮</h1>


Welcome to GameMatch, a personalized video game recommendation web application that helps you discover games tailored to your unique tastes. Whether you're an experienced gamer or just getting started, our platform uses content based filtering to suggest titles you'll love.A web application that recommends video games based on user preferences. Built with **React**, **Tailwind CSS**, **Flask**, **MongoDB**, and fully containerized using **Docker**.

---

## ✨ Features

- User Sign-Up / Login (JWT Authentication)
- Rate games and mark favorites
- Personalized game recommendations
- View past recommendations
- Fully responsive UI with Tailwind CSS
- Plug-and-play Dockerized setup
---



## 🧰 Tech Stack Overview

### 🚀 Frontend: React + Vite + Tailwind CSS
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>


### 🔧 Backend: Python + Flask
<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
</p>


### 💾 Database: MongoDB

<p>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>


### 🔐 Authentication: JWT (JSON Web Tokens)

<p>
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
</p>


### 📦 Containerization: Docker & Docker Compose

<p>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker_Compose-003F8C?style=for-the-badge&logo=docker&logoColor=white" />
</p>


---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js (v18+)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

### 🔧 Environment Tools

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)


---

## 🛠️ Installation

1. **Clone the Repository**

```
git clone https://github.com/De-VANG/Technical-Project-JTP.git
cd Technical-Project-JTP
```

2. **Set up Backend**

```
cd Backend
pip install -r requirements.txt
```

3. **Set up Frontend**

```
cd ../game_frontend
npm install
```

4. **Load Dataset into MongoDB**

```
cd ../Backend
python import_games.py
```

5. **Run Locally Without Docker**

In one terminal, start the Flask backend:
```
cd Backend
python auth.py
```
In another terminal, start the React frontend:
```
cd game_frontend
npm run dev
```

---

## 🐳 Docker Setup

To run the full application with Docker:

```
docker-compose up --build
```


## Desciption

Our video game recommendation website is designed to provide users with personalized game suggestions based on their preferences. 

<img src= "https://postimage.me/images/2025/05/27/untitled.png" />

In the above user flow diagram, The user journey begins on a simple and clean landing page where users can either sign up or log in.

- 🔐 New users are taken to a Game Rating page where they rate a selection of games. These ratings are stored in MongoDB and are used to generate the user's first set of recommendations via a Flask backend.
- 🏠 Returning users are directed straight to the Home Page, where they are greeted with curated game recommendations based on their previous interactions.
- 👤 On the Profile Page, users can view their rating history and past recommendations, all visually presented with game posters for a rich and engaging experience.
- 🧠 All recommendations are powered by a content-based filtering algorithm, ensuring the suggestions are tailored to individual user tastes.

---
## 📬 Contact

Devang Bhatnagar
1. GitHub: https://github.com/De-VANG
2. LinkedIn: https://www.linkedin.com/in/devang-bhatnagar/
3. Email: devangbhatnagar12@gmail.com


