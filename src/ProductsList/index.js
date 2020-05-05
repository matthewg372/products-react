import React from 'react'
import { Card , Feed, Button} from 'semantic-ui-react'
import LikesContainer from '../LikesContainer'
import './index.css'

export default function PoductsList(props){
		
	const likes = props.likes.map(like => {
		const liked = 0
		return(
			<Feed key={like.id}>
				<Feed.Like>
					<Button><icon name='like'/>{like.likes}</Button>
				</Feed.Like>
			</Feed>
		)
	})
	const products = props.products.map(product => {
		return (
			<Card  key={product.id} >

				<Card.Content >
					<Card.Header>Name: {product.name}</Card.Header>
						<Card.Description>Flavors: {product.flavors}</Card.Description>
						<Card.Content>
		        			Quantity: {product.quantity}
		        			<br/>
		        			Price: $ {product.price}
		    			</Card.Content>
						<Card.Content>
		        			Business: {product.user.bussiness}
		    			</Card.Content>
		    			<br/>
		    			
	    		</Card.Content>

			</Card>
		)
	})
	return (
		<div className="segment">
			<div>
				{products}
			</div>
		</div>
	)

}
