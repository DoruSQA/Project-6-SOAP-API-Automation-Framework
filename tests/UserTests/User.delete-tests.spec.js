import { test, expect } from '../../fixtures/User.fixture.js';
import { parseXml} from '../../utils/Utils.js';
import { StatusCode } from '../../test-data/expected/StatusCode.expected.js'
import { UserExpected } from '../../test-data/expected/User.expected.js'
import { getUserMessage, getSoapFault} from '../../utils/SoapResponse.extractor.js';


test('API-USER-017: Delete user with valid ID', { tag: ['@smoke', '@regression','@user'] }, 
    async ({userService, userWithValidID}) => {

    // Send request
    const response = await userService.deleteUserByID(userWithValidID);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract message status
    const message = getUserMessage(parseXml(await response.text()));

    // Validate delete message status
    expect.soft(message).toEqual(true);

});

test('API-USER-018: Delete user by providing wrong ID', { tag: ['@regression','@user'] }, 
    async ({userService, userWithNonExistingID}) => {

    // Send request
    const response = await userService.deleteUserByID(userWithNonExistingID);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract message status
    const message = getUserMessage(parseXml(await response.text()));

    // Validate delete message status
    expect.soft(message).toEqual(false);

});

test('API-USER-019: Delte user by providing invalid ID format', { tag: ['@regression','@user'] }, 
    async ({userService, userWithInvalidIDFormat}) => {

    // Send request
    const response = await userService.deleteUserByID(userWithInvalidIDFormat);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract message status
    const message = getUserMessage(parseXml(await response.text()));

    // Validate delete message status
    expect.soft(message).toEqual(false);

});

test('API-USER-020: Delete user by providing empty ID', { tag: ['@regression','@user'] }, 
    async ({userService, userWithEmptyID}) => {

    // Send request
    const response = await userService.deleteUserByID(userWithEmptyID);

    // Validate status code and response headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validate SOAP Fault details
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.ID_IS_REQUIRED);

});