
import React from "react";
import { Link } from 'react-router-dom';
import "../../Css/TopNav.css";


const TopNav = ({HandleClickMobile, Mobile}) => {

  const hamburgerIcon = "hamburger.png";
  const logoIcon = "logo.png";


  return (

    <nav className="navbar">
      <div className="navbar-burger">
        <button className="mobile-menu-btn" onClick={HandleClickMobile}>
          <img src={`https://localhost:7127/images/${encodeURIComponent(hamburgerIcon)}`} className="hamburger-menu"></img>
          {Mobile}

        </button></div>


      <img src={`https://localhost:7127/images/${encodeURIComponent(logoIcon)}`} className="logo"></img>

      <ul className="nav-links" onClick={() => HandleClickMobile(false)}>
        <li><Link to="/games">Games</Link></li>
        <li><Link to="/characters">Characters</Link></li>
        <li><Link to="/developers">Developers</Link></li>
        <li><Link to="/quiz">Game Quiz</Link></li>
      </ul>

    </nav>




  )



}


export default TopNav;