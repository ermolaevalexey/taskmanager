(function() {
	//Пространство имен
	window.App = {

		Models: {},
		Collections: {},
		Views: {},
		Router: {}//Позволяет настраивать пути приложения
	
	};

	var vent = _.extend({}, Backbone.Events);

	console.log(vent);

	App.Views.SpecialTasks = Backbone.View.extend({

		initialize: function() {
			vent.on('specialTasks:show', this.show, this);
		},
		show: function(id) {
			 //console.log('Выведем задачу с id: ' + id);
			 var specialTask = this.collection.get('id');
			 var specialTaskView = new App.Views.specialTask({model: specialTask});
			 $('body').append(specialTaskView.render().el);
		}

	});

	App.Router = Backbone.Router.extend({

		routes: {

			'': 'start',
			'specialTasks/:id' : 'showSpecialTasks'

		},

		showSpecialTasks: function(id) {
			//console.log(id);
			vent.trigger('specialTasks:show', id);
		},

		start: function() {
			console.log('Стартовая страница');
		}

	});

	new App.Views.SpecialTasks({collection: someCollection});

	new App.Router();
	Backbone.history.start();

})();
























