import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet'
import * as L from "leaflet"
import 'polyline-encoded'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import styles from '../styles/Map.module.css'
import { useState } from "react"

const Map = ({ rides }) => {

  const [currentRide, setCurrentRide] = useState(null)

  const ridePolylines = rides.map((ride) => {
    return (L.Polyline as any).fromEncoded(ride["map"]["summary_polyline"]);
  })

  const group = L.featureGroup(ridePolylines);

  return (
    <div className="flex flex-col">
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
                    setCurrentRide(rides[idx])
                  },
                  mouseout: (e) => {
                    e.target.setStyle(lineStyle)
                    setCurrentRide(null)
                  }
                }}
              ></Polyline>
            )
          })}
        </MapContainer>
      </div>
      <div className="w-full">
        <div className="max-w-6xl m-auto flex flex-row justify-around p-4 text-xl">
          <p>{currentRide?.name}</p>
          <p>Distance: {currentRide?.distance_km} km</p>
          <p>Date: {currentRide && new Date(currentRide?.start_date).toDateString()}</p>
          <p>Average Speed: {currentRide?.average_speed} km/h</p>
        </div>
      </div>
    </div>
  )
}

export default Map
