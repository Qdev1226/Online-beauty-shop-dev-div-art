import React, { Component } from 'react'
import store, { history } from 'store'
import { connect } from 'react-redux'
import { getProduct, getProductComments, getPromotions, getQuestions, sendQuestion } from 'actions/products'
import { addToCart } from 'actions/cart'
import { toggleModal, toggleLightBox } from 'actions/design'
import { getVendorServices } from 'actions/services'
import { addToWishList, removeFromWishList } from 'actions'
import { calcDelivery } from 'actions/user'
import ImageMultiPreview from 'components/images/multi_preview'
import ImagePreview from 'components/images/preview'
import Price from 'components/price'
import Stars from 'components/stars'
import Counter from 'components/counter'
import BtnMain from 'components/buttons/btn_main'
import Tabs from 'components/tabs'
import SalonInfo from 'components/blocks/salon_info'
import MainList from 'components/lists/main'
import Accordion from 'components/accordion'
import { CommentForm } from 'components/forms'
import Heart from 'components/heart'
import Avatar from 'components/images/avatar'
import Pagination from 'components/pagination'
import TextArea from 'components/inputs/textarea'
import PromotionBlock from 'components/blocks/promotion'
import { getLang } from 'utils/lang'

class Product extends Component {
	constructor(props) {
		super(props)
		this.count = 1
		this.state = {
			lightboxIsOpen: false,
			activeImg: 0,
			page: 1
		}
		if (props.match.params.id) {
			store.dispatch(getProduct(props.match.params.id))
			.then(res => {
				store.dispatch(getPromotions(props.match.params.id))
				store.dispatch(getVendorServices(this.props.products.salon.id))
				store.dispatch(getQuestions(this.props.products.salon.id))
			})
			store.dispatch(getProductComments(props.match.params.id))

		}
	}

	changePage = page => {
		this.setState({page})
	}

	getReviewList = props => {
		return 	<div className="row">
					<div className="col-md-8">
						{
							this.props.products.reviews.slice((this.state.page - 1) * 5, this.state.page * 5).map((item, i) => {
								const image_url = item.reviewer ? (item.reviewer.user_image ? item.reviewer.user_image.image_url : '') : ''
								return 	<div key={i}>
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
	    						onChange={this.changePage} 
	    						total={Math.ceil(this.props.products.reviews.length / 5)} 
	    						active={this.state.page} />
						</div>
						<div className="d-flex justify-content-center">
							<BtnMain
		        				className="font-weight-bold w-80"
		        				onClick={this.comment}
		        				title="Fazer comentário" />
	    				</div>
					</div>
					
				</div>
	}

	getQuestionsList = () => {
		return this.props.products.questions.map((item, i) =>
			(
				<div key={i}>
					<div className="row mb-3">
						<div className="col-lg-1 col-md-2 col-sm-2 col-3">
							<img src="/assets/icons/question-icon.png" alt="" className="img-fluid w-80" />
						</div>
						<div className="col-lg-11 col-md-10 col-sm-10 col-9">
							<div className="color-grey pl-sm-3">{item.question}</div>
						</div>
					</div>
					{
						item.answer
						? 	<div className="row mb-3">
								<div className="col-lg-1 col-md-2 col-sm-2 col-3">
									<img src="/assets/icons/answer-icon.png" alt="" className="img-fluid w-80" />
								</div>
								<div className="col-lg-11 col-md-10 col-sm-10 col-9">
									<div className="color-grey pl-sm-3">{item.answer}</div>
								</div>
							</div>
						: 	''
					}
					<div className="border-bottom mb-3"></div>
				</div>
			)
		)
	}

	getQuestionBlock = () =>
		(
			<div className="row">
				<div className="col-md-8">
					<div className="p-4 rounded border">
						{this.getQuestionsList()}
						<div className="row justify-content-center">
							<div className="col-sm-8">
								<BtnMain
			        				className="font-weight-bold btn-outline btn-block"
			        				title="Ver todas as perguntas" />
		        				<BtnMain
			        				className="font-weight-bold btn-block"
			        				onClick={this.openQuestion}
			        				title="Perguntar" />
	        				</div>
						</div>
					</div>
				</div>
			</div>
		)

	toggleWish = val => {
		val ? store.dispatch(addToWishList('product', this.props.products.product.id)) : store.dispatch(removeFromWishList('product', this.props.products.product.id))
	}

	addToCart = now => e => {
		store.dispatch(addToCart(this.props.products.product.id, 'product', {quantity: this.count}))
		.then(res => {
			if (res && now) {
				history.push(`/cart`)
			}
		})
	}

	comment = () => {
		store.dispatch(toggleModal(true, CommentForm, 'modal-sm', '', {id: this.props.products.product.id, type: 'product'}))
	}

	openQuestion = () => {
		store.dispatch(toggleModal(true, this.questionForm, 'modal-sm', '', {position: 'center'}))
	}

	sendQuestion = onClose => e => {
		const data = {
			message: this.message.value,
			product_id: this.props.match.params.id,
			vendor_id: this.props.products.salon.id
		}
		store.dispatch(sendQuestion(data))
		.then(res => {
			if (res) {
				store.dispatch(getQuestions(this.props.products.salon.id))
				onClose()
			}
		})
	}

	questionForm = props => {
		return 	<div>
					<TextArea 
                        required
                        label="Mensagem"
                        inputRef={ref => this.message = ref} />
                    <div className="pt-3">
	            		<BtnMain
	        				className="font-weight-bold btn-outline btn-block"
	        				onClick={props.onCancel}
	        				title="Cancelar" />
	            		<BtnMain
	        				className="font-weight-bol btn-block"
	        				onClick={this.sendQuestion(props.onCancel)}
	        				title="Perguntar" />
	            	</div>
				</div>
	}

	openLightBox = () => {
		store.dispatch(toggleLightBox(true, [
			{src: '/assets/images/default-image-square-big.png'},
			{src: '/assets/images/default-image-square-big-blue.png'},
			{src: '/assets/images/default-image-square-big-green.png'},
			{src: '/assets/images/default-image-square-big-orange.png'},
		]))
	}

	deliveryInfo = props =>
		(
			<div>
				<div className="mb-3">
					{ 
						this.props.cart.delivery_types.map((item, i) =>
						 	(<div key={i} className="d-flex justify-content-between color-grey">
								<div>{item.name}</div>
								<Price current={item.price} />
							</div>)
						)
					}
				</div>
				<BtnMain 
					className="btn-block btn-outline"
					title="Fechar" 
					onClick={props.onCancel}/>
			</div>
		)

	calcDelivery = () => {
		store.dispatch(calcDelivery(this.props.user.data.main_address.id))
		.then(res => {
			if (res) {
				store.dispatch(toggleModal(true, this.deliveryInfo, 'modal-sm', 'Tipo de envio', {position: 'center'}))
			}
		})
	}

	printPromotions = (item, i, last) => {
		const lastClass = i+1 === last ? '' : 'border-bottom'
		return 	<div key={i} className={`py-4 ${lastClass}`}>
					<PromotionBlock {...item} />
				</div>
	}

    render() {
    	const { product, salon, vendor_services } = this.props.products
    	product.images = [
    				{image_url: '/assets/images/default-image-square-big.png'},
					{image_url: '/assets/images/default-image-square-big-blue.png'},
					{image_url: '/assets/images/default-image-square-big-green.png'},
					{image_url: '/assets/images/default-image-square-big-orange.png'},
				]
        return (
        	<div className="bg-main pt-4">
	        	<div className="font-avenir pt-2 bg-white">
	        		<div className="container">
			            <div className="row">
			            	<div className="col-12 col-sm-4">
			            		<ImageMultiPreview onClick={this.openLightBox} className="d-none d-sm-flex" images={product.images} />
			            		<ImagePreview className="d-block d-sm-none" images={product.images} />
			            	</div>
			            	<div className="col-12 col-sm-8">
			            		<h4>
			            			<span>{ product.name }</span>
			            			<div className="float-right">
			            				<Heart onChange={this.toggleWish} main="test" active={product.in_wishlist} />
			            			</div>
			            		</h4>
			            		<div>
			            			<Price current={product.price} old={product.discount_price} />
			            		</div>
			            		<div className="color-grey form-group">
				            		{getLang('Avaliação')}<br />
				            		<Stars active={product.rating} />
			            		</div>
			            		<div className="form-group">
			            			<img src={`/assets/svg/Truck.svg`} alt="" className="img-fluid img-icon-header pb-1 mr-2" />
			            			<span>{getLang('Envio para todos o país')}</span><br />
			            			<span className="color-grey">{getLang('Saiba os prazos de entrega e as formas de envio.')}</span>
			            		</div>
			            		<div className="row form-group">
			            			<div className="col-6 col-md-4 col-sm-5 col-lg-3">
				            			<span className="color-green pointer" onClick={this.calcDelivery}>{getLang('Calcular frete')}</span><br />
				            			<Counter onChange={val => this.count = val} value={this.count} />
			            			</div>
			            		</div>
			            		<div className="d-flex form-group">
				            		<BtnMain
				        				className="font-weight-bold px-4"
				        				onClick={this.addToCart(true)}
				        				title="Comprar agora" />
			        				<BtnMain
				        				className="font-weight-bold btn-outline ml-2"
				        				onClick={this.addToCart(false)}
				        				title="Adicionar ao carrinho" />
		        				</div>
			            	</div>
			            </div>
		            </div>
		            <div className="bg-main pb-4">
		            	<div className="container pt-4">
		            		{
		            			this.props.products.promotions.length
		            			? 	<div className="rounded py-4 px-3 bg-white mb-4">
				            			<h5>{getLang('Promoções relacionadas a este produto')}:</h5>
				            			<div>{ this.props.products.promotions.map((item, i) => this.printPromotions(item, i, this.props.products.promotions.length)) }</div>
				            		</div>
		            			: 	null
		            		}

		            		<div className="rounded py-4 px-3 bg-white mb-4">
		            			<h5>{getLang('Descrição')}</h5>
		            			<span className="color-grey">{ getLang(product.description) }</span>
		            		</div>

		            		<div className="rounded py-3 bg-white">
		            			<Tabs tabs={[
		            				{
		            					title: getLang('Sobre'),
		            					content: <div className="p-3"><SalonInfo {...salon} /></div>
		            				}, {
		            					title: getLang('Produtos'),
		            					content: <div className="p-3"><MainList type="product" itemType="small" /></div>
		            				}, {
		            					title: getLang('Serviços'),
		            					hide: !vendor_services.length,
		            					content: <div className="p-3"><div className="row"><div className="col-md-8"><Accordion list={vendor_services} /></div></div></div>
		            				}, {
		            					title: getLang('Avaliações'),
		            					content: <div className="p-3">{this.getReviewList()}</div>
		            				}, {
	            						title: getLang('Perguntas'),
	            						content: <div className="p-3">{this.getQuestionBlock()}</div>
		            				}]} />
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
        products: {
        	product: state.products.product,
        	reviews: state.products.reviews,
        	questions: state.products.questions,
        	promotions: state.products.promotions,
        	salon: state.products.salon,
        	vendor_services: state.products.vendor_services
        },
        user: {
        	data: {
        		main_address: state.user.data.main_address
        	}
        },
        cart: {
        	delivery_types: state.cart.delivery_types,
        }
    })

export default connect(
    mapStateToProps
)(Product)