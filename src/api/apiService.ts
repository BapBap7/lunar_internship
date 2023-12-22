import { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
    name: string;
}

interface PokemonApiResponse {
    results: Pokemon[];
    next: string | null;
}

const API = 'https://pokeapi.co/api/v2/pokemon';

const usePokemonData = () => {
    const [data, setData] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async (url: string) => {
        setIsLoading(true);
        try {
            const response = await axios.get<PokemonApiResponse>(url);
            setData(prevData => [...prevData, ...response.data.results]);

            // Check if there's a next page, and if so, fetch it
            console.log()
            if (response.data.next) {
                await fetchData(response.data.next); // Recursive call
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(API);
    }, []);

    return { data, isLoading };
};

export default usePokemonData;
