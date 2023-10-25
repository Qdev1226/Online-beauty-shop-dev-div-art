import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { setAlert } from 'actions/design'

class Heart extends Component {
	state = {
			active: this.props.active
		}

	toggleWish = e => {
		e.stopPropagation()
		const active = this.props.user.guest ? false : !this.state.active
		this.setState({active}, () => {
			if (!this.props.user.guest) {
				this.props.onChange(this.state.active)
			} else {
				store.dispatch(setAlert('Você deve se registrar para fazer isso', 'error'))
			}
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.active !== undefined && nextProps.active !== this.props.active) {
			this.setState({active: nextProps.active})
		}
	}

    render() {
    	const activeClass = this.state.active ? 'fas' : 'far'
        return (
            <i className={`${activeClass} fa-heart fs-22 pointer color-green`} onClick={this.toggleWish}></i>
        );
    }
}

const mapStateToProps = state => 
	({
        user: {
        	guest: state.user.guest,
        }
    })

export default connect(
    mapStateToProps
)(Heart)