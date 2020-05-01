import React from 'react'
import ProductsList from '../ProductsList'
import NewProductForm from '../NewProductForm'


class ProductsContainer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			products: []

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
			const url = process.env.REACT_APP_API_URL + '/api/v1/products'
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
		
		}catch(err){
			console.log(err)	
		}
	}






	render(){
		return (
			<React.Fragment>
				<ProductsList 
				products={this.state.products}
				/>
				{
				this.props.loggedIn
				&&
				<NewProductForm
				addProduct={this.addProduct}
				/>
				}
			</React.Fragment>


		)
	}



}

export default ProductsContainer