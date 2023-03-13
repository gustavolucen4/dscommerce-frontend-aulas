import { OrderDTO } from "../models/order";

export function save(cart: OrderDTO) {
    const str = JSON.stringify(cart);
    localStorage.setItem("dscommerce.com.br/Cart" , str);
}

export function get(): OrderDTO {
    const str = localStorage.getItem("dscommerce.com.br/Cart") || JSON.stringify(new OrderDTO());
    return JSON.parse(str);
}