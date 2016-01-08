var req = require('superagent');
var redux = require('redux');
var _uniq = require('lodash/array/uniq');
var createStore = require('redux').createStore;
var merge = Object.assign;


var combineReducers = require('redux').combineReducers;
//history
var createHistory = require('history').createHistory
var routeReducer = require('redux-simple-router').routeReducer;
var syncReduxAndRouter = require('redux-simple-router').syncReduxAndRouter;
var applyMiddleware = require('redux').applyMiddleware;
var pushPath = require('redux-simple-router').pushPath;
//default state
const default_state = {
	app: {
		view_index:1,
		user: null,
		loading_user: false,
		login_error: false,
		events: { //event filters.
			price: [],
			recent: [],
			venue: [],
		},
		venues: { //venue filters
			active: [],
			events: [],
		}		
	}

}

var UPDATE_PATH = require('redux-simple-router').UPDATE_PATH

// REDUCER
function mainReducer(state, action){
	var n = {};
	var nstate = {};
	if ( !state ) return default_state
  
  	switch (action.type) {
  		case 'RESET_USER':
  			console.log("RESET USER")
 			return merge(n,state,{
				loading_user: false,
				login_error: false,
				user: null
			});
  			break; 
  		case 'GET_USER': 
  			console.log("GET USER")
  			return merge(n,state,{
				loading_user: true,
				login_error: false,
			});
			break;

  		case 'SET_USER':
			return merge(n,state,{
				loading_user: false,
				login_error: action.user ? false : true,
				user: action.user
			});
  			break;

  		case 'SET_VIEW_INDEX':
  			return merge(n,state,{
				view_index: action.index
			});
  			break;			
	}
	return state
}




 










function getCity(city){
	switch(city){
		case 'Nashville':
		default:
			store.dispatch({
				type: 'GET_CITY_VENUES',
			})
			break;
	}
}

function login(opt){
	store.dispatch({type: 'GET_USER'});	

	if(!opt.user && !opt.token && !opt.pass){
		store.dispatch({type: 'SET_USER'})	
	}
	console.log(opt.user,opt.pass)
	return req.post('/login').send({
		user: opt.user,
		pass: opt.pass,
	})
	.set('Accept', 'application/json')
	.end(function(err,res){
		console.log("LOGIN RETURNED",err,res)
		store.dispatch({type: 'SET_USER',user : res.body.user});	
	})
}

function logout(){
	console.log("LOGOUT")
	return req.post('/logout').end(function(){
		store.dispatch({type: 'RESET_USER'});
		store.dispatch(pushPath('/login'));
	})
}

function getProfile(cb){
	return req.get('/data/db/user/profile')
	.set('Accept', 'application/json')
	.end(function(err,res){
		console.log("GOT PROFILE",res.body)
		if(res.body && res.body.profile){
			store.dispatch({type: 'SET_USER',user : res.body.profile});
			cb(true);
		}else{
			cb(false)
		}
	})
}


function getDBVenues(){

}

function getAPIVenues(){

}

function getRecentAPIShows(){

}


function checkRoute(opt){
	return function(next){
		return function(action){
			if(action.type == UPDATE_PATH && action.payload.path != '/login' && !opt.getState().app.user){
				return next(pushPath('/login'));
			}
			if(action.type == UPDATE_PATH){
				var i = 0;
				switch(action.payload.path){
					case '/dash':
						i = 1;
						break;
					case '/shows':
						i = 2;
						break;
					case '/venues':
						i = 3;
						break;					
				}
				if(i){
					//console.log("SET VIEW INDEX");
					store.dispatch({type:'SET_VIEW_INDEX',index:i});
				}
				return next(action);
			}
			return next(action);
		}
	}
	//return dispatch()
}
//INIT/EXPORT


var reducer = combineReducers({
	app: mainReducer,
	routing: routeReducer
})

var createSafeStore = applyMiddleware(checkRoute)(createStore);

var store = createSafeStore(reducer,default_state);
var history = createHistory()

syncReduxAndRouter(history, store)

function navigateViewIndex(index){
	switch(index){
		default:
		case 1:
			store.dispatch(pushPath('/dash'));
			break;
		case 2:
			store.dispatch(pushPath('/shows'));
			break;
		case 3:
			store.dispatch(pushPath('/venues'));	
			break;
	}
}

window.store = store //debug

module.exports = {
	history: history,
	store: store,
	login: login,
	logout: logout,
	navigateViewIndex: navigateViewIndex,
	getProfile: getProfile,
	getDBVenues: getDBVenues,
	getAPIVenues: getAPIVenues,
	getRecentAPIShows: getRecentAPIShows
}



