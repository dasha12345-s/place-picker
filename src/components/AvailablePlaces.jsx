import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
const [isFetching, setFetching] = useState(false);
const [availablePlaces, setAvailablePlaces] = useState([]);
const [error, setError] = useState();

 useEffect(() => {
  async function fetchPlaces(){
    setFetching(true);

    try{
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
  
      if (!response.ok){
        throw new Error('Failed to fetch places');
      } 

      setAvailablePlaces(resData.places);
    } catch (error){
      setError({message: error.message || 'Try again'});
    }
  
    setFetching(false);
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
