import React from "react";
import {Controller} from "react-hook-form";
import Selector from "../components/Selector";

// Add any other props you need to pass to PokeForm
type PokeFormProps = {
    control: any;
    handleSubmit: any;
    errors: any;
    updateSelectedPokemon: (index: number, name: string) => void;
    selectedPokemons: string[];
    onSubmit: (data: any) => void; // Replace 'any' with the appropriate type
};

const PokeForm: React.FC<PokeFormProps> = ({
                                               control,
                                               handleSubmit,
                                               errors,
                                               updateSelectedPokemon,
                                               selectedPokemons,
                                               onSubmit
                                           }) => {
    return (
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
        </form>
    );
};

export default PokeForm;
