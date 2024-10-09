import React, {useState} from 'react';
import {authStore} from "../store/auth.js";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

const SingUp = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const { signUpFetch, isLoading, error } = authStore()

    const handleSubmit = (e) => {
        e.preventDefault()
        signUpFetch(email, password, name)
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 my-32">
            <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-sm">
                <EmojiFoodBeverageIcon style={{fontSize: 70}} className="text-[#003E29]"/>
                <h2 className="flex mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up now!
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="name"
                                required
                                autoComplete="name"
                                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-[#003E29] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#003e0c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            disabled={isLoading}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>


                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <a href="/login" className="font-semibold leading-6 text-[#003E29] hover:text-[#003e0c]">
                        Login quickly!
                    </a>
                </p>

                <div className="flex justify-center mt-10 text-red-500 font-bold">
                    {error && (
                        <div>{error}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingUp;