import React from 'react'

function FormError(props){
    return(
        <div style={{color:'red'}}>
            <h2>These errors prohibitted form submission</h2>
            <ul>
                {/* converting object to array - Object.keys(object to convert) */}
                {Object.keys(props.errors).map((prop,index)=>{
                    return <li key={index}>{prop}- {props.errors[prop]['message']} </li>
                    // {props.errors- object, to access key from object as we aremaking use of map, we have to use []... 
                //      props.errors[prop][message] OR ----- props.errors[prop].messages        }
                })}
            </ul>
        </div>
    )
}

export default FormError