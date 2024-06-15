import './App.css'
import { useState, useEffect } from 'react'
import './components/color_display/EarthquakeDisplay'
import EarthquakeDisplay from './components/color_display/EarthquakeDisplay'
import { useFetch } from './components/fetch_hook/useFetch'

interface Earthquake {
  type: string;
  properties: {
    mag: number;
    place: string;
    time: number;
  }
}

interface EarthquakeData {
  features: Earthquake[];
}

const formatDateToISOString = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = "00";
  const minutes = "00";
  const seconds = "00";

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function App() {
  const [earthquake, setEarthquake] = useState<Earthquake | undefined>();
  const currentTime = new Date()
  const formattedTime = formatDateToISOString(currentTime)
  console.log(formattedTime);


  const { data, error, loading } = useFetch<EarthquakeData>(
    `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${formattedTime}`
  )

  useEffect(() => {

    if (data && data.features) {
      const latestEarthquake = data.features.find((earthquake) => earthquake.properties.mag > 2.4);

      console.log(data.features);

      if (latestEarthquake)
        setEarthquake(latestEarthquake)
    }
  }, [data])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {earthquake ? <EarthquakeDisplay earthquake={earthquake} /> : "No earthquakes today"}
    </>
  )
}

export default App
