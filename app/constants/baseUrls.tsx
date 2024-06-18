export const BaseUrls = {
    AUTH: 'http://localhost:5000/api/auth',
    BOOKS: 'http://localhost:5000/api/books',
}

export enum ServiceType {
    AUTH = 'AUTH',
    BOOKS = 'BOOKS',
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