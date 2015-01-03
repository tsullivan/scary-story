/** @jsx React.DOM */

var ReactWebpackApp = require('./ReactWebpackApp');
var React = require('react');
var {DefaultRoute, Route, Routes} = require('react-router');

React.renderComponent((
  <Routes location="history">
    <Route path="/" handler={ReactWebpackApp}>
    </Route>
  </Routes>
), document.getElementById('content'));
