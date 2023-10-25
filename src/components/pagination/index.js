import React, { Component } from 'react'

class Pagination extends Component {

	constructor(props) {
		super(props)
		this.state = {
			active: props.active,
			prev: props.active,
			resizeUpdater: 0
		}
		this.list = ['']
		this.container = null

		window.addEventListener('resize', this.resizeHandler, true);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resizeHandler, true);
	}

	resizeHandler = () => {
		this.setState({resizeUpdater: 1})
	}

	getVector = page => {
		if ((this.state.active >= this.state.prev || this.state.active === 1 || this.state.active === 2) && this.state.active !== this.props.total) {
			return page > this.state.active && this.getMaxCount() - 7 >= page - this.state.active
		}

		if (this.state.active < this.state.prev || this.state.active === this.props.total || this.state.active === this.props.total - 1) {
			return page < this.state.active && this.getMaxCount() - 7 >= this.state.active - page
		}
	}

	getHiddenClass = page => {
		if (this.getMaxCount() < this.props.total) {
			if (this.state.active === page || page === this.props.total) { //active & last
				return 'num'
			}

			if (this.props.total === this.state.active && page === 1) { //first when last active
				return 'num'
			}

			if (this.state.active === page - 1 && this.getMaxCount() > 2) { //next from active
				return 'num'
			}

			if (this.state.active === page + 1 && this.getMaxCount() > 3) { //prev from active
				return 'num'
			}

			if (this.state.active === page - 2 && this.getMaxCount() > 4) { //next + 1 from active
				//return 'num'
			}

			if (page === 1 && this.getMaxCount() > 5) { //first
				return 'num'
			}

			if (page === this.props.total - 1 && this.getMaxCount() > 6) { //prev from last
				//return 'num'
			}

			if (page === 2 && this.getMaxCount() > 7) { //second
				//return 'num'
			}

			if (this.getMaxCount() > 7 && this.getVector(page)) { //other next or prev from active
				return 'num'
			}
			return 'dots'
		}
		return 'num'
	}

	printButtons = (item, i) => {
		const activeClass = this.state.active === i+1 ? 'color-green' : 'color-grey'
		const hiddenClass = this.getHiddenClass(i+1)
		
		return 	<div 
					key={i} ref={ref => this.list[i] = ref} 
					className={`rounded bg-white p-2 px-3 mx-1 border pointer position-relative ${activeClass} ${hiddenClass}`} 
					onClick={this.setPage(i+1)}>
					<div className={`d-none ${hiddenClass}`}>
						<i className="fas fa-ellipsis-h position-absolute"></i>
					</div>
	            	{i+1}
	            </div>
	}

	setPage = active => e => {
		this.setState({active, prev: this.state.active})
		this.props.onChange(active)
	}

	prevPage = () => {
		if (this.state.active > 1) {
			this.setState({active: this.state.active - 1, prev: this.state.active})
			this.props.onChange(this.state.active - 1)
		}
	}

	nextPage = () => {
		if (this.state.active < this.props.total) {
			this.setState({active: this.state.active + 1, prev: this.state.active})
			this.props.onChange(this.state.active + 1)
		}
	}

	getMaxCount = () => {
		let count = this.props.total
		if (this.props.responsive && this.props.responsive.length) {
			this.props.responsive.forEach(item => {
				if (item.width >= window.screen.availWidth) {
					count = item.count
				}
			})
		}
		return count
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active !== this.props.active) {
			this.setState({active: nextProps.active})
		}
	}

    render() {
    	const list = Array.apply(null, Array(this.props.total))
    	const prevClass = this.state.active > 1 ? 'pointer color-green' : 'color-grey'
    	const nextClass = this.state.active < this.props.total ? 'pointer color-green' : 'color-grey'
        return (
        	<div ref={ref => this.container = ref} style={{minHeight: 1}} className={this.props.className}>
	        	<div className="d-flex justify-content-center">
		            <div className={`rounded bg-white py-2 px-3 mx-1 border ${prevClass}`} ref={ref => this.prev = ref} onClick={this.prevPage}>
		            	<i className="fas fa-chevron-left"></i>
		            </div>
		            	{ list.map((item, i) => this.printButtons(item, i)) }
		            <div className={`rounded bg-white py-2 px-3 mx-1 border ${nextClass}`} ref={ref => this.next = ref} onClick={this.nextPage}>
		            	<i className="fas fa-chevron-right"></i>
		            </div>
				</div>
			</div>
        );
    }
}

export default Pagination