import { test, expect } from '../../fixtures/Product.fixture.js';
import { parseXml } from '../../utils/Utils.js';
import { StatusCode } from '../../test-data/expected/StatusCode.expected.js'
import { ProductExpected } from '../../test-data/expected/Product.expected.js';
import { getCreatedProduct, getSoapFault} from '../../utils/SoapResponse.extractor.js';


test('API-PROD-007: Create product with valid details', { tag: ['@smoke', '@regression', '@product'] }, 
    async ({productService, productWithValidDetails}) => {

    // Send request
    const response = await productService.createProduct(productWithValidDetails.payload);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract product
    const product = getCreatedProduct(parseXml(await response.text()));

    // Validate response body
    expect.soft(product.id).toBeDefined();
    expect.soft(product.name).toEqual(productWithValidDetails.name);
    expect.soft(product.price).toEqual(productWithValidDetails.price);
    expect.soft(product.stock).toEqual(productWithValidDetails.stock);

});

test('API-PROD-008: Create product with empty product name', { tag: ['@regression', '@product'] }, 
    async ({productService, productWithEmptyName}) => {

    // Send request
    const response = await productService.createProduct(productWithEmptyName);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(ProductExpected.NAME_AND_PRICE_REQUIRED);

});

test('API-PROD-009: Create product with empty price', { tag: ['@regression', '@product'] }, 
    async ({productService, productWithEmptyPrice}) => {

    // Send request
    const response = await productService.createProduct(productWithEmptyPrice);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(ProductExpected.NAME_AND_PRICE_REQUIRED);

});

test('API-PROD-010: Create product with negative price', { tag: ['@regression', '@product'] }, 
    async ({productService, productWithNegativePrice}) => {

    // Send request
    const response = await productService.createProduct(productWithNegativePrice);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(ProductExpected.PRICE_GREATER_THAN_0);

});

test('API-PROD-011: Create product with negative stock', { tag: ['@regression', '@product'] }, 
    async ({productService, productWithNegativeStock}) => {

    // Send request
    const response = await productService.createProduct(productWithNegativeStock);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(ProductExpected.STOCK_GRATHER_THAN_0);

});


test('API-PROD-012: Create product with name exceeding maximum length', { tag: ['@regression', '@product'] }, 
    async ({productService, productWithNameExceedingMaxLength}) => {

    // Send request
    const response = await productService.createProduct(productWithNameExceedingMaxLength);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(ProductExpected.NAME_NOT_EXCEED_20_CHARS);

});
