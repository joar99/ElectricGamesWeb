import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useFetch = (path) => {

    const [arr, setArr] = useState([]);

    const getData = useCallback(() => {

        axios.get(path)
        .then(res => setArr(res.data))
        .catch(err => console.log(err))

    },[])


    return {arr, getData}

}

export default useFetch;