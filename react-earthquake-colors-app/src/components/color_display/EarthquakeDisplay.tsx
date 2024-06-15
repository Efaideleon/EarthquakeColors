import "./EarthquakeDisplayStyles.css"

interface Earthquake {
  type: string;
  properties: {
    mag: number;
    place: string;
    time: number;
  }
}

interface EarthquakeDisplayProps {
  earthquake: Earthquake;
}

function EarthquakeDiplay(props: EarthquakeDisplayProps) {


  const magnitude = Math.ceil(props.earthquake.properties.mag);
  const colorClass = magnitude <= 3 ? "green" :
                     magnitude <= 4 ? "yellow" :
                     magnitude <= 6 ? "orange" :
                     magnitude <= 10 ? "red" :
                     "gray"

  return (
    <div className={colorClass}>
      <p>{props.earthquake.properties.place}</p>
      <p>{props.earthquake.properties.time}</p>
      <p>{props.earthquake.properties.mag}</p>
    </div>
  )
}

export default EarthquakeDiplay