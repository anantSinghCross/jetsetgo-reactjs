import React from 'react'
import Checkbox from '@mui/joy/Checkbox';

export default function FilterController({ airlineFilters, sortOrder, toggleAirlineFilter, toggleSortOrder }) {

    const airlineChecks = airlineFilters ? airlineFilters.map(({ airlineName, checked }) => {
        return (
            <div key={airlineName}>
                <label key={airlineName}>
                    <Checkbox 
                        onChange={() => toggleAirlineFilter(airlineName)} 
                        label={airlineName} 
                        value={airlineName} 
                        size="sm" 
                        variant="outlined" 
                        checked={checked}/>
                </label>
            </div>
        )
    }) : null;
    return (
        <div className='filter-container'>
            <div className='airline-filter'>
                AirLines<br />
                {airlineChecks}
            </div>
            <button onClick={toggleSortOrder}>Fare {sortOrder === 'ASC'? '⬇️': '⬆️'}</button>
        </div>
    )
}
