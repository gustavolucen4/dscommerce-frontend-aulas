import './style.css';
import { useContext, useEffect, useState } from 'react';
import { OrderDTO, OrderItemDTO } from '../../../models/order';
import { Link, useNavigate } from 'react-router-dom';
import ButtonInverse from '../../../components/ButtonInverse';
import * as cartService from '../../../service/cart-service'
import * as orderService from '../../../service/order-service'
import { ContextCartCount } from '../../../utils/context-cart';


export default function Cart() {

    const navigate = useNavigate();
    const [cart, setCart] = useState<OrderDTO>(cartService.getCart())
    const { setContextCartCount } = useContext(ContextCartCount);

    function handleClearClick() {
        cartService.clearCart();
        updateCart();
    }

    function handleIncreaseClick(number: number) {
        cartService.increaseItem(number);
        setCart(cartService.getCart());
    }

    function handleDecreaseClick(number: number) {
        cartService.decreaseItem(number);
        updateCart();
    }

    function updateCart(){
        const localstorageCart = cartService.getCart()
        setCart(localstorageCart);
        setContextCartCount(localstorageCart.items.length);
    }

    function handlePlaceOrderClick() {
        orderService.placeOrderRequest(cart)
            .then(response => {
                cartService.clearCart();
                setContextCartCount(0);
                navigate(`/confirmation/${response.data.id}`)
            })
    }

    return (
        <main>
            <section id="cart-container-section" className="dsc-container">
                {
                    cart.items.length === 0 ?
                        (
                            <div>
                                <h2 className='dsc-mb20 dsc-section-title'>Seu carrinho está vazio</h2>
                            </div>
                        )
                        :
                        (
                            <div className="dsc-card dsc-mb20">

                                {
                                    cart.items.map(item => (
                                        <div key={item.productId} className="dsc-cart-item-container dsc-line-bottom">
                                            <div className="dsc-cart-item-left">
                                                <img src={item.imgUrl} alt={item.name} />
                                                <div className="dsc-cart-item-description">
                                                    <h3>{item.name}</h3>
                                                    <div className="dsc-cart-item-quantity-container">
                                                        <div onClick={() => handleDecreaseClick(item.productId)} className="dsc-cart-item-quantity-btn">-</div>
                                                        <p>{item.quantity}</p>
                                                        <div onClick={() => handleIncreaseClick(item.productId)} className="dsc-cart-item-quantity-btn">+</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="dsc-cart-item-right">
                                                R$ {item.subTotal.toFixed(2)}
                                            </div>
                                        </div>

                                    ))
                                }

                                <div className="dsc-cart-total-container">
                                    <h3>R$ {cart.total.toFixed(2)}</h3>
                                </div>
                            </div>
                        )
                }
                <div className="dsc-btn-page-container">
                    <div onClick={handlePlaceOrderClick} className="dsc-btn dsc-btn-blue">
                        Finalizar pedido
                    </div>
                    <div className="dsc-btn dsc-btn-white">
                        <Link to={'/catalog'}>
                            Continuar comprando
                        </Link>
                    </div>
                    <div onClick={handleClearClick}>
                        <ButtonInverse text='Limpar carrinho' />
                    </div>
                </div>
            </section>
        </main>
    );
}