import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import type { Scenario, ScenarioProperties } from '../types';
import type { Feature, Point } from 'geojson';

interface MapThumbnailProps {
  scenario: Scenario;
}

const pointToLayer = (feature: Feature<Point, ScenarioProperties>, latlng: L.LatLng): L.Layer => {
  const { eai } = feature.properties;
  const radius = eai > 0 ? 4 : 2; 
  
  return L.circleMarker(latlng, {
    radius: radius,
    color: eai > 0 ? '#b91c1c' : '#c2410c',
    weight: 1,
    fillColor: eai > 0 ? '#ef4444' : '#f97316',
    fillOpacity: 0.8,
  });
};

export function MapThumbnail({ scenario }: MapThumbnailProps) {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-gray-700">
        <MapContainer
            key={scenario.id}
            center={scenario.center}
            zoom={scenario.zoom > 1 ? scenario.zoom - 1 : 1}
            className="h-full w-full"
            zoomControl={false}
            scrollWheelZoom={false}
            dragging={false}
            doubleClickZoom={false}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                noWrap={true}
            />
            {scenario.data && (
                <GeoJSON
                data={scenario.data}
                pointToLayer={pointToLayer}
                />
            )}
        </MapContainer>
    </div>
  );
}