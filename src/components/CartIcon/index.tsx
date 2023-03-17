import './style.css';
import cartImg from '../../assets/cart.svg';
import { useContext, useState } from 'react';
import { ContextCartCount } from '../../utils/context-cart';

export default function CartIcon() {

    const { contextCartCount } = useContext(ContextCartCount);

    return (
        <>
            <img src={cartImg} alt="Carrinho de compras" />
            {
                contextCartCount > 0 &&
                <div className='dsc-cart-count'>{contextCartCount}</div>
            }
        </>
    );
}