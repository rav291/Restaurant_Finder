require("dotenv").config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const db = require('./db') //  => automatically picks index.js

const app = express();

app.use(cors());
app.use(express.json()) // middleware makes the body parameter available, and parses it as a js object.

app.use(morgan('tiny'));

// get a restaurant
app.get('/api/restaurants/:id', async (req, res) => {

    try {
        // const restaurant = await db.query(
        //     // `Select * from restaurants where id=${req.params.id}` => Vulnerable to SQL Injection attacks
        //     'Select * from restaurants where id= $1', [req.params.id]);

        const restaurants = await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where restaurant_id=$1;", [req.params.id]
        );

        const reviews = await db.query(
            'Select * from reviews where restaurant_id=$1', [req.params.id]
        );

        console.log(reviews);

        res.status(200).json({
            status: 'success',
            result: restaurants.rows.length,
            data: {
                restaurant: restaurants.rows,
                reviews: reviews.rows
            }
        })
    } catch (error) {
        console.log(error);
    }

})

// get all restaurants
app.get('/api/restaurants', async (req, res) => {

    try {
        //const results = await db.query("select * from restaurants");
        const restaurantRatingsData = await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
        );

        res.status(200).json({
            status: 'success',
            result: restaurantRatingsData.rows.length,
            data: {
                restaurant: restaurantRatingsData.rows,

            }
        })
    } catch (error) {
        console.log(error);
    }

})


// create a restaurant
app.post('/api/restaurants', async (req, res) => {
    console.log(req.body);
    const { name, location, price_range } = req.body;
    try {
        const results = await db.query("insert into restaurants(name, location, price_range) values($1, $2, $3) returning *", [name, location, price_range])
        console.log(results);
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            },
        })
    } catch (error) {
        console.log(error);
    }

})

// update a restaurant
app.put('/api/restaurants/:id', async (req, res) => {
    console.log(req.params.id);
    const { name, location, price_range } = req.body;
    try {
        const results = await db.query("update restaurants set name=$1, location=$2, price_range=$3 where id=$4 returning *", [name, location, price_range, req.params.id])
        console.log(results);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            },
        })
    } catch (error) {
        console.log(error);
    }
})

// delete a restaurant
app.delete('/api/restaurants/:id', (req, res) => {
    console.log('Delete Restaurant', req.params.id);

    const result = db.query('delete from restaurants where id=$1 returning *', [req.params.id]);
    res.status(204).json({
        status: 'Resource Deleted',
        data: {
            restaurant: result.rows
        }
    })

})

app.post('/api/restaurants/:id/addReview', async (req, res) => {

    const { name, review, rating } = req.body;

    try {
        const newReview = await db.query('Insert into reviews (restaurant_id, name, review, rating) values($1,$2,$3,$4) returning *', [req.params.id, name, review, rating]);

        res.status(201).json({
            status: 'Success',
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});