import React, { Component } from 'react'
import { toggleModal } from 'actions/design'
import store from 'store'

class WithOutConnection extends Component {
    constructor() {
        super()
        
        this.keys = {
            key1: false,
            key2: false,
            key3: false
        }

        window.addEventListener('keyup', () => {
            this.keys = {
                key1: false,
                key2: false,
                key3: false
            }
        })

        window.addEventListener('keydown', e => {
            switch(e.key) {
                case 'c':
                    if (!this.keys.key1) {
                        this.keys.key1 = e.key
                        this.openCalc()
                    }
                    break
                case 'a':
                    if (!this.keys.key2) {
                        this.keys.key2 = e.key
                        this.openCalc()
                    }
                    break
                case 'l':
                    if (!this.keys.key3) {
                        this.keys.key3 = e.key
                        this.openCalc()
                    }
                    break
                default:
                    this.keys = {
                        key1: false,
                        key2: false,
                        key3: false
                    }
                    return
            }
        })
    }

    calc = props => {
        return  <div className="text-center">
                    
                    
                </div>
    }

    openCalc = () => {
        if (this.keys.key1 && this.keys.key2 && this.keys.key3) {
            store.dispatch(toggleModal(true, this.calc, 'modal-sm text-center', 'calculator', {position: 'center'}))
            this.keys = {
                key1: false,
                key2: false,
                key3: false
            }
        }
    }

    render() {
        
        return  <div className="bg-main font-avenir pt-5 vh-100">
                    <div className="container text-center">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-md-7 col-sm-10 col-12">
                                <div className="font-avenir-light fs-38 mb-3">Check your connection</div>
                            </div>
                        </div>
                    </div>
                </div>
    }
}

export default WithOutConnection