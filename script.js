$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
});

//-----------------------------------------

var Users = Backbone.Collection.extend({
	url: "/users"
});

var UserList = Backbone.View.extend({
	el: ".page",
	render: function() {
		var self = this;
		var users = new Users();
		users.fetch({
			success: function(users) {
				console.log(users);
				var template = _.template($("#user-list-template").html(), {users: users.models});
				self.$el.html(template);
			}
		});
	}
});

var userList = new UserList();

var Router = Backbone.Router.extend({
	routes: {
		"": "home"
	}
});

var router = new Router();
router.on("route:home", function() {
	console.log("this is the home page");
	userList.render();
});

Backbone.history.start();