import React, {useState} from "react";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import Selector from "../components/Selector";
import UserForm from "../components/UserForm";

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

export default function HomePage() {
    const [logged, setLogged] = useState(false)
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: ""
    })
    const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);


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
        console.log(data); // Here you can handle the submitted data
        // setTeamName, updateSelectedPokemon, or other state updates can be handled here
    };

    const {
        control,
        handleSubmit,
        formState: { errors }
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

    return (
        <div className="flex">
            {/* left part with my teams */}
            {logged && <div className="w-4/12 p-4 h-screen bg-primary text-2xl float-left">
                <h2 className="pt-20 flex justify-center text-center text-quaternary font-semibold">
                    {userData.firstName} {userData.lastName}
                    <br/>
                    <br/>
                    History:
                </h2>
            </div>}
            {/* right part to create team */}
            <div className="w-full px-4 h-screen bg-quaternary flex items-center justify-center ">
                {logged ?
                    <form className="grid grid-cols-2 gap-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-span-2">
                            <Controller
                                control={control}
                                name="teamName"
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Team Name"
                                        className="mb-4 w-full p-2 rounded"
                                    />
                                )}
                            />
                            {errors.teamName && <span>Team name is required</span>}
                        </div>
                        {/* Similar Controller wrapping for each Selector */}
                        <div className="mb-48">
                            <label className="text-xs">Pokemon 1</label>
                            <Controller
                                control={control}
                                name="pokemon1"
                                render={() => (
                                    <Selector
                                        control={control}
                                        name="pokemon1"
                                        selectedPokemons={selectedPokemons}
                                        onSelectPokemon={(name) => updateSelectedPokemon(0, name)}
                                        counter="1"
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-48">
                            <label className="text-xs">Pokemon 1</label>
                            <Controller
                                control={control}
                                name="pokemon2"
                                render={() => (
                                    <Selector
                                        control={control}
                                        name="pokemon2"
                                        selectedPokemons={selectedPokemons}
                                        onSelectPokemon={(name) => updateSelectedPokemon(1, name)}
                                        counter="2"
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-48">
                            <label className="text-xs">Pokemon 1</label>
                            <Controller
                                control={control}
                                name="pokemon3"
                                render={() => (
                                    <Selector
                                        control={control}
                                        name="pokemon3"
                                        selectedPokemons={selectedPokemons}
                                        onSelectPokemon={(name) => updateSelectedPokemon(2, name)}
                                        counter="3"
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-48">
                            <label className="text-xs">Pokemon 1</label>
                            <Controller
                                control={control}
                                name="pokemon4"
                                render={() => (
                                    <Selector
                                        control={control}
                                        name="pokemon4"
                                        selectedPokemons={selectedPokemons}
                                        onSelectPokemon={(name) => updateSelectedPokemon(3, name)}
                                        counter="4"
                                    />
                                )}
                            />
                        </div>

                        <div className="col-span-2">
                            <button type="submit" className="w-full bg-primary text-tertiary rounded-md p-2 hover:bg-secondary transition duration-300 delay-50">
                                Create team
                            </button>
                        </div>
                    </form> :
                    <div className="grid grid-cols-1 gap-5 ">
                        <h3 className="text-primary text-center font-semibold text-xl">
                            Please enter your name and surname
                        </h3>
                        <UserForm onSubmit={handleUserFormSubmit} />
                    </div>
                }
            </div>
        </div>
    );

}