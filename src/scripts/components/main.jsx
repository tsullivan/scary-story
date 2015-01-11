var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

require('../../styles/normalize.css');
require('../../styles/main.css');
require('../../styles/fade-transition.css');
require('../../styles/example-transition.css');

var todoItems = ['hello', 'world', 'click', 'me'];

var App = React.createClass({
	render: function () {
		return (
			<div>
				<ul>
					<li><Link to="user" params={{userID: "123"}}>Bob</Link></li>
					<li><Link to="user" params={{userID: "123"}} query={{showAge: true}}>Bob With Query Params</Link></li>
					<li><Link to="user" params={{userID: "abc"}}>Sally</Link></li>
					<li><Link to="todos">Todo List</Link></li>
				</ul>
				<ReactTransitionGroup transitionName="fade">
					<RouteHandler/>
				</ReactTransitionGroup>
			</div>
		);
	}
});

var User = React.createClass({
	mixins: [ Router.State ],

	render: function () {
		var age = this.getQuery().showAge ? '33' : '';
		var userID = this.getParams().userID;
		return (
			<div className="User">
				<h1>User id: {userID}</h1>
				{age}
			</div>
		);
	}
});

var TodoList = React.createClass({
	getInitialState: function () {
		return {items: todoItems};
	},
	handleAdd: function () {
		var newItems = this.state.items.concat([prompt('Enter some text')]);
		this.setState({items: newItems});

		// persistence
		todoItems = newItems;
	},
	handleRemove: function (i) {
		var newItems = this.state.items;
		newItems.splice(i, 1);
		this.setState({items: newItems});
	},
	render: function() {
		var items = this.state.items.map(function(item, i) {
			return (
				<div key={item} onClick={this.handleRemove.bind(this, i)}>
					{item}
				</div>
			);
		}.bind(this));
		return (
			<div>
				<button onClick={this.handleAdd}>Add Item</button>
				<ReactCSSTransitionGroup transitionName="example">
					{items}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

var routes = (
	<Route handler={App}>
		<Route name="user" path="user/:userID" handler={User}/>
		<Route name="todos" path="todos" handler={TodoList}/>
	</Route>
);

Router.run(routes, function (Handler) {
	React.render(<Handler/>, document.getElementById('example'));
});
