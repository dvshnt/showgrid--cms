var React = require('react');
var connect = require('react-redux').connect;
var s = require('../store');

var LeftNav = require('material-ui/lib/left-nav').default;
var MenuItem = require('material-ui/lib/menus/menu-item').default;
var SelectField = require('material-ui/lib/SelectField').default;
var ThemeManager = require('material-ui/lib/styles/theme-manager').default;
var DarkTheme = require('material-ui/lib/styles/raw-themes/dark-raw-theme').default;

var ListItem = require('material-ui/lib/lists/list-item').default;
var List = require('material-ui/lib/lists/list').default;
var SelectableList = require('material-ui/lib/hoc/selectable-enhance').default(List);
var Divider = require('material-ui/lib/divider').default;
var IconButton = require('material-ui/lib/icon-button').default;

var s = require('../store');

var NavBar = React.createClass({
	getDefaultProps(){
		return {
			open: false,
			view_index: 1,
		}
	},

	getInitialState(){
		return {
			view_index: 1
		}
	},

	childContextTypes : {
		muiTheme: React.PropTypes.object,
	},

	getChildContext() {
		return {
		  muiTheme: ThemeManager.getMuiTheme(DarkTheme),
		};
	},

	// shouldComponentUpdate(props,state){
	// 	return true
	// },

	navigateView(e,index) {
		s.navigateViewIndex(index);
	},

	render() {
	
		return (
			<LeftNav open={this.props.open} className='admin-nav' width={250}>
				<div className='admin-nav-top'>
					<div className='admin-logo' />	
					<SelectField style={{width:'70%'}} value={1} onChange={this.setCity}>
						<MenuItem value={1} primaryText="Nashville"/>
						<MenuItem value={2} primaryText="NYC"/>
						<MenuItem value={3} primaryText="Seattle"/>
					</SelectField>
				</div>
				<SelectableList valueLink={{value: this.props.view_index, requestChange: this.navigateView}}>
					<ListItem value={1} primaryText="Dash" />
					<ListItem value={2} primaryText="Shows" />
					<ListItem value={3} primaryText="Venues" />
					<Divider />
				</SelectableList>
				<div className='logout-button'>
					<IconButton onTouchTap={s.logout} iconClassName="icon-off" tooltip="logout" tooltipPosition="top-center"/>
				</div>	
			</LeftNav>		
		)
	}
})


var select = function(state){
	return {
		view_index: state.app.view_index
	}
}


module.exports = connect(select)(NavBar);



