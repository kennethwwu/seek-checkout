import { getProduct } from '../helpers/total'
import { Item } from '../types/item'

export function getDiscountByCheckoutItem([id, qty]:[Number, Number], pricingRules:any){
    let discount = 0;
    const item = getProduct(id)
    if(item){
        for(let rule of pricingRules){
            if(rule.itemId == id){
                switch(rule.discountType){
                    case 'x for y':
                        discount = calculateDiscountByXForY(rule, qty, item)
                        console.log('calculateDiscountByXForY ', discount)
                        if(discount) return discount
                        break;
                    case 'discount':
                        console.log(rule.discountType)
                        discount = calculateDiscountByLowPrice(rule, qty, item)
                        console.log('calculateDiscountByLowPrice ', discount)
                        if(discount) return discount
                        break;
                    default:
                        return discount
                }
            }
        }
    }
    console.log(discount)
    return discount;

}

function calculateDiscountByXForY(rule:any, qty:Number, item:Item){
    if(qty >= rule.xQty){
        return Math.floor(Number(qty)/rule.xQty)*(rule.xQty - rule.yQty)*Number(item.retailPrice)
    }
    return 0;
}

function calculateDiscountByLowPrice(rule:any, qty:Number, item:Item){

    return (Number(item.retailPrice) - rule.discountedPrice)*Number(qty)
}