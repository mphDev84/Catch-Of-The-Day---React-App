import React from 'react';//first thing we need!
import PropTypes from 'prop-types';
import Header from './Header';//import here instead of index.js, as it is only needed here
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from "../base";//so we can mirror to DB

class App extends React.Component{

    //we need to create state now, and move the data from the form in. We set an INITIAL state:
    //state and the methods that update state must be in same component

    state = {
        fishes:{},
        order:{}
    };

    //proptype data validation for this.props.match --- only props in this component
    static propTypes ={
        match: PropTypes.object.isRequired
    };

    //now we need to sync with the DB:
componentDidMount(){
    const {params}= this.props.match;//check path on dev tools!
    //WE MUST re-instate local storage here, otherwise it is overwritten when page refreshes
    const localStorageRef = localStorage.getItem(params.storeId);
    
    if(localStorageRef){
        this.setState({order: JSON.parse(localStorageRef)});
    }
    //we do '/fishes' to get to the fishes object which we need to mirror to the DB
    this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
    });
};

componentDidUpdate(){
    console.log("updated");
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    //above has two args - the key name (store Id), and the state/item/key value we want to store
    //check above path on Dev Tools! state.order is an object, so we must use stringify to extract the data
    console.log(this.state);
}

//this method unmounts the app when user back-pages out of current state/DB mirror
componentWillUnmount(){
    base.removeBinding(this.ref);
};
    //below is how we add to state - three step process:
addFish = (fish)=>{
    //1-take a copy of exisiting state - we don't want to modify it directly
    const fishes = {...this.state.fishes};//use spread
    //2-add new fish to fishes variable/object- using date.now here gives a unique value to each fish
    fishes[`fish${Date.now()}`]=fish;//this 'fish' is taken from addFishForm.js data, i.e user input
    //3 - set new fishes object to state
    this.setState({
        fishes:fishes //can also say just 'fishes'. Also, note we are updating a PIECE of state (no 'order' yet)
    });
//the above setState call basically overrides the initially set state above (line 11), populates with data;
};

updateFish = (key, updatedFish) =>{
    //take a copy of the current state
    const fishes = {...this.state.fishes};
    //update that state
    fishes[key]=updatedFish;
    //set to state
    this.setState ({fishes:fishes});
};

deleteFish = (key)=>{
    //take a copy of state
    const fishes = {...this.state.fishes};
    //update state
    fishes[key]=null;
    //update state
    this.setState({fishes:fishes});
}

loadSampleFishes = ()=>{
   this.setState({fishes:sampleFishes});
};

addToOrder = (key)=>{ //we need to be able to use and access 'key', but we can't without passing it as a prop
    //1.Take a copy of state:
    const order = {...this.state.order};
    //2.add to order/update number in order
    order[key] = order[key] +1 || 1; // increments count of whatever fish is in order
    //3. call setState to update order state
    this.setState({ order:order });
};

removeFromOrder = (key)=>{
    //1.Take a copy of state:
    const order = {...this.state.order};
    //2.remove this item from order
    delete order[key]; // increments count of whatever fish is in order. We can use delete because no Firebase here, we use local storage
    //3. call setState to update order state
    this.setState({ order:order });
}
//NOTE = ALL METHODS/DATA is passed to components via PROPS
//REMEMBER TO MANUALLY CHECK METHODS in dev tools, using '$r.${methodName("whatever args")}'


render (){
    return (
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market" age={500} cool="true"/>
             
              {/*  <Header tagline="Wes Is Cool" />   this creates ANOTHER INSTANCE of Header */}
            <ul className="fishes">
            {Object.keys(this.state.fishes).map(key=> 
            <Fish 
            key={key} 
            index={key}//this allows us to pass the 'key' as a prop, otherwise we have no access. DEV TOOLS
            details={this.state.fishes[key]} 
            addToOrder={this.addToOrder}    
            />
            )} {/**Object.keys gives us each fish key for each fish object, i.e fish1, fish2 etc */}

            </ul>
            
            </div>
            <Order 
            fishes={this.state.fishes} 
            order={this.state.order}
            removeFromOrder={this.removeFromOrder}    
            />
            <Inventory 
            addFish={this.addFish} 
            updateFish={this.updateFish}
            deleteFish={this.deleteFish}
            loadSampleFishes={this.loadSampleFishes} 
            fishes = {this.state.fishes}  
            storeId = {this.props.match.params.storeId} //pass the store name to Inventory.js
            />
        </div>
    );
}
}
export default App;

/**A NOTE ON PROPS AND STATE - state is where the data is held, its home if you like.
 * PROPS are how that data gets manipulated and moved to another end point
 */
/**ANOTHER NOTE == Refer to 'helpers.js' for reg JS functions that operate on the site, but are not
 * unique to React and don't need to be rendered as components
 */
/**PASSING STATE: <Order fishes {...this.state}/> --- this will pass ALL of state to Order, but we might
 * not want that when we add more things to state, but don't want that new data passed. We should only be
 * passing data that we explicitly need!
 */
