import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import userContext, { useUser } from './store/userState'
import checkoutContext, { useCheckout } from './store/checkoutState'

function AppWrapper(){
    const {user, setNewUser} = useUser();

    return (
        <userContext.Provider value={{user, setUser:setNewUser}}>
            <checkoutContext.Provider value={useCheckout()}>
                <App />
            </checkoutContext.Provider>
        </userContext.Provider>
    )
}

ReactDOM.render(
    <AppWrapper />
, document.getElementById('root'));