import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FactorySchema = new Schema({
  name: String,
  address: { type: String, unique: true },
  departments: [{ type: Schema.Types.ObjectId, ref: 'FactoryDepartment' }],
  employees: [{ type: Schema.Types.ObjectId, ref: 'FactoryEmployee' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' } ,// Reference to the User,
  employeeCount: { type: Number, default: 0 }, // New field for employee count
});

const Factory = model('Factory', FactorySchema);
export default Factory;
