var React = require('react');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


var App = React.createClass({
	mixins: [ Router.State ],

	render: function () {
		require('../../styles/example-transition.less');

		var name = this.getRoutes().reverse()[0].name;

		return (
			<div>
				<ul>
					<li><Link to="place" params={{name: "entrance"}}>Entrance</Link></li>
					<li><Link to="place" params={{name: "cathedral"}}>Cathedral</Link></li>
					<li><Link to="place" params={{name: "stables"}}>Stables</Link></li>
					<li><Link to="place" params={{name: "graveyard"}}>Graveyard</Link></li>
					<li><Link to="inventory">Inventory</Link></li>
				</ul>

				<div>
					<TransitionGroup component="div" transitionName="example">
						<RouteHandler key={name}/>
					</TransitionGroup>
				</div>
			</div>
		);
	}
});

var Place = React.createClass({
	mixins: [ Router.State ],

	render: function () {
		var name = this.getParams().name;

		return (
			<div className="Place">
				<h1>
					{name}
				</h1>
			</div>
		);
	}
});

var inventory = ['hello', 'world', 'click', 'me'];

var Inventory = React.createClass({
	getInitialState: function () {
		return {items: inventory};
	},
	handleAdd: function () {
		var newItems = this.state.items.concat([prompt('Enter some text')]);
		this.setState({items: newItems});

		// persistence
		inventory = newItems;
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
			<div className="Inventory">
				<button onClick={this.handleAdd}>Add Item</button>
				<TransitionGroup transitionName="example">
					{items}
				</TransitionGroup>
			</div>
		);
	}
});

var routes = (
	<Route handler={App}>
		<Route name="inventory" path="inventory" handler={Inventory}/>
		<Route name="place" path="place/:name" handler={Place}/>
	</Route>
);

Router.run(routes, function (Handler) {
	React.render(<Handler/>, document.getElementById('example'));
});
