import React from 'react';
import './App.css';
import ProductsContainer from './ProductsContainer'
import LoginRegisterForm from './LoginRegisterForm'
import ProductsList from './ProductsList'
import LikesContainer from './LikesContainer'
import Header from './Header'

// list-productList
// login-loginRegisterForm
// products-productsContainer
class App extends React.Component {
  constructor(){
    super()
    this.state={
      loggedIn: false,
      loggedInUserEmail: '',
      loggedInUserId: '',
      products: [],
      clicked: false,
      myProducts:false,
      views: 'list',
      likes: []
    }
  }
  componentDidMount = () =>{
    this.getProducts()
    this.getLikes()
  }
  register = async(registerInfo) =>{
    const url = process.env.REACT_APP_API_URL + "/api/v1/users/register"
    try{ 
      const registerResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(registerInfo),
        headers:{
          'content-type': 'application/json'
        }
      })
        const registerJson = await registerResponse.json()
        if(registerResponse.status === 201){
          this.setState({
            loggedIn: true,
            loggedInUserEmail: registerJson.data.email,
            views: "list"
        })
      }
      
    
    }catch(err){
      console.log(err)  
    }
  }
  login = async(loginInfo) =>{
    const url = process.env.REACT_APP_API_URL + "/api/v1/users/login" 
    try{
      const loginResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers:{
          'content-type': 'application/json'
        }
      })
        const loginJson = await loginResponse.json()
        if(loginResponse.status === 200){
          this.setState({
            loggedIn: true,
            loggedInUserEmail: loginJson.data.email,
            loggedInUserId: loginJson.data.id,
            views: "products"
          })
        }
    }catch(err){
      console.log(err)  
    }
  }
  logout = async () =>{
    try{
      const url = process.env.REACT_APP_API_URL + "/api/v1/users/logout"
      const logoutResponse = await fetch(url,{
        credentials: 'include'
      })
      const logoutJson = await logoutResponse.json()
      if(logoutResponse.status === 200){
        this.setState({
          loggedIn: false, 
          loggedInUserEmail: '',
        })

      }
    
    }catch(err){
      console.log(err)  
    }
  }
  getProducts = async () => {
    try{
      const url = process.env.REACT_APP_API_URL + '/api/v1/products/all'
      const productsResponse = await fetch(url,{
        credentials: 'include'
      })
      const productsJson = await productsResponse.json()
      this.setState({
        products: productsJson,
      })
    }catch(err){
      console.log(err)  
    }
  }
  switchViews = (nameOfView) => {
    this.setState({
      views: nameOfView,
    })
    
  }
  getLikes = async (getProducts) => {
    try{
      const url = process.env.REACT_APP_API_URL + "/api/v1/likes/user/"
      const likesResponse = await fetch(url + 1,{
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



  render(){
    console.log("state", this.state);
    return (
      <div className="App">
      <Header
      getProducts={this.clicked}
      logout={this.logout}
      loggedIn={this.state.loggedIn}
      switchViews={this.switchViews}
      />
      {
        
        this.state.views === "products"
        &&
        <ProductsContainer
        userId={this.state.loggedInUserId}
        loggedIn={this.state.loggedIn}
        Myproducts={this.state.myProducts}
        />


      }
        {
        this.state.views === "login"
        &&
        <LoginRegisterForm 
        register={this.register}
        login={this.login}
        />
        }
      {

        this.state.views === "list"
        &&
        <div>
        <ProductsList
        products={this.state.products}
        likes={this.state.likes}
        />

        <LikesContainer/>
        </div>


      }
      </div>
    );

  }
}




export default App;
