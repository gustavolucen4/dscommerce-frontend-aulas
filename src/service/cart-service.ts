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

export function increaseItem(number: number) {
    const cart = getCart();
    const item = cart.items.find(item => item.productId === number)
    if(item){
        item.quantity++;
        saveCart(cart);
    }
}

export function decreaseItem(number: number) {
    const cart = getCart();
    const item = cart.items.find(item => item.productId === number)
    if(item){
        item.quantity--;
        if(item.quantity < 1){
            cart.items = cart.items.filter(item => item.productId != number)
        }
        saveCart(cart);
    }
}