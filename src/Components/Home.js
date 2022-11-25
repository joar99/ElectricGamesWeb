import React from "react";
import "../Css/Home.css";

export default function Home() {
  const logoIcon = "logo.png";

  return (
    <>
      <section className="home-container">
        <h1>Welcome To Electric Games!</h1>
      </section>

      <section className="home-logo-container">
        <img
          src={`https://localhost:7127/images/${encodeURIComponent(logoIcon)}`}
          className="home-logo rotate linear infinite"
          alt="Logo icon"
        ></img>
      </section>
    </>
  );
}
