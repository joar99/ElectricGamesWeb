
import React from "react";
import { useState } from "react";
import TopNav from "./TopNav";
import SideNav from "./SideNav";


const Nav = () => {

    const [Mobile, setMobile] = useState(true)

    const HandleClickMobile = (setMobileToFalse = true) => {
        setMobile(setMobileToFalse ? !Mobile : setMobileToFalse)
    }

    return (
        <>
            <TopNav HandleClickMobile={HandleClickMobile} Mobile={Mobile} />
            {Mobile ? <SideNav /> : null}

        </>
    )


}


export default Nav;