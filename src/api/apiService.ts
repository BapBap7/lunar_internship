import { useState, useEffect } from "react";
import axios from "axios";

const API = 'https://pokeapi.co/api/v2/pokemon';

const usePokemonData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API);
                console.log(response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    return data;
};

export default usePokemonData;
