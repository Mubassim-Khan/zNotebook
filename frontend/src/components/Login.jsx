import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { auth, googleProvider, githubProvider } from "../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth"; // make sure this is imported

import sideImage from "../assets/images/undraw_file_sync_ot38.svg";
import { AuthForm } from "./AuthForm";

export const Login = (props) => {
  useEffect(() => {
    props.setProgress(100);
    document.title = "Login to zNotebook";
  }, []);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const hostURL = import.meta.env.VITE_HOST_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await toast.promise(
      (async () => {
        const response = await fetch(`${hostURL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        const json = await response.json();
        if (json.success === true) {
          localStorage.setItem("token", json.authtoken);
          localStorage.setItem("name", json.name);
          localStorage.setItem("email", json.email);
          localStorage.setItem("username", json.username);
          return { status: "success" };
        } else {
          return {
            status: "error",
            message: "Invalid credentials!",
          };
        }
      })(),
      {
        loading: "Logging in...",
        success: () => {
          navigate("/");
          return <b>Logged in successfully!</b>;
        },
        error: (data) => <b>{"Request timed out. Connection Error."}</b>,
      }
    );
  };

  const handleFirebaseLogin = async (providerType) => {
    const provider =
      providerType === "google" ? googleProvider : githubProvider;

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseIdToken = await result.user.getIdToken();

      let githubUsername = "";

      if (providerType === "github") {
        // GitHub OAuth access token
        const credential = GithubAuthProvider.credentialFromResult(result);
        const githubAccessToken = credential?.accessToken;

        if (githubAccessToken) {
          const githubUserResponse = await fetch(
            "https://api.github.com/user",
            {
              headers: {
                Authorization: `Bearer ${githubAccessToken}`,
              },
            }
          );

          const githubData = await githubUserResponse.json();
          githubUsername = githubData.login; // ← actual GitHub username
        }
      }

      const response = await fetch(`${hostURL}/api/auth/firebase-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: firebaseIdToken, githubUsername }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        localStorage.setItem("name", json.name);
        localStorage.setItem("email", json.email);
        localStorage.setItem("avatar", json.avatar);
        localStorage.setItem("username", json.username || "");
        navigate("/");
      } else {
        toast.error("Login failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Authentication failed.");
    }
  };

  const onChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <AuthForm
      type="login"
      title="Login to zNotebook"
      fields={[
        {
          name: "email",
          label: "Email address",
          type: "email",
          required: true,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
        },
      ]}
      credentials={credentials}
      onChange={onChange}
      onSubmit={handleSubmit}
      onGoogleLogin={() => handleFirebaseLogin("google")}
      onGithubLogin={() => handleFirebaseLogin("github")}
      sideImage={sideImage}
      submitLabel="Log In"
      disabled={
        credentials.email.length === 0 || credentials.password.length === 0
      }
      redirectText="New to zNotebook?"
      redirectLink="/register"
      redirectLabel="Create an account"
    />
  );
};
