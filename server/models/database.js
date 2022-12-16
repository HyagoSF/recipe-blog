const mongoose = require('mongoose');

// connect to my database, to use my variable inside my env file, I have to type that "process.env.<variableName> "
mongoose.set('strictQuery', true); //this was showed in my terminal to add here

try {
	mongoose.connect(process.env.MONGODB_URI, {});
	console.log('Connected');
} catch (error) {
	handleError(error);
}

// Models
require('./Category');
