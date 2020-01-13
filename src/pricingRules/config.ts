import { UserType } from '../types/user'

export const pricingRules:any[] = [
    {
        customer:UserType.SecondBite,
        itemId: 1,
        discountType: 'x for y',
        xQty: 3,
        yQty: 2
    },
    {
        customer:UserType.AxilCoffeeRoasters,
        itemId: 2,
        discountType: 'discount',
        discountedPrice: 299.99
    },
    {
        customer:UserType.MYER,
        itemId: 3,
        discountType: 'discount',
        discountedPrice: 389.99
    },
    {
        customer:UserType.MYER,
        itemId: 2,
        discountType: 'x for y',
        xQty: 5,
        yQty: 4
    }
]
