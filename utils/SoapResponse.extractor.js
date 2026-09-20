export function getCreatedProduct(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:CreateProductResponse']
        .product;
}

export function getSoapFault(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['soap:Fault'];
}

export function getProductMessage(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:DeleteProductResponse']
        .success;
}

export function getUserMessage(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:DeleteUserResponse']
        .success;
}


export function getCreatedUser(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:CreateUserResponse']
        .user;
}

export function getUpdatedUser(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:UpdateUserResponse']
        .user;
}

export function getUpdateProduct(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:UpdateProductResponse']
        .user;
}

export function getUserRoot(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:GetUsersResponse'];
}

export function getProductRoot(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:GetProductsResponse'];
}

export function getUser(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:GetUserResponse']
        .user;
}

export function getProduct(responsePayload) {
    return responsePayload
        ['soap:Envelope']
        ['soap:Body']
        ['tns:GetProductResponse']
        .product;
}

