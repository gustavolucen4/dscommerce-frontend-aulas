import { OrderDTO, OrderItemDTO } from "../models/order";
import * as cartRepository from '../localStorage/cart-repository'
import { ProductDTO } from "../models/product";

export function saveCart(cart: OrderDTO) {
    cartRepository.save(cart);
}

export function getCart(): OrderDTO{
    return cartRepository.get();
}

export function addProduct(product: ProductDTO) {
    const cart = getCart();
    const item = cart.items.find(item => item.productId === product.id);
    if(!item){
        const newItem = new OrderItemDTO(product.id, 1, product.name, product.price, product.imgUrl);
        cart.items.push(newItem);
        saveCart(cart);
    }
}

export function clearCart() {
    cartRepository.clear();
}