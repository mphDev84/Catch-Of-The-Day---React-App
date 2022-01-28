import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component{

    nameRef=React.createRef();
    priceRef=React.createRef();
    statusRef=React.createRef();
    descRef=React.createRef();
    imageRef=React.createRef();

    //propType data validation
    static propTypes ={
        addFish: PropTypes.func.isRequired
    };

    createFish=(event)=>{
        event.preventDefault();//stop form from submitting
        //lets make our fish!

        const fish ={
            name:this.nameRef.current.value,
            price:parseFloat(this.priceRef.current.value),//using parseFloat for money here, storing all as cents
            status:this.statusRef.current.value,
            desc:this.descRef.current.value,
            image:this.imageRef.current.value,
        }
        this.props.addFish(fish);
        //refresh the form after user entry - here, currentTarget is the form itself
        event.currentTarget.reset();

    /**Now we need to push all this fish data into 'state'. Since App.js is the parent component, and can
     * pass data along to its children (i.e. header, inventory, order etc), we can set up the state in App.js
     * and pass whatever data when it is neccessary
     */
    }

    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>

            <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
            <input name ="price" ref={this.priceRef} type="text" placeholder="Price" />
            <select name ="status" ref={this.statusRef}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea name ="desc" ref={this.descRef} placeholder="Desc"></textarea>
            <input name = "image" ref={this.imageRef} type="text" placeholder="Image" />
            <button type="submit">+ Add Fish</button>

            </form>
        );
    }
}

export default AddFishForm;