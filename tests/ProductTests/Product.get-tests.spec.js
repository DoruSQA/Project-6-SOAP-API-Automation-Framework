import { test, expect } from '../../fixtures/Product.fixture.js';
import { parseXml } from '../../utils/Utils.js';
import { StatusCode } from '../../test-data/expected/StatusCode.expected.js'
import { ProductExpected } from '../../test-data/expected/Product.expected.js';
import { getProductRoot, getProduct, getSoapFault} from '../../utils/SoapResponse.extractor.js';



test('API-PROD-001: Get all products', { tag: ['@smoke', '@regression', '@product'] },
    async ({productService, getProducts }) => {

    // Send request
    const response = await productService.getAllProducts(getProducts);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract root
    const root = getProductRoot(parseXml(await response.text()));

    // Validate response body
    expect.soft(root.products).toBeDefined();
    expect.soft(root.total).toBeDefined();

    });


test('API-PROD-002: Get product by providing valid ID', { tag: ['@smoke', '@regression', '@product'] },
    async ({productService, getProductWithValidID }) => {

    // Send request
    const response = await productService.getProductByID(getProductWithValidID);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract product
    const product = getProduct(parseXml(await response.text()));

    // Validate response body
    expect.soft(product.id).toBeDefined();
    expect.soft(product.name).toBeDefined();
    expect.soft(product.price).toBeGreaterThan(ProductExpected.PRICE_GRATHER_THAN_0);

    });


test('API-PROD-003: Get product by providing wrong ID', { tag: ['@regression', '@product'] },
    async ({productService, getProductWithNonExistingID }) => {

    // Send request
    const response = await productService.getProductByID(getProductWithNonExistingID);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toContain(ProductExpected.ID_NOT_FOUND);

    });

test('API-PROD-004: Get product by providing invalid ID format', { tag: ['@regression', '@product'] },
    async ({productService, getProductWithInvalidIDFormat }) => {

    // Send request
    const response = await productService.getProductByID(getProductWithInvalidIDFormat);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toContain(ProductExpected.ID_NOT_FOUND);

    });

test('API-PROD-005: Get product by providing empty ID', { tag: ['@regression', '@product'] },
    async ({productService, getProductWithEmptyID }) => {

    // Send request
    const response = await productService.getProductByID(getProductWithEmptyID);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(ProductExpected.ID_IS_REQUIRED);

    });

test('API-PROD-006: Get product by providing null ID', { tag: ['@regression', '@product'] },
    async ({productService, getProductWithNullID }) => {

    // Send request
    const response = await productService.getProductByID(getProductWithNullID);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(ProductExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(ProductExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toContain(ProductExpected.ID_NOT_FOUND);

    });



