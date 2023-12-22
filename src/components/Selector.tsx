import React, {useState} from "react";
import usePokemonData from "../api/apiService"; // Update the import path as necessary

const Selector = () => {
    const {data, isLoading} = usePokemonData();
    const [first, setFirst] = useState(false)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-full min-w-60 relative">
            <div onClick={() => {
                setFirst(!first)
            }}>
                Selector
            </div>
            {first && <ul className=" max-h-48 overflow-y-auto">
                {data.map((pokemon) => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>}

        </div>
    );
};

export default Selector;
