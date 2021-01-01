import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddReviews from "../components/AddReviews";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../Context/RestaurantsContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();

  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);

        setSelectedRestaurant(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant[0].name}
          </h1>
          <div className="text-center">
            <StarRating
              rating={selectedRestaurant.restaurant[0].average_rating}
            />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant[0].count
                ? `(${selectedRestaurant.restaurant[0].count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReviews />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
