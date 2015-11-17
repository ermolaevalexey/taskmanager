var Person = Backbone.Model.extend({
	defaults: {
		name: 'Иван Петров',
		age: 40,
		job: 'слесарь'
	},//Расширяем модель

//Функция валидации
	validate: function( attrs ) {
		console.log(attrs);

		if ( attrs.age <= 0 ) {
			return "Возраст должен быть положительным!";//если возраст отрицательный
		}

		if (! attrs.name ) {
			return "Имя, сесчра, имя!";//если имя не задано
		}
	}, 

	work: function() {
		  return this.get('name') + ' is working.'
	}
});