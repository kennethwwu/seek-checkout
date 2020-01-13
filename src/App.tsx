import React, { useContext} from 'react';
import userContext from './store/userState'
import { Container } from 'react-bootstrap'
import ItemList from './component/itemList/itemList'
import CheckoutList from './component/checkoutList/checkoutList'
import CheckoutTotal from './component/checkoutTotal/checkoutTotal'
import Navbar from './component/navbar/navbar'
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";
import './App.css';

const App: React.FC = () => {
  const user = useContext(userContext);
  return (
    <Container className={'App'}>
      <Navbar />
      <ItemList />
      <CheckoutList />
      <CheckoutTotal />
    </Container>
  );
}

export default App;
