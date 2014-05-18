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

//------------------------

var EditUser = Backbone.View.extend({
	el: ".page",
	render: function() {
		var self = this;
		var template = _.template($("#edit-user-template").html(), {});
		self.$el.html(template);
	}
});

var editUser = new EditUser();

var Router = Backbone.Router.extend({
	routes: {
		"": "home",
		"new": "editUser"
	}
});

var router = new Router();
router.on("route:home", function() {
	console.log("this is the home page");
	userList.render();
});

router.on("route:editUser", function() {
	console.log("edit user form");
	editUser.render();
});

Backbone.history.start();