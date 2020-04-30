import React from 'react';
import './App.css';
import ProductsContainer from './ProductsContainer'
import LoginRegisterForm from './LoginRegisterForm'

class App extends React.Component {
  constructor(){
    super()
    this.state={
      loggedIn: false,
      loggedInUserEmail: ''

    }
  }
  register = async(registerInfo) =>{
    const url = process.env.REACT_APP_API_URL + "api/v1/register"
    try{
      const registerResponse = await fetch(url,{
        credentials: 'include',
        methods: 'POST',
        body: JSON.stringify(registerInfo),
        headers:{
          'content-type': 'application/json'
        }
      })
        const registerJson = await registerResponse.json()
        if(registerResponse.status === 200){
          this.setState({
            loggedIn: true,
            loggedInUserEmail: registerJson.data.email
        })
      }
      
    
    }catch(err){
      console.log(err)  
    }
  }
  render(){
    return (
      <div className="App">
      {
        this.state.loggedIn
        ?
        <ProductsContainer/>
        :
        <LoginRegisterForm/>


      }
      </div>
    );

  }
}

export default App;
