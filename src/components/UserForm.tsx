import React from 'react';
import { useForm, Controller } from 'react-hook-form';

type UserValues = {
    firstName: string;
    lastName: string;
};

type UserFormProps = {
    onSubmit: (data: UserValues) => void;
};

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<UserValues>();

    return (
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
                render={({ field }) => (
                    <div className="mb-10 relative">
                        <input {...field} className="rounded-md p-2 w-full" />
                        {errors.firstName && (
                            <div className="absolute top-full left-0 mt-1 text-red">
                                {errors.firstName.message}
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
                render={({ field }) => (
                    <div className="mb-10 relative">
                        <input {...field} className="rounded-md p-2 w-full" />
                        {errors.lastName && (
                            <div className="absolute top-full left-0 mt-1 text-red">
                                {errors.lastName.message}
                            </div>
                        )}
                    </div>
                )}
            />

            <button type="submit" className="bg-primary text-tertiary rounded-md p-2 hover:bg-secondary transition duration-300 delay-50">
                Submit
            </button>
        </form>
    );
};

export default UserForm;
