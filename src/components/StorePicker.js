import React from 'react';//always need to do this
import PropTypes from 'prop-types';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {//make your sausage :)

    static propTypes = {
        history: PropTypes.object
    };

myInput = React.createRef();//we've just created an empty 'ref' for the form that we can use to touch DOM

goToStore =(event)=>{//arrow function binds the methods much like using the constructor as seen at bottom
event.preventDefault();//this method prevents the HTML form from submitting each time the submit button is pressed 
const storeName = this.myInput.current.value;//can now access "this" instance, taking user input value

this.props.history.push(`/store/${storeName}`);//push to the next page based on user input!
//notice this path to push() above, this comes from looking at props on chrome dev tools

}
    render() {

       /* return React.createElement('p', {className: "hey"}, "this is a sentence");
        above code is a way to create HTML elements in JS using React. Notice the use of
        'className' to assign a class to the element.*/
        return (
        //note, we cannot add sibling elements (separate from other elements) such as:
        //<p>Hello</p>
        //we can, however, do the following to overcome this limitation:
        //we wrap in a React Fragment:

        <React.Fragment>
    
        <form className="store-selector" onSubmit={this.goToStore}> {/**method to visit store page */}
            <h2>Please enter a store</h2>
            <input 
            type="text" 
            ref={this.myInput}//surfaces the input on the component so we can grab it
            required 
            placeholder='Enter a store name' 
            defaultValue={getFunName()}  
            />

            <button type="submit">{`Visit Store->`}</button>
        </form>
        </React.Fragment>
        )
    }
}

/**Note the use of brackets in the snippet 'return (code...)' -- the html is run before the final data
 * is returned. Note, 'return()' would not work as return is not a function. We need the space after return:
 * 'return ()' * 
 */
export default StorePicker;//export sausage!




/**NOTES ABOUt ABOVE:: -- The below is a less efficient way of doing the above when accessing "this"
 * 
 * class StorePicker extends React.Component {//make your sausage :)

constructor(){//this will run before StorePicker component is created
    super();//runs the 'extends' part of the component above, calls those methods
    console.log("gonna create a component");
    this.goToStore = this.goToStore.bind(this);
    //the above 'binding' method is required for us to be able to access the 'this' instance of StorePicker
}

myInput = React.createRef();//we've just created an empty 'ref' for the form that we can use to touch DOM

goToStore(event){
event.preventDefault();//this method prevents the HTML form from submitting each time the submit button is pressed 
console.log(this)//can now access due to binding!
}
 */