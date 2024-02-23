import React from 'react'

export default function FlightCard({ details }) {
    const { id, fare, displayData: { source, airlines, stopInfo, destination, totalDuration } } = details;
    return (
        <div className="flight-card">
            {` ${airlines[0].airlineName}, ${source.airport.cityCode} ==> ${destination.airport.cityCode}, ${totalDuration}, ${stopInfo}, Rs. ${fare}/-`}
        </div>
    )
}
