var io = require('socket.io').listen(5001),
redis = require('redis').createClient();

redis.subscribe('rt-change');

io.on('connection', function(socket){
	//console.log("conected");
  	redis.on('message', function(channel, message){
  	//console.log(message);
    socket.emit('rt-change', JSON.parse(message));
  });
});

console.log('run en el puedto 5001')
