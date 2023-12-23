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

            if (response.data.next) {
                await fetchData(response.data.next);
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


const fetchPokemonDetails = async (pokemonName : string) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pokemon details:', error);
        throw error; // Re-throw the error so you can handle it in the calling function
    }
};

const loadSprite = async (pokemonName: string) => {
    try{
        const pokemonData = await fetchPokemonDetails(pokemonName);
        const response = await axios.get(pokemonData.sprites.front_default, { responseType: 'blob' });
        const imageBlob = response.data;
        const imageUrl = URL.createObjectURL(imageBlob);
        console.log(imageUrl)
        return imageUrl;
    } catch (error){
        console.log(error)
    }
};

export {usePokemonData, fetchPokemonDetails, loadSprite};
