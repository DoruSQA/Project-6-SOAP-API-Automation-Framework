import { test, expect } from '../../fixtures/User.fixture.js';
import { parseXml } from '../../utils/Utils.js';
import { StatusCode } from '../../test-data/expected/StatusCode.expected.js'
import { UserExpected } from '../../test-data/expected/User.expected.js'
import { getUpdatedUser, getSoapFault} from '../../utils/SoapResponse.extractor.js';


test('API-USER-013: Update user with valid details', { tag: ['@smoke', '@regression','@user'] }, 
    async ({userService, updatedUserWithValidDetails}) => {

    // Send request
    const response = await userService.updateUser(updatedUserWithValidDetails.payload);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract user
    const product = getUpdatedUser(parseXml(await response.text()));

    // Validate response body
    expect.soft(user.id).toBeDefined();
    expect.soft(user.name).toEqual(updatedUserWithValidDetails.name);
    expect.soft(user.email).toEqual(updatedUserWithValidDetails.email);
    expect.soft(user.age).toEqual(updatedUserWithValidDetails.age);

});

test('API-USER-014: Update user with empty name', { tag: ['@regression','@user'] }, 
    async ({userService, updatedUserWithEmptyName}) => {

    // Send request
    const response = await userService.updateUser(updatedUserWithEmptyName);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.NAME_NOT_EMPTY);

});

test('API-USER-015: Update user with invalid email format', { tag: ['@regression','@user'] }, 
    async ({userService, updatedUserWithInvalidEmailFormat}) => {

    // Send request
    const response = await userService.updateUser(updatedUserWithInvalidEmailFormat);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.INVALID_EMAIL_FORMAT);

});

test('API-USER-016: Update user with invalid age', { tag: ['@regression','@user'] }, 
    async ({userService, updatedUserWithInvalidAge}) => {

    // Send request
    const response = await userService.updateUser(updatedUserWithInvalidAge);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.AGE_GRATHER_THAN_18);

});