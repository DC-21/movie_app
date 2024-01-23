import Navbar from "./components/global/Navbar";
import { Routes, Route } from "react-router-dom";
import LikedMovies from "./pages/LikedMovies";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/liked" Component={LikedMovies} />
      </Routes>
    </>
  );
}

export default App;
