
import React from "react";
import { useState } from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";


const Nav = () => {

    const [Mobile, setMobile] = useState(false)

    const HandleClickMobile = (setMobileToTrue = false) => {
        setMobile(setMobileToTrue ? !Mobile : setMobileToTrue)
    }

    return (
        <>
            <TopNav HandleClickMobile={HandleClickMobile} Mobile={Mobile} />
            {Mobile ? <SideNav /> : null}

        </>
    )


}


export default Nav;