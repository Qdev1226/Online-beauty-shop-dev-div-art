import React, { Component } from 'react'
import { getLang } from 'utils/lang'

class BtnGroup extends Component {
    printButtons = (item , i) => {
        let unactiveClass = item.active ? '' : 'unactive'
        return  <button
                    key={i} 
                    type="button" 
                    onClick={item.onClick}
                    className={"btn btn-primary w-50 " + unactiveClass}>
                    {getLang(item.title)}
                </button>
    }
    render = () =>
        (<div className="btn-group w-100" role="group">
            { this.props.buttons.map((item, i) => this.printButtons(item, i)) }
        </div>)
}

export default BtnGroup