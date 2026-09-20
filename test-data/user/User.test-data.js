import { randomUUID } from 'crypto';

export const userTestData = {

    // Create
    validUser: {
        name: 'JonnyTest-001',
        email: 'jtest@gmail.com',
        age: 50
    },

    emptyName: {
        name: '',
        email: 'jtest@gmail.com',
        age: 50
    },

    emptyEmail: {
        name: 'JonnyTest-002',
        email: '',
        age: 50
    },

    underAge: {
        name: 'JonnyTest-002',
        email: 'jtest@gmail.com',
        age: 17
    },

    invalidEmailFormat: {
        name: 'JonnyTest-002',
        email: 'abc',
        age: 19
    },

    nameExceedingMaximumLength: {
        name: 'maximum-length-should-be-20-characters',
        email: 'kage@yahoo.com',
        age: 20
    },

    // Delete
    delete: {
        wrongID: randomUUID(),

        invalidIDFormat: 'xxxxxxxx',

        emptyID: ''
    },

    // Get
    get: {
        wrongID: randomUUID(),
        invalidIDFormat: '123-321-123',
        emptyID: ''
    },

    // Update
    updateValidUser: {
        name: 'John-Updated',
        email: 'john-update@gmail.com',
        age: 51
    },

    updateEmptyName: {
        name: '',
        email: 'john-update@gmail.com',
        age: 51
    },

    updateInvalidEmailFormat: {
        name: 'JackUpdated',
        email: 'jabc',
        age: 51
    },

    updateInvalidAge: {
        name: 'JackUpdated',
        email: 'john-update@gmail.com',
        age: 17
    }

};
