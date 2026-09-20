import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import { populateXmlValues, removeXmlField } from '../utils/Utils.js';
import { productTestData } from '../test-data/product/Product.test-data.js';
import { ProductService } from '../service/Product.service.js'


const CREATE_PAYLOAD_PATH = './test-data/payload/request/product/createProduct.xml';
const DELETE_PAYLOAD_PATH = './test-data/payload/request/product/deleteProduct.xml';
const GET_ALL_PAYLOAD_PATH ='./test-data/payload/request/product/getAllProducts.xml';
const GET_PAYLOAD_PATH = './test-data/payload/request/product/getProductByID.xml';
const UPDTE_PAYLOAD_PATH = './test-data/payload/request/product/updateProduct.xml';


export const test = base.extend({

    // Service
    productService: async ({ request }, use) => {
        const service = new ProductService(request);
        await use(service);
    },

    // Create
    productWithValidDetails: async ({ }, use) => {

        const product = productTestData.validProduct;

        let payload = fs.readFileSync(
            CREATE_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, product);

        await use({payload,name: product.name,price: product.price,stock: product.stock});
    },

    productWithEmptyName: async ({ }, use) => {

        let payload = fs.readFileSync(
            CREATE_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, productTestData.emptyName);

        await use(payload);
    },

    productWithEmptyPrice: async ({ }, use) => {

        let payload = fs.readFileSync(
            CREATE_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, productTestData.validProduct);
        payload = removeXmlField(payload, 'price');

        await use(payload);
    },

    productWithNegativePrice: async ({ }, use) => {

        let payload = fs.readFileSync(
            CREATE_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, productTestData.negativePrice);

        await use(payload);
    },

    productWithNegativeStock: async ({ }, use) => {

        let payload = fs.readFileSync(
            CREATE_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, productTestData.negativeStock);

        await use(payload);
    },

    productWithNameExceedingMaxLength: async ({ }, use) => {

        let payload = fs.readFileSync(
            CREATE_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, productTestData.nameExceedingMaximumLength);

        await use(payload);
    },

    // Delete
    productWithValidID: async ({ request }, use) => {

        let payload = fs.readFileSync(
            DELETE_PAYLOAD_PATH,
            'utf8'
        );
        let productService = new ProductService(request);

        payload = populateXmlValues(payload, { id: await productService.getValidID() });

        await use(payload);
    },

    productWithNonExistingID: async ({ }, use) => {

        let payload = fs.readFileSync(
            DELETE_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, { id: productTestData.delete.wrongID });

        await use(payload);
    },

    productWithInvalidIDFormat: async ({ }, use) => {

        let payload = fs.readFileSync(
            DELETE_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, { id: productTestData.delete.invalidIDFormat });

        await use(payload);
    },

    productWithEmptyID: async ({ }, use) => {

        let payload = fs.readFileSync(
            DELETE_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, { id: productTestData.delete.emptyID });

        await use(payload);
    },

    // Get 
    getProducts: async ({ }, use) => {

        let payload = fs.readFileSync(
            GET_ALL_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, { page: 1, limit: 10 });

        await use(payload);
    },

    getProductWithValidID: async ({ request }, use) => {

        let payload = fs.readFileSync(
           GET_PAYLOAD_PATH,
            'utf8'
        );

        let productService = new ProductService(request);

        payload = populateXmlValues(payload, { id: await productService.getValidID() });

        await use(payload);
    },

    getProductWithNonExistingID: async ({ }, use) => {

        let payload = fs.readFileSync(
            GET_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, { id: productTestData.get.wrongID });

        await use(payload);
    },

    getProductWithInvalidIDFormat: async ({ }, use) => {

        let payload = fs.readFileSync(
            GET_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, { id: productTestData.get.invalidIDFormat });

        await use(payload);
    },

    getProductWithEmptyID: async ({ }, use) => {

        let payload = fs.readFileSync(
            GET_PAYLOAD_PATH,
            'utf8'
        );

        payload = populateXmlValues(payload, { id: productTestData.get.emptyID });

        await use(payload);
    },

    getProductWithNullID: async ({ }, use) => {

        let payload = fs.readFileSync(
            './test-data/payload/request/product/getProductByNullID.xml',
            'utf8'
        );

        await use(payload);
    },

    // Update 
    updatedProductWithValidDetails: async ({ request }, use) => {

        const product = productTestData.updateValidProduct;

        let payload = fs.readFileSync(
            UPDTE_PAYLOAD_PATH,
            'utf8'
        );
        let productService = new ProductService(request);
        const validID = await productService.getValidID();

        payload = populateXmlValues(payload, { id: validID, ...productTestData.updateValidProduct });

        await use({payload,name: product.name,price: product.price,stock: product.stock});
    },

    updatedProductWithEmptyName: async ({ request }, use) => {

        let payload = fs.readFileSync(
            UPDTE_PAYLOAD_PATH,
            'utf8'
        );
        let productService = new ProductService(request);
        const validID = await productService.getValidID();

        payload = populateXmlValues(payload, { id: validID, ...productTestData.updateEmptyName });

        await use(payload);
    },

    updatedProductWithNegativePrice: async ({ request }, use) => {

        let payload = fs.readFileSync(
            UPDTE_PAYLOAD_PATH,
            'utf8'
        );
        let productService = new ProductService(request);
        const validID = await productService.getValidID();

        payload = populateXmlValues(payload, { id: validID, ...productTestData.updateNegativePrice });

        await use(payload);
    },


    updatedProductWithNegativeStock: async ({ request }, use) => {

        let payload = fs.readFileSync(
            UPDTE_PAYLOAD_PATH,
            'utf8'
        );
        let productService = new ProductService(request);
        const validID = await productService.getValidID();

        payload = populateXmlValues(payload, { id: validID, ...productTestData.updateNegativeStock });

        await use(payload);
    }

});


export { expect };