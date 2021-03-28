import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import styles from '../styles/Map.module.css'

const Map = () => {
  return (
    <div id="map" className={styles.map}>
      <MapContainer center={[40.8054,-74.0241]} zoom={14} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
        position={[40.8054,-74.0241]}
        draggable={true}
        >
          <Popup>
            Hey ! you found me
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
