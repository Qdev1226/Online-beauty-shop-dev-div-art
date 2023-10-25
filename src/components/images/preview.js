import React, { Component } from 'react'

class ImagePreview extends Component {
	state = {
		display: 'block'
	}

	handleOnLoad = e => { this.setState({display: 'none'}) }

    render() {
        const image = this.props.image ? this.props.image[0] : ''
        return (
        	<div className={this.props.className}>
	            <img className="rounded img-fluid" style={{display: this.state.display}} src='/assets/images/default-image-square-big.png' alt="" />
        		<img onLoad={this.handleOnLoad} className="rounded img-fluid" src={image.image_url} alt="" />
			</div>
        );
    }
}

export default ImagePreview