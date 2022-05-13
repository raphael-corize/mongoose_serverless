const mongoose = require('mongoose')
const { UserModel } = require('../database/model/db1')
const response = require('../libs/response')

let cachedDB = null

async function connectToDatabase (uri, options = {}) {
  if (!cachedDB) cachedDB = await mongoose.connect(uri)
}

export const handler = async (event, context) => {
  try {
    await connectToDatabase(process.env.MONGO_URI)
    const user = await UserModel.findById(event.pathParameters.id)
    if (!user) return response.badRequest({ message: 'user with specified id is not found' })
    return response.success({
      data: user.toObject()
    })
  } catch (e) {
    return response.fail({ message: e.message })
  }
}
