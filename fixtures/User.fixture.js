import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import { populateXmlValues, removeXmlField } from '../utils/Utils.js';
import { userTestData } from '../test-data/user/User.test-data.js';
import { UserService } from '../service/User.service.js'


const CREATE_PAYLOAD_PATH = './test-data/payload/request/user/createUser.xml';
const DELETE_PAYLOAD_PATH = './test-data/payload/request/user/deleteUser.xml';
const GET_ALL_PAYLOAD_PATH ='./test-data/payload/request/user/getALlUsers.xml';
const GET_PAYLOAD_PATH = './test-data/payload/request/user/getUserByID.xml';
const UPDTE_PAYLOAD_PATH = './test-data/payload/request/user/updateUser.xml';


export const test = base.extend({

     // Service
    userService: async ({ request }, use) => {
        const service = new UserService(request);
        await use(service);
    },

    // Create
    userWithValidDetails: async ({ }, use) => {

        const user = userTestData.validUser;

        let payload = fs.readFileSync(CREATE_PAYLOAD_PATH, 'utf8');
        payload = populateXmlValues(payload, user);

        await use({payload,name: user.name,email: user.email,age: user.age});
    },

    userWithEmptyName: async ({ }, use) => {

        let payload = fs.readFileSync(CREATE_PAYLOAD_PATH,'utf8');
        payload = populateXmlValues(payload, userTestData.emptyName);

        await use(payload);
    },

    userWithEmptyEmail: async ({ }, use) => {

        let payload = fs.readFileSync(CREATE_PAYLOAD_PATH,'utf8');
        payload = populateXmlValues(payload, userTestData.emptyEmail);

        await use(payload);
    },

    userUnderAge: async ({ }, use) => {

        let payload = fs.readFileSync(CREATE_PAYLOAD_PATH,'utf8');
        payload = populateXmlValues(payload, userTestData.underAge);

        await use(payload);
    },

    userWithInvalidEmailFormat: async ({ }, use) => {

        let payload = fs.readFileSync(CREATE_PAYLOAD_PATH,'utf8');
        payload = populateXmlValues(payload, userTestData.invalidEmailFormat);

        await use(payload);
    },

    userWithNameExceedingMaxLength: async ({ }, use) => {

        let payload = fs.readFileSync(CREATE_PAYLOAD_PATH,'utf8');
        payload = populateXmlValues(payload, userTestData.nameExceedingMaximumLength);

        await use(payload);
    },

    // Delete
    userWithValidID: async ({ request }, use) => {

        let payload = fs.readFileSync(DELETE_PAYLOAD_PATH,'utf8');
        let userService = new UserService(request);
        payload = populateXmlValues(payload, { id: await userService.getValidID() });

        await use(payload);
    },

    userWithNonExistingID: async ({ }, use) => {

        let payload = fs.readFileSync(DELETE_PAYLOAD_PATH,'utf8');
        payload = populateXmlValues(payload, { id: userTestData.delete.wrongID });

        await use(payload);
    },

    userWithInvalidIDFormat: async ({ }, use) => {

        let payload = fs.readFileSync(DELETE_PAYLOAD_PATH,'utf8');
        payload = populateXmlValues(payload, { id: userTestData.delete.invalidIDFormat });

        await use(payload);
    },

    userWithEmptyID: async ({ }, use) => {

        let payload = fs.readFileSync(DELETE_PAYLOAD_PATH,'utf8' );
        payload = populateXmlValues(payload, { id: userTestData.delete.emptyID });

        await use(payload);
    },

    // Get 
    getUsers: async ({ }, use) => {

        let payload = fs.readFileSync(GET_ALL_PAYLOAD_PATH,'utf8' );
        payload = populateXmlValues(payload, { page: 1, limit: 10 });

        await use(payload);
    },

    getUserWithValidID: async ({ request }, use) => {

        let payload = fs.readFileSync( GET_PAYLOAD_PATH,'utf8' );
        let userService = new UserService(request);
        payload = populateXmlValues(payload, { id: await userService.getValidID() });

        await use(payload);
    },

    getUserWithNonExistingID: async ({ }, use) => {

        let payload = fs.readFileSync(GET_PAYLOAD_PATH,'utf8');
        payload = populateXmlValues(payload, { id: userTestData.get.wrongID });

        await use(payload);
    },

    getUserWithInvalidIDFormat: async ({ }, use) => {

        let payload = fs.readFileSync(GET_PAYLOAD_PATH,'utf8' );
        payload = populateXmlValues(payload, { id: userTestData.get.invalidIDFormat });

        await use(payload);
    },

    getUserWithEmptyID: async ({ }, use) => {

        let payload = fs.readFileSync( GET_PAYLOAD_PATH, 'utf8' );
        payload = populateXmlValues(payload, { id: userTestData.get.emptyID });

        await use(payload);
    },

    getUserWithNullID: async ({ }, use) => {

        let payload = fs.readFileSync('./payload/request/user/getUserByNullID.xml','utf8');

        await use(payload);
    },

    // Update 
    updatedUserWithValidDetails: async ({ request }, use) => {

        const user = userTestData.updateValidUser;

        let payload = fs.readFileSync(UPDTE_PAYLOAD_PATH,'utf8' );
        let userService = new UserService(request);
        const validID = await userService.getValidID();

        payload = populateXmlValues(payload, { id: validID, ...userTestData.updateValidUser });

        await use({payload,name: user.name,email: user.email,age: user.age});
    },

    updatedUserWithEmptyName: async ({ request }, use) => {

        let payload = fs.readFileSync(UPDTE_PAYLOAD_PATH,'utf8');

        let userService = new UserService(request);
        const validID = await userService.getValidID();

        payload = populateXmlValues(payload, { id: validID, ...userTestData.updateEmptyName });

        await use(payload);
    },

    updatedUserWithInvalidEmailFormat: async ({ request }, use) => {

        let payload = fs.readFileSync(UPDTE_PAYLOAD_PATH,'utf8');
        let userService = new UserService(request);
        const validID = await userService.getValidID();

        payload = populateXmlValues(payload, { id: validID, ...userTestData.updateInvalidEmailFormat });

        await use(payload);
    },

    updatedUserWithInvalidAge: async ({ request }, use) => {

        let payload = fs.readFileSync( UPDTE_PAYLOAD_PATH, 'utf8' );
        let userService = new UserService(request);
        const validID = await userService.getValidID();

        payload = populateXmlValues(payload, { id: validID, ...userTestData.updateInvalidAge });

        await use(payload);
    }

});


export { expect };