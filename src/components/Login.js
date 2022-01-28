import React from 'react';
import PropTypes from 'prop-types';

//we'll use a stateless functional component again here: NOTE regular brackets, not curly.
//Also, since it is an SFC, we must pass props as an argument, then access them WITHOUT the 'this' keyword
const Login =(props)=>(
    <nav className='login'>
        <h2>Inventory Login</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className='github' onClick={()=> props.authenticate('Github')}>Log In With GitHub</button>
                                    {/**Note we must use capitals for the Github in the function */}
        <button className='facebook' onClick={()=> props.authenticate('Facebook')}>Log In With Facebook</button>
    </nav>
);

Login.propTypes={
    authenticate: PropTypes.func.isRequired
}

export default Login;
