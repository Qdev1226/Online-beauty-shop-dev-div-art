import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { getService, getVendorServices } from 'actions/services'
import { getProducts, getProductsVendor } from 'actions/products'
import Carousel from 'components/carousel'
import Tabs from 'components/tabs'
import Accordion from 'components/accordion'
import BtnMain from 'components/buttons/btn_main'
import { WEEK } from 'config'
import AddressMap from 'components/map'
import Stars from 'components/stars'
import { toggleModal, toggleLightBox } from 'actions/design'
import { CommentForm } from 'components/forms'
import Pagination from 'components/pagination'
import CardProduct from 'components/cards/product'
import Avatar from 'components/images/avatar'
import { getLang } from 'utils/lang'
import { getTimeZone } from 'utils/date'

let companyTime = ''

class Company extends Component {
    state = {
        orderClassFirst: 'order-2',
        orderClassLast: 'order-3',
        page: 1,
        companyTime: companyTime
    }

    constructor(props) {
        super(props)
        this.carouselItems = [
            {src: '/assets/images/default-image-square-big.png'},
            {src: '/assets/images/default-image-square-big.png'},
            {src: '/assets/images/default-image-square-big.png'},
            {src: '/assets/images/default-image-square-big.png'},
        ]
    }

	componentWillMount() {
		store.dispatch(getService(this.props.match.params.id)).then(res => {
            if (res) {
                store.dispatch(getVendorServices(this.props.services.salon.id))
                store.dispatch(getProductsVendor(this.props.services.salon.id))
            }
        })

        store.dispatch(getProducts('pagination', {new_pagination: true, page_size: 8, page: 1}))
	}

    showComment = () => e => {
        this.setState({
            orderClassFirst: 'order-3',
            orderClassLast: 'order-2'
        })
    }

    hideComment = () => e => {
        this.setState({
            orderClassFirst: 'order-2',
            orderClassLast: 'order-3'
        })
    }

    comment = () => {
        store.dispatch(toggleModal(true, CommentForm, 'modal-sm', '', {id: this.props.services.salon.id, type: 'salon', serviceId: this.props.match.params.id}))
    }

    toggleLightBox = i => {
        store.dispatch(toggleLightBox(true, this.carouselItems, i))
    }

    printProducts = (item, i) => <div key={i} className="col-lg-6 mb-3"><CardProduct {...item} /></div>

    changePage = page => {
        store.dispatch(getProducts('pagination', {new_pagination: true, page_size: 8, page: page}))
    }

    changePageReviews = page => {
        this.setState({page})
    }

    printSocial = (item, i) =>
        (
            <div key={i} className="mb-2">
                <div className="text-capitalize fs-18">{item.type}</div>
                <a target="_blank" href={`http://${item.url}`} className="color-grey">{item.url}</a>
            </div>
        )

    printProfessionals = (item, i) =>
        (    
            <div key={i} className="d-flex justify-content-start align-items-center">
                <div className="px-3 w-20"><img src="/assets/images/default-professional.png" alt="" className="img-fluid" /></div>
                <div>{item.user.first_name} {item.user.last_name}</div>
            </div>
        )

    getReviewList = () => {
        const reviews = [...this.props.services.salon.reviews].reverse()
        return  <div>
                    {
                        reviews.slice((this.state.page - 1) * 5, this.state.page * 5).map((item, i) => {
                            const image_url = item.reviewer ? (item.reviewer.user_image ? item.reviewer.user_image.image_url : '') : ''
                            return  <div key={i}>
                                        <div className="d-flex">
                                            <div className="w-15 px-lg-3 px-sm-2 pr-2 pr-sm-0">
                                                <Avatar image={image_url} edit={false} />
                                            </div>
                                            <div className="w-85">
                                                <div className="d-flex justify-content-between flex-wrap">
                                                    <h6>{ item.reviewer.first_name }</h6>
                                                    <div><Stars active={item.rating} /></div>
                                                </div>
                                                <div>
                                                    <span className="color-grey">{ item.comment }</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-bottom col-12 pt-4 mb-4"></div>
                                    </div>
                        })
                    }
                    <div className="mb-3">
                        <Pagination 
                            onChange={this.changePageReviews} 
                            total={Math.ceil(this.props.services.salon.reviews.length / 5)} 
                            active={this.state.page} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <BtnMain
                            className="font-weight-bold w-80"
                            onClick={this.comment}
                            title="Fazer comentário" />
                    </div>
                </div>
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.services.salon.id && nextProps.services.salon.id !== this.props.services.salon.id) {
            const lat = nextProps.services.salon.address.latitude
            const lon = nextProps.services.salon.address.longitude
            getTimeZone(lat, lon)
            .then(companyTime => {
                this.setState({companyTime})
            })
        }
    }

    componentWillUnmount() {
        companyTime = this.state.companyTime
    }

    isOpen = () => {
        let day = {}
        let from, to
        switch (new Date().getDay()) {
            case 1: [{from, to}] = this.props.services.salon.working_hours.monday && this.props.services.salon.working_hours.monday.length
                    ? this.props.services.salon.working_hours.monday
                    : [{from: '', to: ''}]
                break
            case 2: [{from, to}] = this.props.services.salon.working_hours.tuesday && this.props.services.salon.working_hours.tuesday.length
                    ? this.props.services.salon.working_hours.tuesday
                    : [{from: '', to: ''}] //tuesday
                break
            case 3: [{from, to}] = this.props.services.salon.working_hours.wednesday && this.props.services.salon.working_hours.wednesday.length
                    ? this.props.services.salon.working_hours.wednesday
                    : [{from: '', to: ''}] //wednesday
                break
            case 4: [{from, to}] = this.props.services.salon.working_hours.thursday && this.props.services.salon.working_hours.thursday.length
                    ? this.props.services.salon.working_hours.thursday
                    : [{from: '', to: ''}] //thursday
                break
            case 5: [{from, to}] = this.props.services.salon.working_hours.friday && this.props.services.salon.working_hours.friday.length
                    ? this.props.services.salon.working_hours.friday
                    : [{from: '', to: ''}] //friday
                break
            case 6: [{from, to}] = this.props.services.salon.working_hours.saturday && this.props.services.salon.working_hours.saturday.length
                    ? this.props.services.salon.working_hours.saturday
                    : [{from: '', to: ''}] //saturday
                break
            case 7: [{from, to}] = this.props.services.salon.working_hours.sunday && this.props.services.salon.working_hours.sunday.length
                    ? this.props.services.salon.working_hours.sunday
                    : [{from: '', to: ''}] //sunday
                break
            default: return
        }

        const [hFrom, mFrom] = from.split(':')
        const [hTo, mTo] = to.split(':')

        if (this.state.companyTime) {
            const [hCurrent, mCurrent] = this.state.companyTime.split(':')
            if (hCurrent * 60 + mCurrent * 1 > hFrom * 60 + mFrom * 1 && hCurrent * 60 + mCurrent * 1 < hTo * 60 + mTo * 1) {
                return <div className="d-inline-block bg-green text-white px-2 py-1 rounded">{getLang('Aberto')}</div>
            }
        }

        return <div className="d-inline-block bg-danger text-white px-2 py-1 rounded">{getLang('Fechado')}</div>
    }

    render() {
    	const { salon } = this.props.services
    	const products = this.props.product.pagination.items
    	const settings = {
            slidesToShow: 3,
            swipeToSlide: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 768, 
                    settings: {
                        slidesToShow: 2,
                        arrows: false
                    }
                }
            ]
        }

        const carouselItems = this.carouselItems.map((item, i) => {
            return <img key={i} className="pointer" style={{width: '100%', maxHeight: 350}} src={item.src} alt="" />
        })

        return (
        	<div className="bg-main font-avenir py-5">
                <div className="bg-white pt-3 pb-5 mb-4">
            		<div className="container">
    	            	<div className="d-flex align-items-center">
    	            		<img src="/assets/icons/home-icon-grey.png" alt="" className="img-fluid img-icon-header pb-2" />
    	            		<span className="fs-22 px-3">{getLang(salon.name)}</span>
                		</div>
                		<div>
                			<Carousel items={carouselItems} settings={settings} arrowType="rounded" onClickItem={this.toggleLightBox} />
                		</div>
                	</div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-7 order-1">
                            <Tabs
                                classNameHeader="bg-white"
                                classNameContent="pt-4"
                                styleHeader={{marginTop: -73}}
                                tabs={[
                                    {
                                        title: getLang('Serviços'),
                                        onClick: this.hideComment,
                                        content: <Accordion list={this.props.products.vendor_services} />
                                    }, {
                                        title: getLang('Profissionais'),
                                        onClick: this.hideComment,
                                        content: <div className="bg-white p-3 rounded mb-3">{salon.professionals.map((item, i) => this.printProfessionals(item, i))}</div>
                                    }, {
                                        title: getLang('Avaliações'),
                                        onClick: this.showComment,
                                        content: <div className="bg-white rounded p-3 mb-3">{this.getReviewList()}</div>
                                    }, {
                                        title: getLang('Produtos'),
                                        onClick: this.hideComment,
                                        content:    <div className="mb-3">
                                                        <div className="row align-items-stretch">
                                                            { products.map((item, i) => this.printProducts(item, i)) }
                                                        </div>
                                                        <Pagination
                                                            responsive={[{width: 1199, count: 10}, {width: 991, count: 7}, {width: 600, count: 6}, {width: 500, count: 5}, {width: 420, count: 4}, {width: 375, count: 3}]} 
                                                            onChange={this.changePage} 
                                                            total={this.props.product.pagination.total_pages} 
                                                            active={this.props.product.pagination.page} />
                                                    </div>
                                    }]} />
                        </div>
                        <div className={`col-lg-4 col-md-5 mb-3 ${this.state.orderClassFirst}`}>
                            <div className="bg-white rounded p-3">
                                <div className="color-grey mb-3">
                                    {getLang('Um novo conceito em salão de beleza na Chácara Santo Antônio com foco na excelência no atendimento e prestação de serviços')}
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="fs-18">{getLang('Horários')}</div>
                                    {this.isOpen()}
                                </div>
                                <div className="mb-3">
                                    {
                                        Object.keys(salon.working_hours).map((item, i) => {
                                            const [{from, to}] = salon.working_hours[item].length ? salon.working_hours[item] : [{from: '', to: ''}]
                                            return  <div key={i} className="color-grey d-flex justify-content-between py-1">
                                                        <div>{getLang(WEEK[item])}</div>
                                                        <div>{from} - {to}</div>
                                                    </div>
                                        })
                                        
                                    }
                                </div>
                                <div className="fs-18">{getLang('Contatos')}</div>
                                <div className="color-grey">{salon.address.phone}</div>
                                <div className="color-grey mb-3">{salon.address.email}</div>
                                <div className="fs-18">{getLang('Endereço')}</div>
                                <div className="mb-3">
                                    <div className="color-grey">{`${salon.address.title}, ${salon.address.number} ${salon.address.street}`}</div>
                                    {
                                        salon.address.latitude
                                        ?   <AddressMap {...salon.address} />
                                        :   ''
                                    }
                                </div>
                                { salon.social_media.map((item, i) => this.printSocial(item, i)) }
                            </div>
                        </div>
                        
                    </div>
                </div>
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        services: {
        	salon: state.services.salon
        },
        product: {
            pagination: state.products.pagination
        },
        products: {
            vendor_services: state.products.vendor_services
        },
    })

export default connect(
    mapStateToProps
)(Company)