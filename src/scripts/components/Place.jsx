'use strict';

var React = require('react');
var Router = require('react-router');

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

module.exports = Place;
