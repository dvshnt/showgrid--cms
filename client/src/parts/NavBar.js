var React = require('react');
var LeftNav = require('material-ui/lib/left-nav').default;
var MenuItem = require('material-ui/lib/menus/menu-item').default;
var SelectField = require('material-ui/lib/SelectField').default;
var ThemeManager = require('material-ui/lib/styles/theme-manager').default;
var DarkTheme = require('material-ui/lib/styles/raw-themes/dark-raw-theme').default;
var NavBar = React.createClass({
	childContextTypes : {
		muiTheme: React.PropTypes.object,
	},

	getChildContext() {
		return {
		  muiTheme: ThemeManager.getMuiTheme(DarkTheme),
		};
	},
	render: function(){
		return (
			<LeftNav open={true} className='admin-nav' width={300}>
				<div className='admin-nav-top'>
					<div className='admin-logo' />	
					<SelectField style={{width:'70%'}} value={1} onChange={this.setCity}>
						<MenuItem value={1} primaryText="Nashville"/>
						<MenuItem value={2} primaryText="NYC"/>
						<MenuItem value={3} primaryText="Seattle"/>
					</SelectField>
				</div>
				
				<MenuItem>New</MenuItem>
				<MenuItem>Shows</MenuItem>
				<MenuItem>Venues</MenuItem>
			</LeftNav>		
		)
	}
})		

module.exports = NavBar;