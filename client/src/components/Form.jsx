import React, { useState } from 'react';
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Form(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { logged, setLogged } = useContext(AuthContext); 

   async function handleSubmit(event) {
    props.setError(null)
    setLoading(true)
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

        try {
            const response = await fetch(props.route, {method: 'POST',
            body: data})
        
            if (response.ok) {
            navigate('/');  
            setLogged(true)
            } else {
            // read error text or JSON
            const payload = await response.json();
            props.setError(payload.text || 'Something went wrong');
            }

        } catch (err) {
            console.log(err)
            props.setError(err.message || 'Something went wrong');
        } finally {setLoading(false)}
    }



  return (
        <>
            
    {loading && <div className="overlay">
        <div className="loader" />
      </div>}

    <form className="space-y-4" onSubmit={handleSubmit}>
        {props.route === "/api/register" ?
            <>
                <Input name="name"  label="Name" type="text"placeholder="Your Name" />
                <Input name="email" label="Email" type="email" placeholder="you@example.com"  />
                <Input name="password" label="Password" type="password" placeholder="••••••••" />
            </>
            :
            <>
                <Input name="email" label="Email" type="email" placeholder="you@example.com"  />
                <Input name="password" label="Password" type="password" placeholder="••••••••"  />
            </>

        }

        <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 rounded-xl hover:bg-yellow-700 transition duration-200"
        >
            {props.buttonText}
        </button>
    </form>
    </>
  )
}

export default Form