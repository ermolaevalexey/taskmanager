(function() {
	//Пространство имен
	window.App = {

		Models: {},
		Collections: {},
		Views: {},
		Router: {}//Позволяет настраивать пути приложения
	
	};

	//шаблон
	window.template = function(id) {
		
		  return _.template( $('#' + id).html() );

	};

	App.Router = Backbone.Router.extend({

		routes: {

			''               		 : 'index',
			'page/:id/*simbo'		 : 'page',
			'search/:query'  		 : 'search',
			'*other'			     : 'default'

		},

		index: function () {
			console.log('Всем привет от индексного роута!')
		},
		page: function(id, simbo) {
			//console.log('Это роут page ' + id);
			console.log(simbo);
		},
		search: function(query) {
			
		},
		default: function(other) {
			alert('Хмм, вы уверены, что попали куда хотели? Вы находитесь на роуте ' + other);
		}


	});

	new App.Router();
	Backbone.history.start();

})();
























