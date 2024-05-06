import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from "./../utilities/api"

const CreateProduct = () => {
    const navigate = useNavigate();
    const createProductApi = "/products"
    const categoryApi = "/categories"
    const [error, setError] = useState(null);
    const [product, setProduct] = useState({
        category: "",
        title: "",
        price: "",
        oldPrice: "",
        rating: "",
        inStock: 0,
        image: ""
    })

    const [categories, setCategories] = useState([])
    useEffect(() => {
        const getCategory = async () => {
            api.get(categoryApi).then(res => {
                console.log("res.data", res.data.data);
                setCategories(res.data.data)
            })
        }
        getCategory()
    }, [])

    const handelInput = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    }

    const handelSubmit = async (event: any) => {
        event.preventDefault();
        try {
            api.post(createProductApi, JSON.stringify(product)).then(res => {
                console.log(res)
                if (res.status == 200) {
                    console.log('Form submitted successfully!');
                    setProduct({
                        category: "",
                        title: "",
                        price: "",
                        oldPrice: "",
                        rating: "",
                        inStock: 0,
                        image: ""
                    })
                    navigate('/product');
                } else {
                    console.error('Form submission failed!');
                }
            })


        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <div className='user-form'>
            <div className='heading'>
                {error && <p>Error: {error}</p>}
                <p>Add Product</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor='category' className="form-label">Category</label>
                    <select name="category" id="category" className="form-control" onChange={handelInput}>
                        <option value="">Select category</option>
                        {categories.map(category =>
                            <option key={category._id} value={category._id}>{category.name}</option>
                        )}
                    </select>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={product.title} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" name="price" value={product.price} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Old Price</label>
                    <input type="text" className="form-control" id="oldPrice" name="oldPrice" value={product.oldPrice} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input type="text" className="form-control" id="rating" name="rating" value={product.rating} onChange={handelInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inStock" className="form-label">In Stock</label>
                    <label>
                        <input type="radio" value="0" checked={product.inStock === 0} onChange={handelInput} />
                        No
                    </label>
                    <label>
                        <input type="radio" value="1" checked={product.inStock === 1} onChange={handelInput} />
                        Yes
                    </label>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input type="text" className="form-control" id="image" name="image" value={product.image} onChange={handelInput} />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateProduct