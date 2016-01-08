var s = require('./store');
var React = require('react');
var Provider = require('react-redux').Provider;
var render = require('react-dom').render;

require("react-tap-event-plugin")();


var AppView = require('./views/AppView');
var LoginView = require('./views/LoginView');
var DashView = require('./views/DashView');
var VenuesView = require('./views/VenuesView');
var ShowsView = require('./views/ShowsView');



var Router = require('react-router').Router
var Route = require('react-router').Route


var routes = (
	<Route path="/" component={AppView}>
		<Route path="login" component={LoginView}></Route>
		<Route path="dash" component={DashView}></Route>
		<Route path="venues" component={VenuesView}></Route>
		<Route path="shows" component={ShowsView}></Route>
	</Route>	
)

var pushPath = require('redux-simple-router').pushPath


//try auto login.
s.getProfile(function(succ){

	if(!succ){
		s.store.dispatch(pushPath('/login'))
	}else{
		if(s.store.getState().routing.path == '/'){
			s.store.dispatch(pushPath('/dash'))
		}
	}

	render(
		<Provider store={s.store}>
			<Router history={s.history} routes={routes} />
		</Provider>
		,document.getElementById('sgcms')
	)

})