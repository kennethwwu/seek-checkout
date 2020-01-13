import React, { useState, useEffect, useReducer, createContext} from 'react';
import { Item } from '../types/item'
import { getTotal } from '../helpers/total'
import { getDiscountByCheckoutItem } from '../helpers/discount'
import { UserType } from '../types/user'
import { pricingRules } from '../pricingRules/config'

function reducer(checkoutList: any, action: {type:string, id?:Number, cache?:any[]}) {
    switch (action.type) {
        case 'add':
            
            return (function(){
                const newCheckoutList = new Map([
                    ...checkoutList,
                    [action.id, checkoutList.has(action.id)?checkoutList.get(action.id)+1:1]
                ]
                );
                saveChecklistToLocal([...newCheckoutList]);
                return newCheckoutList

            })()
        case 'remove':
            if (checkoutList.has(action.id) && checkoutList.get(action.id) == 1)
            {
                const newCheckoutList = new Map(checkoutList);
                newCheckoutList.delete(action.id)
                saveChecklistToLocal([...newCheckoutList]);
                return newCheckoutList;
            } 
            return (function(){
                const newCheckoutList = new Map([
                    ...checkoutList,
                    [action.id, checkoutList.get(action.id)-1]
                ]);
                saveChecklistToLocal([...newCheckoutList]);
                return newCheckoutList
            })()
        case 'delete':
            return (function(){
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

function saveChecklistToLocal(checkoutListArray:any[]){
    localStorage.setItem('checklist', JSON.stringify(checkoutListArray))
}

function getPricingRulesByUser(user:string){
    return pricingRules.filter( rule => {
        if( user === rule.customer) return true
    })
}

export function useCheckout(){
    const [checkoutList, dispatch] = useReducer(reducer, new Map());
    const [total, setTotal] = useState(0);
    const [pricingRules, setPricingRules] = useState<any[]>([]);
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

    useEffect( () => {
        // get Total
        console.log('checkoutList')
        const checkoutListArray = [...checkoutList]
        setTotal(getTotal(checkoutListArray))
        // get discount
        setDiscount(getDiscount(checkoutListArray))
    }, [checkoutList, pricingRules])

    function add(id:Number){
        console.log('add')
        dispatch({
            type: 'add',
            id
        })
    }

    function removeOne(id:Number){
        console.log('remove')
        dispatch({
            type: 'remove',
            id
        })
    }

    function remove(id:Number){
        console.log('delete')
        dispatch({
            type: 'delete',
            id
        })
    }

    function updatePriceRules(){
        const cachedUser = localStorage.getItem('user') || UserType.Default;
        const userPricingRules = getPricingRulesByUser(cachedUser);
        console.log(userPricingRules);
        setPricingRules(userPricingRules)
    }

    function getDiscount(checkoutListArray: any[]){
        let discount = 0;
        checkoutListArray.forEach( checkoutListItem => {
            discount += getDiscountByCheckoutItem(checkoutListItem, pricingRules)
        })
        return discount;
    }

    return { checkoutList, total, discount, add, removeOne, remove, updatePriceRules }
}

const checkoutContext = createContext<any>(null);

export default checkoutContext;