var React = require('react');
var connect = require('react-redux').connect;
var NavBar = require('../parts/NavBar');
var VenueList = require('../parts/VenueList');
var adminView = React.createClass({
	render: function(){
		return (
			<div className='admin-view'>
				<NavBar/>
				<VenueList/>
			</div>
		)
	}
})


function select(){
	return {}
}
module.exports = connect(select)(adminView);