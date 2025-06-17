import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import LoadingBar from "react-top-loading-bar";
import { Routes, Route } from "react-router-dom";
import { Notes } from "./components/Notes";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <>
      {/* <Navbar /> */}
      <LoadingBar
        color="blue"
        progress={progress}
        height={3}
        transitionTime={300}
        waitingTime={1500}
        onLoaderFinished={() => setProgress(0)}
      />
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={<Notes setProgress={setProgress} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login setProgress={setProgress} />}
          ></Route>
        </Routes>
        <Routes>
          <Route
            exact
            path="/register"
            element={<Signup setProgress={setProgress} />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
