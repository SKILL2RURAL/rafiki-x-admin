"use client";

import { useAnalyticsOverview } from "@/hook/useAnalytics";
import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { countryCoordinates } from "@/lib/countryCoordinates";

interface GeoGeometry {
  type: string;
  coordinates: number[][][] | number[][][][];
}

interface GeoProperties {
  name: string;
  [key: string]: unknown;
}

interface GeoFeature {
  rsmKey: string;
  type: string;
  geometry: GeoGeometry;
  properties: GeoProperties;
}

interface GeographiesChildProps {
  geographies: GeoFeature[];
}

interface Location {
  name: string;
  coordinates: [number, number];
  users: number;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap() {
  const { data } = useAnalyticsOverview();

  const locations: Location[] =
    data?.activeUsers?.topLocations
      .map((location): Location | null => {
        const coordinates = countryCoordinates[location.country];
        if (!coordinates) {
          return null;
        }
        return {
          name: location.country,
          coordinates,
          users: location.percentage,
        };
      })
      .filter((location): location is Location => Boolean(location)) || [];

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
        <Geographies geography={geoUrl}>
          {({ geographies }: GeographiesChildProps) =>
            geographies.map((geo: GeoFeature) => (
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

        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinates={[location.coordinates[0], location.coordinates[1]]}
          >
            <g>
              {/* Outer glow circle */}
              <circle
                r={Math.max(8, Math.min(20, location.users / 2)) + 4}
                fill="#3b82f6"
                fillOpacity={0.2}
                stroke="none"
              />
              {/* Inner solid circle */}
              <circle
                r={Math.max(6, Math.min(16, location.users / 2))}
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
            <div
              className="w-4 h-3 bg-linear
            -to-r from-green-500 to-green-600 rounded-sm"
            ></div>
            <span className="text-sm font-medium text-gray-900">
              {hoveredLocation}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {locations
              .find((loc) => loc.name === hoveredLocation)
              ?.users.toFixed(1)}
            % users
          </div>
        </div>
      )}
    </div>
  );
}
