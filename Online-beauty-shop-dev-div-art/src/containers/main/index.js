import React, { Component } from 'react'
import store, { history } from 'store'
import { getCategories } from 'actions'
import BtnGroup from 'components/buttons/btn_group'
import { connect } from 'react-redux'
import Carousel from 'components/carousel'
import MainSection from 'components/sections/main'
import BlogSection from 'components/sections/blog'
import TestimonialsSection from 'components/sections/testimonials'
import { toggleLinkList } from 'actions/design'

class Main extends Component {

	toggleCat = item => e => {
		store.dispatch(toggleLinkList(item))
	}

	componentWillMount() {
		store.dispatch(getCategories())
		if (this.props.location.state && this.props.location.state.active) {
			store.dispatch(toggleLinkList(this.props.location.state.active))
			history.push('/', {})
		}
	}

    render() {
    	const { product, service } = this.props.categories
    	const { linkList } = this.props.design

    	const catButtons = [
    		{
				title: 'Produtos', 
				onClick: this.toggleCat('product'),
				active: linkList === 'product'
			}, {
				title: 'Serviços', 
				onClick: this.toggleCat('service'),
				active: linkList === 'service'
			}
		]

		const style = {
			maxHeight: 350,
			backgroundImage: 'url(/assets/images/banner.jpg)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover'
		}

    	const carouselItems = [
    		<div style={style}>
    			<img style={{width: '100%', opacity: 0}} src="/assets/images/banner.jpg" alt="" />
			</div>,
			<div style={style}>
    			<img style={{width: '100%', opacity: 0}} src="/assets/images/banner.jpg" alt="" />
			</div>,
			<div style={style}>
    			<img style={{width: '100%', opacity: 0}} src="/assets/images/banner.jpg" alt="" />
			</div>
		]
		
        return (
        	<div className="bg-main overflow-x">
        		<div className="form-group position-relative z-index-1">
        			<Carousel items={carouselItems} />
    			</div>
    			<div className="effect5 mb-3 position-relative z-index-0">
    			</div>
        		<div className="container">
        			<div className="row">
        				<div className="col-sm-4 offset-sm-4">
		        			<div className="text-center form-group">
					            <BtnGroup
					            	buttons={catButtons} />
			            	</div>
		            	</div>
	            	</div>

		            <div className="row">
		            	<div className={'col-sm-12 ' + (linkList === 'product' ? 'order-1' : 'order-6')}>
			            	<MainSection
			            		title="produtos"
			            		type="product"
			            		categories={product} />
	            		</div>
	            		<div className={'col-sm-12 ' + (linkList === 'service' ? 'order-1' : 'order-6')}>
		            		<MainSection
			            		title="serviços"
			            		type="service"
			            		categories={service} />
	            		</div>
	            		<div className="col-sm-12 order-11">
	            			<BlogSection />
	            		</div>
	            		<div className="col-sm-12 order-12">
	            			<TestimonialsSection />
	            		</div>
		            </div>
	            </div>
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        categories: {
        	product: state.categories.product,
        	service: state.categories.service,
        },
        design: {
        	linkList: state.design.linkList,
        }
    })

export default connect(
    mapStateToProps
)(Main)