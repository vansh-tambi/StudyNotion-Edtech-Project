import { Routes , Route} from "react-router-dom";
import "./index.css";
import "./App.css"
import Home from "./Pages/Home";

function App() {

  return (
    <div className="w-screen h-full bg-richblack-900 flex flex-col font-inter">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </div>
  )
}

export default App
