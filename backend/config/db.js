const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  try {
    // Set custom DNS resolvers to handle SRV record lookup failures on some networks
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch (dnsErr) {
      console.warn('Warning: Could not set custom DNS servers:', dnsErr.message);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medvault_dev');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
