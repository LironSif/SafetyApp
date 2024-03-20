import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const RiskSchema = new Schema({
  name: String,
  level: String,
  mitigationMeasures: [String],
}, {_id: false});

const EquipmentSchema = new Schema({
  name: String,
  type: String,
  maintenanceSchedule: Date,
}, {_id: false});

const ChemicalSchema = new Schema({
  name: String,
  hazardRating: String,
  handlingProcedures: [String],
}, {_id: false});

const FactoryDepartmentSchema = new Schema({
  name: String,
  manager: { type: Schema.Types.ObjectId, ref: 'FactoryEmployee' },
  employees: [{ type: Schema.Types.ObjectId, ref: 'FactoryEmployee' }],
  risks: [RiskSchema],
  equipment: [EquipmentSchema],
  chemicals: [ChemicalSchema],
  factoryId: { type: Schema.Types.ObjectId, ref: 'Factory', required: true }, // Add this line
});


const FactoryDepartment = model('FactoryDepartment', FactoryDepartmentSchema);
export default FactoryDepartment;
