import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from './store';
import 'antd/dist/antd.css';
import { Menu, Icon }  from 'antd';
import {
	HeaderWrapper
} from './style';

class Header extends Component {

	render() {
		return (
			<HeaderWrapper>
				<Menu
					onClick = {(e) => this.props.handleChangePage(e, this.props.selectedPage)}
					selectedKeys = {[this.props.selectedPage]}
					mode = "horizontal"
				>
					<Menu.Item key="home">
						<Icon type="home" theme="filled" />
						<Link to='/'>HOME</Link>
					</Menu.Item>
					<Menu.Item key="saved">
						<Icon type="folder-open" theme="filled" />
						<Link to='/saved'>SAVED</Link>
					</Menu.Item>
				</Menu>
			</HeaderWrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		selectedPage: state.getIn(['header', 'selectedPage']),
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		handleChangePage(e, selectedPage){
			if(e.key !== selectedPage){
				dispatch(actionCreators.changePage(e.key));
			}
		}
	}
}

export default connect(mapStateToProps, mapDispathToProps)(Header);
