```
npm run server
```
npm start

Add these .env variables:

MONGODB_USERNAME = "mubassimkhan"
MONGODB_PASSWORD = "5rljlTodgL2gzzvG"
JWT_SECRET_SIGN = "mak08"


# 📥 Download `serviceAccountKey.json` file:

### How to Download `serviceAccountKey.json`

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the **gear icon** (⚙) next to **Project Overview** → **Project settings**
4. Go to the **"Service accounts"** tab
5. Click **"Generate new private key"**
6. Firebase will download a file named something like:
   `firebase-adminsdk-abcde-123456.json`
7. Rename it to:
   `serviceAccountKey.json`

---

### 📁 Where to Store It

Put it in backend project folder, in a `config/` directory:

```
/backend
  /config
    serviceAccountKey.json
  firebase-admin-init.js
  server.js
  ...
```
> Update the import path and code accordingly in `firebase-admin-init.js`:

```js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
```

---

### ⚠️ Important: Add to `.gitignore`

To avoid leaking your credentials:

### `.gitignore` (in backend folder)

```
/config/serviceAccountKey.json
```
