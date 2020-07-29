import fs from 'fs-extra'
import path from 'path'

const storeLocation = path.resolve(process.cwd(), 'store.json')

export default {
  set,
  get,
}

async function set(updater) {
  const file = await fs.readJSON(storeLocation)
  const newFile = updater(file)
  await fs.writeJSON(storeLocation, newFile)
}

function get() {
  return fs.readJSON(storeLocation)
}
