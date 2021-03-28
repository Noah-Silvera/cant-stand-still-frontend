import { MapContainer, TileLayer, Polyline } from 'react-leaflet'
import * as L from "leaflet"
import 'polyline-encoded'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import styles from '../styles/Map.module.css'

const Map = ({ rides }) => {
  return (
    <div id="map" className={styles.map}>
      <MapContainer center={[48.493250,-123.437067]} zoom={9} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {rides.map((ride) => {
          let polyline = (L.Polyline as any).fromEncoded(ride["map"]["summary_polyline"]);
          return <Polyline positions={polyline.getLatLngs()} key={ride["id"]}/>
        })}
      </MapContainer>
    </div>
  )
}

export default Map
