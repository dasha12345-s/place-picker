import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvalablePlaces } from '../assets/http.js';

export default function AvailablePlaces({ onSelectPlace }) {
const [isFetching, setFetching] = useState(false);
const [availablePlaces, setAvailablePlaces] = useState([]);
const [error, setError] = useState();

 useEffect(() => {
  async function fetchPlaces(){
    setFetching(true);

    try{
     
    const places = await fetchAvalablePlaces();

      navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          places, 
          position.coords.latitude, 
          position.coords.longitude
          );
        setAvailablePlaces(sortedPlaces);
        setFetching(false);
      });

    } catch (error){
      setError({message: error.message || 'Try again'});
      setFetching(false);
    }
  }

  fetchPlaces();
 },[]);

 if (error){
  return <Error title='An error occurred!!' message={error.message}/>
 }
 

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
