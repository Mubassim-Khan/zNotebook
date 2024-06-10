import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import sideImage from "../assets/images/undraw_file_sync_ot38.svg";
import toast from 'react-hot-toast';

export const Signup = (props) => {
    // To update Top Loading Bar and change Title of tab 
    const updateProgress = () => {
        props.setProgress(100);
        document.title = "Join iNotebook - iNotebook";
    }
    useEffect(() => {
        updateProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hostURL = "http://localhost:8080";
    // State to keep track of credentials
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmpassword: "" });
    // useNavigate to redirect to Home page of Notes
    let navigate = useNavigate();

    // Send the reponse to API and authenticate the user
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { name, email, password } = credentials;
            const response = await fetch(`${hostURL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            console.log(json)
            if (json.success === true) {
                // Save the authtoken in local storage & redirect
                localStorage.setItem('token', json.authtoken);
                toast.success("Account created successfully!")
                navigate("/login");
            } else {
                toast.error("Entered email address is already registered with a user")
            }
        } catch {
            toast.error("Request timed out. Connection Error.")
        }
    }
    // to display the change in every keystroke at input fields 
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    return (
        <>
            <div className="content">
                <div className='container mt-2 signup--container'>
                    <div className="row">
                        <div className="col-md-6 order-md-2">
                            <img src={sideImage} alt="coverImage" className="img-fluid" />
                        </div>

                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3 className='signup--heading'>Register to<strong> iNotebook</strong></h3>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <div className="form-group first">
                                                <label htmlFor="name" className="form-label">Full Name</label>
                                                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={onChange} name='name' minLength={3} required />
                                                <div id="nameHelp" className="form-text">*Name must be atleast 3 characters long.</div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="form-group first">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name='email' placeholder='example@mail.com' />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="form-group first">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="password" onChange={onChange} name='password' minLength={6} required />
                                                <div id="passwordHelp" className="form-text">*Password must be atleast 6 characters long.</div>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="form-group last mb-4">
                                                <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                                                <input type="password" className="form-control" id="confirmpassword" onChange={onChange} name='confirmpassword' minLength={6} required />
                                            </div>
                                            <div className="passwordMatching text my-1">
                                                {
                                                    credentials.password !== credentials.confirmpassword &&
                                                    "⚠️ Password does not match!"
                                                }
                                            </div>
                                        </div>

                                        <button disabled={credentials.name.length < 3 || credentials.password.length < 6 || credentials.confirmpassword.length < 6 || credentials.password !== credentials.confirmpassword} type="submit" className="btn btn-primary btn-block my-2 signup--btn">Sign Up</button>
                                        <div id="logIn" className="form-text mt-4 redirect">Already have an account?
                                            <Link className='redirect--link' to="/login"> Log in </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}