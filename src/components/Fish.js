import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends React.Component{

    //below is props data validation. We use shape here to define the 'shape' of the object, since what is 
    //being passed down as 'details' is actually the Fish object held in state. We use static here since
    //these prop-types will be used for many instances of Fish, but we only need one set of validation rules.
    static propTypes ={
        details: PropTypes.shape({
            image: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired
        }),
        addToOrder: PropTypes.func //addToOrder is a function!
    };

    handleClick = ()=>{
       this.props.addToOrder(this.props.index);
       //this runs the addToOrder method passed to Fish, using the index key we set up for each fish
    }

    render(){
    //using ES6 destructuring, we can do the following:

    const {image, name, price, desc, status}=this.props.details;//look at component details in dev tools
    const isAvailable = status === "available"; 
        
return <li className='menu-fish'>
    <img src={image} alt={name} />
    <h3 className='fish-name'>{name}
    <span className='price'>{formatPrice(price)}</span> {/**formatPrice method is from 'helpers.js' */}
    </h3>
    <p>{desc}</p>
    <button disabled={!isAvailable} onClick={this.handleClick}>
    {isAvailable ? "Add To Order" : "Sold Out!"}</button>
</li>
    }
}

export default Fish;