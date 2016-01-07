var express = require('express');
var router = express.Router();
var cfg = require('./config');
var request = require('request');
var colors = require('colors');
var session = require('express-session');
var cookieParser = require('cookie-parser');


function login(req,res,next){

	console.log("LOGIN",req.body);

	//console.log("LOGIN".bold.yellow,req.body)
	if(req.body && req.body.user != null && req.body.pass != null){
		var auth = {
			'user': req.body.user,
			'pass': req.body.pass,	
		}
	}else if(req.body && req.body.token != null){
		var auth = {
			'bearer': req.body.token
		}		
	}else{
		return res.status(500).json({status:"bad_query"});
	}

	request.post({
		url:cfg.db_url+'/login',
		'auth':auth,
		json:true,
		body: {
			password: req.body.pass,
			username: req.body.user
		}
	},function(err,db_res,body){


		if(body.token){
			req.token = body.token;
			setUser(req,res);
			console.log("REDIRECT TO PROFILE");
		}	
		else res.status(403).json({status:"bad_login"});
	})
}

function setUser(req,res){
	console.log("GET PROFILE",req.token);
	if(!req.token){
		res.status(403).json({status:"bad_login"});
	}else{
		console.log("GET DB USER W/ TOKEN",req.token)
		request.get({
			url:cfg.db_url+'/user/profile',
			headers:{
				'Authorization':'Token '+req.token
			},
			json:true
		},function(err,db_res,body){
			if(err) res.status(500).json({status:"bad_user"});
			console.log("GOT USER",body);
			if(body.profile && body.profile.is_admin){
				req.session.token = req.token;
				res.json({user:body.profile});
			}else res.status(403).json({status:"bad_user"});
		})
	}
}



router

//login


//auth
.use('/*',function(req,res,next){
	console.log("SEESION :".bold.cyan,req.session);
	//console.log(,req.session.token);
	if(req.session == null || req.session.token == null) return res.status(403).json({status:"failed_auth"});
	next();
})


//api proxy
.use('/api',function(req,res){
	var url = cfg.api_url + req.url;
	console.log(("API ["+String(req.method)+"]").bold.cyan,url.yellow)
	req.pipe(request({
		url: url,
		headers: {
			Origin:  'showgrid.com',
			Referrer:  'showgrid.com',
		}
	})).pipe(res);	
})

//db proxy
.use('/db',function(req,res){

	var url = cfg.db_url+req.url

	console.log(("DB ["+String(req.method)+"]").bold.yellow,url.yellow);

	req.pipe(request({
		url: url,
		headers: {
			Origin:  'showgrid.com',
			'Authorization': 'Token '+req.session.token,
			Referrer:  'showgrid.com',
		}
	})).pipe(res);
})


function test(){
	request.get(cfg.db_url+'/version',function(err,res,body){
		if(body == cfg.db_version) var v = String(body).bold.green;
		else var v = String(body).bold.red;

		console.log(('DB : '+cfg.db_url).bold.cyan,v);
		if(body != cfg.db_version) throw 'db version mismatch'
		
	})
	request.get(cfg.api_url+'/version',function(err,res,body){
		if(body == cfg.api_version) var v = String(body).bold.green;
		else var v = String(body).bold.red;
		console.log(('API : '+cfg.api_url).bold.yellow,v);
		if(body != cfg.api_version) throw 'api version mismatch'
	})
}


module.exports = function(app){
	app.use(cookieParser());
	app.use(session({
		secret: '1823h*dla834710ja#fj10',
		resave: false,
		saveUninitialized: false,
	}));
	app.post('/login',login);
	app.use('/data',router);
	test(); //test db connections and versions
}