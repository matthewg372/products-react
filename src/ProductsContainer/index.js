import React from 'react'
import NewProductForm from '../NewProductForm'
import EditProductModal from '../EditProductModal'
import UsersProducts from '../UsersProducts'
import LikesContainer from '../LikesContainer'
import {Button} from 'semantic-ui-react'

class ProductsContainer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			products: [],
			idOfProductToEdit: -1,
			usersId: '',
			myProducts: false

		}
	}
	componentDidMount(){
		this.setState({
			usersId: this.props.userId,
		})
		this.getUsersProducts()
	}
	addProduct = async (productToAdd) => {
		try{
			const url = process.env.REACT_APP_API_URL + '/api/v1/products/'
			const createProductResponse = await fetch(url,{
				credentials: 'include',
				method: 'POST',
				headers:{
					'content-type': 'application/json'
				},
				body: JSON.stringify(productToAdd)
			})
			const createProductJson = await createProductResponse.json()
			if(createProductResponse.status === 201){
				this.setState({
					products:[...this.state.products, createProductJson]
				})
			}
			this.getProducts()
		
		}catch(err){
			console.log(err)	
		}
	}
	editProduct = (editProduct) => {
		this.setState({
			idOfProductToEdit: editProduct

		})
	}
	closeModal = () =>{
		this.setState({
			idOfProductToEdit: -1
		})
	}
	deleteProduct = async (productToDelete) =>{
		try{
			const url = process.env.REACT_APP_API_URL + '/api/v1/products/'
			const deleteProductResponse = await fetch(url + productToDelete,{
				credentials: 'include',
				method: 'DELETE'
			})
			const deletedProductJson = await deleteProductResponse.json()
			if(deleteProductResponse.status === 200){
				this.setState({
					products: this.state.products.filter(product => product.id != productToDelete)
				})
			}
		}catch(err){
			console.log(err)	
		}
	}
	updateProduct =  async (productToUpdate) => {
		const url = process.env.REACT_APP_API_URL + '/api/v1/products/' + this.state.idOfProductToEdit
		try{
			const updateProductResponse = await fetch(url ,{
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(productToUpdate),
				headers:{
					'content-type': 'application/json'
				}
			})
			const updateProductJson = await updateProductResponse.json()
			if(updateProductResponse.status === 200){
				const products = this.state.products
				const indexOfCarBeingUpdated = products.findIndex(product => product.id == this.state.idOfProductToEdit)
				products[indexOfCarBeingUpdated] = updateProductJson.data
				this.setState({
					products: products,
					idOfProductToEdit: -1
				})
			}
		}catch(err){
			console.log(err)	
		}
	}
	getUsersProducts = async () => {
		try{
			const url = process.env.REACT_APP_API_URL + '/api/v1/products/users/' + this.props.userId
			console.log(url);
			const productsResponse = await fetch(url,{
				credentials: 'include'
			})
			const productsJson = await productsResponse.json()
			console.log(productsJson.data);
			this.setState({
				products: productsJson.data,
				myProducts: true,
			})
		}catch(err){
			console.log(err)	
		}
	}
	render(){
		return (
			<React.Fragment>
				{
				this.props.loggedIn
				&&
				<div>
				<NewProductForm
				addProduct={this.addProduct}
				/>
				</div>
				}

				{
				this.state.myProducts
				&&
				<UsersProducts 
				products={this.state.products}
				deleteProduct={this.deleteProduct}
				editProduct={this.editProduct}
				/>
				}

				{
				this.state.idOfProductToEdit !== -1
				&&
				<EditProductModal
				updateProduct={this.updateProduct}
				editProduct={this.state.products.find((product) => product.id === this.state.idOfProductToEdit)}
				/>
				}
			</React.Fragment>


		)
	}



}

export default ProductsContainer