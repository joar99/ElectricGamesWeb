import React from "react";
import { Link } from 'react-router-dom';
import "../Css/Nav.css";

function Nav() {
  return (
    
    <nav class="nav-bar">
      <button class="drop-down-button">
        <i class="fas fa-bars"></i>
      </button>
      <button class="close-drop-down-button">
        <i class="fa-solid fa-x"></i>
      </button>
      <ul id="drop-down-content" class="drop-down-content">
        <Link to="/games">
          <li>Games</li>
        </Link>
        <Link to="/characters">
          <li>Characters</li>
        </Link>
        <Link to="/developers">
          <li>Developers</li>
        </Link>
        <Link to="/quiz"><li>Game Quiz</li></Link>
      </ul>
      <button class="search-button">
        <i class="fa-solid fa-magnifying-glass fa-beat"></i>
      </button>
    </nav>
  );
}

export default Nav;