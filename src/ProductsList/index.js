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
					<Card.Header>name: {product.name}</Card.Header>
						<Card.Description>flavors: {product.flavors}</Card.Description>
						<Card.Content>
		        			quantity: {product.quantity}
		        			<br/>
		        			price: $ {product.price}
		    			</Card.Content>
						<Card.Content>
		        			buissness: {product.user.bussiness}
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
