import { getProduct } from '../helpers/total'
import { Item, CheckListItem } from '../types/item'
import { PriceRule } from '../pricingRules'

export function getDiscountByCheckoutItem([id, qty]: CheckListItem, pricingRules: PriceRule[]) {
    let discount = 0;
    const item = getProduct(id)
    if (item) {
        for (let rule of pricingRules) {
            if (rule.itemId === id) {
                switch (rule.discountType) {
                    case 'x for y':
                        discount = calculateDiscountByXForY(rule as { xQty: number; yQty: number; }, qty, item)
                        console.log('calculateDiscountByXForY ', discount)
                        if (discount) return discount
                        break;
                    case 'discount':
                        discount = calculateDiscountByLowPrice(rule as { discountedPrice: number; }, qty, item)
                        if (discount) return discount
                        break;
                    default:
                        return discount
                }
            }
        }
    }
    return discount;

}

function calculateDiscountByXForY<T extends { xQty: number; yQty: number; }>(rule: T, qty: number, item: Item) {
    if (qty >= rule.xQty) {
        return Math.floor(Number(qty) / rule.xQty) * (rule.xQty - rule.yQty) * Number(item.retailPrice)
    }
    return 0;
}

function calculateDiscountByLowPrice<T extends { discountedPrice: number; }>(rule: T, qty: number, item: Item) {

    return (Number(item.retailPrice) - rule.discountedPrice) * Number(qty)
}