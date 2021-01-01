import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../Context/RestaurantsContext";
import StarRating from "./StarRating";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurant);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      // eslint-disable-next-line
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`); // redirects to update page.
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count)
      return (
        <>
          <span className="text-warning">No Reviews</span>
        </>
      );
    else {
      return (
        <>
          <StarRating rating={restaurant.average_rating} />
          <span className="text-warning ml-1">({restaurant.count})</span>
        </>
      );
    }
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <tr
                onClick={() => handleRestaurantSelect(restaurant.id)}
                key={restaurant.id}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{"$".repeat(restaurant.price_range)}</td>
                <td>{renderRating(restaurant)}</td>
                <td>
                  <button
                    onClick={(e) => handleUpdate(e, restaurant.id)}
                    className="btn btn-warning"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => handleDelete(e, restaurant.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          {/* React Hook useEffect has a missing dependency: 'setRestaurants'. Either include it or remove the dependency array */}
          {/* <tr>
            <td>mcd</td>
            <td>mcd</td>
            <td>mcd</td>
            <td>mcd</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>mcd</td>
            <td>mcd</td>
            <td>mcd</td>
            <td>mcd</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
