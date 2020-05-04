import React from 'react'
import { Form, Button, Label} from 'semantic-ui-react'

const form = {
	display: "flex",
	flexDirection: "column",
	width: "60%",
	paddingLeft: "40%"


}


class LoginRegisterForm extends React.Component{
	constructor(){
		super()
		this.state={
			email: '',
			password: '', 
			username: '',
			bussiness: '',
			action: 'Login'
		}
	}
	switchForm = () =>{
		if(this.state.action === "Login"){
			this.setState({action: "Register"})
		}else{
			this.setState({action: "Login"})
		}
	}
	handleChange = (e) =>{
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		if(this.state.action === "Register"){
			this.props.register(this.state)
		}else{
			this.props.login(this.state)
		}
		
	}

	render(){
		return(
			<React.Fragment >
			<Form onSubmit={this.handleSubmit} style={form}>
			<h2>{this.state.action} Here</h2>
			{
				this.state.action === "Register"
				&&
				<React.Fragment>
				<Label>Username:</Label>
				<Form.Input
				type="text"
				name="username"
				placeholder="enter username"
				value={this.state.username}
				onChange={this.handleChange}
				/>
				<Label>bussiness:</Label>
				<Form.Input
				type="text"
				name="bussiness"
				placeholder="enter bussiness"
				value={this.state.bussiness}
				onChange={this.handleChange}
				/>
				</React.Fragment>

			}
				<Label>Email:</Label>
				<Form.Input
				type="text"
				name="email"
				placeholder="enter email"
				value={this.state.email}
				onChange={this.handleChange}
				/>
				<Label>password:</Label>
				<Form.Input
				type="password"
				name="password"
				placeholder="enter password"
				value={this.state.password}
				onChange={this.handleChange}
				/>
				<Button type="submit">
				{this.state.action === "Login" ? "Log In" : "sign up"}
				</Button>
			{
				this.state.action === "Login"
				?
				<p>Need an account? Sign Up <span className="fake-link" onClick={this.switchForm}>Here.</span></p>
				:
				<p>Already have an account? Log In <span className="fake-link" onClick={this.switchForm}>Here.</span></p>
			}
			</Form>


			</React.Fragment>

		)
	}


}

export default LoginRegisterForm