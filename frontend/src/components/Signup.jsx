import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sideImage from "../assets/images/undraw_file_sync_ot38.svg";
import toast from "react-hot-toast";

import { auth, googleProvider, githubProvider } from "../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";

import { AuthForm } from "./AuthForm";

export const Signup = (props) => {
  useEffect(() => {
    props.setProgress(100);
    document.title = "Join zNotebook - zNotebook";
  }, []);

  const [touched, setTouched] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    confirmpassword: false,
  });

  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();
  const hostURL = import.meta.env.VITE_HOST_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, email, password } = credentials;
    await toast.promise(
      (async () => {
        const response = await fetch(`${hostURL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, username, email, password }),
        });
        const json = await response.json();
        if (json.success === true) {
          localStorage.setItem("token", json.authtoken);
          toast.success("Account created successfully!");
          navigate("/login");
        } else {
          return {
            status: "error",
            message: "Entered email address is already registered with a user",
          };
        }
      })(),
      {
        loading: "Creating an account...",
        success: () => {
          navigate("/");
          return <b>Account created successfully!</b>;
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

      const response = await fetch(`${hostURL}/api/auth/firebase-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: firebaseIdToken }),
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

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isUsernameInvalid =
    touched.username &&
    (credentials.username.length < 4 ||
      !/^[a-zA-Z0-9_-]+$/.test(credentials.username));

  return (
    <AuthForm
      type="signup"
      title="Register to zNotebook"
      isUsernameInvalid={isUsernameInvalid}
      fields={[
        {
          name: "name",
          label: "Full Name",
          type: "text",
          minLength: 3,
          required: true,
          help: "Name must be atleast 3 characters long.",
        },
        {
          name: "username",
          label: "Username",
          type: "text",
          minLength: 4,
          required: true,
          help: "Username can only contain letters, numbers, hyphens (-), and underscores (_) & must be atleast 4 characters long",
        },
        { name: "email", label: "Email", type: "email", required: true },
        {
          name: "password",
          label: "Password",
          type: "password",
          minLength: 6,
          required: true,
          help: "*Password must be atleast 6 characters long.",
        },
        {
          name: "confirmpassword",
          label: "Confirm Password",
          type: "password",
          minLength: 6,
          required: true,
        },
      ]}
      credentials={credentials}
      onChange={onChange}
      onSubmit={handleSubmit}
      onGoogleLogin={() => handleFirebaseLogin("google")}
      onGithubLogin={() => handleFirebaseLogin("github")}
      sideImage={sideImage}
      submitLabel="Sign Up"
      disabled={
        credentials.name.length < 3 ||
        credentials.username.length < 4 ||
        credentials.password.length < 6 ||
        credentials.confirmpassword.length < 6 ||
        credentials.password !== credentials.confirmpassword
      }
      redirectText="Already have an account?"
      redirectLink="/login"
      redirectLabel="Log in"
    >
      {/* Password match warning */}
      {credentials.password !== credentials.confirmpassword && (
        <div className="text-red-600 text-sm mb-2">
          ⚠️ Password does not match!
        </div>
      )}
    </AuthForm>
  );
};
