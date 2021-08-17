import React, {useContext} from 'react'
import checkoutContext from '../../store/checkoutState'
import { Row } from 'react-bootstrap'
import CheckoutListItem from '../checkoutListItem/checkoutListItem'

function CheckoutList() {
    const checkout = useContext(checkoutContext);
    const checkoutListArray = [...checkout.checkoutList]

    return (
        <Row>
            {checkoutListArray.length > 0 && checkoutListArray.map( (item, index) => <CheckoutListItem key={`${index}`} item={item}/>)}
        </Row>
    )
}

export default CheckoutList
