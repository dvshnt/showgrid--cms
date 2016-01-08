var React = require('react');
var connect = require('react-redux').connect;
var s = require('../store');
var NavBar = require('../parts/NavBar');
var pushPath = require('redux-simple-router').pushPath;

var AppView = React.createClass({
	componentDidMount: function(){
		
	},
	// shouldComponentUpdate: function(props,state){
	// 	if(!props.user){
			
	// 		return false;
	// 	}
	// 	return true;
	// },
	render: function(){
		return (
			<div className='admin-view' style={{marginLeft: this.props.user ? '250px' : '0px'}}>
				<NavBar open={this.props.user != null ? true : false}/>
				{this.props.children}
			</div>
		)
	}
})

function select(state){
	return {
		loading: state.app.loading,
		user: state.app.user
	}
}

module.exports = connect(select)(AppView);