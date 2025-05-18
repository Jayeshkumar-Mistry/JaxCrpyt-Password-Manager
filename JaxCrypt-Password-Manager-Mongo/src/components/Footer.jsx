import React from "react";

const Footer = () => {
  return (
    <div className="text-white fixed bottom-0 py-2 flex flex-col justify-center items-center w-full bg-[#473c8e]">
      <div className="flex  justify-center items-center gap-2">
        <div className="font-pop text-lg">
          <span className="text-[#00FFF7] font-bold ">&lt;</span>
          <span className="text-white font-bold ">Jax</span>
          <span className="text-[#00FFF7] font-bold">Crypt/&gt;</span>
        </div>
        <div className="flex gap-3">
          Created with
          <img src="icons/falcon.png" alt="Footer-icon" width={30} />
          by
          <span className="font-bold"> Jayesh</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
