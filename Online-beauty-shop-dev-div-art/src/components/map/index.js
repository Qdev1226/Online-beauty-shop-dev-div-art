import React from 'react'
import { compose, withProps } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const AddressMap = compose(
  	withProps({
	    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBh1rd4BCOv3EVuT4ywYlsw6LJMiYpawrw&v=3.exp&libraries=geometry,drawing,places',
	    loadingElement: <div style={{ height: `100%` }} />,
	    containerElement: <div style={{ height: `200px` }} />,
	    mapElement: <div style={{ height: `100%` }} />
  	}),
  	withScriptjs,
  	withGoogleMap
	)(props => (
		<GoogleMap defaultZoom={17} defaultCenter={{ lat:  props.latitude, lng: props.longitude }} options={{disableDefaultUI: true}}>
      		<Marker position={{ lat: props.latitude, lng: props.longitude }}>
      		</Marker>
	  	</GoogleMap>
	))

export default AddressMap



