const Navbar = () => {
  return (
    <div className="w-full flex justify-between mx-auto p-6 items-center bg-black backdrop:blur-xl sticky text-white top-0 bg-opacity-90">
      <div className="text-xl">Movie App</div>
      <div className="flex gap-4">
        <a href="">Home</a>
        <a href="">Liked</a>
      </div>
    </div>
  );
};

export default Navbar;
