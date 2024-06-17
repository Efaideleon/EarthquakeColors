import "./EarthquakeDisplayStyles.css"
import { motion } from 'framer-motion'

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
  const magnitude = Math.round(props.earthquake.properties.mag * 10) / 10;

  const colorClass =
    magnitude < 4 ? "green" :
      magnitude < 6 ? "yellow" :
        magnitude < 7 ? "orange" :
          magnitude <= 10 ? "red" :
            "gray"

  return (
    <motion.div
      className={`circle ${colorClass}`}
      key={props.earthquake.properties.time}
      animate={{ opacity: 1, scale: [1, 1.1, 1] }}
      transition={{ duration: 0.5, repeat: 2 }}
    >
      <div className="info-container">
        <div className="magnitude">{magnitude}</div>
        <div className="location">{props.earthquake.properties.place}</div>
        <div className="time">{time} UTC</div>
      </div>
    </motion.div>
  )
}

export default EarthquakeDiplay