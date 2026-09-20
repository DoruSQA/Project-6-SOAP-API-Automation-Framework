import { test, expect } from '../../fixtures/User.fixture.js';
import { parseXml } from '../../utils/Utils.js';
import { StatusCode } from '../../test-data/expected/StatusCode.expected.js'
import { UserExpected } from '../../test-data/expected/User.expected.js'
import { getUser, getUserRoot, getSoapFault} from '../../utils/SoapResponse.extractor.js';


test('API-USER-001: Get all users', { tag: ['@smoke', '@regression','@user'] }, 
    async ({userService, getUsers}) => {

    // Send request
    const response = await userService.getAllUsers(getUsers);

    // Validation 1: Status Code and Headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract root
    const root = getUserRoot(parseXml(await response.text()));

    // Validation 2: Response Body Content
    expect.soft(root.users).toBeDefined();
    expect.soft(root.total).toBeDefined();
});

test('API-USER-002: Get user by providing valid ID', { tag: ['@smoke', '@regression','@user'] }, 
    async ({userService, getUserWithValidID}) => {

    // Send request
    const response = await userService.getUserByID(getUserWithValidID);

    // Validation 1: Status Code and Headers
    expect.soft(response.status()).toEqual(StatusCode.OK);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract user
    const user = getUser(parseXml(await response.text()));

    // Validation 2: Response Body Content
    expect.soft(user.id).toBeDefined();
    expect.soft(user.name).toBeDefined();
    expect.soft(user.email).toBeDefined();
    expect.soft(user.age).toBeGreaterThan(UserExpected.MIN_REQUIRED_AGE);
});


test('API-USER-003: Get user by providing wrong ID', { tag: ['@regression','@user'] }, 
    async ({userService, getUserWithNonExistingID}) => {

    // Send request
    const response = await userService.getUserByID(getUserWithNonExistingID);

    // Validation 1: Status Code and Headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validation 2: Response Body Content
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toContain(UserExpected.ID_NOT_FOUND);
});

test('API-USER-004: Get user by providing invalid ID format', { tag: ['@regression','@user'] }, 
    async ({userService, getUserWithInvalidIDFormat}) => {

    // Send request
    const response = await userService.getUserByID(getUserWithInvalidIDFormat);

    // Validation 1: Status Code and Headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validation 2: Response Body Content
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toContain(UserExpected.ID_NOT_FOUND);
});

test('API-User-005: Get user by providing empty ID', { tag: ['@regression','@user'] }, 
    async ({userService, getUserWithEmptyID}) => {

    // Send request
    const response = await userService.getUserByID(getUserWithEmptyID);

    // Validation 1: Status Code and Headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validation 2: Response Body Content
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toEqual(UserExpected.ID_IS_REQUIRED);
});

test('API-USER-006: Get user by providing null ID', { tag: ['@regression','@user'] }, 
    async ({userService, getUserWithNullID}) => {

    // Send request
    const response = await userService.getUserByID(getUserWithNullID);

    // Validation 1: Status Code and Headers
    expect.soft(response.status()).toEqual(StatusCode.BAD_REQUEST);
    expect.soft(response.headers()['content-type']).toContain(UserExpected.CONTENT_TYPE);

    // Parse XML response and extract SOAP Fault details
    const errorMsg = getSoapFault(parseXml(await response.text()));

    // Validation 2: Response Body Content
    expect.soft(errorMsg.faultcode).toContain(UserExpected.FAULT_CODE);
    expect.soft(errorMsg.faultstring).toContain(UserExpected.ID_NOT_FOUND);
});