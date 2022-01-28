import React from 'react';
import PropTypes from 'prop-types';
import { object } from 'prop-types';

class EditFishForm extends React.Component{

    static propTypes ={
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func,
    }

handleChange = (event) =>{//user enters some data in the fields
console.log(event.currentTarget.name); 
//update that fish
//1. take a copy of the current fish
const updatedFish = {
    ...this.props.fish,
    //overwrite the value that is currently in state for whatever the user entered
    [event.currentTarget.name]: event.currentTarget.value //user-input value
};
this.props.updateFish(this.props.index, updatedFish);//update fish and send data upstream to App.js

};
    render() {
        return (
            <div className='fish-edit'>
            {/**Here, our inputs have values set to the STATE values, in App.js. If a change is made
            the onChange method kicks in, but react prevents any changes to STATE. See above */}
            <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} />
            <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price} />
            <select type="text" name="status" onChange={this.handleChange} value={this.props.fish.status}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea type="text" name="desc" onChange={this.handleChange} value={this.props.fish.desc} />
            <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} />

            <button onClick={()=>this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div>
        )
    }


}

export default EditFishForm;
/**NOTE--- DOING this: <input type="text" name="name" value={this.props.fish.name} /> 
 * 
 * means that STATE now exists in TWO places - App.js, and above. This is because we passed state down to 
 * EditFishForm and React throws an error when trying to update state in two places like that. State 
 * should only be accessed/changed in the App component. To overcome this, we code an 'onChange' event. 
*/