const io = require ( 'socket.io' ) ( );
//const mongoose = require('mongoose');

// connect to the database and create it if it does not exist
//mongoose.connect("mongodb://localhost:27017/messageHistoryDB", {useNewUrlParser: true});


//Don't need this now that we have a database
// array to store all of the messages
//var chatMessages = [];
// create a new schema for our messages
/*const messageSchema = new mongoose.Schema({
  order: Number,
  name: String,
  msg: String
})


const Messages = mongoose.model("Message",messageSchema);
*/

const question = {
        prompt: "who is faster?",
        answers: {
                        one: "elephant",
                        two: "tiger",
                        three: "puma",
                        four: "cheeta"
                },
        correct: 'four'
};

console.log(question.prompt);
console.log(question.answers['1']);

// when a client connects listen for messages and relay them to all the conected clients
io.on( 'connection', ( client ) => {
        //listen for newMessage
        // console.log('new client connected: ',client);

        client.on('start', (message) => {
                console.log( 'client is sending a new message to start: ', message);

                  /*
                  var msg = new Messages({
                  order:counter,
                  name:recMessage[0],
                  msg:recMessage[1],
                  });

                  msg.save();
                  */
                 // counter++;
                //                const question = "this is a question";
                  // broadcast the message to all connected clients
                io.emit('sendNewQuestion', question);
        });
});


const port = 8000;

io.listen( port );

console.log( 'listening on port', port );
