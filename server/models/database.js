const mongoose = require('mongoose');

// connect to my database, to use my variable inside my env file, I have to type that "process.env.<variableName> "
mongoose.connect(process.env.MONGODB_URI);

//Setting the database connection
mongoose.connection('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
	console.log('Connected');
});

// ME TRYING TO CONNECT WITH MONGOOSE 6 DIFFERENTLY (last version)
// try {
// 	await mongoose.connect(process.env.MONGODB_URI, {});
//     console.log('Connected');
// } catch (error) {
// 	handleError(error);
// }

// mongoose.connection.on('error', (err) => {
// 	logError(err);
// });

// Models
require('./Category');
