import React, {useState, useEffect} from "react";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import Selector from "../components/Selector";
import UserForm from "../components/UserForm";
import {fetchPokemonDetails, loadSprite} from "../api/apiService";

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

type HistoryValues = {
    teamName: {
        pokemon1: string;
        pokemon2: string;
        pokemon3: string;
        pokemon4: string;
    }
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

    const [pokemonSprites, setPokemonSprites] = useState<Record<string, string>>({});

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

        // Fetch sprites for all pokemons in the new team
        newTeam.pokemons.forEach(pokemon => {
            loadSprite(pokemon).then(data => {
                setPoke(prev => ({ ...prev, [pokemon]: data }));
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

    const [poke, setPoke] = useState({})
    async function ss(pokemon: string) {
        loadSprite(pokemon).then(data => {
            setPoke(prev => ({ ...prev, [pokemon]: data }));
        });
    }


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
                    <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-span-2">
                            <Controller
                                control={control}
                                name="teamName"
                                rules={{
                                    required: 'This field is required',
                                    maxLength: {
                                        value: 15,
                                        message: 'Maximum length is 15 symbols',
                                    },
                                }}
                                render={({field}) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Team Name"
                                        className=" w-full p-2 rounded"
                                    />
                                )}
                            />
                            {errors.teamName && <span className="text-red">{errors.teamName.message}</span>}
                        </div>
                        {/* Similar Controller wrapping for each Selector */}
                        <div className="mb-48">
                            <label className="text-xs">Pokemon 1</label>
                            <Controller
                                control={control}
                                name="pokemon1"
                                rules={{
                                    required: 'This field is required',
                                }}
                                render={({field,}) => (
                                    <>
                                        <Selector
                                            control={control}
                                            name="pokemon1"
                                            selectedPokemons={selectedPokemons}
                                            onSelectPokemon={(name) => updateSelectedPokemon(0, name)}
                                            counter="1"
                                            field={field}
                                        />
                                        {errors.pokemon1 && (
                                            <div className=" mt-1 text-red">
                                                {errors.pokemon1.message}
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="mb-48">
                            <label className="text-xs">Pokemon 2</label>
                            <Controller
                                control={control}
                                name="pokemon2"
                                rules={{
                                    required: 'This field is required',
                                }}
                                render={({field}) => (
                                    <>
                                        <Selector
                                            control={control}
                                            name="pokemon2"
                                            selectedPokemons={selectedPokemons}
                                            onSelectPokemon={(name) => updateSelectedPokemon(1, name)}
                                            counter="2"
                                            field={field}
                                        />
                                        {errors.pokemon2 && (
                                            <div className="mt-1 text-red">
                                                {errors.pokemon2.message}
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="mb-48">
                            <label className="text-xs">Pokemon 3</label>
                            <Controller
                                control={control}
                                name="pokemon3"
                                rules={{
                                    required: 'This field is required',
                                }}
                                render={({field}) => (
                                    <>
                                        <Selector
                                            control={control}
                                            name="pokemon3"
                                            selectedPokemons={selectedPokemons}
                                            onSelectPokemon={(name) => updateSelectedPokemon(2, name)}
                                            counter="3"
                                            field={field}
                                        />
                                        {errors.pokemon3 && (
                                            <div className=" mt-1 text-red">
                                                {errors.pokemon3.message}
                                            </div>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <div className="mb-48">
                            <label className="text-xs">Pokemon 4</label>
                            <Controller
                                control={control}
                                name="pokemon4"
                                rules={{
                                    required: 'This field is required',
                                }}
                                render={({field}) => (
                                    <>
                                        <Selector
                                            control={control}
                                            name="pokemon4"
                                            selectedPokemons={selectedPokemons}
                                            onSelectPokemon={(name) => updateSelectedPokemon(3, name)}
                                            counter="4"
                                            field={field}
                                        />
                                        {errors.pokemon4 && (
                                            <div className="mt-1 text-red">
                                                {errors.pokemon4.message}
                                            </div>
                                        )}
                                    </>
                                )}

                            />
                        </div>

                        <div className="col-span-2">
                            <button type="submit"
                                    className="w-full bg-primary text-tertiary rounded-md p-2 hover:bg-secondary transition duration-300 delay-50">
                                Create team
                            </button>
                        </div>
                    </form> :
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