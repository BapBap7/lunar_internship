import React, { useState } from "react";
import usePokemonData from "../api/apiService";

interface Props {
    counter: string;
    selectedPokemons: string[];
    onSelectPokemon: (name: string) => void;
}

const Selector = ({ counter, selectedPokemons, onSelectPokemon }: Props) => {
    const { data, isLoading } = usePokemonData();
    const [isOpen, setIsOpen] = useState(false);
    const [userPokemon, setUserPokemon] = useState("Pick a " + counter);

    const handleSelect = (pokemonName: string) => {
        setUserPokemon(pokemonName);
        onSelectPokemon(pokemonName);
        setIsOpen(false);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-full min-w-60 relative bg-white rounded">
            <div className="p-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {userPokemon}
            </div>
            {isOpen && (
                <ul className="bg-scroll mt-1 max-h-48 overflow-y-auto absolute bg-white list-none rounded">
                    {data.filter(pokemon => !selectedPokemons.includes(pokemon.name)).map(pokemon => (
                        <li
                            className="mb-2 last-of-type:mb-0 hover:bg-tertiary p-2 cursor-pointer"
                            key={pokemon.name}
                            onClick={() => handleSelect(pokemon.name)}
                        >
                            {pokemon.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Selector;
