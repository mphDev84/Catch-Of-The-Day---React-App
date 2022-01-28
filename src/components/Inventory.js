import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component{

    static propTypes ={
        fishes: PropTypes.shape({
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }),
        updateFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
        loadSampleFishes: PropTypes.func.isRequired
    };

    state={
        uid:null,
        owner:null
    };

    /**we want to listen for componentDidMount so that the program can check whether we are still logged
     * in if the page is refreshed:
     */
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.authHandler({user});//pass the logged in user to out authHandler()
            };
        });
    };

    authHandler= async (authData)=>{
        //1. Look up the current store in firebase DB
    const store = await base.fetch(this.props.storeId, {context:this}); //we put await infront so that the store is in the variable, not the promise from the fetch() function
    console.log(store)//outputs all the fishes in that particular store
        //2. Claim it if there is no onwer
        if(!store.owner){
            //save it as our own - i.e. push to firebase
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid //go to Dev tools and branch out the auth data of the user who signed in -- uid is a unique identifier for that user
            });
        };
        //3. Set state of inventory to reflect current user
        //the below code will figure out whether the user signed in is the owner, or someone else.
        //note, we are accessing state outside of App.js, but is ok since it is localized to Inventory.js
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    console.log(authData)
    };

    authenticate=provider=>{
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();//essentially .authFacebookauthProvider etc
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);//data is passed to authHandler after user login
    };

    logout = async() =>{
        console.log("logging out!"),
        await firebase.auth().signOut();
        this.setState({ uid:null });
    };

    render() {

        //HERE IS THE LOGOUT BUTTON--------------------------------------
        const logout = <button onClick={this.logout}>Log Out!</button>

        //check if they are logged in
        if(!this.state.uid){//basically, if no one is logged on
        return <Login authenticate={this.authenticate} />
        };
        //check if they are not the owner of the store
        if(this.state.uid !== this.state.owner){
            return <div>
                <p>Sorry, you are not the owner of the store!</p>
                {logout}{/**here is out logout button, and below also */}
            </div>
        }

        /*i.e. if no user is logged on, the login section is rendered, user logs in, the code checks if the 
        user is the owner of that store page. If yes, the inventory is rendered*/
        return (

            <div className ="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key=> 
                <EditFishForm 
                key={key} 
                index={key}
                fish={this.props.fishes[key]} 
                updateFish={this.props.updateFish}
                deleteFish={this.props.deleteFish}    
                />)}
                <AddFishForm addFish={this.props.addFish} /> 
            <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            
            {/**Note about above-addFish is being passed down from parent app.js. It was first passed
            to Inventory in App.js (line 29), adding it to Inventory's 'props'. Now it is passed down
            again to addFishForm, but we must include props in the call. */}
            </div>
        );
    }
}
export default Inventory;