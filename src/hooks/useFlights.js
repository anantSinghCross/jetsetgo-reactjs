import { useState, useEffect } from "react";

function useFlightData() {
    const [flights, setFlights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [airlineFilters, setAirlineFilters] = useState(null);

    useEffect(() => {
        fetch('https://api.npoint.io/4829d4ab0e96bfab50e7')
            .then(res => res.json())
            .then(data => {
                const result = data?.data?.result;
                const airlines = result.reduce((accum, flight) => {
                    const airlineName = flight.displayData.airlines[0].airlineName;
                    if (!accum.find(item => item.airlineName === airlineName)) {
                        accum.push({ airlineName, checked: true });
                    }
                    return accum;
                }, []);
                setFlights(result);
                setAirlineFilters(airlines);
            })
            .catch(err => {
                alert('Oops! Unable to load flights. Please try refreshing the page\nERR:' + JSON.stringify(err));
            })
            .finally(() => setLoading(false));
    }, []);

    const toggleAirlineFilter = (airlineName) => {
        const updatedFilter = airlineFilters.map(filter => {
            if (filter.airlineName === airlineName) {
                return { ...filter, checked: !filter.checked }
            }
            return filter;
        })
        setAirlineFilters(updatedFilter);
    }

    return {
        flights, loading, airlineFilters, toggleAirlineFilter
    }
}

export { useFlightData };