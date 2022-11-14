import { useCallback, useEffect, useState } from "react";
import axios from "axios";

/*const useFetch = (dataURL) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async (url) => {
            await axios.get(url)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
        }
        fetchData(dataURL)
    }, [dataURL])

    return data
}

export default useFetch;*/

/*export default function useFetch(path) {

        
    const [array, setArray] = useState([]);

            useEffect(() => {
        axios.get(`${path}`)
            .then(res => {
                setArray(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    return array

}*/