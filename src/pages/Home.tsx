import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import PokeForm from "../components/PokemonForm";
import UserForm from "../components/UserForm";
import { loadSprite} from "../api/apiService";

type UserValues = {
    firstName: string
    lastName: string
}

type PokemonValues = {
    teamName: string
    pokemon1: string
    pokemon2: string
    pokemon3: string
    pokemon4: string
}

type Team = {
    name: string;
    pokemons: string[];
}

type TeamsArray = Team[];

export default function HomePage() {
    const [logged, setLogged] = useState(false)
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: ""
    })
    const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);

    const [teams, setTeams] = useState<TeamsArray>([])

    const handleUserFormSubmit: SubmitHandler<UserValues> = (data) => {
        setLogged(true)
        setUserData({
            firstName: data.firstName,
            lastName: data.lastName
        })

    };

    // Function to update selected Pokémon
    const updateSelectedPokemon = (index: number, name: string) => {
        setSelectedPokemons(prev => {
            const newSelected = [...prev];
            newSelected[index] = name;
            return newSelected;
        });
    };


    const onSubmit = (data: PokemonValues) => {
        const newTeam: Team = {
            name: data.teamName,
            pokemons: [data.pokemon1, data.pokemon2, data.pokemon3, data.pokemon4]
        };
        setTeams(prevTeams => [...prevTeams, newTeam]);

        // Fetch sprites for all Pokémon in the new team
        newTeam.pokemons.forEach(pokemon => {
            loadSprite(pokemon).then(spriteData => {
                // Ensure spriteData is defined before updating the state
                if (spriteData) {
                    setPoke(prev => ({ ...prev, [pokemon]: spriteData }));
                }
            });
        });
    };



    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<PokemonValues>(
        {
            defaultValues: {
                teamName: '',
                pokemon1: '',
                pokemon2: '',
                pokemon3: '',
                pokemon4: '',
            }
        }
    );

    const [poke, setPoke] = useState<{ [key: string]: string }>({})


    return (
        <div className="flex">
            {/* left part with my teams */}
            {logged && <div className="w-4/12 max-h-screen overflow-y-auto p-4 h-screen bg-primary text-2xl float-left">
                <h2 className="mb-8 pt-6 flex justify-center text-center text-quaternary font-semibold">
                    {userData.firstName} {userData.lastName}
                    <br/>
                    <br/>
                    History:
                </h2>
                <div className="text-white max-h-fit">
                    {teams.map((team, index) => (
                        <div className="pl-4 text-sm" key={index}>
                            <h3 className="mb-2">{team.name}</h3>
                            <ul className="pl-6 list-decimal mb-8 ">
                                {team.pokemons.map((pokemon, idx) => (
                                    <li key={idx}>{pokemon} <img src={poke[pokemon]} alt="huesos"/></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {/* here should display teams */}
            </div>}
            {/* right part to create team */}
            <div className="w-full px-4 h-screen bg-quaternary flex items-center justify-center ">
                {logged ?
                    <PokeForm
                        control={control}
                        handleSubmit={handleSubmit}
                        errors={errors}
                        updateSelectedPokemon={updateSelectedPokemon}
                        selectedPokemons={selectedPokemons}
                        onSubmit={onSubmit}
                    /> :
                    <div className="grid grid-cols-1 gap-5 ">
                        <h3 className="text-primary text-center font-semibold text-xl">
                            Please enter your name and surname
                        </h3>
                        <UserForm onSubmit={handleUserFormSubmit}/>
                    </div>
                }
            </div>
        </div>
    );

}