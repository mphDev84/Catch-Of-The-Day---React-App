import React from 'react';
import PropTypes from 'prop-types'
import {formatPrice} from '../helpers';
import { TransitionGroup, CSSTransition} from 'react-transition-group';//import these for animations

class Order extends React.Component{

    //for the Data validation below, we can go further and shape out the object Prop Types like in Fish.js etc
    static propTypes={
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };

renderOrder=(key)=>{
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status ==="available";//make sure 'fish' is loaded AND available!!
    const transitionObptions = {//this acts like component props for <CSSTransition> below
        classNames:"order", 
        key:key, 
        timeout:{enter:500, exit:500}
    };

    if(!fish) return null;
    //we set this return of the 'if' statement to null so that while the page waits for firebase to return
    //the set of fishes, there is no order displayed, then the fishes come in from firebase and the local
    //storage can reload the order, based on the fishes that the page now has back. 
    if(!isAvailable){
    return  (
            <CSSTransition {...transitionObptions}>{/**spread props in */}
            <li key={key}>
            Sorry {fish ? fish.name: 'fish'} is no longer available
            </li>
            </CSSTransition>
    );
    };
    return (
        //css animation settings:
        <CSSTransition {...transitionObptions}>
        <li key={key}>
        <span>{/**span used here for CSS purposes */}

    <TransitionGroup component="span" className="count">
    <CSSTransition 
        classNames="count" 
        key={count}
        timeout={{enter:500, exit:500}}>
    <span>{count}</span> 
    </CSSTransition>
    </TransitionGroup>

        lbs {fish.name}
        {formatPrice(count*fish.price)}
        <button onClick={()=>this.props.removeFromOrder(key)}>&times;</button>
    </span>
    </li>
    </CSSTransition>
    );
};
//above, we separated out the rendering (renderOrder) into a function that can be called below -- cleaner code!

    render() {

        const orderIds = Object.keys(this.props.order);//gets the key for each fish order.
        const total = orderIds.reduce((prevTotal, key)=>{
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status ==="available";

            if(isAvailable){
                return prevTotal+(count*fish.price);
            }
                return prevTotal;
            
        }, 0);
       
        return (

            <div className ="order-wrap">
               <h2>Order</h2> 
               <TransitionGroup component="ul"  className='order'>
                   {orderIds.map(this.renderOrder)} 
        {/**Using map to map over each order, using key as argument, then displaying key */}
               </TransitionGroup>
              <div className='total'>
              Total:
                  <strong>{formatPrice(total)}</strong>
              </div>
            </div>
        );
    }
}
export default Order;