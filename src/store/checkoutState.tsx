import { useState, useEffect, useReducer, createContext } from 'react';
import { getTotal } from '../helpers/total'
import { getDiscountByCheckoutItem } from '../helpers/discount'
import { UserType } from '../types/user'
import { pricingRules, PriceRule } from '../pricingRules'

function reducer(checkoutList: Map<any, any>, action: { type: string, id?: number, cache?: any[] }) {
    switch (action.type) {
        case 'add':

            return (function () {
                const newCheckoutList = new Map([
                    ...checkoutList,
                    [action.id, checkoutList.has(action?.id) ? checkoutList.get(action.id) + 1 : 1]
                ]
                );
                saveChecklistToLocal([...newCheckoutList]);
                return newCheckoutList

            })()
        case 'remove':
            if (checkoutList.has(action.id) && checkoutList.get(action.id) === 1) {
                const newCheckoutList = new Map(checkoutList);
                newCheckoutList.delete(action.id)
                saveChecklistToLocal([...newCheckoutList]);
                return newCheckoutList;
            }
            return (function () {
                const newCheckoutList = new Map([
                    ...checkoutList,
                    [action.id, checkoutList.get(action.id) - 1]
                ]);
                saveChecklistToLocal([...newCheckoutList]);
                return newCheckoutList
            })()
        case 'delete':
            return (function () {
                const newCheckoutList = new Map(checkoutList);
                newCheckoutList.delete(action.id)
                saveChecklistToLocal([...newCheckoutList]);
                return newCheckoutList;
            })()
        case 'copy':
            return new Map(action.cache)
        default:
            return checkoutList;
    }
}

function saveChecklistToLocal(checkoutListArray: any[]) {
    localStorage.setItem('checklist', JSON.stringify(checkoutListArray))
}

function getPricingRulesByUser(user: string) {
    return pricingRules.filter(rule => user === rule.customer)
}

export function useCheckout() {
    const [checkoutList, dispatch] = useReducer(reducer, new Map());
    const [total, setTotal] = useState(0);
    const [pricingRules, setPricingRules] = useState<PriceRule[]>([]);
    const [discount, setDiscount] = useState(0)

    useEffect(() => {
        // load pricingRules
        updatePriceRules()
        // load checklist from localstorage
        const cache = localStorage.getItem('checklist')
        cache && dispatch({
            type: 'copy',
            cache: JSON.parse(cache)
        })
    }, [])

    useEffect(() => {
        // get Total
        const checkoutListArray = [...checkoutList]
        console.log('checkoutListArray', checkoutListArray);
        setTotal(getTotal(checkoutListArray))
        // get discount
        setDiscount(getDiscount(checkoutListArray))
    }, [checkoutList, pricingRules])

    function add(id: number) {
        console.log('add')
        dispatch({
            type: 'add',
            id
        })
    }

    function removeOne(id: number) {
        dispatch({
            type: 'remove',
            id
        })
    }

    function remove(id: number) {
        dispatch({
            type: 'delete',
            id
        })
    }

    function updatePriceRules() {
        const cachedUser = localStorage.getItem('user') || UserType.Default;
        const userPricingRules = getPricingRulesByUser(cachedUser);
        setPricingRules(userPricingRules)
    }

    function getDiscount(checkoutListArray: any[]) {
        let discount = 0;
        checkoutListArray.forEach(checkoutListItem => {
            discount += getDiscountByCheckoutItem(checkoutListItem, pricingRules)
        })
        return discount;
    }

    return { checkoutList, total, discount, add, removeOne, remove, updatePriceRules }
}

const checkoutContext = createContext<any>(null);

export default checkoutContext;