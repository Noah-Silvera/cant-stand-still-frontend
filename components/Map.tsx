import { MapContainer, TileLayer, Polyline, Polygon } from 'react-leaflet'
import * as L from "leaflet"
import 'polyline-encoded'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import styles from '../styles/Map.module.css'
import { useState, useRef } from "react"
import * as turf from "@turf/turf"

const Map = ({ rides }) => {

  const [currentRide, setCurrentRide] = useState(null)

  const ridePolylines = rides.map((ride) => {
    return (L.Polyline as any).fromEncoded(ride["map"]["summary_polyline"]);
  })

  const ridePolygons = ridePolylines.map((polyline: L.Polyline) => {
    let longLatArray: number[][] = polyline.getLatLngs().map((latLng) => [latLng.lng, latLng.lat])
    let turfLine = turf.lineString(longLatArray);


    let buffered = turf.buffer(turfLine, 2, {units: 'kilometers'});
    return L.GeoJSON.coordsToLatLngs(buffered.geometry.coordinates[0])
  })

  const group = L.featureGroup(ridePolylines);

  let lineStyle = {
    color: "#60A5FA",
    weight: 3
  }

  let highlightedLineStyle = {
    color: "#2563EB",
    weight: 4
  }

  var polylineComponents = ridePolylines.map((polyline, idx) => {
    return (
      <Polyline
        key={`'ride-${idx}-polyline`}
        positions={polyline.getLatLngs()}
        pathOptions={currentRide?.id == rides[idx].id ? highlightedLineStyle : lineStyle}
        ref={useRef()}
      ></Polyline>
    )
  })

  var polygonComponents = ridePolygons.map((polygon, idx) => {
    return (
      <Polygon
        key={`'ride-${idx}-polygon-buffer`}
        positions={polygon}
        pathOptions={{
          opacity: 0,
          fillOpacity: 0,
          color: "green"
        }}
        eventHandlers={{
          mouseover: (e) => {
            setCurrentRide(rides[idx])
          },
          mouseout: (e) => {
            setCurrentRide(null)
          }
        }}
      ></Polygon>
    )
  })

  return (
    <div className="flex flex-col">
      <div id="map" className={styles.map}>
        <MapContainer bounds={group.getBounds().pad(0.25)} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {polygonComponents}
          {polylineComponents}
        </MapContainer>
      </div>
      <div className="w-full">
        <div className="max-w-6xl m-auto flex flex-row justify-around p-4 text-xl">
          <p>{currentRide?.name}</p>
          <p>Distance: {currentRide?.distance_km && (currentRide?.distance_km?.toFixed(1) + " km") || "..."} </p>
          <p>Date: {currentRide && new Date(currentRide?.start_date).toDateString() || "..."}</p>
          <p>Average Speed: {currentRide?.average_speed && (currentRide?.average_speed?.toFixed(1) + " km/h") || "..."}</p>
        </div>
      </div>
    </div>
  )
}

export default Map
