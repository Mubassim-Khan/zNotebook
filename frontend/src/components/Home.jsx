import React, { useEffect } from 'react'
import "animate.css"
import TrackVisibility from "react-on-screen"
import { About } from './About';
import { IoMdAddCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';

export const Home = (props) => {
  // To update Top Loading Bar and change Title of tab 
  const updateProgress = () => {
    props.setProgress(100);
    document.title = "Home - zNotebook";
  }
  useEffect(() => {
    updateProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container home--top">
      <div className="home--title-card">
        <TrackVisibility>
          {({ isVisible }) =>
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              <h2 className='home--heading'>Welcome to zNotebook - Your Personal Note Taking App</h2>
              <p className='home-text-center'>
                Are you tired of forgetting important information, ideas, or tasks? zNotebook is here to help you stay organized & keep track of everything that matters to you the most.
              </p>
            </div>
          }
        </TrackVisibility>
      </div>

      {/* Add new note button */}
      <TrackVisibility>
        {({ isVisible }) =>
          <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
            <div className="add-note">
                <p className='mb-3'>Add a new note </p>
                <div className="mx-3 mb-3">
                  <Link to="/notes">
                    <IoMdAddCircle fontSize={50} />
                  </Link>
              </div>
            </div>
          </div>
        }
      </TrackVisibility>
      <About />
    </div>
  )
}