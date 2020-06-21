function getGBasedonLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords)
      const height = position.coords.altitude
      const latitude = position.coords.latitude
      const sin2Φ = Math.sin(latitude)
      const equatorGravity = 9.780327
      const GRS80_A = 0.0053024
      const GRS80_B = 0.0000058
      const IGF = equatorGravity * (1 + GRS80_A * sin2Φ - GRS80_B * sin2Φ)
      const FAC = -3.086e-6 * height
      const localG = IGF + FAC
      console.log(IGF, FAC)

      document.getElementsByTagName('output')[0].append(localG)
    })
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}
