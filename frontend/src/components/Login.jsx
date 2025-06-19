import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
          localStorage.setItem("name", json.username);
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
        error: (data) => (
          <b>{"Request timed out. Connection Error."}</b>
        ),
      }
    );
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
