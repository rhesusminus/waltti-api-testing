const db = []
let vehicleposition: unknown

const addItem = (item: unknown) => db.push(item)

const setVehiclePosition = (position: unknown) => (vehicleposition = position)

export default { vehicleposition, setVehiclePosition }
