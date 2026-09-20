import { test, expect } from '../../fixtures/User.fixture.js';
import { parseXml } from '../../utils/Utils.js';
import { StatusCode } from '../../test-data/expected/StatusCode.expected.js'
import { UserExpected } from '../../test-data/expected/User.expected.js';
import { getCreatedUser, getSoapFault} from '../../utils/SoapResponse.extractor.js';


test('API-PROD-007: Create user with valid details', { tag: ['@smoke', '@regression','@user'] }, 
    async ({userService, userWithValidDetails}) => {

    // Send request
    const response = await userService.createUser(userWithValidDetails.payload);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract product
    const user = getCreatedUser(parseXml(await response.text()));

    // Validate response body
    expect.soft(user.id).toBeDefined();
    expect.soft(user.name).toEqual(userWithValidDetails.name);
    expect.soft(user.email).toEqual(userWithValidDetails.email);
    expect.soft(user.age).toEqual(userWithValidDetails.age);

});

test('API-PROD-008: Create user with empty name', { tag: ['@regression','@user'] }, 
    async ({userService, userWithEmptyName}) => {

    // Send request
    const response = await userService.createUser(userWithEmptyName);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.NAME_AND_EMAIL_REQUIRED);

});

test('API-PROD-009: Create user with empty email', { tag: ['@regression','@user'] }, 
    async ({userService, userWithEmptyEmail}) => {

    // Send request
    const response = await userService.createUser(userWithEmptyEmail);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.NAME_AND_EMAIL_REQUIRED);

});

test('API-PROD-010: Create user under age', { tag: ['@regression','@user'] }, 
    async ({userService, userUnderAge}) => {

    // Send request
    const response = await userService.createUser(userUnderAge);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.AGE_GRATHER_THAN_18);

});

test('API-PROD-011: Create user with invalid email format', { tag: ['@regression','@user'] }, 
    async ({userService, userWithInvalidEmailFormat}) => {

    // Send request
    const response = await userService.createUser(userWithInvalidEmailFormat);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.INVALID_EMAIL_FORMAT);

});

test('API-PROD-012: Create user with name exceeding max length', { tag: ['@regression','@user'] }, 
    async ({userService, userWithNameExceedingMaxLength}) => {

    // Send request
    const response = await userService.createUser(userWithNameExceedingMaxLength);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.NAME_NOT_EXCEED_20_CHARS);

});