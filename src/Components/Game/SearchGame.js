import { useState } from "react"
import "../../Css/Game/SearchGame.css"

export default function SearchGame({ onSearchByTitle, onSearchById }) {

    const [searchTitle, setSearchTitle] = useState([]);
    const [searchId, setSearchId] = useState([]);

    const searchGameByTitle = () => {
        onSearchByTitle(searchTitle);
    }
    const searchGameById = () => {
        onSearchById(searchId);
    }

    return (
       
       
  
        <section className="search-container">
            <section>
                <h3 className="search-title">Search a Game by Title</h3>

                <div className="search-content">
                    <input type="text" id="search-game-name" className="search-game-name" placeholder="Enter Game Title" onChange={(e) => setSearchTitle(e.target.value)}></input>
                    <button className="search-game-name-btn" onClick={searchGameByTitle}>Search</button>
                </div>
            </section>
            <section>
                <h3 className="search-title">Search a game by ID</h3>

                <div className="search-content">
                    <input type="text" id="search-game-id" className="search-game-id" placeholder="Enter Game Id" onChange={(e) => setSearchId(e.target.value)}></input>
                    <button className="search-game-id-btn" onClick={searchGameById}>Search</button>
                </div>
            </section>
        </section>

    )
}