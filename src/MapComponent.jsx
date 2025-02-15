import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { Compass, AlertCircle } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const MapComponent = ({ hospitals, setHospitals }) => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLocating, setIsLocating] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const getUserLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        setIsLocating(false);
        if (isLoaded) fetchNearbyHospitals(location);
      },
      (error) => {
        let errorMessage = "Failed to get your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Please allow location access to find nearby hospitals";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = "An unknown error occurred";
        }
        setLocationError(errorMessage);
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, [isLoaded]);

  const fetchNearbyHospitals = (location) => {
    const service = new window.google.maps.places.PlacesService(
      new window.google.maps.Map(document.createElement("div"))
    );

    const request = {
      location: location,
      radius: 5000,
      type: "hospital",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setHospitals(results);
      } else {
        console.error("PlacesService failed:", status);
      }
    });
  };

  if (!isLoaded || isLocating) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <Compass className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-2" />
          <p className="text-lg font-semibold text-gray-700">
            {isLocating ? "Getting your location..." : "Loading map..."}
          </p>
        </div>
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-red-50 rounded-lg">
        <div className="text-center max-w-md px-4">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-lg font-semibold text-red-700 mb-4">{locationError}</p>
          <button
            onClick={getUserLocation}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userLocation) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700 mb-4">Unable to access location</p>
          <button
            onClick={getUserLocation}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share Location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={userLocation} 
        zoom={14}
      >
        {/* User location marker */}
        <Marker
          position={userLocation}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 2,
          }}
        />

        {/* Hospital markers */}
        {hospitals?.map((hospital) => (
          <Marker
            key={hospital.place_id}
            position={hospital.geometry.location}
            onClick={() => setSelectedHospital(hospital)}
          />
        ))}

        {selectedHospital && (
          <InfoWindow
            position={selectedHospital.geometry.location}
            onCloseClick={() => setSelectedHospital(null)}
          >
            <div className="p-3">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {selectedHospital.name}
              </h2>
              <p className="text-sm text-gray-600">{selectedHospital.vicinity}</p>
              {selectedHospital.rating && (
                <p className="text-sm text-gray-600 mt-1">
                  Rating: {selectedHospital.rating} ⭐
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;