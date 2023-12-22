import {useState} from "react";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import Selector from "../components/Selector";
import UserForm from "../components/UserForm";

type UserValues = {
    firstName: string
    lastName: string
}

export default function HomePage() {
    const [logged, setLogged] = useState(false)

    const handleUserFormSubmit: SubmitHandler<UserValues> = (data) => {
        setLogged(true)
        setUserData({
            firstName: data.firstName,
            lastName: data.lastName
        })
    };

    const [selectedPokemons, setSelectedPokemons] = useState<string[]>([]);

    // Function to update selected Pokémon
    const updateSelectedPokemon = (index: number, name: string) => {
        setSelectedPokemons(prev => {
            const newSelected = [...prev];
            newSelected[index] = name;
            return newSelected;
        });
    };

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: ""
    })

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
                    <section className="grid grid-cols-2 gap-10 gap-y-52">
                        {[...Array(4)].map((_, index) => (
                            <div key={index}>
                                <label className="text-xs">{`Pokemon ${index + 1}`}</label>
                                <Selector
                                    counter={`pokemon #${index + 1}`}
                                    selectedPokemons={selectedPokemons}
                                    onSelectPokemon={(name) => updateSelectedPokemon(index, name)}
                                />
                            </div>
                        ))}
                    </section> :
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