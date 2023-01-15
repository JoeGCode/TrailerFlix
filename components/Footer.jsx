import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-white flex items-center justify-center w-full absolute bottom-0 h-10">
      <Link href="/about">About</Link>
    </footer>
  );
};

export default Footer;
