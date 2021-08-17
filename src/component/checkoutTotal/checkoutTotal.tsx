import React, { useContext } from 'react'
import { Row, Col } from 'react-bootstrap'
import checkoutContext from '../../store/checkoutState'

function CheckoutTotal() {
    const checkout = useContext(checkoutContext);

    return (
        <Row>
            <Col className={'text-right'}>
                {checkout.discount >0 && <p className={'text-danger'}>Save: -${(checkout.discount).toFixed(2)}</p>}
                <p data-testid="total">Total: <em>${(checkout.total-checkout.discount).toFixed(2)}</em></p>
            </Col>
        </Row>
    )
}

export default CheckoutTotal
