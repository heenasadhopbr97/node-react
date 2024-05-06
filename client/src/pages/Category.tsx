import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";

const CreateCategory = () => {
    const navigate = useNavigate();
    const createProductApi = "http://localhost:3000/api/categories"
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setUser] = useState({
        name: "",
        description: "",
    })

    const handelInput = (event:any) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value)
        setUser({ ...category, [name]: value });
    }

    const handelSubmit = async (event:any) => {
        event.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(createProductApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(category),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({
                    name: "",
                    description: "",
                })
                navigate('/product');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error:any) {
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
            {error && <p>Error: {error}</p>}
                <p>Add Category</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor='name' className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={category.name} onChange={handelInput} />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={category.description} onChange={handelInput} />
                </div>
                
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateCategory