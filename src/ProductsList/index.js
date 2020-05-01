import React from 'react'
import { Segment, List, Button} from 'semantic-ui-react'

export default function PoductsList(props){
	const products = props.products.map(product => {
		return(
			<Segment key={product.id} inverted>
				<List divided inverted relaxed>
				<List.Item>
				<List.Content >
					<List.Header>name: {product.name}</List.Header>
						<List.Description>flavors: {product.flavors}</List.Description>
						<List.Content>
		        			quantity: {product.quantity}
		        			<br/>
		        			price: {product.price}
		    			</List.Content>
		    			<List.Content >
		    			<Button>
		    			Delete
		    			</Button>
		    			</List.Content>
		    			<List.Content >
		    			<Button >
		    			Edit 
		    			</Button>
		    			</List.Content>
	    		</List.Content>
				</List.Item>
				</List>

			</Segment>
		)
	})
	return (
		<div>
			<div>
				{products}
			</div>
		</div>
	)

}