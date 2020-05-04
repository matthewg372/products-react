import React from 'react'
import {Form, Button, Label, Modal, Header} from 'semantic-ui-react'


class EditProductModal extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			name: props.editProduct.name,
			flavors: props.editProduct.flavors,
			price: props.editProduct.price,
			quantity: props.editProduct.quantity

		}

	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
		
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.updateProduct(this.state)
	}

	render(){
		return(
			
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
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
					name='flavors'
					value={this.state.flavors}
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









export default EditProductModal