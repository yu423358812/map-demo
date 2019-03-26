import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import 'antd/dist/antd.css';
import Geosuggest from 'react-geosuggest';
import {
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow
} from "react-google-maps";
import Geocode from "react-geocode";
import { Row, Col, Button }  from 'antd';
import { 
	HomeWrapper,
	GoogleSearchMap,
	InfoText
} from './style';

const MapWithAMarker = withGoogleMap(props =>
	<GoogleMap
		defaultZoom={12}
		center={{ lat: props.lat, lng: props.lng }}
		onClick={props.setMarker}
		ref={props.onMapMounted}
		onCenterChanged={props.onCenterChanged}
		clickableIcons = {false}
	>
		<Marker
		position={{ lat: props.mLat, lng: props.mLng }}
		>
		{props.isInfoOpen && <InfoWindow onCloseClick={props.onToggleClose}>
			<InfoText>
				<div className="infoAddressText">{props.addressName}</div>
				<div className="infoSaveText"><span className="textUnderline" onClick={props.clickSavedBtn}>Save Address</span></div>
			</InfoText>
		</InfoWindow>}
		</Marker>
	</GoogleMap>
);

class Home extends PureComponent {

	latTemp = 0;
	lngTemp = 0;
	mapRef = {};

	constructor(props){
		super(props);
		Geocode.setApiKey("AIzaSyDOKc8KTWRN4nvoD50wQR3Z13oPa-EqMTs");
	}

	onSuggestSelect = (place) => {
		if(place){
			this.latTemp = place.location.lat;
			this.lngTemp = place.location.lng;
			this.searchPlace(this.latTemp, this.lngTemp);
		}
	}

	render() {
		return (
			<HomeWrapper>
				<Row type="flex" justify="center" align="middle">
					<Col xs={19} sm={19} md={8}>
						<Geosuggest
							placeholder="Search Place"
							initialValue=""
							onSuggestSelect={this.onSuggestSelect}
							location={new window.google.maps.LatLng(40.6944277 -73.9845459)}
							country={['us']}
							radius={20} 
						/>
					</Col>
					<Col xs={5} sm={5} md={3}>
						<Button type="primary" icon="search" className='searchBtn' onClick={() => this.searchPlace(this.latTemp, this.lngTemp)}>Search</Button>
					</Col>
				</Row>
				<GoogleSearchMap>
					<MapWithAMarker
						containerElement={<div style={{ height: `80vh` }} />}
						mapElement={<div style={{ height: `100%` }} />}
						lat = { this.props.lat }
						lng = { this.props.lng }
						mLat = { this.props.mLat }
						mLng = { this.props.mLng }
						addressName = { this.props.addressName }
						setMarker = {(e) => this.setMarker(e.latLng.lat(), e.latLng.lng())}
						onMapMounted = {this.onMapMounted}
						onCenterChanged = {this.onCenterChanged}
						onToggleClose = {() => this.onToggleClose(false)}
						isInfoOpen = {this.props.isInfoOpen}
						clickSavedBtn = {this.clickSavedBtn}
					/>
				</GoogleSearchMap>
			</HomeWrapper>
		)
	}
	componentDidMount() {
		console.log(this.props.lat, this.props.lng);
		console.log(this.props.mLat, this.props.mLng);
		navigator.geolocation.getCurrentPosition((e) => this.searchPlace(e.coords.latitude, e.coords.longitude), this.showError);
		console.log(new window.google.maps.LatLngBounds());
	}

	onMapMounted = (map) => {
		this.mapRef = map;
	}

	onCenterChanged = () => {
		console.log(this.mapRef.getCenter().lat(),this.mapRef.getCenter().lng());
		this.props.changeCenter(this.mapRef.getCenter().lat(),this.mapRef.getCenter().lng());
	}

	searchPlace = (lat, lng) => {
		this.setMarker(lat, lng);
		this.props.changeCenterMarker(lat, lng);
	}

	setMarker = (lat, lng) => {
		this.onToggleClose(true);
		this.props.changeMarker(lat, lng);
		// let latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
		// new window.google.maps.Geocoder().geocode({'location': latlng}, function(results, status) {
		// 	if(status == 'OK'){
		// 		let getAddress = results[0].address_components;
		// 		console.log(getAddress);
		// 		let makeAddress = getAddress[0].long_name + ' ' + getAddress[1].long_name + ' ' + getAddress[2].long_name + ' ' + getAddress[4].long_name + ' ' + getAddress[5].short_name + ' ' + getAddress[6].long_name;
		// 		this.props.setInfoWindow(makeAddress);
		// 	}
		// })
		Geocode.fromLatLng(lat, lng).then(
			response => {
				const address = response.results[0].formatted_address;
				console.log(address);
				this.props.setInfoWindow(address);
			},
			error => {
				console.error(error);
			}
		);
	}

	onToggleClose = (b) => {
		this.props.setInfoOpen(b);
	}
	
	clickSavedBtn = () => {
		this.props.saveToAddressPage(this.props.addressName);
	}

}

const mapStateToProps = (state) => ({
	lat: state.getIn(['home', 'lat']),
	lng: state.getIn(['home', 'lng']),
	mLat: state.getIn(['home', 'mLat']),
	mLng: state.getIn(['home', 'mLng']),
	addressName: state.getIn(['home', 'addressName']),
	isInfoOpen: state.getIn(['home', 'isInfoOpen'])
})

const mapDispathToProps = (dispatch) => {
	return {
		changeCenterMarker(latTemp, lngTemp){
			console.log(latTemp, lngTemp);
			dispatch(actionCreators.changeCenter(latTemp, lngTemp));
			dispatch(actionCreators.changeMarker(latTemp, lngTemp));
		},
		showError(){
			console.log(Error);
		},
		changeMarker(lat, lng){
			console.log(lat, lng);
			dispatch(actionCreators.changeMarker(lat, lng));
		},
		changeCenter(lat, lng){
			dispatch(actionCreators.changeCenter(lat, lng));
		},
		setInfoWindow(address){
			dispatch(actionCreators.setInfoWindow(address));
		},
		setInfoOpen(b){
			dispatch(actionCreators.setInfoOpen(b));
		},
		saveToAddressPage(addressName){
			dispatch(actionCreators.saveToAddressPage(addressName));
		}
	}
};

export default connect(mapStateToProps, mapDispathToProps)(Home);
