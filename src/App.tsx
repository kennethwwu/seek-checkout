import React from 'react';
import { Container } from 'react-bootstrap'
import ItemList from './component/itemList/itemList'
import CheckoutList from './component/checkoutList/checkoutList'
import CheckoutTotal from './component/checkoutTotal/checkoutTotal'
import Navbar from './component/navbar/navbar';
import userContext, { useUser } from './store/userContext'
import checkoutContext, { useCheckout } from './store/checkoutState'
import './App.css';

const App: React.FC = () => {
  const { user, setNewUser } = useUser();
  const co = useCheckout();

  return (
    <userContext.Provider value={{ user, setUser: setNewUser }}>
      <checkoutContext.Provider value={co}>
        <Container className={'App'}>
          <Navbar />
          <ItemList />
          <CheckoutList />
          <CheckoutTotal />
        </Container>
      </checkoutContext.Provider>
    </userContext.Provider>
  );
}

export default App;
