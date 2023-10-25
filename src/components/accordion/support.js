import React, { Component } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import { getLang } from 'utils/lang'

class SupportAccordion extends Component {
	printAccordion = (item, i) =>
		(
    		<AccordionItem key={i} className="accordion-item mb-2 border rounded-top rounded-bottom bg-white">
                <AccordionItemTitle style={{outline: 'unset'}} className="accordion__title bg-white rounded-top rounded-bottom">
                    <div className="u-position-relative">
                        {
                            item.img
                            ?   <div className="d-inline-block footer-icon d-sm-none d-md-inline-block"><img src={item.img} className="img-fluid" alt="" /></div>
                            :   ''
                        }
                        <div className="fs-18 support-title d-inline-block pl-3 pl-sm-0 pl-md-3">{ getLang(item.title) }</div>
                        <div className="accordion__arrow" role="presentation"></div>
                    </div>
                </AccordionItemTitle>
                <AccordionItemBody className="accordion__body pt-0">
                    { item.body }
                </AccordionItemBody>
            </AccordionItem>
        )

	render() {
	        const list = this.props.list ? this.props.list : []
	        return (
	        	<Accordion className="border-0">
	                { list.map((item, i) => this.printAccordion(item, i)) }
	            </Accordion>
	        );
	    }
}

export default SupportAccordion