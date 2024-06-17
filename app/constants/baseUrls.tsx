export const BaseUrls = {
    AUTH: 'http://localhost:5000/api/auth',
    DASHBOARD: 'http://localhost:5000/api/books',
}

export enum ServiceType {
    AUTH = 'AUTH',
    DASHBOARD = 'DASHBOARD',
}

export enum ApiType {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE='DELETE',
}


export const ContentTypes = {
    JSON: 'application/json; charset=UTF-8',
}

export const ResponseType = {
    JSON: 'json',
}