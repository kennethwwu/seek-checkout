import React, { useContext } from 'react'
import { Col, Card, Button } from 'react-bootstrap'
import { Item } from '../../types/item'
import checkoutContext from '../../store/checkoutState'

function ItemComponent(props: Item) {
    const { name, desc, retailPrice, id } = props;
    const checkout = useContext(checkoutContext);
    const add = (id: Number) => {
        checkout.add(id);
    }

    return (
        <Col sm={12} md={4} className={'mb-2'}>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {name}
                        <span className={'border border-primary float-right'}>${retailPrice}</span>
                    </Card.Title>
                    <Card.Text className={'text-truncate'}>{desc}</Card.Text>
                    <Button
                        variant="primary"
                        aria-label={name}
                        onClick={() => add(id)}
                    >Add To Cart</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ItemComponent
