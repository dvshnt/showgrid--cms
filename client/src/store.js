var req = require('superagent');
var redux = require('redux');
var _uniq = require('lodash/array/uniq');
var createStore = require('redux').createStore;
var merge = Object.assign;

const default_state = {
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


function auth(){

}



function manager(state, action){
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
	}
	return state
}


var store = createStore(manager,default_state);
window.store = store //debug

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

function getProfile(cb){
	return req.get('/data/db/user/profile')
	.set('Accept', 'application/json')
	.end(function(err,res){
		console.log("GOT PROFILE",res.body)
		if(res.body && res.body.profile){
			store.dispatch({type: 'SET_USER',user : res.body.profile});	
		}
		cb();
	})
}






module.exports = {
	store: store,
	login: login,
	getProfile: getProfile
}



