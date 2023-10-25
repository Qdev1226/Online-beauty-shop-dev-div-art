import React, { Component } from 'react'
import store from 'store'
import { saveAvatar } from 'actions/user'
import './style.css'

class Avatar extends Component {
	state = {
		opacity: 1,
        preview: '',
	}

	handleOnLoad = e => { this.setState({opacity: 0}) }

    openUpload = () => {
        if (this.props.edit) { this.uploadField.click() }
    }

    onChange = e => {
        if (e.target.files) {
            const image = e.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                this.setState({
                    preview: reader.result
                })
                let fd = new FormData()
                fd.append('image', image)
                store.dispatch(saveAvatar(fd))
            }
        }
    }

    componentDidMount() {
        this.setState({height: this.wrap.offsetWidth})
    }

    render() {
        const image = this.props.image ? this.props.image : (this.state.preview ? this.state.preview : '')
        const { defaultImg = "/assets/images/default-reviewer.png", edit = true } = this.props
        return (
        	<div id="wrap" className={`${edit ? 'pointer' : ''} position-relative wrap-avatar ${this.props.className}`} onClick={this.openUpload} ref={ref => this.wrap = ref} style={{height: '100%'}}>
                <input type="file" id="upload" ref={ref => this.uploadField = ref} onChange={this.onChange} className="d-none" />
	            <img className="rounded img-fluid" style={{opacity: this.state.opacity}} src={defaultImg} alt="" />
        		<img onLoad={this.handleOnLoad} className="rounded img-fluid d-none" src={image} alt="" />
                <div className="position-absolute w-100 h-100 img-block" style={{backgroundImage: `url(${image})`}}></div>
                {
                    edit
                    ?   <div className="position-absolute avatar-hover w-100 text-center">
                            <div className="text-avatar position-absolute text-white">
                                <div>Atualizar foto do perfil</div>
                                <i className="fas fa-camera"></i>
                            </div>
                        </div>
                    :   ''
                } 
			</div>
        );
    }
}

export default Avatar