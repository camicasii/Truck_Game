import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  address: {
    type: String,
    required: false,
    unique: false,
  },
  nonce: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    required: false,
  },
  BUSD: {
    type: String,
    required: false,
  },
  sdl: {
    type: String,
    required: false,
  }, 
  date:
  {
    type: String,
    required: false,
  }, 
});

export default mongoose.model('User', UserSchema);
