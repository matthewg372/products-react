import React from 'react'
import { Form, Button, Label} from 'semantic-ui-react'



class LoginRegisterForm extends React.Component{
	constructor(){
		super()
		this.state={
			email: '',
			password: '', 
			username: '',
			buissness: '',
			action: 'login'
		}
	}

	render(){
		return(
			<React.Fragment>
			<h2>{this.state.action} Here</h2>
			<Form onSubmit={this.handleSubmit}>
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
			</Form>
			{
				this.state.action === "Login"
				?
				<p>Need an account? Sign Up <span className="fake-link" onClick={this.switchForm}>Here.</span></p>
				:
				<p>Already have an account? Log In <span className="fake-link" onClick={this.switchForm}>Here.</span></p>
			}


			</React.Fragment>

		)
	}


}

export default LoginRegisterForm