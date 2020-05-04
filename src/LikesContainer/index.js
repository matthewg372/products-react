import React from 'react'


class LikesContainer extends React.Component{
	constructor(){
		super()
		this.state={
			likes:[]
		}
	}
	getLikes = async () => {
		try{
			const url = process.env.REACT_APP_API_URL + "/api/v1/likes/"
			const likesResponse = await fetch(url + 1,{
				credentials: 'include'
			})
			const likesJson = await likesResponse.json()
			console.log(likesJson);

			this.setState({
				likes: likesJson.data
			})
		
		}catch(err){
			console.log(err)	
		}
	}


	render(){
		return(
			<div>
				
			</div>

		)
	}
}

export default LikesContainer