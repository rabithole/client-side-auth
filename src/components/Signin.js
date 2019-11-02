import React, { useState } from "react"
import api from "../utils/api"

function Signin(props) {
/*ERROR*/	
	const [error, setError] = useState() // For error messeages from the API. Not sure why this is... 
	const [data, setData] = useState({ // Part of making inputs controlled
		email: "",
		password: "",
	}) // Part of making inputs controlled

// HandleChange function connects the input fields to state making it controlled by react. 
	const handleChange = (event) => { // Part of making inputs controlled
		setData({ // setData sets state
			...data, // Makes the object immutable. 
/*Input target*/
				[event.target.name]: event.target.value, // This is a key value pair. 
			// the above is the same as setting an object. 
			// Ex. input name = email: input value = pedalinon@gmail.com
			// Simplified: name: pedalion@gmail.com is an object set to state. 
		})
	} // Part of making inputs controlled

// Input target
	const handleSubmit = (event) => {
		event.preventDefault()

		// We are using are axios instance with predefined values,
		// rather than just plain old axios
		api() // axios is being accessed through utils/api.js 
			.post("/signin", data) // signin is an endpoint // baseURL from api.js is inserted before /me.
			.then(result => {
				// Store our new token in local storage so it persists
				console.log(result); // token object returned from the server. 
				localStorage.setItem("auth_token", result.data.token)  
				// Redirect the user to their account page after logging in
				props.history.push("/account")
			})
			.catch(err => {
/*ERROR*/		setError(err.response.data.message) // Error response handling... The shape of this error object depends on the API we are using. 
			})
	}
	
	return (
		<form onSubmit={handleSubmit}> {/*handleSubmit accesses the API*/}
	{/*This will display the error if the API returns and error. It is connected to state above somehow.*/}
{/*ERROR*/}	{error && <div className="error">{error}</div>} 

			<input 
				type="email" 
				name="email" 
				placeholder="Email" 
// Input target
				value={data.email} // Attaches to event.target.value in handleChange function.
// Handle change sets state
				onChange={handleChange} // Part of making inputs controlled
			/>
			<input 
				type="password" 
				name="password" 
				placeholder="Password" 
// Input target
				value={data.password} // Attaches to event.target.value in handleChange 
// Handle change sets state			
				onChange={handleChange} // Part of making inputs controlled
			/>

			<button type="submit">Sign In</button>
		</form>
	)
}

export default Signin