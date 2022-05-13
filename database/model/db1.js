import mongoose from 'mongoose'
import schema from '../schema/db1'

export default mongoose.model('User', schema)
