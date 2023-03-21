import { AxiosRequestConfig } from "axios";
import { OrderDTO } from "../models/order";
import { requestBackend } from "../utils/requests";

export function findByIdRequest(id: number) {

    const config: AxiosRequestConfig = {
        url: `/orders/${id}`,
        withCredentials: true
    }

    return requestBackend(config);
}

export function placeOrderRequest(order: OrderDTO) {

    const config: AxiosRequestConfig = {
        url: '/orders',
        method: 'POST',
        withCredentials: true,
        data: order
    }

    return requestBackend(config);
}