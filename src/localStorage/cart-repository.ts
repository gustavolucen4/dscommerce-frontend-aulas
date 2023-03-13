import { OrderDTO, OrderItemDTO } from "../models/order";
import { CART_KEY } from "../utils/system";

export function save(cart: OrderDTO) {
    const str = JSON.stringify(cart);
    localStorage.setItem(CART_KEY , str);
}

export function get(): OrderDTO {
    const str = localStorage.getItem(CART_KEY) || JSON.stringify(new OrderDTO());
    const obj = JSON.parse(str);

    const order = new OrderDTO();

    obj.items.forEach((element: OrderItemDTO) => {
        order.items.push(new OrderItemDTO(element.productId, element.quantity, element.name, element.price, element.imgUrl))
    });

    return order;
}

export function clear(){
    save(new OrderDTO());
}

