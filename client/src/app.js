var s = require('./store');
var React = require('react');
var react_redux = require('react-redux');
var Provider = react_redux.Provider;
var render = require('react-dom').render;

var connect = react_redux.connect;


var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


var CircularProgress = require('material-ui/lib/circular-progress').default;

var s = require('./store');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var browserHistory = require('react-router').browserHistory;



var LoginView = require('./views/LoginView');
var AdminView = require('./views/AdminView');

var App = React.createClass({

	componentDidMount: function(){
		
	},
	render: function(){	
		if(this.props.loading) start_view = <CircularProgress mode="indeterminate" size={1.5} />

		if (!this.props.user){
			start_view = <LoginView/>
		}else{
			start_view =  <AdminView/>
		}
		return start_view
	}
})



function select(state){
	return {
		loading: state.loading,
		user: state.user
	}
}


var BoundApp = connect(select)(App);


function init(){
	return (
		<Router history={browserHistory}>
			<Route path="/" component={loginView}>
			</Route>
		</Router>
	)
}

s.getProfile(function(){
	render(
		<Provider store={s.store}>
			<BoundApp/>
		</Provider>,document.getElementById('sgcms')
	);	
})



