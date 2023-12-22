import {useState} from "react";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import Selector from "../components/Selector";

type UserValues = {
    firstName: string
    lastName: string
}

export default function HomePage() {
    const [logged, setLogged] = useState(true)
    const {
        control,
        handleSubmit,
        formState
    } = useForm<UserValues>({
        mode: 'onBlur',
        shouldUnregister: true
    })

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: ""
    })

    const onSubmit: SubmitHandler<UserValues> = (data) => {
        setLogged(true)
        setUserData({
            firstName: data.firstName,
            lastName: data.lastName
        })
    }

    return (
        <div className="flex">
            {/* left part with my teams */}
            {logged && <div className="w-4/12 p-4 h-screen bg-primary text-2xl float-left">
                <h2 className="pt-20 flex justify-center text-center text-quaternary font-semibold">
                    {userData.firstName} {userData.lastName}
                    <br />
                    <br />
                    History:
                </h2>
            </div>}
            {/* right part to create team */}
            <div className="w-full px-4 h-screen bg-quaternary flex items-center justify-center ">
                {logged ?
                    <div>
                        <Selector>

                        </Selector>
                    </div> :
                    <div className="grid grid-cols-1 gap-5 ">
                        <h3 className="text-primary text-center font-semibold text-xl">
                            Please enter your name and surname
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mb-5">
                            <label>Name</label>
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'This field is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Please enter at least 2 symbols',
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: 'Maximum length is 12 symbols',
                                    },
                                }}
                                render={({field}) => (
                                    <div className=" mb-10 relative">
                                        <input {...field} className="rounded-md p-2 w-full"/>
                                        {formState.errors.firstName ? (
                                            <div className="absolute top-full left-0 mt-1 text-red">
                                                {formState.errors.firstName.message}
                                            </div>
                                        ) : (
                                            <div className="absolute top-full left-0 mt-1 invisible">
                                                Placeholder for error message
                                            </div>
                                        )}
                                    </div>
                                )}
                            />

                            <label>Surname</label>

                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'This field is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Please enter at least 2 symbols',
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: 'Maximum length is 12 symbols',
                                    },
                                }}
                                render={({field}) => (
                                    <div className=" mb-10 relative">
                                        <input {...field} className="rounded-md p-2 w-full"/>
                                        {formState.errors.lastName ? (
                                            <div className="absolute top-full left-0 mt-1 text-red">
                                                {formState.errors.lastName.message}
                                            </div>
                                        ) : (
                                            <div className="absolute top-full left-0 mt-1 invisible">
                                                Placeholder for error message
                                            </div>
                                        )}
                                    </div>
                                )}
                            />

                            <button type="submit"
                                    className="bg-primary text-tertiary rounded-md p-2 hover:bg-secondary transition duration-300 delay-50">
                                Submit
                            </button>
                        </form>

                    </div>
                }
            </div>
        </div>
    );

}