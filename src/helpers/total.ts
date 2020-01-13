import Items from '../dataMock/items'
import { Item } from '../types/item'

export const getProduct = (id:Number):Item|null => {
    for(let item of Items){
        if(item.id == id) return item
    }
    return null
}

export const getTotal = (checkListItems:any[]):any => {
    let total = 0;
    for(let item of checkListItems){
        const [id, qty] = item;
        const product = getProduct(id)
        if(product != null){
            total += Number(product.retailPrice)*qty
        }
    }
    return total;
}