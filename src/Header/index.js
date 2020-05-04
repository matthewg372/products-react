import React from 'react'
import {Menu} from 'semantic-ui-react'


function Header(props){
	const headerStyle = {
	    textAlign: "right",
	    padding: "10px",
	    color: "white",
	    backgroundColor: "black"
	  }
	const divStyle = {
	    textAlign: "center",
	    padding: "10px",
	    color: "white",
	    backgroundColor: "black"
	  }	
	return(
		<div style={divStyle}>
			<h1>Find New Workout Products</h1>
		<Menu >

			<Menu.Item 
			name="All Products"
			onClick={() => props.switchViews("list")}>
			All Products
			</Menu.Item>
			{
			props.loggedIn
			&&
			<Menu.Item onClick={() => props.switchViews("products")}> My Products </Menu.Item>
			}
			{
			props.loggedIn
			?
			<Menu.Item onClick={props.logout}> Logout</Menu.Item>
			:
			<Menu.Item onClick={() => props.switchViews("login")}> login</Menu.Item>
			}

		</Menu>
		</div>



	)
}
export default Header