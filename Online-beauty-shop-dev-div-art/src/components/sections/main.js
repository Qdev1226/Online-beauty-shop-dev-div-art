import React, { Component } from 'react'
import CategoryItem from 'components/cards/category'
import Carousel from 'components/carousel'
import ListMain from 'components/lists/main'
import { getLang, getValue } from 'utils/lang'

class MainSection extends Component {

    printMobileCategories = () => this.props.categories.map((item, i) => <CategoryItem key={i} {...item} type={this.props.type} />)
    
    render() {
        const settings = {
            arrows: false,
            slidesToShow: 6,
            mobileFirst: true,
            swipeToSlide: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 768, 
                    settings: {
                        slidesToShow: 4,
                    }
                }, {
                    breakpoint: 576, 
                    settings: {
                        slidesToShow: 3,
                    }
                }, {
                    breakpoint: 375, 
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        }

        return (
            <div>
                <div className="form-group">
                    {
                        getValue() === 'br'
                        ?   <div className="fs-28">Catálogo de <strong>{this.props.title}</strong></div>
                        :   <div className="fs-28">{getLang(this.props.title)}<strong> catalog</strong></div>
                    }
                    
                </div>
                <div className="form-group">
                    <div className="row">
                        <div className="col-xl-8 col-lg-9">
                            <div>
                                <Carousel items={this.printMobileCategories()} settings={settings} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    {
                        getValue() === 'br'
                        ?   <div className="fs-28"><span className="text-capitalize">{this.props.title}</span> em <strong>destaque</strong></div>
                        :   <div className="fs-28"><span className="text-capitalize">Featured</span><strong> {getLang(this.props.title)}</strong></div>
                    }
                    
                </div>
                <ListMain type={this.props.type} />
            </div>    
        );
    }
}

export default MainSection