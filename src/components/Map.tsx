import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "NYC", coordinates: [-74.006, 40.7128] },
  { name: "LDN", coordinates: [-0.1278, 51.5074] },
  { name: "TKY", coordinates: [139.6917, 35.6895] },
  { name: "MOW", coordinates: [37.6173, 55.7558] },
  { name: "PEK", coordinates: [116.4074, 39.9042] },
  { name: "DXB", coordinates: [55.2708, 25.2048] },
  { name: "SYD", coordinates: [151.2093, -33.8688] },
];

export function Map() {
  return (
    <div className="w-full h-full bg-black/40 overflow-hidden cursor-move">
      <ComposableMap projection="geoMercator" width={800} height={400}>
        <ZoomableGroup center={[0, 20]} zoom={1} minZoom={1} maxZoom={8}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#111113"
                  stroke="#27272a"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#1f1f22", outline: "none" },
                    pressed: { fill: "#27272a", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates as [number, number]}>
              <circle r={2} fill="#0ea5e9" />
              <circle r={6} fill="#0ea5e9" opacity={0.3} className="animate-ping" />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fill: "#0ea5e9", fontSize: "8px", fontFamily: "monospace" }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
