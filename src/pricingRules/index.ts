import { UserType } from '../types/user'

type DiscountType = "x for y" | "discount";

type BasePriceRule = {
    customer: UserType;
    itemId: number;
    discountType: DiscountType;
}

export type PriceRule = BasePriceRule & {
    xQty: number;
    yQty: number;
} | BasePriceRule & {
    discountedPrice: number;
}

export const pricingRules: PriceRule[] = [
    {
        customer: UserType.SecondBite,
        itemId: 1,
        discountType: 'x for y',
        xQty: 3,
        yQty: 2
    },
    {
        customer: UserType.AxilCoffeeRoasters,
        itemId: 2,
        discountType: 'discount',
        discountedPrice: 299.99
    },
    {
        customer: UserType.MYER,
        itemId: 3,
        discountType: 'discount',
        discountedPrice: 389.99
    },
    {
        customer: UserType.MYER,
        itemId: 2,
        discountType: 'x for y',
        xQty: 5,
        yQty: 4
    }
]
