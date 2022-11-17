import React from "react";
import { Link } from 'react-router-dom';
import "../Css/Nav.css";
import { useState } from "react";


const Nav = () => {

  const [Mobile, setMobile] = useState(false)

  let hamburgerIcon = "hamburger.png";
  let logoIcon = "logo.png";

  
return (

    <nav className="navbar">
 
      <div className="navbar-burger">
      <button className ="mobile-menu-btn" onClick={() => setMobile(!Mobile)}>
        <img src={`https://localhost:7127/images/${encodeURIComponent(hamburgerIcon)}`} className="hamburger-menu"></img>
        {Mobile}
      
      </button></div>
      
      
      <img src={`https://localhost:7127/images/${encodeURIComponent(logoIcon)}`} className="logo"></img>

      <ul className = {Mobile ? "nav-links-mobile" : "nav-links" } onClick={() => setMobile(false)}>
      <Link to="/games">Games</Link>
      <Link to="/characters">Characters</Link>
      <Link to="/developers">Developers</Link>
      <Link to ="/quiz">Game Quiz</Link>
      </ul>

     

      </nav>


  

)
  


}


export default Nav;