import { test, expect } from '../../fixtures/Product.fixture.js';
import { parseXml } from '../../utils/Utils.js';
import { StatusCode } from '../../test-data/expected/StatusCode.expected.js'
import { ProductExpected } from '../../test-data/expected/Product.expected.js';
import { getUpdateProduct, getSoapFault} from '../../utils/SoapResponse.extractor.js';


test('API-PROD-013: Update product with valid details', { tag: ['@smoke', '@regression', '@product'] },
     async ({productService, updatedProductWithValidDetails }) => {

    // Send request
    const response = await productService.updateProduct(updatedProductWithValidDetails.payload);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract product
    const product = getUpdateProduct(parseXml(await response.text()));

    // Validate response body
    expect.soft(product.id).toBeDefined();
    expect.soft(product.name).toEqual(updatedProductWithValidDetails.name);
    expect.soft(product.price).toEqual(updatedProductWithValidDetails.price);
    expect.soft(product.stock).toEqual(updatedProductWithValidDetails.stock);

});

test('API-PROD-014: Update product with empty name', { tag: ['@regression', '@product'] }, 
        async ({productService, updatedProductWithEmptyName }) => {

    // Send request
    const response = await productService.updateProduct(updatedProductWithEmptyName);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(ProductExpected.NAME_NOT_EMPTY);

});

test('API-PROD-015: Update product with negative price', { tag: ['@regression', '@product'] }, 
        async ({productService, updatedProductWithNegativePrice }) => {

    // Send request
    const response = await productService.updateProduct(updatedProductWithNegativePrice);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(ProductExpected.PRICE_GRATHER_THAN_0);

});

test('API-PROD-016: Update product with negative stock', { tag: ['@regression', '@product'] }, 
        async ({productService, updatedProductWithNegativeStock }) => {

    // Send request
    const response = await productService.updateProduct(updatedProductWithNegativeStock);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(ProductExpected.STOCK_GRATHER_THAN_0);

});