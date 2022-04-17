import axios from 'axios';
import { useState, useEffect } from 'react';
import api from './api';
import './App.css';
const apiKey = '680ec0ce0amshb5094a6d52a0d98p1f34efjsn538a7176f19f';

function App() {
  const [sort, setSort] = useState(null);
  const [beds, setBeds] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [response, setResponse] = useState(null);
  const [city, setCity] = useState(null);
  const [stateCode, setStateCode] = useState(null);
  const [location, setLocation] = useState(null);

  console.log(apiKey);

  // Make API Call
  // https://rapidapi.com/blog/axios-react-api-tutorial/

  // api
  //   .getLocation(keyword)
  //   .then(response => {
  //     setResponse(response);
  //     console.log(response);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // console.log(location);

  const getLocation = async keyword => {
    try {
      const options = {
        url: 'https://realty-in-us.p.rapidapi.com/locations/auto-complete',
        headers: {
          'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
        params: { input: keyword },
      };

      const response = await axios.request(options);
      setLocation(response.data.autocomplete[0]);

      console.log('location', response.data.autocomplete[0]);
      const { city, state_code } = response.data.autocomplete[0];
      setCity(city);
      setStateCode(state_code);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(response);
  const onSubmit = async e => {
    e.preventDefault(); // Allow enter key to submit form
    e.stopPropagation();
    // Make Properties API Call
    const response = await api.getProperties(stateCode, city, sort, beds);
    setResponse(response);

    console.log('response', response);
  };

  const sortOptions = [
    'relevance',
    'newest',
    'price_high',
    'price_low',
    'price_reduced_date',
    'sqft_high',
    'open_house_date',
    'photos',
  ];

  return (
    <div>
      <h1 className='text-3xl font-bold underline'>Real Estate App</h1>
      <h2>Discover properties for sale anywhere in the USA</h2>

      <form className='' onSubmit={e => onSubmit(e)}>
        <input
          className='flex w-full  px-5 py-3 '
          type='text'
          placeholder='Enter the loaction of the property e.g New York'
          onChange={e => {
            setKeyword(e.target.value);
            getLocation(e.target.value);
            // setResponse(null);
          }}
        />

        <div>
          <div>
            <label>Sort By</label>
            <select
              className='mt-1 flex w-full rounded-lg px-5 py-3 text-base text-background font-bold focus:outline-none'
              onChange={e => setSort(e.target.value)}
            >
              {sortOptions.map(value => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Minimum Beds</label>
            <input
              className='flex w-full  px-5 py-3 '
              type='number'
              placeholder='1'
              onChange={e => setBeds(e.target.value)}
            />
          </div>
        </div>
        <button type='submit'>Search</button>
      </form>
    </div>
  );
}

export default App;
