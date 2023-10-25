import React, { Component } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import BtnMain from 'components/buttons/btn_main'
import Price from 'components/price'
import moment from 'moment'
import { getLang } from 'utils/lang'

class CustomAccordion extends Component {
    printBody = (item, i, length) => {
        const last = length === i + 1
        return  <div key={i} className="bg-white">
                    <div className="row">
                        <div className="col-sm-6 mb-2">
                            <p className="fs-18"><strong>{getLang(item.title)}</strong></p>
                            <div className="d-flex">
                                <div className="mr-2">{this.getDuration(item.duration)}</div>
                                <div className="border color-grey rounded px-3">{getLang('Salão')}</div>
                                {
                                    item.at_home
                                    ?   <div className="border color-grey rounded px-3">{getLang('Domiciliar')}</div>
                                    :   ''
                                }
                            </div>
                            <Price current={item.price} old={item.discount_price} />
                        </div>
                        <div className="col-sm-6">
                            <BtnMain
                                className="btn-outline font-weight-bold btn-block"
                                title="Adicionar ao carrinho" />
                            <BtnMain
                                className="font-weight-bold btn-block"
                                title="Agendar agora" />
                        </div>
                    </div>
                    { ! last ? <div className="border-bottom col-12 pt-4 mb-4"></div> : '' }
                </div>
    }

    getDuration = duration => {
        let temp = ''
        for (let k in moment.duration(duration)._data) {
            if (moment.duration(duration)._data[k]) {
                temp += `${moment.duration(duration)._data[k]} ${k} `
            }
        }
        return temp
    }

	printAccordion = (item, i) => {
        const list = item.list ? item.list : []
        
        return  <AccordionItem key={i} className="accordion-item mb-2 border rounded-top rounded-bottom bg-white">
                    <AccordionItemTitle style={{outline: 'unset'}} className="accordion__title bg-white rounded-top rounded-bottom">
                        <div className="u-position-relative">
                            <div className="fs-18">{ getLang(item.name) }</div>
                            <div className="accordion__arrow" role="presentation"></div>
                        </div>
                    </AccordionItemTitle>
                    <AccordionItemBody className="accordion__body bg-white rounded-bottom">
                        { list.map((item, i) => this.printBody(item, i, list.length)) }
                    </AccordionItemBody>
                </AccordionItem>
    }

    render() {
        const list = this.props.list ? this.props.list : []
        return (
        	<Accordion className="border-0">
                { list.map((item, i) => this.printAccordion(item, i)) }
            </Accordion>
        );
    }
}

export default CustomAccordion