import React from 'react';
import { Row, Col} from 'react-bootstrap'
import Items from '../../dataMock/items'
import Item from '../item/item'

function ItemList(): React.ReactElement {
    return (
        <Row>
            { 
                Items.map( (item, index) => <Item key={`${index}`} {...item}/>)
            }
        </Row>
    )
}

export default ItemList
