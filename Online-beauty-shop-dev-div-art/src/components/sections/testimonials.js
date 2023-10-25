import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getFeedbacks } from 'actions'
import Carousel from 'components/carousel'
import CardTestimonial from 'components/cards/testimonial'

class TestimonialsSection extends Component {
	printList = () => this.props.design.feedbacks.map((item, i) => <CardTestimonial key={i} {...item} />)

	componentWillMount() {
		store.dispatch(getFeedbacks())
	}

    render() {
    	const settings = {
            arrows: false,
            slidesToShow: 3,
            mobileFirst: true,
            swipeToSlide: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 576, 
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        }

        return (
            <div className="bg-white px-3 py-5 mb-5 rounded border">
				<Carousel items={this.printList()} settings={settings} />
			</div>
        )
    }
}

const mapStateToProps = state =>
    ({ 
        design: {
            feedbacks: state.design.feedbacks
        }
    })

export default connect(
    mapStateToProps
)(TestimonialsSection)