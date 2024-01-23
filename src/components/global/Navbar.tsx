import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between z-40 mx-auto p-6 items-center bg-black backdrop:blur-xl sticky text-white top-0 bg-opacity-90">
      <Link to="/" className="text-xl">
        Movie App
      </Link>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/liked">Liked</Link>
      </div>
    </div>
  );
};

export default Navbar;
