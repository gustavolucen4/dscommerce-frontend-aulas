import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../utils/requests";

export function findPageRequest(page: number, name: string, size = 12, sort = 'name') {
    const config: AxiosRequestConfig = {
        method: 'GET',
        url: '/products',
        params: {
            page,
            name,
            size,
            sort
        }
    }

    return requestBackend(config);
}

export function findById(id: number) {
    return requestBackend({ url: `/products/${id}` });
}


export function deleteProduct(id: number) {

    const config: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/products/${id}`,
        withCredentials: true
    }

    return requestBackend(config);
}

export function updateRequest(body: any) {

    const config: AxiosRequestConfig = {
        method: 'PUT',
        url: `/products/${body.id}`,
        withCredentials: true,
        data:body
    }

    return requestBackend(config);
}

export function insertRequest(body: any) {

    const config: AxiosRequestConfig = {
        method: 'POST',
        url: `/products`,
        withCredentials: true,
        data:body
    }

    return requestBackend(config);
}