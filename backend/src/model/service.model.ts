import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
   serviceName: {
      type: String,
      required: true
   },
   image: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   }
});

export default mongoose.model('Service', serviceSchema);