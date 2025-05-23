import React, { useState } from 'react'
import "../styles/tailwind.css"
import Form from '../components/Form'
import { Link } from 'react-router-dom'


function Register() {
    const [error, setError] = useState(null) 

    return (
            <div
            id="custombody"
            className="bg-gray-100 flex justify-center items-start pt-20 pb-20 min-h-screen"
            >

                        
            <div
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md self-start"
                style={{ maxHeight: 'auto' }}
            >

            {error && (
            <div className="mb-4 px-4 py-3 bg-red-100 text-red-800 rounded-lg">
                {error}
            </div>
            )}

                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Create an Account
                </h2>

                <Form route="/api/register" setError={setError} buttonText="Sign Up" />

                <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?
                <Link to="/login" className="ms-2 text-yellow-500 hover:underline">
                    Log in
                </Link>
                </p>
            </div>
            </div>

    )
}

export default Register