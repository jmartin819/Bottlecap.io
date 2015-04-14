var Bottlecap = require('../models/bottlecap');

exports.postBottlecap = function(req, res){

	var bottlecap = new Bottlecap();

	bottlecap.beername = req.body.beername;
	bottlecap.beerdate = req.body.beerdate
	bottlecap.dateCreated = req.body.dateCreated;
	bottlecap.avgColor = req.body.avgColor;

	bottlecap.save(function(err) {
		if(err) {
			if(err.code == 11000)
				return res.json({ success: false, message: 'A bottlecap with that name already exists. '});
			else
				return res.send(err);
		}

		res.json({ message: 'New bottlecap created!' });
	});
};

exports.getOneCap = function(req, res){
	Bottlecap.findById(req.params.cap_id, function(err, bottlecaps){
		if(err) return res.send(err);

		res.json(bottlecaps);
	})
};
exports.getBottlecaps = function(req, res){

	Bottlecap.find(function(err, bottlecaps){
		if(err) res.send(err);

		res.json(bottlecaps);
		});
};
