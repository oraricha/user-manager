$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
});

$.fn.serializeObject = function()
{
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

//-----------------------------------------

var Users = Backbone.Collection.extend({
	url: "/users"
});

var User = Backbone.Model.extend({
	urlRoot: "/users"
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
	},
	events: {
		"submit .edit-user-form": "saveUser"
	},
	saveUser: function(event) {
		var userData = $(event.currentTarget).serializeObject();
		console.log(userData);
		var user = new User();
		user.save(userData, {
			success: function(data) {
				console.log("server returned: ");
				console.log(data);
				router.navigate("", {trigger: true});
			}
		});
		return false; // prevent form submitting (and any other native browser behavior after submit if any)
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