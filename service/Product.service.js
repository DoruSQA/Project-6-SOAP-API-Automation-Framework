import fs from 'fs';
import { parseXml } from '../utils/Utils.js';

export class ProductService
{
    static BASE_URL= "https://demo.totalshiftleft.ai";
    static ROUTE = "/soap";
    static HEADERS = {
        'Content-Type': 'application/xml'
    };

    constructor(request)
    {
        this.request=request;
    }

    async getAllProducts(getALlProductsPayload)
    {
        return await this.request.post (ProductService.BASE_URL+ ProductService.ROUTE,
            {
                headers: {
                    ...ProductService.HEADERS,
                    'SOAPAction': 'GetProducts'
                },
                data : getALlProductsPayload
            })
    }

    async getProductByID(getProductByIDPayload)
    {
        return await this.request.post (ProductService.BASE_URL+ ProductService.ROUTE,
            {
                headers: {
                    ...ProductService.HEADERS,
                    'SOAPAction': 'GetProduct'
                },
                data : getProductByIDPayload
            })
    }

    
     async getValidID()
    {
        let createPayload = fs.readFileSync('./test-data/payload/request/product/createProductDefault.xml','utf8');
        const response = await this.request.post (ProductService.BASE_URL+ ProductService.ROUTE,
            {
                headers: {
                    ...ProductService.HEADERS,
                    'SOAPAction': 'CreateProduct'
                },
                data : createPayload
            })

        const responseObject = parseXml(await response.text());

        return responseObject['soap:Envelope']['soap:Body']['tns:CreateProductResponse'].product.id;
    }

    async createProduct(createProductPayload)
    {
        return await this.request.post (ProductService.BASE_URL+ ProductService.ROUTE,
            {
                headers: {
                    ...ProductService.HEADERS,
                    'SOAPAction': 'CreateProduct'
                },
                data : createProductPayload
            })
    }

     async updateProduct(updateProductPayload)
    {
        return await this.request.post (ProductService.BASE_URL+ ProductService.ROUTE,
            {
                headers: {
                    ...ProductService.HEADERS,
                    'SOAPAction': 'UpdateProduct'
                },
                data : updateProductPayload
            })
    }

     async deleteProductByID(deleteProductByIDPayload)
    {
        return await this.request.post (ProductService.BASE_URL+ ProductService.ROUTE,
            {
                headers: {
                    ...ProductService.HEADERS,
                    'SOAPAction': 'DeleteProduct'
                },
                data : deleteProductByIDPayload
            })
    }
}