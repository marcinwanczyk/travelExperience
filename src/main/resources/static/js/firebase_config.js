import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import firebaseConfig from "./firebase_key.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

const registerForm = document.querySelector("#registerForm form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", userCred.user.uid), {
        email: userCred.user.email,
        visitedCountries: [],
      });
      document.getElementById("registerMessage").textContent =
        "Registration successful!";
    } catch (err) {
      document.getElementById("registerMessage").textContent =
        "Registratrion unsuccessful" + err.message;
    }
  });
}

const loginForm = document.querySelector("#loginForm form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      document.getElementById("loginMessage").textContent = "Logged in!";
      if (typeof loadVisitedCountriesOnLogin === "function") {
        loadVisitedCountriesOnLogin(userCred.user.uid);
      }
    } catch (err) {
      document.getElementById("loginMessage").textContent =
        "Login failed" + err.message;
    }
  });
}

// const userSignIn = async () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const user = result.user;
//       console.log(user);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//     });
// };

const userSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName,
        visitedCountries: [],
      });
    }
  } catch (error) {
    console.error("User already exists in Firestore");
  }
};

const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      alert("You have been signed out!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    alert("You are authenticated with google");

    const email = user.email;
    const userDisplayName = user.displayName;
    const splited = userDisplayName.split(" ");
    const name = splited[0];
    const lastName = splited[1];
    document.getElementById("name").value = name;
    document.getElementById("surname").value = lastName;
    document.getElementById("email").value = email;
  }
});

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);

// document.addEventListener("DOMContentLoaded", () => {
//   const signInButton = document.querySelector("#signInButton");
//   const signOutButton = document.querySelector("#signOutButton");
//   if (signInButton) signInButton.addEventListener("click", userSignIn);
//   if (signOutButton) signOutButton.addEventListener("click", userSignOut);
// });