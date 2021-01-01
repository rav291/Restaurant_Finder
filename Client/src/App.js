import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { RestaurantsContextProvider } from './Context/RestaurantsContext';
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path='/restaurants/:id/update' component={UpdatePage} />
            <Route exact path='/restaurants/:id' component={RestaurantDetailPage} />
            <Route exact path='/' component={Home} />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
