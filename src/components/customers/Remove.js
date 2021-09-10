// import React from 'react'

// import axios from '../../config/axios'

// export default class CustomerRemove extends React.Component{
//     constructor(){
//         super()
//         this.state={
//             customers:[]
//         }
//     }

//     componentDidMount(){
//         const id = this.props.match.params.id
//         axios.delete(`/customers/${id}`,{
//             headers:{
//                 'x-auth':localStorage.getItem('token')
//             }
//         })
//         .then(response=>{
//             const customers= response.data
//             this.setState({customers})
//         })
//         .catch(error=>console.log(error))
//     }

//     render(){
//         return(
//             <div>
//                 <h2>Remove customer</h2>
                
//             </div>
//         )
//     }
// }