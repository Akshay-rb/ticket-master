import React from 'react'

export default class CustomerForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: props.customer ? props.customer.name  : '',
            email:props.customer ? props.customer.email:  '',
            mobile:props.customer ? props.customer.mobile:''
        }
    }

    handleChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e =>{
        e.preventDefault()
        const formData={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile
        }

        this.props.handleSubmit(formData)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>name</label>
                    <input  type='text' 
                            value={this.state.name} 
                            name='name' 
                            id='name' 
                            onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor='email'>email</label>
                    <input 
                        type='text'
                        value={this.state.email}
                        id='email'
                        name='email'
                        onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor='mobile'> mobile</label>
                    <input
                        type='text'
                        value={this.state.mobile}
                        id='mobile'
                        name='mobile'
                        onChange={this.handleChange}
                    />
                    <br />
                    <input type='submit' value='submit' />
                </form>
            </div>
        )
    }
}