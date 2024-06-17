import './App.css'
import { useState, useEffect } from 'react'
import { useFetch } from './components/fetch_hook/useFetch'
import EarthquakeDisplay from './components/color_display/EarthquakeDisplay'

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
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = "00";
  const minutes = "00";
  const seconds = "00";

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}


function App() {
  const [earthquake, setEarthquake] = useState<Earthquake | undefined>();

  const dailyISOTime = formatDateToISOString(new Date())
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dailyISOTime}&minmagnitude=2.5`
  const { data, error, loading } = useFetch<EarthquakeData>(url)

  useEffect(() => {
    if (data && data.features) {
        setEarthquake(data.features[0])
    }
  }, [data])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='main-content'>
      {earthquake ? <EarthquakeDisplay earthquake={earthquake} /> : "No earthquakes today"}
    </div>
  )
}

export default App
