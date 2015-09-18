/* container for a place that you can go in the game */

'use strict';

var React = require('react');
var Router = require('react-router');

var prevStyle;

var Place = React.createClass({
	mixins: [ Router.State ],

	render() {

		var name = this.getParams().name || 'entrance';
    var PlaceInstance = require(`./places/${name}.jsx`);

		var style = require('../../styles/places/' + name + '.useable.css');
		style.use();
		prevStyle && prevStyle.unuse();
		prevStyle = style;

		return <div className="Place">
      <h1>
        {name}
      </h1>
      <PlaceInstance/>
    </div>;
	}
});

module.exports = Place;
