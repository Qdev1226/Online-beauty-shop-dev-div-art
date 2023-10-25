import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { getDaysInMonth } from 'utils/date'
import Carousel from 'components/carousel'
import { getLang } from 'utils/lang'
import { times } from 'config'
import { getTime } from 'utils/date'
import { setScheduleCartKey } from 'actions/schedule_cart'
import './style.css'

class Calendar extends Component {
	state = {
		currentDate: new Date().getDate(),
		activeTime: 0,
        activeDate: 0,
        activeIntervals: []
	}

	setActiveTime = activeTime => e => {
		this.state.activeTime === activeTime ? this.setState({activeTime: 0}) : this.setState({activeTime})
		store.dispatch(setScheduleCartKey(activeTime, 'activeTime'))
	}

	printDates = (item, i) => {
		const activeClass = item.date === this.state.activeDate ? 'active' : ''
		const unActiveClass = item.date < this.state.currentDate ? 'color-grey' : (item.date === this.state.currentDate ? 'color-green' : '')

		return 	<div key={i} className={`text-center px-0 py-3 pointer month-item ${activeClass} ${unActiveClass}`} onClick={this.setDay(item.date)}>
					<div className="mb-3">{getLang(item.day)}</div>
					<div>{item.date}</div>
				</div>
	}

    setDay = activeDate => e => {
		if (activeDate >= this.state.currentDate) {
			this.setState({activeDate})
			const month = this.props.month + 1 > 9 ? this.props.month + 1 : `0${this.props.month + 1}`
			store.dispatch(setScheduleCartKey(`${this.props.year}-${month}-${activeDate}`, 'activeDate'))
		}
    }

	printTimes = (item, i, length) => {
		const fromHour = getTime(item.from)
		const toHour = getTime(item.to)

		return times.map((time, index) => {
			const [hour] = time.split(':')
			if (hour * 1 >= fromHour * 1 && hour * 1 <= toHour * 1) {
				return 	<div key={index} className={`border-bottom py-2 pl-4 pr-5 color-grey pointer d-flex justify-content-between text-center`} onClick={this.setActiveTime(time)}>
							<div>{time}</div>
							{
								time === this.state.activeTime
								?	<div><img src="/assets/icons/check-icon.png" alt="" className="img-fluid img-icon-header" /></div>
								: 	''
							}
						</div>
			}
		})
	}

	getActiveIntervals = () => {
		if (this.props.schedule_cart.proffesional.schedule.length) {
			const intervals = this.props.schedule_cart.proffesional.schedule.find((item) => {
				const [, , date] = item.day.split('-')
				if (date * 1 === this.state.activeDate) {
					return item.intervals
				}
			})
			if (intervals) {
				return intervals.intervals
			}
			return []
		}
		return []
	}

    render() {
    	const settings = {
            slidesToShow: 5,
            swipeToSlide: true,
			infinite: false,
			initialSlide: this.state.currentDate - 3,
            responsive: [
            	{
            		breakpoint: 991, 
                    settings: {
                        slidesToShow: 4
                    }
            	}, {
            		breakpoint: 767, 
                    settings: {
                        slidesToShow: 3
                    }
            	}
            ]
        }

        return (
        	<div className="bg-white rounded overflow-hidden">
        		<div className="row justify-content-center">
        			<div className="col-9 col-lg-10 col-md-8 col-sm-8">
		        		<Carousel 
		        			items={getDaysInMonth(this.props.month, this.props.year).map((item, i) => this.printDates(item, i))}
		        			arrowType="calendar"
		        			settings={settings} />
        			</div>
    			</div>
    			<div className="border-bottom"></div>
    			<div className="wrap-calendar-times">
    				{ 
    					this.getActiveIntervals().length
    					? 	this.getActiveIntervals().map((item, i) => this.printTimes(item, i, times.length))
    					: 	<div className="text-center p-3">No available times for this date</div>
				 	}
    			</div>
			</div>
        );
    }
}

const mapStateToProps = state =>
    ({
        schedule_cart: {
        	proffesional: {
        		schedule: state.schedule_cart.proffesional.schedule
        	}
        }
    })

export default connect(
    mapStateToProps
)(Calendar)