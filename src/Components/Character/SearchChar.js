import {useState} from "react"

export default function SearchChar({onSearchByName}) {
    
    const [searchName, setSearchName] = useState([]);   

    const searchCharByName = () => {
        onSearchByName(searchName);
    }
    

    return(
        <>
            <h3>Search a Character by Name</h3>
            <div>                
                <input type="text" id="search-book-name" placeholder="Enter Character Name" onChange={(e)=>setSearchName(e.target.value)}></input>
             </div>
            <button id="search-book-name-btn" onClick={searchCharByName}>Search</button>
        </>
    )
}