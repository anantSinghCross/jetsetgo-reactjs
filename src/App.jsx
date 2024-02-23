import React, { Fragment, useEffect } from 'react'
import './index.css'
import { useState } from 'react'
import LinearProgress from '@mui/joy/LinearProgress';
import Header from './components/Header';
import FlightCard from './components/FlightCard';
// Not using Redux since it's a simple application

/**
 * 
Overview:
Build a sleek React JS app - JetSetGo, simplifying flight bookings. Users request flights, explore options, and customize preferences effortlessly.

Requirements:
●	React JS magic!
●	User-friendly Travel Request screen for seamless booking.
●	Dynamic flight retrieval with filters and sorting options - (Users should be able to filter the results by airlines. Users should be able to sort the results by price)

APIs:
●	Use this api to display flight search results: https://api.npoint.io/4829d4ab0e96bfab50e7 
(Do not need to pass any parameters, just use this api to show data)


Evaluation Criteria:
●	Fully functional app.
●	Eye-catching UI design.
●	Clean and organized code.
●	React JS best practices.
●	Smart test cases.

 */

export default function App() {
  const [flights, setFlights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  
  useEffect(() => {
    fetch('https://api.npoint.io/4829d4ab0e96bfab50e7')
      .then(res => res.json())
      .then(data => setFlights(data?.data?.result))
      .catch(err => {
        alert('Oops! Unable to load flights. Please try refreshing the page\nERR:' + JSON.stringify(err));
      })
      .finally(() => setLoading(false));
  }, []);

  const flightList = !loading? flights.map((flight) => {
    return (
      <FlightCard key={flight.id} details={flight}/>
    )
  }) : <LinearProgress variant="soft" />;

  return (
    <Fragment>
      <Header/>
      
      <div className="flight-container">
        {flightList}
      </div>
    </Fragment>
  )
}