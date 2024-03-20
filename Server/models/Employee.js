import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const OccupationalMedicalExaminationSchema = new Schema({
  date: Date,
  type: String,
  results: String,
}, {_id: false});

const CertificationSchema = new Schema({
  name: String,
  issuedBy: String,
  issueDate: Date,
  expiryDate: Date,
}, {_id: false});

const FactoryEmployeeSchema = new Schema({
  name: String,
  position: String,
  email: { type: String, required: true },
  factory: { // Adding reference to Factory schema
    type: Schema.Types.ObjectId,
    ref: 'Factory',
    required: true, // Set to true if every employee must be associated with a factory, otherwise set to false
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'FactoryDepartment',
    required: false,
  },
  occupationalMedicalExaminations: [OccupationalMedicalExaminationSchema],
  certifications: [CertificationSchema],
});

const FactoryEmployee = model('FactoryEmployee', FactoryEmployeeSchema);
export default FactoryEmployee;
