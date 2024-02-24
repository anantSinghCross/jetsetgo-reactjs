import React from 'react'

export default function FlightCard({ details }) {
    const { fare, displayData: { source, airlines, stopInfo, destination, totalDuration } } = details;
    const depTime = new Date(source.depTime);
    const arrTime = new Date(destination.arrTime);
    const depAirport = `${source.airport.airportName}, ${source.airport.cityName}, ${source.airport.countryName}`;
    const arrAirport = `${destination.airport.airportName}, ${destination.airport.cityName}, ${destination.airport.countryName}`;
    
    return (
        <div className="flight-card">
            <div className="card-detail flight-airline">
                <span>{`${airlines[0].airlineName}`}</span>
                <span className='flight-number'>{`${airlines[0].airlineCode}-${airlines[0].flightNumber}`}</span>
            </div>
            <div className="card-detail flight-details">
                <div className="src">
                    <span><b>{`${depTime.getHours()}:${depTime.getMinutes()}`}</b></span>
                    <span><b>{`${source.airport.cityCode}, T${source.airport.terminal}`}</b></span>
                    <span className='small text-center'>{`${depTime.toDateString()}`}</span>
                    <span className='small text-center'>{`${depAirport}`}</span>
                </div>
                <div className="dur">
                    <span><sub>{`${totalDuration}`}</sub></span>
                    <hr />
                    <span><sup>{`${stopInfo}`}</sup></span>
                </div>
                <div className="dest">
                    <span><b>{`${arrTime.getHours()}:${arrTime.getMinutes()}`}</b></span>
                    <span><b>{`${destination.airport.cityCode}, T${destination.airport.terminal}`}</b></span>
                    <span className='small text-center'>{`${arrTime.toDateString()}`}</span>
                    <span className='small text-center'>{`${arrAirport}`}</span>
                </div>
            </div>
            <div className="card-detail flight-fare">
                {`Rs. ${fare}/-`}
            </div>
        </div>
    )
}
