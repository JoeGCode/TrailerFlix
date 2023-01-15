import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="text-white p-4 flex items-center justify-between w-full lg::w-4/5 my-0 mx-auto">
      <Link href="/">
        <h1 className="text-4xl font-bold cursor-pointer">
          Trailer<span className="text-red-500">Flix</span>
        </h1>
      </Link>
    </div>
  );
};

export default Navbar;
