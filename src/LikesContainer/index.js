import React from 'react'
import { Button, Icon, Label , Feed} from 'semantic-ui-react'


class LikesContainer extends React.Component{
	constructor(props){
		super(props)
		this.state={
			likes:[],
			liked: ''
		}
	}
	componentDidMount = () =>{
		this.getLikes()
	}
	getLikes = async () => {
		try{
			const url = process.env.REACT_APP_API_URL + "/api/v1/likes/user/" + this.props.id
			console.log(url);
			const likesResponse = await fetch(url,{
				credentials: 'include'
			})
			const likesJson = await likesResponse.json()

			this.setState({
				likes: likesJson.data
			})
		
		}catch(err){
			console.log(err)	
		}
	}

	createLike = async () => {
		console.log("Clicked");
		try{
			const url = process.env.REACT_APP_API_URL + '/api/v1/likes/'
			const createProductResponse = await fetch(url + this.state.likes.id,{
				credentials: 'include',
				method: 'POST',
				headers:{
					'content-type': 'application/json'
				},
			})
			const createProductJson = await createProductResponse.json()
			if(createProductResponse.status === 201){
				this.setState({
					liked: 1
				})
			}
			this.getLikes()
		
		}catch(err){
			console.log(err)	
		}
	}


	render(){
		console.log(this.state);
		const liked = this.state.likes.map(like => {
			const liked = 0
				return(
					<span key={like.id}>
						{like.likes}
					</span>
			)
		})
		return(
			<div>
				<Button as='div' labelPosition='right'>
			      <Button icon onClick={this.createLike}>
			        <Icon name='heart' />
			        Like
			      </Button>
			      <Label as='a' basic pointing='left'>
			        {liked}
			      </Label>
			    </Button>
			</div>

		)
	}
}

export default LikesContainer