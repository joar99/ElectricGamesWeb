
import React from "react";
import { Link } from 'react-router-dom';
import "../Css/Nav.css";
import { useState } from "react";


const Nav = () => {

  const [Mobile, setMobile] = useState(true)

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
      <li><Link to="/games">Games</Link></li>
      <li><Link to="/characters">Characters</Link></li>
      <li><Link to="/developers">Developers</Link></li>
      <li><Link to ="/quiz">Game Quiz</Link></li>
      </ul>

     

      </nav>


  

)
  


}


export default Nav;