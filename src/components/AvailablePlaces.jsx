import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvalablePlaces } from '../assets/http.js';
import { useFetch } from '../Hooks/useFetch.js';

async function fetchSortedPlaces(){

  const places = await fetchAvalablePlaces();

  return  new Promise((resolve, reje) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places, 
        position.coords.latitude, 
        position.coords.longitude
        );

        resolve(sortedPlaces);
    });
  })
  
}

export default function AvailablePlaces({ onSelectPlace }) {
const {
  isFetching,
  error,
  fetchedData: availablePlaces,
} = useFetch( fetchSortedPlaces, []);

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
