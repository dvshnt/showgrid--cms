var React = require('react');
var connect = require('react-redux').connect;

var TextField = require('material-ui/lib/text-field').default;
var Card = require('material-ui/lib/card/card').default;
var CardActions = require('material-ui/lib/card/card-actions').default;
var RaisedButton = require('material-ui/lib/raised-button').default;
var Paper = require('material-ui/lib/paper').default;
var CardHeader = require('material-ui/lib/card/card-header').default;
var s = require('../store.js');
var Snackbar = require('material-ui/lib/snackbar').default;
var RefreshIndicator = require('material-ui/lib/refresh-indicator').default;
var pushPath = require('redux-simple-router').pushPath;

var LoginView = React.createClass({
	getInitialState: function(){
		return {
			user_error: null,
			pass_error: null,
			disabled: false
		}
	},

	login: function(){
		s.login({
			user: this.refs.user.getValue(),
			pass: this.refs.pass.getValue(),
		})
	},

	checkUser: function(e){
		this.setState({
			user_error: this.refs.user.getValue() ? null : 'username required',
		})
	},

	checkPass: function(e){
		this.setState({
			pass_error: this.refs.pass.getValue() ? null : 'password required',
		})
	},

	close: function(){
		s.store.dispatch({type:'RESET_USER'})
	},

	shouldComponentUpdate:function(props,state){
	//	console.log("UPDATE LOGIN",props);
		if(props.user){
			s.store.dispatch(pushPath('/dash'));
			return false
		}
		// if(this.props.loading){

		// }
		// //console.log("LOGIN ERROR",props,state);
		// if(this.props.error != props.error){

		// // 	state.login_error = props.error
		// }
		return true;
	},


	render: function(){
		var loading = null;
		return (
			<div className='login-view'>
				<Card>
					<CardHeader subtitle="Showgrid CMS"/>
					<CardActions className='login-fields'>
						<TextField disabled={this.props.loading} onBlur={this.checkUser} errorText={this.state.user_error} hintText="Enter Username" floatingLabelText="Username" ref="user" />
						<TextField disabled={this.props.loading} onBlur={this.checkPass} errorText={this.state.pass_error} hintText="Enter Password" floatingLabelText="Password" type="password" ref="pass" />
					</CardActions>
					<CardActions className='login-button-container'>
						<RaisedButton disabled={this.props.loading} label="Login" primary={true} onTouchTap={this.login} />
					</CardActions>
				</Card>
				<Snackbar
					open={this.props.error}
					message={"Login failed"}
					autoHideDuration={1000}
					onRequestClose={this.close} />
					
			</div>
		)
	}
})

function select(state){
	return {
		user: state.app.user,
		loading: state.app.loading_user,
		error : state.app.login_error
	}
}

module.exports = connect(select)(LoginView);


