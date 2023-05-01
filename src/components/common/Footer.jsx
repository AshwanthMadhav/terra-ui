import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-center">
        <p className="text-gray-400">
          &copy; My App {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
