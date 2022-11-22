import {useState} from "react";
import "../../Css/Developer/SearchDeveloper.css";
import "../../Css/Developer/Developers.css";




export default function SearchDev({onSearchByName, onSearchById, onChange}) {
    
    const [searchName, setSearchName] = useState([]);
    const [id, setId] = useState([]);

    const searchDevByName = () => {
        onSearchByName(searchName);
    }

    const searchDevById = () => {
        onSearchById(id);
    }
    

    return(
        <>
        <section className="search-container">
            <button onClick={onChange}>Show All</button>
            <section>
                <h3 className="search-title">Search A Developer By Name</h3>

                <div className="search-content">
                    <input type="text" id="search-game-name" className="search-game-name" placeholder="Enter Dev Name" onChange={(e) => setSearchName(e.target.value)}></input>
                    <button className="search-game-name-btn" onClick={searchDevByName}>Search</button>
                </div>
            </section>
            <section>
                <h3 className="search-id">Search a Developer by ID</h3>

                <div className="search-content">
                    <input type="text" id="search-game-id" className="search-game-id" placeholder="Enter Dev Id" onChange={(e) => setId(e.target.value)}></input>
                    <button className="search-game-name-btn" onClick={searchDevById}>Search</button>
                </div>
            </section>
        </section>
        </>
    )
}