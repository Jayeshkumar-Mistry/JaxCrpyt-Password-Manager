import React from "react";

const Navbar = () => {
  return (
    <nav className="text-white font-baloo">
      <div className="flex  justify-between mx-auto md:container md:px-40 md:py-5 p-5  ">
        <div className="">
          <div className="font-pop ">
            <span className="text-[#00FFF7] font-bold ">&lt;</span>
            <span className="text-white font-bold ">Jax</span>
            <span className="text-[#00FFF7] font-bold">Crypt/&gt;</span>
          </div>
        </div>

        <div className=" flex gap-4  ">
          <a href="/" className="hover:font-bold">
            Home
          </a>
          <a href="/" className="hover:font-bold">
            About
          </a>
          <a href="/" className="hover:font-bold">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
