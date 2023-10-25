import React, { Component } from 'react'
import Slider from 'react-slick'
import { PrevArrow, PrevArrowRounded, PrevArrowCalendar, PrevArrowPromotion } from './prev_arrow.js'
import { NextArrow, NextArrowRounded, NextArrowCalendar, NextArrowPromotion } from './next_arrow.js'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"


class Carousel extends Component {

    printItems = (item, i) => <div key={i} onClick={this.onClickItem(i)}>{item}</div>
    
    onClickItem = i => e => {
        if (this.props.onClickItem) {
            this.props.onClickItem(i)
        }
    }

    render() {
        let nextArrow, prevArrow

        switch (this.props.arrowType) {
            case 'rounded': 
                nextArrow = <NextArrowRounded />
                prevArrow = <PrevArrowRounded />
                break
            case 'calendar':
                nextArrow = <NextArrowCalendar />
                prevArrow = <PrevArrowCalendar />
                break
            case 'promotions':
                nextArrow = <NextArrowPromotion slideToShow={this.props.settings} />
                prevArrow = <PrevArrowPromotion />
                break
            default:
                nextArrow = <NextArrow />
                prevArrow = <PrevArrow />
        }

        const settings = {
            slidesToShow: 1,
            dots: false,
            nextArrow: nextArrow,
            prevArrow: prevArrow,
            infinite: true,
            autoplay: false,
            responsive: [
                {
                    breakpoint: 768, 
                    settings: {
                        arrows: false
                    }
                }
            ],
            ...this.props.settings
        };
        
        return (
            <Slider {...settings}>
                { this.props.items.map((item, i) => this.printItems(item, i))}
            </Slider>
        );
    }
}

export default Carousel