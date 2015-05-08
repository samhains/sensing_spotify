var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var ambient = ambientlib.use(tessel.port['D']);
// var camera = require('camera-vc0706').use(tessel.port['D']);

module.exports = {
	getData: function(callback) {
		ambient.getLightLevel(function(err, ldata) {
			if (err) callback(err);
			ambient.getSoundLevel(function(err, sdata) {
				if (err) throw err;
				callback(null, ldata, sdata);
			})
		})
	}
}