import React from 'react'
import {Form, Button, Label, Modal, Header} from 'semantic-ui-react'

class NewProductForm extends React.Component{
	constructor(){
		super()
		this.state={
			name: '',
			flavors: '',
			price: '',
			quantity: ''
		}
	}

render(){
		return(
			<Modal closeIcon={true} trigger={<Button>Add new</Button>}>
			<Header>
        	enter new info
      		</Header>
      		<Modal.Content >
			<Form onSubmit={this.handleSubmit}>
				<Label>name:</Label>
				<Form.Input
					type='text'
					name='name'
					value={this.state.name}
					onChange={this.handleChange}
				/>
				<Label>flavors:</Label>
				<Form.Input
					type='text'
					name='flavor'
					value={this.state.flavor}
					onChange={this.handleChange}
				/>
				<Label>quantity:</Label>
				<Form.Input
					type='text'
					name='quantity'
					value={this.state.quantity}
					onChange={this.handleChange}
				/>
				<Label>price:</Label>
				<Form.Input
					type='text'
					name='price'
					value={this.state.price}
					onChange={this.handleChange}
				/>
				<Button type='Submit'>Add</Button>
			</Form>
			</Modal.Content>
			</Modal>

		)
	}

}
export default NewProductForm