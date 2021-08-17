import items from '../dataMock/items'
import { Item, CheckListItem } from '../types/item'

export const getProduct = (id: number): Item | null => {
    return items.find(item => item.id === id) ?? null;
}

export const getTotal = (checkListItems: CheckListItem[]): number => {
    let total = 0;
    for (let item of checkListItems) {
        const [id, qty] = item;
        const product = getProduct(id)
        if (product != null) {
            total += Number(product.retailPrice) * qty
        }
    }
    return total;
}