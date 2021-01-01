import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {

    const { id } = useParams();
    let history = useHistory();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");

    useEffect(() => {

        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`);
            console.log(response);
            setName(response.data.data.restaurant.name)
            setLocation(response.data.data.restaurant.location)
            setPriceRange(response.data.data.restaurant.price_range)
        };

        fetchData();

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange,
        });
        history.push("/");
    };

    return (
        <div>
            <form action="">
                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} type="text" onChange={(e) => setPriceRange(e.target.value)} className="form-control" />
                </div>
                <button onClick={handleSubmit} className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant
