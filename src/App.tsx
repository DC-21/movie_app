import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import LikedMovies from "./pages/LikedMovies";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" Component={Movies} />
        <Route path="/liked" Component={LikedMovies} />
      </Routes>
    </>
  );
}

export default App;
