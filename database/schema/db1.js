import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const db1 = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String, default: null },
  lastName: { type: String, default: null },
  credentials: [{ type: String, required: true }],
  gender: { type: String, enum: ['male', 'female'], default: null },
  birthDate: { type: Date, required: true }
}, { collation: 'db1', timestamps: true })
db1.plugin(mongoosePaginate)
export default db1
