//Создаем пространство имен

(function() {

	window.App = {

		Models: {},
		Views: {},
		Collections: {}

	};

	//Хелпер шаблона
	window.template = function(id) {

		return _.template( $('#' + id).html() );
	
	}
	
//Модель человека
App.Models.Person = Backbone.Model.extend({
	defaults: {
		name: 'Aleshka',
		age: 24,
		job: 'web developer'
	}
});

var person = new App.Models.Person();

//Список людей
App.Collections.People = Backbone.Collection.extend({
	model: App.Models.Person
});


//Вид списка людей
App.Views.People = Backbone.View.extend({
	tagName: 'ul',

	initialize: function() {
		//console.log(this.collection);
	},

	render: function() {
		//1 создать Для каждого элемента свой personView
		this.collection.each(function(person) {

			 var personView = new App.Views.Person({model: person});

			 this.$el.append(personView.render().el);

		}, this);
		//2 вставить в главный тег ul (this.$el)
		return this;
	}
});

//Вид одного человека
App.Views.Person = Backbone.View.extend({

	tagName: 'li',

	// Первый способ шаблонизации template: _.template($('#person-id').html() ),
	template: ( template('person-id') ),	//Второй способ шаблонизации

	initialize: function () {
		this.render();
	},

	render: function() {

		this.$el.html( this.template(this.model.toJSON() ) );

		return this;
	}
});

//var person = new Person;
//var personView = new PersonView({model: person}); это для одной персоны генерируем

var peopleCollection = new App.Collections.People([//много персон в массиве
	{
		name: 'Иван',
		age: 23,
		job: 'Таксист'
	},
	{
		name: 'Анна',
		age: 20,
		job: 'Студентка'
	},
	{
		name: 'Павел',
		job: 'Строитель'
	}
]);

var peopleView = new App.Views.People({ collection: peopleCollection});

$(document.body).append(peopleView.render().el);






}());