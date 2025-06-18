import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { MdEmail } from "react-icons/md";

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
}) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
      {/* Image on the right for md+ screens */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <img src={sideImage} alt="coverImage" className="object-contain h-96" />
      </div>
      {/* Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2 text-gray-800 text-center">
            {title}
          </h3>
        </div>
        <form onSubmit={onSubmit} className="w-full">
          {fields.map((field) => (
            <div className="relative z-0 w-full mb-5 group" key={field.name}>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                value={credentials[field.name]}
                onChange={onChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
              {field.help && (
                <div className="text-xs text-gray-500 mt-1">{field.help}</div>
              )}
            </div>
          ))}
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
            className="flex items-center justify-center text-black bg-[#e0e0e0] hover:bg-[#ebebeb] font-medium rounded-lg text-sm mx-auto px-5 py-1 text-center w-full mt-3"
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
            className="flex items-center justify-center text-white bg-[#24292F] hover:bg-[#24292F]/90 font-medium rounded-lg text-sm mx-auto px-5 py-3.5 text-center w-full mt-3"
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
