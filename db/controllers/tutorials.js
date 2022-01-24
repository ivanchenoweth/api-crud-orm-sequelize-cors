var models = require('../models');

module.exports = {
	fetchAll(req, res){
		models.Tutorial.findAll()
		.then(function(tutorials){
			res.status(200).json(tutorials);
		})
		.catch(function(error){
			res.status(500).json(error);
		});
	},

	fetchOne(req, res){
		models.Tutorial.findByPk(req.params.id)
		.then(function(tutorial){
			res.status(200).json(tutorial);
		})
		.catch(function(error){
			res.status(500).json(error);
		});
	},

	create(req, res){
		var newTutorial = models.Tutorial.build();
		newTutorial.title = req.sanitize('title').escape();
		newTutorial.description = req.sanitize('description').escape();
		newTutorial.save()
		.then(function(instance){
			res.status(200).json(instance);
		})
		.catch(function(error){
			res.status(500).json(error);
		})
	},

	update(req, res){
		models.Tutorial.findById(req.params.id)
		.then(function(tutorialToUpdate){
			tutorialToUpdate.title = req.sanitize('title').escape();
			tutorialToUpdate.description = req.sanitize('description').escape();
			tutorialToUpdate.save()
			.then(function(tutorialToUpdate){
				res.status(200).json(tutorialToUpdate);
			})
			.catch(function(error){
				res.status(500).json(error);
			})
		})
	},

	delete(req, res){
		models.Tutorial.destroy({
			where: {
				id: req.params.id
			}
		})
		.then(function(deletedTutorial){
			res.status(200).json(deletedTutorial);
		})
		.catch(function(error){
			res.status(500).json(error);
		});
	}

}
