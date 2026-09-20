import { randomUUID } from 'crypto';

export const productTestData = {

    // Create
    validProduct: {
        name: 'Laptop',
        price: 10,
        stock: 5
    },

    emptyName: {
        name: '',
        price: 10,
        stock: 5
    },

    negativePrice: {
        name: 'iPhone-10',
        price: -2,
        stock: 5
    },

    negativeStock: {
        name: 'iPhone-10',
        price: 60,
        stock: -5
    },

    nameExceedingMaximumLength: {
        name: 'maximum-length-should-be-20-characters',
        price: 60,
        stock: 5
    },

    // Get
    get: {
        wrongID: randomUUID(),
        invalidIDFormat: '123-123-123',
        emptyID: ''
    },

    
    // Update
    updateValidProduct: {
        name: 'Laptop-Updated',
        price: 10,
        stock: 5
    },

    updateEmptyName: {
        name: '',
        price: 10,
        stock: 5
    },

    updateNegativePrice: {
        name: 'Laptop-002',
        price: -10,
        stock: 5
    },

    updateNegativeStock: {
        name: 'Laptop-002',
        price: 10,
        stock: -5
    },


    // Delete
    delete: {
        wrongID: randomUUID(),

        invalidIDFormat: 'xxxxxxxx',

        emptyID: ''
    }
};
