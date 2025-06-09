import React from 'react'
import FooterLogo from "../assets/images/logo.png"
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <>
    <div className="footer-bottom mt-5">
        <footer className="text-gray-600 body-font footer-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col footer-div" >
                <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 footer-link">
                    <img
                        src={FooterLogo}
                        alt="Footer logo"
                        className="d-inline-block align-text-top footer-img" />
                    <span className="ml-3 text-xl footer-txt-heading">
                        zNotebook
                    </span>
                </Link>
                <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 footer-txt">
                    © 2024 zNotebook. All Rights Reserved.
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start footer-icons"></span>
            </div>
        </footer>
    </div>
</>

  )
}
