import { useState, useEffect } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
const [isFetching, setFetching] = useState(false);
const  [availablePlaces, setAvailablePlaces] = useState([]);

 useEffect(()=> {
  async function fetchPlaces(){
    setFetching(true);
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();
    setAvailablePlaces(resData.places);
    setFetching(false);
  }

  fetchPlaces();
 },[])
 

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching places data...'
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
