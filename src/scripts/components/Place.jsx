/* container for a place that you can go in the game */

'use strict';

var React = require('react');
var Router = require('react-router');

var prevStyle;

var Place = React.createClass({
	mixins: [ Router.State ],

	render: function () {

		var name = this.getParams().name || 'entrance';

		var style = require('../../styles/places/' + name + '.useable.css');
		style.use();
		prevStyle && prevStyle.unuse();
		prevStyle = style;

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
