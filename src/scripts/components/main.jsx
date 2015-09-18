var React = require('react');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var Inventory = require('./Inventory');
var Place = require('./Place');

var App = React.createClass({
	mixins: [ Router.State ],

	render: function () {
		var name = this.getRoutes().reverse()[0].name; // get the final route
		var param = this.getParams().name; // get the param of the route
		var transitionGroupKey = (name && param) ? name + param : name; // needed for transition control

    // "example" transition is defined in main.css
		return (
			<div>
				<ul>
					<li><Link to="place" params={{name: "entrance"}}>Entrance</Link></li>
					<li><Link to="place" params={{name: "cathedral"}}>Cathedral</Link></li>
					<li><Link to="place" params={{name: "stables"}}>Stables</Link></li>
					<li><Link to="place" params={{name: "graveyard"}}>Graveyard</Link></li>
				</ul>

				<TransitionGroup component="div" transitionName="example">
					<RouteHandler key={transitionGroupKey}/>
				</TransitionGroup>

				<Inventory/>
			</div>
		);
	}
});

// there could also be routes for or score board, map, history or dedicated route for inventory
var routes = (
	<Route handler={App}>
		<Route name="start" path="/" handler={Place}/>
		<Route name="place" path="place/:name" handler={Place}/>
	</Route>
);

Router.run(routes, function (Handler) {
	React.render(<Handler/>, document.getElementById('application'));
});
