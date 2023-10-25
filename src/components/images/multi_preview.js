import React, { Component } from 'react'
import store from 'store'
import { toggleLightBox } from 'actions/design'

class ImageMultiPreview extends Component {

    constructor(props) {
        super(props)
        let first = ''
        let other = []
        if (this.props.images && this.props.images.length) {
            [first, ...other] = this.props.images
        }

        this.state = {
            display: 'block',
            first: first,
            other: other,
            firstKey: 0
        }
    }

	handleOnLoad = e => { this.setState({display: 'none'}) }

    setImage = num => e => {
        this.setState({first: this.props.images[num], firstKey: num})
        store.dispatch(toggleLightBox(false, [], num))
    }

    printSmallPreview = (item, i) => {
        if (i !== this.state.firstKey) {
            const image = item.image_url 
                      ? <img onLoad={this.handleOnLoad} className="img-fluid pointer mb-2" src={item.image_url} alt="" />
                      : <img className="img-fluid mb-1 pointer" src="/assets/images/default-image-square-small.png" alt="" />

            return  <div key={i} onClick={this.setImage(i)}>{ image }</div>
        }
    }

    render() {
        return (
        	<div className={this.props.className}>
                <div className="w-15">
                    { this.props.images.map((item, i) => this.printSmallPreview(item, i)) }
                </div>
                <div className="w-85 px-2 pointer" onClick={this.props.onClick}>
    	            <img className="img-fluid" style={{display: this.state.display}} src='/assets/images/default-image-square-big.png' alt="" />
            		<img onLoad={this.handleOnLoad} className="img-fluid" src={this.state.first.image_url} alt="" />
                </div>
			</div>
        );
    }
}

export default ImageMultiPreview