import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import { Home } from './components/Home'
import NoteState from './context/notes/noteState'
import { Notes } from './components/Notes'

function App() {
  const [progress, setProgress] = useState(0)
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <LoadingBar
            color='blue'
            progress={progress}
            height={3}
            transitionTime={300}
            waitingTime={1500}
            onLoaderFinished={() => setProgress(0)}
          />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home setProgress={setProgress} />}></Route>
            </Routes>
            <Routes>
              <Route exact path="/notes" element={<Notes setProgress={setProgress} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
