import { useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";

import googleIcon from "../assets/images/google-icon.svg";
import githubIcon from "../assets/images/github-icon.svg";

export const AuthForm = ({
  type,
  title,
  fields,
  credentials,
  onChange,
  onSubmit,
  sideImage,
  submitLabel,
  disabled,
  redirectText,
  redirectLink,
  redirectLabel,
  children,
  isUsernameInvalid,
  onGoogleLogin,
  onGithubLogin,
}) => (
  <div className="pt-[7rem] pb-20 flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-300 overflow-y-auto">
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
      {/* Image on the right for md+ screens */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <img src={sideImage} alt="coverImage" className="object-contain h-96" />
      </div>
      {/* Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 mt-1">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2 text-gray-800 text-center">
            {title}
          </h3>
        </div>
        <form onSubmit={onSubmit} className="w-full">
          {fields.map((field) => {
            const [showPassword, setShowPassword] = useState(false);
            const isPassword = field.type === "password";

            return (
              <div className="relative z-0 w-full mb-5 group" key={field.name}>
                <input
                  type={isPassword && showPassword ? "text" : field.type}
                  name={field.name}
                  id={field.name}
                  value={credentials[field.name]}
                  onChange={onChange}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer pr-10"
                  placeholder=" "
                  minLength={field.minLength}
                  required={field.required}
                />
                <label
                  htmlFor={field.name}
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  {field.label}
                </label>

                {isPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 p-2"
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                )}

                {field.help && (
                  <div className="text-xs text-gray-500 text-bold">
                    {field.help}
                  </div>
                )}

                {field.name === "username" && isUsernameInvalid && (
                  <div className="text-red-600 text-sm mt-1">
                    ⚠️ Username must be at least 4 characters long and can only
                    include letters, numbers, hyphens (-), and underscores (_).
                  </div>
                )}
              </div>
            );
          })}

          {children}
          {type === "login" && (
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label
                htmlFor="terms"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                I agree with the{" "}
                <a href="#" className="text-blue-600">
                  terms and conditions
                </a>
              </label>
            </div>
          )}

          {/* Email button */}
          <button
            type="submit"
            className={`flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm mx-auto px-5 py-3.5 text-center mt-3 w-full ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={disabled}
          >
            <MdEmail className="w-[20px] h-[20px] mr-3" />
            {submitLabel}
          </button>

          {/* Google button */}
          <button
            type="submit"
            onClick={onGoogleLogin}
            className="flex items-center justify-center text-black bg-[#ebebeb] hover:bg-[#e0e0e0] font-medium rounded-lg text-sm mx-auto px-5 py-1 text-center w-full mt-3"
          >
            <img
              src={googleIcon}
              alt="Google icon"
              className="w-[40px] h-[40px]"
            />
            Continue with Google
          </button>

          {/* GitHub button */}
          <button
            type="submit"
            onClick={onGithubLogin}
            className="flex items-center justify-center text-white bg-[#24292F]/90 hover:bg-[#24292F] font-medium rounded-lg text-sm mx-auto px-5 py-3.5 text-center w-full mt-3"
          >
            <img
              src={githubIcon}
              alt="GitHub icon"
              className="w-[20px] h-[20px] mr-3"
            />
            Continue with GitHub
          </button>
          <div className="text-center text-sm mt-4 text-gray-600">
            {redirectText}
            <Link className="text-blue-600 ml-1" to={redirectLink}>
              {redirectLabel}
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
);
