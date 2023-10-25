import React, { Component } from 'react'
import store from 'store'
import { connect } from 'react-redux'
import { getProducts } from 'actions/products.js'
import { getServices } from 'actions/services.js'
import CardProduct from 'components/cards/product.js'
import CardService from 'components/cards/service.js'

class ListMain extends Component {

    isEmptyData = data => ! data.length

    getData = type => {
        switch (type) {
            case 'product':
                store.dispatch(getProducts('list', {page_size: 6}))
                break
            case 'service':
                store.dispatch(getServices('list', {page_size: 6}))
                break
            default: return
        }
    }

    componentWillMount() {
        this.getData(this.props.type)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.guest !== this.props.user.guest) {
            this.getData(this.props.type)
        }
    }

    printList = (item, i) => {
        if (i < 6) {
            let component
            switch (this.props.type) {
                case 'product':
                    component = <CardProduct {...item} />
                    break
                case 'service':
                    component = this.props.itemType === 'small' ? <CardService {...item} /> : <CardService {...item} />
                    break
                default: return
            }

            return <div key={i} className="col-md-6 col-lg-4 mb-3">{component}</div>
        }   
    }

    render() {
        const list = this.props[this.props.type].list
        return (
            <div className="row">
               { list.map((item, i) => this.printList(item, i)) }
            </div>
        );
    }
}

const mapStateToProps = state =>
    ({
        user: {
            guest: state.user.guest
        },
        product: {
            list: state.products.list
        },
        service: {
            list: state.services.list
        }
    })

export default connect(
    mapStateToProps
)(ListMain)