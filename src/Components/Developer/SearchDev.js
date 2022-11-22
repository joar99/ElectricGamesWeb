import {useState} from "react";
import "../../Css/Developer/SearchDeveloper.css";
import "../../Css/Developer/Developers.css";
import "../../Css/Developer/SearchDeveloper.css";




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
            <button className="show-all-btn" onClick={onChange}>Show All</button>
            <section>
                <h3 className="search-name">Search A Developer By Name</h3>
                <div className="search-content">
                    <input type="text" id="search-dev-name" className="search-dev-name" placeholder="Enter Dev Name" onChange={(e) => setSearchName(e.target.value)}></input>
                    <button className="search-dev-name-btn" onClick={searchDevByName}>Search</button>
                </div>
            </section>
            <section>
                <h3 className="search-id">Search a Developer by ID</h3>
                <div className="search-content">
                    <input type="text" id="search-dev-id" className="search-dev-id" placeholder="Enter Dev Id" onChange={(e) => setId(e.target.value)}/>
                    <button className="search-dev-id-btn" onClick={searchDevById}>Search</button>
                </div>
            </section>
        </section>
        </>
    )
}