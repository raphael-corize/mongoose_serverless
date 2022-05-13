const mongoose = require('mongoose')
const pick = require('lodash/pick')
const pickBy = require('lodash/pickBy')
const identity = require('lodash/identity'
)
const { DateTime } = require('luxon')

const { UserModel } = require('../database/model/db1')
const response = require('../libs/response')

let cachedDB = null

async function connectToDatabase (uri, options = {}) {
  if (!cachedDB) cachedDB = await mongoose.connect(uri)
}

export const handler = async (event, context) => {
  try {
    await connectToDatabase(process.env.MONGO_URI)
    const data = pickBy(pick(JSON.parse(event.body), [
      'firstName', 'middleName', 'lastName', 'credentials',
      'gender', 'birthDate'
    ]), identity)
    if (data.birthDate) data.birthDate = DateTime.fromFormat(data.birthDate, 'yyyy-MM-dd').toJSDate()
    const user = await UserModel.create(data)
    return response.success({
      message: 'User had been created successfully.',
      data: user.toObject()
    })
  } catch (e) {
    return response.fail({ message: e.message })
  }
}
