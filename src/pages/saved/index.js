import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { Table, Divider, Tag } from 'antd';
import { 
	SavedWrapper
} from './style';

const { Column } = Table;

// const columns = [{
// 	title: 'Address',
// 	dataIndex: 'address',
// 	key: 'address',
//   }, {
// 	title: 'Action',
// 	key: 'action',
// 	render: (text, record) => (
// 	  <span>
// 			<a onClick={props.deleteAddress}>Delete {record.key}</a>
// 	  </span>
// 	),
//   }];

class Saved extends PureComponent {
	
	render() {
		return (
			<SavedWrapper>
				<Table dataSource={this.props.addresses.toJS()}>
					<Column
						title = 'Address'
						dataIndex = 'address'
						key = 'address'
					/>
					<Column
						title = 'Action'
						key = 'action'
						render = {(text, record) => (
							<span>
								<a onClick={() => this.deleteAddress(record.key)}>Delete</a>
							</span>
						)}
					/>
				</Table>
			</SavedWrapper>
		)
	}

	deleteAddress = (key) => {
		let tem = this.props.addresses.toJS();
		let temCopy = tem.slice(0,tem.length);
		temCopy.splice(key,1);
		console.log(temCopy);
		if(temCopy.length > 0){
			for(let i=0; i< temCopy.length; i++){
				temCopy[i].key = i;
			}
		}
		this.props.deleteAddress(temCopy);
	}

}

const mapState = (state) => ({
		addresses: state.getIn(['saved', 'addresses']),
});

const mapDispatch = (dispatch) => {
	return {
		deleteAddress(temCopy){
			console.log(temCopy);
			dispatch(actionCreators.deleteAddress(temCopy));
		}
	}
};

export default connect(mapState, mapDispatch)(Saved);
