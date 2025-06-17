import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sideImage from "../assets/images/undraw_file_sync_ot38.svg";
import toast from "react-hot-toast";
import { AuthForm } from "./AuthForm";

export const Signup = (props) => {
  useEffect(() => {
    props.setProgress(100);
    document.title = "Join zNotebook - zNotebook";
  }, []);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const hostURL = import.meta.env.VITE_HOST_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    await toast.promise(
      (async () => {
        const response = await fetch(`${hostURL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
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
      type="signup"
      title="Register to zNotebook"
      fields={[
        {
          name: "name",
          label: "Full Name",
          type: "text",
          minLength: 3,
          required: true,
          help: "*Name must be at least 3 characters long.",
        },
        { name: "email", label: "Email", type: "email", required: true },
        {
          name: "password",
          label: "Password",
          type: "password",
          minLength: 6,
          required: true,
          help: "*Password must be at least 6 characters long.",
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
      sideImage={sideImage}
      submitLabel="Sign Up"
      disabled={
        credentials.name.length < 3 ||
        credentials.password.length < 6 ||
        credentials.confirmpassword.length < 6 ||
        credentials.password !== credentials.confirmpassword
      }
      redirectText="Already have an account?"
      redirectLink="/login"
      redirectLabel="Log in"
    >
      {/* Extra: Password match warning */}
      {credentials.password !== credentials.confirmpassword && (
        <div className="text-red-600 text-sm mb-2">
          ⚠️ Password does not match!
        </div>
      )}
    </AuthForm>
  );
};
