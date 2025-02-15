import React from "react"
import { useState } from "react"
import MapComponent from "./MapComponent"
import HospitalList from "./HospitalList"
import SignIn from "./SignIn"
import Navbar from "./Navbar"

const App = () => {
  const [hospitals, setHospitals] = useState([])
  const [user, setUser] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-900 via-purple-800 to-indigo-900">
      {!user ? (
        <SignIn setUser={setUser} />
      ) : (
        <>
          <Navbar user={user} />
          <div className="container mx-auto px-4 py-8">
            <MapComponent hospitals={hospitals} setHospitals={setHospitals} />
            <HospitalList hospitals={hospitals} />
          </div>
        </>
      )}
    </div>
  )
}

export default App

