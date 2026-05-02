import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useBranch } from "../context/BranchContext";
import { BottomNav } from "../components/layout/BottomNav";
import { Badge } from "../components/ui/Badge";
import { branchesData, citiesData } from "../data/branchesData";
import { Clock, Phone, Check, MapPin, Navigation, Loader } from "lucide-react";
import { toast } from "sonner";

/* ── Haversine distance in km ── */
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ── City coordinates centroids for geo-matching ── */
const CITY_CENTROIDS = {
  Bacolod: { lat: 10.6764, lng: 122.9502 },
  Iloilo: { lat: 10.7202, lng: 122.5621 },
  Cebu: { lat: 10.3157, lng: 123.8854 },
  Manila: { lat: 14.5995, lng: 120.9842 },
};

/* 
  Determine the nearest city from coordinates.
  Returns the city name whose centroid is closest to (lat, lng).
*/
function getNearestCity(lat, lng) {
  let nearest = null;
  let minDist = Infinity;
  for (const [city, coord] of Object.entries(CITY_CENTROIDS)) {
    const d = haversine(lat, lng, coord.lat, coord.lng);
    if (d < minDist) {
      minDist = d;
      nearest = city;
    }
  }
  return nearest;
}

export function BranchSelectorPage() {
  const navigate = useNavigate();
  const { selectBranch, selectedBranch } = useBranch();

  const [selectedCity, setSelectedCity] = useState(null); // null = detecting
  const [geoStatus, setGeoStatus] = useState("detecting"); // 'detecting' | 'found' | 'denied' | 'error'
  const [userCoords, setUserCoords] = useState(null);
  const [branchesWithDist, setBranchesWithDist] = useState(branchesData);

  /* ── Geolocation on mount ── */
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoStatus("error");
      setSelectedCity("All");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setUserCoords({ lat, lng });

        // Recalculate real distances from user's actual position
        const updated = branchesData.map((b) => ({
          ...b,
          distance: parseFloat(
            haversine(lat, lng, b.coordinates.lat, b.coordinates.lng).toFixed(
              1,
            ),
          ),
        }));
        setBranchesWithDist(updated.sort((a, b) => a.distance - b.distance));

        // Auto-select the city nearest to user
        const city = getNearestCity(lat, lng);
        setSelectedCity(city);
        console.log(city);
        setGeoStatus("found");
      },
      (err) => {
        setGeoStatus(err.code === 1 ? "denied" : "error");
        setSelectedCity("All");
      },
      { timeout: 8000, maximumAge: 60000 },
    );
  }, []);

  const cities = ["All", ...citiesData.map((c) => c.name)];
  const filtered =
    selectedCity === "All" || selectedCity === null
      ? branchesWithDist
      : branchesWithDist.filter((b) => b.city === selectedCity);

  const handleSelect = (branch) => {
    if (branch.status !== "open") return;
    selectBranch(branch);
    toast.success(`${branch.name} selected!`);
    navigate("/home");
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          background: "var(--bg-card)",
          borderBottom: "1.5px solid var(--border)",
          padding: "12px 16px 10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Title + geo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              fontSize: "22px",
              fontWeight: 800,
              color: "var(--text-1)",
              letterSpacing: "-0.4px",
            }}
          >
            Choose Branch
          </h1>
          {/* Geo status pill */}
          {geoStatus === "detecting" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--bg-muted)",
                borderRadius: "99px",
                padding: "5px 12px",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-3)",
              }}
            >
              <Loader
                size={12}
                style={{ animation: "spin 1s linear infinite" }}
              />
              Locating…
            </div>
          )}
          {geoStatus === "found" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: "99px",
                padding: "5px 12px",
                fontSize: "12px",
                fontWeight: 600,
                color: "#16a34a",
              }}
            >
              <Navigation size={11} />
              Showing nearby branches
            </div>
          )}
          {(geoStatus === "denied" || geoStatus === "error") && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--bg-muted)",
                borderRadius: "99px",
                padding: "5px 12px",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-3)",
              }}
            >
              <MapPin size={11} />
              All branches
            </div>
          )}
        </div>

        {/* Location note */}
        {geoStatus === "found" && selectedCity && selectedCity !== "All" && (
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-3)",
              fontWeight: 500,
              marginTop: "-4px",
            }}
          >
            📍 Showing branches in{" "}
            <strong style={{ color: "var(--text-2)" }}>{selectedCity}</strong> —
            tap another city to switch
          </p>
        )}
        {geoStatus === "denied" && (
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-3)",
              fontWeight: 500,
              marginTop: "-4px",
            }}
          >
            📍 Location access denied — showing all branches
          </p>
        )}
      </header>

      <div
        style={{
          paddingTop: "140px",
          padding: "140px 16px calc(var(--tab-h) + 20px)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Detecting state placeholder */}
        {geoStatus === "detecting" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px 0",
              gap: "12px",
            }}
          >
            <div style={{ fontSize: "36px" }}>📍</div>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--text-1)",
              }}
            >
              Finding your location…
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-3)",
                textAlign: "center",
              }}
            >
              We'll show you branches closest to you
            </p>
          </div>
        )}

        {geoStatus !== "detecting" &&
          filtered.map((branch) => {
            const isOpen = branch.status === "open";
            const isSelected = selectedBranch?.id === branch.id;
            const dist = branch.distance;

            return (
              <div
                key={branch.id}
                onClick={() => handleSelect(branch)}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-lg)",
                  padding: "16px",
                  border: `1.5px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
                  boxShadow: isSelected
                    ? "var(--shadow-accent)"
                    : "var(--shadow-sm)",
                  cursor: isOpen ? "pointer" : "not-allowed",
                  opacity: isOpen ? 1 : 0.5,
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        background: isSelected
                          ? "var(--accent-light)"
                          : "var(--bg-muted)",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <MapPin
                        size={18}
                        color={isSelected ? "var(--accent)" : "var(--text-3)"}
                      />
                    </div>
                    <div style={{ flex: 1, paddingRight: "8px" }}>
                      <p
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          marginBottom: "3px",
                          color: "var(--text-1)",
                        }}
                      >
                        {branch.name}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "var(--text-3)",
                          lineHeight: 1.4,
                          fontWeight: 500,
                        }}
                      >
                        {branch.address}
                      </p>
                      {/* Distance pill (shown when we have real coords) */}
                      {userCoords && (
                        <div
                          style={{
                            marginTop: "6px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            background: "var(--bg-muted)",
                            borderRadius: "99px",
                            padding: "3px 8px",
                          }}
                        >
                          <Navigation size={10} color="var(--text-4)" />
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "var(--text-3)",
                            }}
                          >
                            {dist} km away
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "6px",
                      flexShrink: 0,
                    }}
                  >
                    <Badge color={isOpen ? "green" : "neutral"}>
                      {isOpen ? "● Open" : "● Closed"}
                    </Badge>
                    {isSelected && (
                      <div
                        style={{
                          background: "var(--accent)",
                          borderRadius: "50%",
                          width: "22px",
                          height: "22px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Check size={13} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                    paddingTop: "10px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--text-3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 500,
                    }}
                  >
                    <Clock size={12} color="var(--accent)" /> {branch.hours}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--text-3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 500,
                    }}
                  >
                    <Phone size={12} color="var(--accent)" /> {branch.phone}
                  </span>
                  {isOpen && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--accent)",
                        fontWeight: 600,
                      }}
                    >
                      🛵 {branch.estimatedDelivery}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

        {geoStatus !== "detecting" && filtered.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "40px 0",
              gap: "12px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: "40px" }}>🗺️</span>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "var(--text-1)",
              }}
            >
              No branches found
            </p>
            <p style={{ fontSize: "13px", color: "var(--text-3)" }}>
              Try selecting a different city above.
            </p>
          </div>
        )}
      </div>

      <BottomNav />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
