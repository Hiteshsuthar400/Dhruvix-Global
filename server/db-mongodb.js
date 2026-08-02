// Sample MongoDB connector using mongoose
// Reads MONGODB_URI from environment variables

const mongoose = require('mongoose');

async function connect(){
  const uri = process.env.MONGODB_URI;
  if(!uri) throw new Error('MONGODB_URI not set in environment');
  await mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true});
  console.log('MongoDB connected');
}

module.exports = {connect, mongoose};
