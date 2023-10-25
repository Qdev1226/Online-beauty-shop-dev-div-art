import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { toggleModal } from 'actions/design.js'
import Modal from 'react-responsive-modal'
import './style.css'

const emptyElement = props => <div></div>

class CustomModal extends Component {
	onCloseModal = () => {
		store.dispatch(toggleModal(false, emptyElement))
	}

    render() {
        const { open, content, className, title, data } = this.props.design.modal
        const component = !content ? emptyElement : React.createElement(content, {onCancel: this.onCloseModal, inModal: true, data})
        const overlayClass = data && data.position === 'center' ? 'align-items-center' : 'align-items-start'
        return (
	        <Modal open={open} onClose={this.onCloseModal} center showCloseIcon={false} classNames={{modal: `rounded modal-body ${className}`, overlay: overlayClass}}>
                { title ? <h4>{title}</h4> : ''}
	          	<div>{component}</div>
	        </Modal>
        );
    }
}

const mapStateToProps = state =>
    ({
        design: {
            modal: state.design.modal
        }
    })

export default connect(
    mapStateToProps
)(CustomModal)