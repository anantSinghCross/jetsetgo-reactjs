import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import { expect, it, vi } from 'vitest';
import { act } from 'react-dom/test-utils';

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


