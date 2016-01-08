var React = require('react');
var connect = require('react-redux').connect;


var adminView = React.createClass({
	
	render: function(){
		return (
			<div className='dash-view'>
				DASH VIEW
			</div>
		)
	}
})


function select(){
	return {}
}
module.exports = connect(select)(adminView);