import React, { useState } from "react";
import { usePokemonData } from "../api/apiService";
import { Control, Controller } from "react-hook-form";

interface Props {
    control: Control<any>;
    name: string;
    selectedPokemons: string[];
    onSelectPokemon: (name: string) => void;
    counter: string;
    field: {
        onChange: (value: string) => void;
        value: string;
    };
}

const Selector = ({
                      control,
                      name,
                      selectedPokemons,
                      onSelectPokemon,
                      counter,
                      field,
                  }: Props) => {
    const { data, isLoading } = usePokemonData();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredData = data.filter(
        (pokemon) =>
            !selectedPokemons.includes(pokemon.name) &&
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <>
                        <input
                            type="text"
                            className="p-2 border-b border-gray-300 focus:outline-none focus:border-primary"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <ul className="bg-scroll mt-1 max-h-48 min-w-full overflow-y-auto absolute bg-white list-none rounded">
                            {filteredData.map((pokemon) => (
                                <li
                                    className="mb-2 last-of-type:mb-0 hover:bg-tertiary p-2 cursor-pointer"
                                    key={pokemon.name}
                                    onClick={() => {
                                        onChange(pokemon.name);
                                        onSelectPokemon(pokemon.name);
                                        field.onChange(pokemon.name);
                                        setIsOpen(false);
                                    }}
                                >
                                    {pokemon.name}
                                </li>
                            ))}
                        </ul>
                        </>
                    )}
                </div>
            )}
        />
    );
};

export default Selector;