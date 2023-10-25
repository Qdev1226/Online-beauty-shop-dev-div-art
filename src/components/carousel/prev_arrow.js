import React from 'react'
import style from './style.css' 

const PrevArrow = props =>
	(
		<div className={`${style.prevArrow} ${style.wrap}`} onClick={props.onClick}>
            <img style={{width: 30}} src="/assets/icons/icons8-chevron-left-48.png" alt="" />
        </div>
	)

const PrevArrowRounded = props =>
	(
        <div className="prev-arrow-rounded border" onClick={props.onClick}>
            <img src="/assets/icons/prev-arrow.png" alt="" className="img-fluid arrow-img" />
        </div>
    )

const PrevArrowCalendar = props =>
    (
        <div className="prev-arrow-calendar" onClick={props.onClick}>
            <img src="/assets/icons/prev-arrow-calendar.png" alt="" className="img-fluid" />
        </div>
    )

const PrevArrowPromotion = props => {
    const unActiveClass = props.currentSlide === 0 ? 'opacity-5' : 'pointer'
    return  <div className={`prev-arrow-promotions ${unActiveClass}`} onClick={props.onClick}>
                <img src="/assets/icons/prev-arrow.png" alt="" className="img-fluid arrow-img-promotion" />
            </div>
}

export { PrevArrow, PrevArrowRounded, PrevArrowCalendar, PrevArrowPromotion }