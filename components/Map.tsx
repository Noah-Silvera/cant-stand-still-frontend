import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet'
import * as L from "leaflet"
import 'polyline-encoded'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import styles from '../styles/Map.module.css'

const Map = ({ rides }) => {

  const ridePolylines = rides.map((ride) => {
    return (L.Polyline as any).fromEncoded(ride["map"]["summary_polyline"]);
  })

  const group = L.featureGroup(ridePolylines);

  return (
    <div>
      <div id="map" className={styles.map}>
        <MapContainer bounds={group.getBounds().pad(0.25)} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {ridePolylines.map((polyline, idx) => {
            let lineStyle = {
              color: "#60A5FA",
              weight: 3
            }

            let highlightedLineStyle = {
              color: "#2563EB",
              weight: 4
            }
            return (
              <Polyline
                key={idx}
                positions={polyline.getLatLngs()}
                pathOptions={lineStyle}
                eventHandlers={{
                  mouseover: (e) => {
                    e.target.setStyle(highlightedLineStyle)
                  },
                  mouseout: (e) => {
                    e.target.setStyle(lineStyle)
                  }
                }}
              ></Polyline>
            )
          })}
        </MapContainer>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Map
