import { useState } from "react"
import "../../Css/Character/SearchCharacter.css"

export default function SearchChar({ onSearchByName, onSearchCharById, onChange }) {

    const [searchName, setSearchName] = useState([]);
    const [searchCharId, setSearchCharId] = useState([]);

    const searchCharByName = () => {
        onSearchByName(searchName);
    }
    const searchCharById = () => {
        onSearchCharById(searchCharId);
    }


    return (
        <>

            <section className="search-container">
             <button className="show-all-btn" onClick={onChange}>Show All</button>
                <section>
                    <h3 className="search-name">Search a Character by Name</h3>

                    <div className="search-content">
                        <input type="text" id="search-character-name" className="search-character-name" placeholder="Enter Character Name" onChange={(e) => setSearchName(e.target.value)}></input>
                        <button id="search-character-name-btn" className="search-character-name-btn" onClick={searchCharByName}>Search</button>
                    </div>
                </section>
                <section>
                    <h3 className="search-name">Search a character by ID</h3>
                    <div className="search-content">
                    <input type="text" id="search-character-id" className="search-character-id" placeholder="Enter character ID" onChange={(e) => setSearchCharId(e.target.value)}></input>
                    <button id="search-character-id-btn" className="search-character-id-btn" onClick={searchCharById}>Search</button>
                    </div>
                </section>
            </section>
        </>

    )
}