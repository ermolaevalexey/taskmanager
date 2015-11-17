(function() {
	//Пространство имен
	window.App = {

		Models: {},
		Views: {},
		Collections: {}
	
	};

	App.Models.Task = Backbone.Model.extend({
		defaults: {
			title: '',
			id: '',
			completed: 0
		},
		urlRoot: 'http://localhost:8888/backbone-tuts.loc/laravel/public/tasks'
	});

})();
























