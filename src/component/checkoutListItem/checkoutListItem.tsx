import React, { useContext } from 'react'
import { Col, InputGroup, Button, FormControl } from 'react-bootstrap'
import { getProduct } from '../../helpers/total'
import checkoutContext from '../../store/checkoutState'

function CheckoutListItem({ item: [id, qty] }: { item: [number, number] }) {
    const displayItem = getProduct(id);
    const checkout = useContext(checkoutContext);
    return (
        <Col xs={12} className={'d-flex flex-row align-items-center mb-3'}>
            <h3 className={'flex-grow-1 mb-0'}>{displayItem && displayItem.name}</h3>
            <InputGroup className="flex-grow-0 mx-3 " style={{ maxWidth: 150 }}>
                <InputGroup.Prepend>
                    <Button
                        variant="danger"
                        onClick={() => checkout.removeOne(id)}
                    >-</Button>
                </InputGroup.Prepend>
                <FormControl
                    type="text"
                    readOnly={true}
                    aria-describedby="basic-addon1"
                    value={`${qty}`}
                />
                <InputGroup.Append>
                    <Button
                        variant="success"
                        onClick={() => checkout.add(id)}
                    >+</Button>
                </InputGroup.Append>
            </InputGroup>
            <Button
                variant="danger"
                className={'flex-grow-0'}
                onClick={() => checkout.remove(id)}
            >Remove</Button>
        </Col>
    )
}

export default CheckoutListItem
