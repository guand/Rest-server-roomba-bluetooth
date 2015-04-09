var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

var connect = function(req, res) {
	btSerial.on('found', function(address, name) {
	    btSerial.findSerialPortChannel(address, function(channel) {
	        btSerial.connect(address, channel, function() {
	            var success = {"success": 0}
	            return res.send(success);
	        }, function () {
	            var success = {"success": 1}
	            return res.send(success);
	        });

	    }, function(err) {
	    	var error = {"errorCode": 0};
	    	if(err){
	        	return res.send(error);
	        }
	    });
	});

	btSerial.inquire();
}

var move = function(req, res) {
	console.log(req.body);
	if(req.body === undefined) {
		return res.status(400).send({error: 'missing values'});
	} else if(req.body.rotation ===  undefined) {
		return res.status(404).send({missing: "required rotation"});
	} else if(req.body.speed === undefined) {
		return res.status(404).send({missing: "required speed"});
	}
	var data = req.body.speed + req.body.rotation ;
	btSerial.write(new Buffer(data, 'utf-8'), function(err, bytesWritten) {
	    if (err) return res.status(500).send({error: "could not connect"});
	    	return res.status(200).send({data: data});
	});
}

module.exports = {
	connect: connect,
	move: move 
}