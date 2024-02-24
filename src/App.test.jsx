import {render, screen} from '@testing-library/react';
import App from './App';
import { describe, expect, it, vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import FlightCard from './components/FlightCard';
// I had less time left so wasn't able to write more test cases

// Mock API
global.fetch = vi.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve({
                "data": {
                  "result": [
                    {
                      "id": "1",
                      "fare": 3840,
                      "displayData": {
                        "source": {
                          "airport": {
                            "cityCode": "DEL",
                            "cityName": "Delhi",
                            "terminal": "3",
                            "airportCode": "DEL",
                            "airportName": "Indira Gandhi Airport",
                            "countryCode": "IN",
                            "countryName": "India"
                          },
                          "depTime": "2023-03-31T06:20"
                        },
                        "airlines": [
                          {
                            "airlineCode": "AB",
                            "airlineName": "JetSpice",
                            "flightNumber": "1234"
                          }
                        ],
                        "stopInfo": "Non stop",
                        "destination": {
                          "airport": {
                            "cityCode": "BOM",
                            "cityName": "Mumbai",
                            "terminal": "2",
                            "airportCode": "BOM",
                            "airportName": "Mumbai",
                            "countryCode": "IN",
                            "countryName": "India"
                          },
                          "arrTime": "2023-03-31T08:40"
                        },
                        "totalDuration": "2h 20m"
                      }
                    },
                    {
                      "id": "2",
                      "fare": 4820,
                      "displayData": {
                        "source": {
                          "airport": {
                            "cityCode": "BOM",
                            "cityName": "Mumbai",
                            "terminal": "1",
                            "airportCode": "BOM",
                            "airportName": "Chhatrapati Shivaji International Airport",
                            "countryCode": "IN",
                            "countryName": "India"
                          },
                          "depTime": "2023-03-31T09:30"
                        },
                        "airlines": [
                          {
                            "airlineCode": "CD",
                            "airlineName": "Air India",
                            "flightNumber": "4567"
                          }
                        ],
                        "stopInfo": "1 Stop",
                        "destination": {
                          "airport": {
                            "cityCode": "MAA",
                            "cityName": "Chennai",
                            "terminal": "4",
                            "airportCode": "MAA",
                            "airportName": "Chennai International Airport",
                            "countryCode": "IN",
                            "countryName": "India"
                          },
                          "arrTime": "2023-03-31T12:35"
                        },
                        "totalDuration": "3h 05m"
                      }
                    },
                  ]
                },
                "message": "Success"
              })
        }
    })
})

it('should have 2 flight cards', async () => {
    let app = null;
    await act(async () => {
        app = render(<App/>)
    });
    const {container} = app;
    const flightCards = container.getElementsByClassName('flight-card');
    expect(flightCards.length).toBe(2);
});

describe('Flight Card', () => {
    const details = {
        "id": "1",
        "fare": 3840,
        "displayData": {
          "source": {
            "airport": {
              "cityCode": "DEL",
              "cityName": "Delhi",
              "terminal": "3",
              "airportCode": "DEL",
              "airportName": "Indira Gandhi Airport",
              "countryCode": "IN",
              "countryName": "India"
            },
            "depTime": "2023-03-31T06:20"
          },
          "airlines": [
            {
              "airlineCode": "AB",
              "airlineName": "JetSpice",
              "flightNumber": "1234"
            }
          ],
          "stopInfo": "Non stop",
          "destination": {
            "airport": {
              "cityCode": "BOM",
              "cityName": "Mumbai",
              "terminal": "2",
              "airportCode": "BOM",
              "airportName": "Mumbai",
              "countryCode": "IN",
              "countryName": "India"
            },
            "arrTime": "2023-03-31T08:40"
          },
          "totalDuration": "2h 20m"
        }
      };
    it('should have correct airline name', async () => {
        render(<FlightCard details={details}/>);
        expect(screen.getByText(details.displayData.airlines[0].airlineName).innerHTML).toBe('JetSpice');
    });

    it('should have correct airline code', async () => {
        render(<FlightCard details={details}/>);
        const airlineCode = `${details.displayData.airlines[0].airlineCode}-${details.displayData.airlines[0].flightNumber}`;
        expect(screen.getByText(airlineCode).innerHTML).toBe('AB-1234');
    });

    it('should have correct source', async () => {
        render(<FlightCard details={details}/>);
        const source = `${details.displayData.source.airport.airportCode}, T${details.displayData.source.airport.terminal}`;
        expect(screen.getByText(source).innerHTML).toBe('DEL, T3');
    });

    it('should have correct destination', async () => {
        render(<FlightCard details={details}/>);
        const destination = `${details.displayData.destination.airport.airportCode}, T${details.displayData.destination.airport.terminal}`;
        expect(screen.getByText(destination).innerHTML).toBe('BOM, T2');
    });

    it('should have correct duration', async () => {
        render(<FlightCard details={details}/>);
        expect(screen.getByText(details.displayData.totalDuration).innerHTML).toBe('2h 20m');
    });

    it('should have correct stop information', async () => {
        render(<FlightCard details={details}/>);
        expect(screen.getByText(details.displayData.stopInfo).innerHTML).toBe('Non stop');
    });

    it('should have correct price', async () => {
        render(<FlightCard details={details}/>);
        const fare = `Rs. ${details.fare}/-`
        expect(screen.getByText(fare).innerHTML).toBe('Rs. 3840/-');
    });

    it('should have correct departure time', async () => {
        render(<FlightCard details={details}/>);
        const depTime = new Date(details.displayData.source.depTime);
        const timeString = `${depTime.getHours()}:${depTime.getMinutes()}`;
        expect(screen.getByText(timeString).innerHTML).toBe('6:20');
    });

    it('should have correct arrival time', async () => {
        render(<FlightCard details={details}/>);
        const arrTime = new Date(details.displayData.destination.arrTime);
        const timeString = `${arrTime.getHours()}:${arrTime.getMinutes()}`;
        expect(screen.getByText(timeString).innerHTML).toBe('8:40');
    });
    
    it('should have correct source airport', async () => {
        render(<FlightCard details={details}/>);
        const arrAirport = `${details.displayData.source.airport.airportName}, ${details.displayData.source.airport.cityName}, ${details.displayData.destination.airport.countryName}`;
        expect(screen.getByText(arrAirport).innerHTML).toBe('Indira Gandhi Airport, Delhi, India');
    });

    it('should have correct destination airport', async () => {
        render(<FlightCard details={details}/>);
        const arrAirport = `${details.displayData.destination.airport.airportName}, ${details.displayData.destination.airport.cityName}, ${details.displayData.destination.airport.countryName}`;
        expect(screen.getByText(arrAirport).innerHTML).toBe('Mumbai, Mumbai, India');
    });
})