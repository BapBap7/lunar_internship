import React, { useState } from "react";
import usePokemonData from "../api/apiService";
import { Control, Controller } from 'react-hook-form';

interface Props {
    control: Control<any>;
    name: string;
    selectedPokemons: string[];
    onSelectPokemon: (name: string) => void;
    counter: string;
}

const Selector = ({ control, name, selectedPokemons, onSelectPokemon, counter }: Props) => {
    const { data, isLoading } = usePokemonData();
    const [isOpen, setIsOpen] = useState(false);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <div className="max-w-full min-w-60 relative bg-white rounded">
                    <div className="p-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        {value || "Pick a " + counter}
                    </div>
                    {isOpen && (
                        <ul className="bg-scroll mt-1 max-h-48 overflow-y-auto absolute bg-white list-none rounded">
                            {data.filter(pokemon => !selectedPokemons.includes(pokemon.name)).map(pokemon => (
                                <li
                                    className="mb-2 last-of-type:mb-0 hover:bg-tertiary p-2 cursor-pointer"
                                    key={pokemon.name}
                                    onClick={() => {
                                        onChange(pokemon.name);
                                        onSelectPokemon(pokemon.name);
                                        setIsOpen(false);
                                    }}
                                >
                                    {pokemon.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        />
    );
};


export default Selector;
