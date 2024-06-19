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

const useFetchEarthquakeData = () => {
  const dailyDate = `${new Date().toLocaleDateString('en-US')}T00:00:00`;
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${dailyDate}&minmagnitude=2.5`
  return useFetch<EarthquakeData>(url)
}


function App() {
  const [earthquake, setEarthquake] = useState<Earthquake | undefined>();
  const { data, error, loading } = useFetchEarthquakeData()

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
