# zNotebook

![Preview 1 Image](https://github.com/Mubassim-Khan/zNotebook/blob/main/frontend/src/assets/images/Preview.png)

![Preview 2 Image](https://github.com/Mubassim-Khan/zNotebook/blob/main/frontend/src/assets/images/Preview%202.png)

<div align="center">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
    <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="expressjs" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactdotjs" />
    <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs" />
    <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="firebase" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
</div>

## 📋 <a name="table">Table of Contents</a>

1. [Introduction](#introduction)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#quick-start)
5. [License](#license)
6. [Contributing](#contributing)
7. [Acknowledgements](#acknowledgements)
8. [Contact](#contact)

## <a name="introduction">Introduction</a>

Welcome to the zNotebook App — a cloud based full-stack web application built with React.js, Tailwind CSS, Node.js, and MongoDB. This application allows users to securely create, read, update, and delete (CRUD) personal notes in the cloud.

Designed with clean UI principles and enhanced with smooth animations, the app offers a responsive and interactive user experience. It includes essential features such as authentication, note management, theme toggling (dark/light), and persistent storage — everything you need in a modern digital notebook.

## <a name="features">Features</a>

👉 **Responsive Design:**
Fully responsive layout ensures the application looks and functions great on all screen sizes — from desktops to tablets to mobile devices.

👉 **Interactive UI Components:**
Includes dynamic elements such as buttons, cards, dropdowns, and hover effects to provide a smooth and engaging user experience.

👉 **Modern Styling with Tailwind CSS:**
Styled entirely with Tailwind CSS for a clean, modern aesthetic and utility-first development workflow.

👉 **Smooth Animations:**
Subtle, performant animations enhance navigation and transitions across sections, improving the visual appeal and UX.

👉 **UI Tracking with Visibility Detection:**
Integrated `framer-motion` (or similar) to detect which sections are currently visible, enabling adaptive UI interactions based on user scroll behavior.

👉 **Secure Backend with MongoDB:**
Data is stored and managed using MongoDB, ensuring high performance and flexibility for CRUD operations and user data management.

👉 **Password Hashing with Bcrypt.js:**
Passwords are hashed using `bcryptjs`, providing strong encryption to keep user credentials secure and unreadable.

👉 **Authentication with JWT:**
Uses JSON Web Tokens (JWT) for secure user authentication, session management, and protection against unauthorized access.

## <a name="tech-stack">Tech Stack 🛠️</a>

- [React.js](https://reactjs.org/) - UI Library
- [Node.Js](https://nodejs.org/en) - JavaScript runtime environment
- [Express.Js](http://expressjs.com/) - JavaScript Framework
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) - Database
- [Firebase](https://firebase.google.com/) - OAuth Apps
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [JSON Webtoken](https://jwt.io/) - Authenticator

## <a name="#quick-start">Getting Started</a>

To get started with this project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Mubassim-Khan/zNotebook.git
```

2. Open the project in your preferred code editor.

3. Install the project dependencies using npm:

```bash
cd backend && npm install
```

```bash
cd frontend && npm install
```

4. Set Up Environment Variables by creating a new file named `.env` in **frontend** and **backend** folder of the project and add the following variables:

```env
/frontend
VITE_HOST_URL=

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

#### \*Visit `./backend/README.md` for requiring/donwloading Firebase env variables

```env
/backend
MONGODB_USERNAME=
MONGODB_PASSWORD=
JWT_TOKEN=

REACT_APP_HOST_URL=

FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
FIREBASE_UNIVERSE_DOMAIN=
```

\*Replace the placeholder and empty values with your actual credentials.

5. Run the project locally (Make sure to be in root directory)

```bash
cd frontend && npm run both
```

This will start both Frontend application and Backend server

6. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## <a name="license">License</a>

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## <a name="contributing">Contributing</a>

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## <a name="acknowledgements">Acknowledgements</a>

- Copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

## <a name="contact">Contact</a>

If you have any questions, suggestions, or feedback, you can reach out to the project maintainer:

- LinkedIn : [Mubassim Ahmed Khan](https://www.linkedin.com/in/mubassim)
- Email: [mubassimkhan@gmail.com](mailto:mubassimkhan@gmail.com)

---

<!----->
