"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

// Sample user data with locations
const userLocations = [
  { name: "Lagos, Nigeria", coordinates: [3.3792, 6.5244], users: 1200 },
  { name: "New York, USA", coordinates: [-74.006, 40.7128], users: 950 },
  { name: "London, UK", coordinates: [-0.1276, 51.5074], users: 800 },
  { name: "São Paulo, Brazil", coordinates: [-46.6333, -23.5505], users: 650 },
  { name: "Mumbai, India", coordinates: [72.8777, 19.076], users: 720 },
  { name: "Tokyo, Japan", coordinates: [139.6917, 35.6895], users: 580 },
  { name: "Sydney, Australia", coordinates: [151.2093, -33.8688], users: 420 },
  { name: "Berlin, Germany", coordinates: [13.405, 52.52], users: 380 },
  { name: "Toronto, Canada", coordinates: [-79.3832, 43.6532], users: 320 },
  { name: "Dubai, UAE", coordinates: [55.2708, 25.2048], users: 280 },
  { name: "Singapore", coordinates: [103.8198, 1.3521], users: 450 },
  {
    name: "Amsterdam, Netherlands",
    coordinates: [4.9041, 52.3676],
    users: 290,
  },
  { name: "Paris, France", coordinates: [2.3522, 48.8566], users: 340 },
  { name: "Bangkok, Thailand", coordinates: [100.5018, 13.7563], users: 210 },
  { name: "Mexico City, Mexico", coordinates: [-99.1332, 19.4326], users: 180 },
];

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredLocation) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMarkerHover = (locationName: string, e: React.MouseEvent) => {
    setHoveredLocation(locationName);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMarkerLeave = () => {
    setHoveredLocation(null);
    setMousePosition(null);
  };

  return (
    <div className="relative w-full h-full" onMouseMove={handleMouseMove}>
      <ComposableMap
        projection="geoNaturalEarth1"
        width={600}
        height={400}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#f3f4f6"
                  stroke="#e5e7eb"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      fill: "#f3f4f6",
                      stroke: "#e5e7eb",
                      strokeWidth: 0.5,
                    },
                    hover: {
                      fill: "#e5e7eb",
                      stroke: "#d1d5db",
                      strokeWidth: 1,
                    },
                    pressed: {
                      fill: "#d1d5db",
                      stroke: "#9ca3af",
                      strokeWidth: 1,
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {userLocations.map((location, index) => (
            <Marker
              key={index}
              coordinates={[location.coordinates[0], location.coordinates[1]]}
            >
              <g>
                {/* Outer glow circle */}
                <circle
                  r={Math.max(8, Math.min(20, location.users / 100)) + 4}
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  stroke="none"
                />
                {/* Inner solid circle */}
                <circle
                  r={Math.max(6, Math.min(16, location.users / 100))}
                  fill="#3b82f6"
                  stroke="white"
                  strokeWidth={2}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => handleMarkerHover(location.name, e)}
                  onMouseLeave={handleMarkerLeave}
                />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredLocation && mousePosition && (
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-sm"></div>
            <span className="text-sm font-medium text-gray-900">
              {hoveredLocation}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {userLocations
              .find((loc) => loc.name === hoveredLocation)
              ?.users.toLocaleString()}{" "}
            users
          </div>
        </div>
      )}
    </div>
  );
}
