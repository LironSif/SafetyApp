import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const tlvTwaSchema = new Schema({
  NIOSH: String,
  OSHA: String,
});

const chemicalSchema = new Schema({
  UNNumber: { type: String, required: true },
  Name: { type: String, required: true },
  NEEDMONITOR: Boolean,
  TLV_TWA: [tlvTwaSchema],
  INSTABILITY: { type: Number, required: true, enum: [0, 1, 2, 3, 4] },
  SPECIFIC_HAZARD: { 
    type: String, 
    enum: ["Oxidizer", "Acid", "ACID", "Alkali", "ALK", "Corrosive", "COR", "Use NO WATER", "W", "Radiation Hazard", "None", "TOX", "OXI", "POI"], 
    required: true 
  },
  FIRE_HAZARD: { type: Number, required: true, enum: [0, 1, 2, 3, 4] },
  HEALTH_HAZARD: { type: Number, required: true, enum: [0, 1, 2, 3, 4] },
  STATE: { type: String, required: true, enum: ["Gas", "Liquid", "Solid"] },
  OXIDIZER: Boolean,
  CORROSIVE: Boolean,
  FLAMMABLE: Boolean,
  PPE: [{ 
    type: String, 
    enum: ["gloves", "goggles", "face shield", "protective suit", "respirator"], 
    required: true 
  }],
}, { timestamps: true });

const Chemical = model('Chemical', chemicalSchema);

export default Chemical;
