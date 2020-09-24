
import mongoose from 'mongoose'

const connection = {}

async function connectDb() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,})

  connection.isConnected = db.connections[0].readyState
}

export default connectDb