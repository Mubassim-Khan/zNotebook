import React, { useEffect } from 'react'
import "animate.css"
import TrackVisibility from "react-on-screen"

export const About = () => {
  useEffect(() => {
    document.title = 'About - Notebook'
  }, [])

  return (
    <div className='container mt-3 mb-5' id='about'>
      <TrackVisibility>
        {({ isVisible }) =>
          <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
            <h2 className='about--heading'>About iNotebook</h2>
            <p className='about-text-center'>
              iNotebook is your personalized note taking app, where you can store your notes over cloud & can access them anywhere, anytime.
            </p>
            <ul className='about-text my-2'>
              <li>Simple and Intuitive</li>
              <li>Effortless Organization</li>
              <li>Accessible anytime & anywhere</li>
              <li>Secure and Private</li>
              <li>Create, edit and delete notes</li>
              <li>Organize notes with tags</li>
              <li>User-friendly interface</li>
            </ul>
          </div>
        }
      </TrackVisibility>

      <TrackVisibility>
        {({ isVisible }) =>
          <div className={isVisible ? "animate__animated animate__fadeInUp" : ""}>
            <h3 className='home--other-headings'>Getting Started</h3>
            <p className='about-text mb-4'>
              Ready to start jotting down your thoughts? Join the <strong> iNotebook</strong> now by creating the account or log in (if already have an account) or click <strong>+</strong> icon, where you can create a new note,
              edit existing ones, or even delete notes you no longer need. Use the options button (<i className="fa-solid fa-ellipsis"></i>)
              to access additional actions for each note.
            </p>
          </div>
        }
      </TrackVisibility>
    </div>
  )
}
