import React, { useState, useEffect } from "react"
import api from "../utils/api"

function Account(props) {
	const [user, setUser] = useState({
		name: "",
		email: "",
	})

// This will set the user data to the state above then it will be displayed in the JSX below. 
	useEffect(() => {
		api().get("/me") // baseURL from api.js is inserted before /me.
			.then(result => {
				setUser({
					name: result.data.name, // this object shape is determined by the API. 
					email: result.data.email,
				}) 
			})
			.catch(error => {
				console.log(error)
			})
	}, [])

	return (
		<>
			<h1>My Account</h1>
		{/*setting state above to populate the DOM with the code below. */ }
			<div className="account-row">Name: {user.name}</div>
			<div className="account-row">Email: {user.email}</div>
		</>
	)
}

export default Account