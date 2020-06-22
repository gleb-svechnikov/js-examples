function getGBasedonLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords)
      const height = position.coords.altitude
      const latitude = position.coords.latitude
      const sin2Φ = Math.sin(2 * latitude)
      const equatorGravity = 9.780327
      const GRS80_A = 0.0053024 * Math.pow(sin2Φ, 2)
      const GRS80_B = 0.0000058 * sin2Φ
      const IGF = equatorGravity * (1 + GRS80_A - GRS80_B)
      const FAC = -3.086e-6 * height
      const localG = IGF + FAC
      console.log(IGF, FAC)

      document.getElementsByTagName('output')[0].textContent = localG
    })
  } else {
    alert('Geolocation is not supported by this browser.')
  }
}
