import { useEffect,  useState } from "react";



export function useFetch(fetchFn, initialValue){

  const [isFetching, setFetching] = useState(false);
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData(){
    setFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
        } catch (error) {
          setError({message: error.message  || 'Faild to fetch data.'})
        }

        setFetching(false);
      }

    fetchData();
  }, [fetchFn]);

  return(
    {
      isFetching,
      error,
      setFetchedData,
      fetchedData
    }
  )
}
