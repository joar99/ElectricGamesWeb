import React from "react";

export default function DropDownOption() {
    const editGame= 'edit';  
    return (
        <>
            <section className="dropdown">
                <button className="drop-down-button">Edit
                    <i className="fa-regular fa-xmark"></i>
                </button>
                <div id="dropdownContent" className="dropdownContent">

                    <Link to={this.props.myroute} onClick={() => edit(editGame)}>Edit Game</Link>
                    
                </div>
            </section>
        </>
    )

}


      