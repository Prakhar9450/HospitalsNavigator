import React from "react";
import { useEffect, useState } from "react"
import { Building2, MapPin, Clock, Star, Phone, Navigation } from "lucide-react"

const HospitalList = ({ hospitals }) => {
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!hospitals || !Array.isArray(hospitals)) {
      setError("Invalid hospital data.")
    }
  }, [hospitals])

  const getRandomEmergencyTime = () => {
    return Math.floor(Math.random() * 20) + 5; // Random time between 5-25 minutes
  }

  const getRandomPhoneNumber = () => {
    return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
  }

  if (error) return (
    <div className="bg-red-50 border border-red-300 rounded-lg p-4">
      <p className="text-red-600 text-center font-medium">{error}</p>
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-white">Nearby Hospitals</h2>
        </div>
        <span className="text-sm text-gray-500">
          {hospitals?.length || 0} locations found
        </span>
      </div>

      {hospitals?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No hospitals found in this area.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Header with Rating */}
              <div className="p-4 bg-blue-50">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-800 leading-tight">
                    {hospital.name}
                  </h3>
                  {hospital.rating && (
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{hospital.rating}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Address */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <p className="text-sm text-gray-600 flex-1">{hospital.vicinity}</p>
                </div>

                {/* Emergency Time */}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <p className="text-sm">
                    <span className="text-gray-600">Emergency Response: </span>
                    <span className="font-semibold text-blue-600">{getRandomEmergencyTime()} mins</span>
                  </p>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <p className="text-sm text-gray-600">{getRandomPhoneNumber()}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                    Get Directions
                  </button>
                  <button className="flex items-center justify-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HospitalList