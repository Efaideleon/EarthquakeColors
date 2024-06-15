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
  const time = new Date(props.earthquake.properties.time).toLocaleString()
  const magnitude = Math.ceil(props.earthquake.properties.mag);
  
  const colorClass =
    magnitude <= 3 ? "green" :
      magnitude <= 4 ? "yellow" :
        magnitude <= 6 ? "orange" :
          magnitude <= 10 ? "red" :
            "gray"

  return (
    <div className={`circle ${colorClass}`}>
      <div className="info-container">
        <p>{props.earthquake.properties.place}</p>
        <p>{time}</p>
        <p>{magnitude}</p>
      </div>
    </div>
  )
}

export default EarthquakeDiplay