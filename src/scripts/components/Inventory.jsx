'use strict';

var React = require('react');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var inventory = ['lantern', 'can of oil'];

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
				<h2>Inventory</h2>
				<TransitionGroup transitionName="example">
					{items}
				</TransitionGroup>
				<button onClick={this.handleAdd}>Add Item</button>
			</div>
		);
	}
});

module.exports = Inventory;
