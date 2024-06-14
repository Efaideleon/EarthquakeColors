import './App.css'
import { useState, useEffect } from 'react'
import './components/color_display/ColorDisplay'
import ColorDisplay from './components/color_display/ColorDisplay'
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

function App() {
  const [magnitudes, setMagnitudes] = useState<number[]>([]);

  const { data, error, loading } = useFetch<EarthquakeData>(
    'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-06-13T10:00:00&endtime=2024-06-14T07:00:00'
  )

  useEffect(() => {
    if (data && data.features) {
      const extractedMangnitudes = data.features.map((feature) => feature.properties.mag);
      const filteredMagnitudes = extractedMangnitudes.filter((magnitude) => magnitude > 2.5);
      setMagnitudes(filteredMagnitudes)
    }
  }, [data])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      {magnitudes.map((magnitude, index) => (
        <li key={index}>{magnitude}</li>
      ))}
      <ColorDisplay />
    </>
  )
}

export default App
