import React from 'react'
import ProductsList from '../ProductsList'
import NewProductForm from '../NewProductForm'
import EditProductModal from '../EditProductModal'


class ProductsContainer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			products: [],
			idOfProductToEdit: -1

		}
	}
	componentDidMount(){
		this.getProducts()
	}
	getProducts = async () => {
		try{
			const url = process.env.REACT_APP_API_URL + '/api/v1/products/all'
			const productsResponse = await fetch(url,{
				credentials: 'include'
			})
			const productsJson = await productsResponse.json()
			this.setState({
				products: productsJson
			})
		}catch(err){
			console.log(err)	
		}
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






	render(){
		return (
			<React.Fragment>
				<ProductsList 
				products={this.state.products}
				deleteProduct={this.deleteProduct}
				editProduct={this.editProduct}
				/>
				{
				this.props.loggedIn
				&&
				<NewProductForm
				addProduct={this.addProduct}
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