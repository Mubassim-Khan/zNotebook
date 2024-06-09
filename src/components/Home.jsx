import React, { useEffect } from 'react'
import "animate.css"
import TrackVisibility from "react-on-screen"
// import { IconButton } from '@mui/material';
import { About } from './About';
import { IoMdAddCircle } from 'react-icons/io';

export const Home = (props) => {
  // To update Top Loading Bar and change Title of tab 
  const updateProgress = () => {
    props.setProgress(100);
    document.title = "Home - iNotebook";
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
              <h2 className='home--heading'>Welcome to iNotebook - Your Personal Note Taking App</h2>
              <p className='home-text-center'>
                Are you tired of forgetting important information, ideas, or tasks? iNotebook is here to help you stay organized & keep track of everything that matters to you the most.
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
              <div className="add-note--txt">
                <p>Add a new note </p>
              </div>
              <div className="add-note--btn mb-4">
                {/* <IconButton > */}
                  <Link to="/notes">
                    <IoMdAddCircle />
                  </Link>
                {/* </IconButton> */}
              </div>
            </div>
          </div>
        }
      </TrackVisibility>
      <About />
   </div>
  )
}