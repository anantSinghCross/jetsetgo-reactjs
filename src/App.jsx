import React, { Fragment, useEffect } from 'react'
import './index.css'
import LinearProgress from '@mui/joy/LinearProgress';
import Header from './components/Header';
import FlightCard from './components/FlightCard';
import FilterController from './components/FilterController';
import { useFlightData } from './hooks/useFlights';
import { useSortOrder } from './hooks/useSortOrder';

// Not using Redux since it's a simple application

export default function App() {
  const { flights, loading, airlineFilters, toggleAirlineFilter } = useFlightData();
  const { sortOrder, toggleSortOrder } = useSortOrder()

  const filteredFlights = !loading ? flights.filter((flight) => {
    const flightFilter = airlineFilters.find(filter => filter.airlineName === flight.displayData.airlines[0].airlineName);
    return flightFilter.checked;
  }).sort((a, b) => {
    return sortOrder === 'ASC' ? a.fare - b.fare : b.fare - a.fare;
  }) : null;

  const flightList = !loading ? filteredFlights.map(flight => {
    return <FlightCard key={flight.id} details={flight} />
  }) : <LinearProgress variant="soft" />;

  return (
    <Fragment>
      <Header />
      <div className="main-container">
        <FilterController
          airlineFilters={airlineFilters}
          toggleAirlineFilter={toggleAirlineFilter}
          toggleSortOrder={toggleSortOrder}
          sortOrder={sortOrder} />
        <div className="flight-container">
          {flightList}
        </div>
      </div>
    </Fragment>
  )
}