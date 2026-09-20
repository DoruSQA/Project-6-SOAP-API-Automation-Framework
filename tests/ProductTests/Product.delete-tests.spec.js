import { test, expect } from '../../fixtures/Product.fixture.js';
import { parseXml } from '../../utils/Utils.js';
import { StatusCode } from '../../test-data/expected/StatusCode.expected.js';
import { ProductExpected } from '../../test-data/expected/Product.expected.js';
import { getProductMessage, getSoapFault} from '../../utils/SoapResponse.extractor.js';


test('API-PROD-017: Delete product with valid ID', { tag: ['@smoke', '@regression','@product'] }, 
        async ({productService, productWithValidID}) => {

        // Send request
        const response = await productService.deleteProductByID(productWithValidID);

        // Validate status code and response headers
        expect.soft(response.status()).toEqual(StatusCode.OK);
        expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

        // Parse XML response and extract confirmation message status
        const message = getProductMessage(parseXml(await response.text()));

        // Validate delete message status
        expect.soft(message).toEqual(true);

});


test('API-PROD-018: Delete product by providing wrong ID', { tag: ['@regression','@product'] }, 
        async ({productService, productWithNonExistingID}) => {

        // Send request
        const response = await productService.deleteProductByID(productWithNonExistingID);

        // Validate status code and response headers
        expect.soft(response.status()).toEqual(StatusCode.OK);
        expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

        // Parse XML response and extract confirmation message status
        const message = getProductMessage(parseXml(await response.text()));

        // Validate delete message status
        expect.soft(message).toEqual(false);

});

test('API-PROD-019: Delete product by providing invalid ID format', { tag: ['@regression','@product'] }, 
        async ({productService, productWithInvalidIDFormat}) => {

        // Send request
        const response = await productService.deleteProductByID(productWithInvalidIDFormat);

        // Validate status code and response headers
        expect.soft(response.status()).toEqual(StatusCode.OK);
        expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

        // Parse XML response and extract confirmation message status
        const message = getProductMessage(parseXml(await response.text()));

        // Validate delete message status
        expect.soft(message).toEqual(false);

});

test('API-PROD-020: Delete product by providing empty ID', { tag: ['@regression','@product'] }, 
        async ({productService, productWithEmptyID}) => {

        // Send request
        const response = await productService.deleteProductByID(productWithEmptyID);

        // Validate status code and response headers
        expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
        expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

        // Parse XML response and extract SOAP Fault details
        const errorMsg = getSoapFault(parseXml(await response.text()));

        // Validate SOAP Fault details
        expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
        expect.soft(errorMsg.faultstring).toEqual(ProductExpected.ID_IS_REQUIRED);

});