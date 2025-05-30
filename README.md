<h1 align="center">🎮 Game Recommender Website 🎮</h1>


Welcome to GameMatch, a personalized video game recommendation web application that helps you discover games tailored to your unique tastes. Whether you're an experienced gamer or just getting started, our platform uses content based filtering to suggest titles you'll love.A web application that recommends video games based on user preferences. Built with **React**, **Tailwind CSS**, **Flask**, **MongoDB**, and fully containerized using **Docker**. Project for recruitment process at JTP Co. LTD.

---

#  Table of Cotents


- [✨ Features](#-features)
- [🧰 Tech Stack Overview](#-tech-stack-overview)
- [📝 Description](#-description)
- [🚀 Getting Started](#-getting-started)
   - [🐳 With Docker (Recommended)](#-with-docker-recommended)
   - [⚙️ Without Docker](#️-without-docker)
- [🧭 Walkthrough](#-walkthrough)
- [📬 Contact](#-contact)



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

## 📝 Description

Our video game recommendation website is designed to provide users with personalized game suggestions based on their preferences. 

<img src= "https://postimage.me/images/2025/05/27/untitled.png" />

In the above user flow diagram, The user journey begins on a simple and clean landing page where users can either sign up or log in.

- 🔐 New users are taken to a Game Rating page where they rate a selection of games. These ratings are stored in MongoDB and are used to generate the user's first set of recommendations via a Flask backend.
- 🏠 Returning users are directed straight to the Home Page, where they are greeted with curated game recommendations based on their previous interactions.
- 👤 On the Profile Page, users can view their rating history and past recommendations, all visually presented with game posters for a rich and engaging experience.
- 🧠 All recommendations are powered by a content-based filtering algorithm, ensuring the suggestions are tailored to individual user tastes.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js (v18+)](https://nodejs.org/en/download)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/downloads)

### 🔧 Environment Tools

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MongoDB](https://www.mongodb.com/try/download/community)



### 🛠️ Installation

---

### 🐳 With Docker (Recommended)

---

1. **Clone the Repository**

Open New Empty folder in VSCode and type the following command in the VSCode Terminal.

```
git clone https://github.com/De-VANG/Technical-Project-JTP.git
```

2. **Navigate Project Directory**

```
cd Technical-Project-JTP
```

3. **Run Docker Compose**

Now, Open the 'Docker Desktop' in the background, then come back to the VSCode terminal and write the following command:

```
docker-compose up --build
```

4. **Access the website**

<p>Wait for couple of minutes, then open the Docker Desktop or click 'v' in the terminal. You can access the app through Docker Desktop or by entering the address in the web browser.</p>

- Backend: http://localhost:5001
- Frontend: http://localhost:5173

5. **Close The Application**

To close the application, press 'Ctrl + C' in the terminal and run the following command to fully close the runing Docker Container.
```
docker-compose down
```

---

### ⚙️ Without Docker

---
1. **Clone the Repository**

```
git clone https://github.com/De-VANG/Technical-Project-JTP.git

```

2. **Navigate Project Directory**

```
cd Technical-Project-JTP
```

3. **Install Dependencies for Backend**

Change the directory to the Backend Folder

```
cd Backend
```
Now, Install the Dependencies.
```
pip install -r requirements.txt
```

4. **Load Dataset into MongoDB**

Install MongoDB by following each instructions from [here](https://www.mongodb.com/docs/manual/administration/install-community/). <br></br>
- Open the MongoDB Compass and Connect the Network(You might see network named 'localhost:27017'). 
- Comeback in VSCode, Open the file Technical-Project-JTP/Backend/import_games.py.
```
#Replace the line 14

client = MongoClient("mongodb://mongo:27017/")

#with

client = MongoClient("mongodb://localhost:27017/")

#Save the file.
```
- After that run the following command in the terminal. Make sure you are in the Backend directory if not then change the directory.
```
cd /Backend
```
```
python import_games.py
```

5. **Install Dependencies for Frontend**

Change the directory to the game-frontend folder and then install the dependencies. Make sure you have already installed the [node.js](https://nodejs.org/en/download)

```
cd /game-frontend 
npm install
```

6. **Run the Application**

In one terminal, start the Flask backend:
```
cd Backend
python auth.py
```
In another terminal, start the React frontend:
```
cd game-frontend
npm run dev
```
You can access the web browser from the links genrated in the terminal or Open Browser and navigate to access the application: http://localhost:5173


7. **Close the Application**

- Logout from the current session.
- Comeback in VSCode and Press 'Ctrl + C' in both the terminals to stop the system.
- Undo the changes made in the line 14 in import_games.py file, if you want docker compose to run the application. 

---

## 🧭 Walkthrough

1. After opening the link http://localhost:5173 in the browser, user will be directed to landing page.
<img src = "https://postimage.me/images/2025/05/30/Screenshot-2025-05-30-at-5.29.52AM.png"/>

2. (a) Click on the "Login/Signup" button.
<p><img src ="https://postimage.me/images/2025/05/30/Screenshot-2025-05-30-at-5.30.18AM.png" />
<img src ="https://postimage.me/images/2025/05/30/Screenshot-2025-05-30-at-5.30.27AM.png"/> </p>

  - (b) Old users can use Login Page and New users can Signup using their unique username and password.

<br>
<img src ="https://postimage.me/images/2025/05/30/Screenshot-2025-05-30-at-5.31.53AM.png"/>

3. (a) New Users will be directed towards to RateAndFav Page, here the users can give rating to popular games and they can choose any one game as their favourite. 
<img src ="https://postimage.me/images/2025/05/30/Screenshot-2025-05-30-at-5.32.44AM.png"/>
 
  - (b) After selecting Favourite game, the user has to click the submit button to get their very first recommendation. 


<img src ="https://postimage.me/images/2025/05/30/Screenshot-2025-05-30-at-5.34.23AM.png"/>

4. (a) After submitting the Ratings and Favourite Game. The user gets directed to Home Page. The system gives first recommendation on the basis of the user's favourite game.
  - (b) Old Users when LogIn, they also gets directed towards this page to get recommendations.

<img src ="https://postimage.me/images/2025/05/30/Screenshot-2025-05-30-at-5.34.40AM.png"/>

5. After selecting the New Game click "Get Recommendations" and the system will recommend the similar games.

<img src ="https://postimage.me/images/2025/05/30/Screenshot-2025-05-30-at-5.36.06AM.png"/>

6. This is the Profile Page, where the user can see their past recommendations and ratings. 
<br>
</br>
---

## 📬 Contact

Devang Bhatnagar
1. GitHub: https://github.com/De-VANG
2. LinkedIn: https://www.linkedin.com/in/devang-bhatnagar/
3. Email: devangbhatnagar12@gmail.com
