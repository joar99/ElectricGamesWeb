import { useEffect, useState } from "react";

const useStorage = (defaultValue, localStorageKey) => {

    const [value, setValue] = useState(() => {
        const storageItem = localStorage.getItem(localStorageKey);

        if (storageItem === null) return defaultValue;

        try {
            return JSON.parse(storageItem);
        } catch (err) {
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(value));
    }, [value]);

    return [value, setValue];

};

export default useStorage;