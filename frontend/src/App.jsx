import {Routes, Route} from "react-router-dom";

// PAGES
import Login from "./pages/Login"
import SignUp from "./pages/SignUp";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
