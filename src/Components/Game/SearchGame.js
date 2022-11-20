import { useState } from "react"
import "../../Css/Game/SearchGame.css"

export default function SearchGame({ onSearchByTitle }) {

    const [searchTitle, setSearchTitle] = useState([]);
    const [showSearch, setShowSearch] = useState(false);

    const searchGameByTitle = () => {
        onSearchByTitle(searchTitle);
    }


    return (
       
       
  
        <section className="search-container">
              { showSearch ? (
            <section>
                <h3 className="search-title">Search a Game by Title</h3>

                <div className="search-pop-up">
                    <input type="text" id="search-game-name" className="search-game-name" placeholder="Enter Game Title" onChange={(e) => setSearchTitle(e.target.value)}></input>
                    <button className="search-game-name-btn" onClick={searchGameByTitle}>Search</button>
                </div>
            </section>
              ): <button className="magnify-glass" onClick={()=> setShowSearch(true)}>Search Icon</button>}
        </section>
        
    )
}