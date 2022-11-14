import {useState} from "react"

export default function SearchDev({onSearchByName}) {
    
    const [searchName, setSearchName] = useState([]);   

    const searchDevByName = () => {
        onSearchByName(searchName);
    }
    

    return(
        <>
            <h3>Search a Dev by Name</h3>
            <div>                
                <input type="text" id="search-book-name" placeholder="Enter Dev Name" onChange={(e)=>setSearchName(e.target.value)}></input>
             </div>
            <button id="search-book-name-btn" onClick={searchDevByName}>Search</button>
        </>
    )
}