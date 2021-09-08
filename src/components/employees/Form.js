import React from 'react'
import axios from '../../config/axios'

export default class EmployeeForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            email:'',
            mobile:'',
            department:'',
            departments:[]
        }
    }

    componentDidMount(){
        console.log('form-CDM')
        axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            console.log('form-CDM')
            const departments= response.data
            this.setState({departments})
        })
        .catch(error=>console.log(error))
    }

    handleChange = e =>{
        console.log('form-handleChange')
        this.setState({
            [e.target.name]: e.target.value
        },()=>{
            console.log(this.state)
        })
    }

    handleSubmit =e=>{
        e.preventDefault()
        const formData ={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            departments:this.state.departments,
            department:this.state.department
        }

        this.props.handleSubmit(formData)
    }

    render(){
        return(
            <div>
                <h2>Employee form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">name</label>
                    <input 
                        type="text" 
                        value={this.state.name} 
                        name='name' 
                        id='name' 
                        onChange={this.handleChange} 
                    />
                    <br />
                    <label htmlFor="email">email</label>
                    <input 
                        type="text" 
                        value={this.state.email} 
                        name='email' 
                        id='email' 
                        onChange={this.handleChange} 
                    />
                    <br />
                    <label htmlFor="mobile">mobile</label>
                    <input 
                        type="text" 
                        value={this.state.mobile} 
                        name='mobile' 
                        id='mobile' 
                        onChange={this.handleChange} 
                    />
                    <br />
                    <label htmlFor="department">department</label>
                        <select name="department" id="department" 
                                value={this.state.department}             
                                onChange={this.handleChange}>
                            <option value="">select</option>
                            {this.state.departments.map(department=>{
                                return <option key={department._id} value={department._id}>{department.name}</option>
                            })}
                        </select>
                    <br />
                    <input type="submit" value='add' />
                </form>
            </div>
        )
    }
}