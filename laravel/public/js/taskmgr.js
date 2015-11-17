$(function() {
	//Пространство имен
	window.App = {

		Models: {},
		Collections: {},
		Views: {}
	
	};

	//шаблон
	window.template = function(id) {
		
		  return _.template( $('#' + id).html() );

	};
	//Создаем классы модели и представления для менеджера задач
	App.Models.Task = Backbone.Model.extend({
		//Валидируем имена
		validate: function(attrs) {
			if ( ! $.trim(attrs.title) ) {
			return 'Имя задачи должно быть валидным!';
			}
		}

	});
	App.Views.Task = Backbone.View.extend({

		initialize: function() {
			this.model.on( 'change', this.render, this );
			this.model.on( 'destroy', this.remove, this);
		},
		tagName: 'li',
		template: template('taskTemplate'),
		render: function() {

			var template = this.template(this.model.toJSON());
			this.$el.html( template );
			//this.$el.html( this.model.get('title') );
			return this;

		},

		events: {
				'click .edit': 'editTask',
				'click .delete': 'destroy'
		},

		destroy: function() {
			this.model.destroy();
			console.log(tasksCollection);
		},

		remove: function() {
			this.$el.remove();
		},

		editTask: function() {
			
		  var newTaskTitle = prompt('Как переименуем задачу?', this.model.get('title'));
		  this.model.set({'title': newTaskTitle}, {validate: true});
		  console.log(newTaskTitle);

		}

	});

	//Создадим коллекцию моделей, у нас же много задач
	App.Collections.Task = Backbone.Collection.extend({

		model: App.Models.Task

	});

	App.Views.Tasks = Backbone.View.extend({

		tagName: 'ul',
		initialize:function(){
			this.collection.on('add', this.addOne, this);
		},
		render: function() {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function(task) {
			// создаем новый дочерний вид
			var taskView = new App.Views.Task({ model: task });
			// добавляем его в корневой элемент
			this.$el.append(taskView.render().el);
		}

	});

	App.Views.AddTask = Backbone.View.extend({

		el: '#AddTask',
		events: {
			'submit': 'submit'
		},
		initialize: function() {
			console.log(this.el.innerHTML);
		},
		submit: function(e) {
			e.preventDefault();
			var newTaskTitle = $(e.currentTarget).find('input[type="text"]').val();
			var newTask = new App.Models.Task({title: newTaskTitle});
			console.log(newTask);
			this.collection.add(newTask);
		}

	});

	window.tasksCollection = new App.Collections.Task([

		{
			title: 'Сходить в магазин',
			priority: 4
		},

		{
			title: 'Получить почту',
			priority: 1
		},

		{
			title: 'Сходить на работу',
			priority: 2
		}

	]);

	//Создадим вид для выводя всех трех моделей

	var tasksView = new App.Views.Tasks({

		collection: tasksCollection

	});

	$('.tasks').html(tasksView.render().el);

	var addTaskView = new App.Views.AddTask({collection: tasksCollection});

});















