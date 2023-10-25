import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from 'store'
import { ToastContainer } from 'react-toastr'
import { removeAlert } from 'actions/design'

class Alert extends Component {
    
    componentWillReceiveProps(nextProps) {
        const { messages } = this.props.design.alerts
        if (nextProps.design.alerts.messages.length !== messages.length) {
            this.showMessages(messages)
        }
    }

    showMessages = messages => {
        for (let message of messages) {
            this.container[message.level](message.text, '', { closeButton: true })
        }
        store.dispatch(removeAlert())
    }

    render() {
        return (
            <ToastContainer
                ref={ref => this.container = ref}
                className="toast-bottom-right" />
        );
    }
}

const mapStateToProps = state =>  
    ({ 
        design: {
            alerts: {
                messages: state.design.alerts.messages
            }
        }   
    })

export default connect(
    mapStateToProps
)(Alert)