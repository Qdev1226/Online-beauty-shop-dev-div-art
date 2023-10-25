import React, { Component } from 'react'
import store from 'store'
import { toggleLightBox } from 'actions/design'
import Lightbox from 'react-images'
import { connect } from 'react-redux'
import { LIGHTBOX_THEME } from 'config'

class Viewer extends Component {
	closeLightbox = () => {
		store.dispatch(toggleLightBox(false, [], 0))
	}

	gotoNext = () => {
		store.dispatch(toggleLightBox(true, this.props.design.lightbox.img, this.props.design.lightbox.current + 1))
	}

	gotoPrevious = () => {
		store.dispatch(toggleLightBox(true, this.props.design.lightbox.img, this.props.design.lightbox.current - 1))
	}

	render() {
		const { open, img, current } = this.props.design.lightbox
		return (
			<Lightbox
		        images={img}
		        isOpen={open}
		        onClickPrev={this.gotoPrevious}
		        onClickNext={this.gotoNext}
		        currentImage={current}
		        backdropClosesModal={true}
		        theme={LIGHTBOX_THEME}
		        preloadNextImage={false}
		        preventScroll={false}
		        enableKeyboardInput={false}
		        onClose={this.closeLightbox} />
		)
	}
}

const mapStateToProps = state => 
	({
        design: {
        	lightbox: state.design.lightbox,
        }
    })

export default connect(
    mapStateToProps
)(Viewer)