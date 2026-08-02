// Example Mongoose product model
const {mongoose} = require('./db-mongodb');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  images: [String],
  createdAt: {type:Date, default:Date.now}
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
