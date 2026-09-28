import fs from 'fs';
import { parseXml } from '../utils/Utils.js';

export class UserService {
    static BASE_URL = "https://demo.totalshiftleft.ai";
    static ROUTE = "/soap";
    static HEADERS = {
        'Content-Type': 'application/xml'
    };

    constructor(request) {
        this.request = request;
    }

    async getAllUsers(getALlUsersPayload) {
        return await this.request.post(UserService.BASE_URL + UserService.ROUTE,
            {
                headers: {
                    ...UserService.HEADERS,
                    'SOAPAction': 'GetUsers'
                },
                data: getALlUsersPayload
            })
    }

    async getUserByID(getUserByIDPayload) {
        return await this.request.post(UserService.BASE_URL + UserService.ROUTE,
            {
                headers: {
                    ...UserService.HEADERS,
                    'SOAPAction': 'GetUser'
                },
                data: getUserByIDPayload
            })
    }


    async getValidID() {
        let createPayload = fs.readFileSync('./test-data/payload/request/user/createUserDefault.xml', 'utf8');
        const response = await this.request.post(UserService.BASE_URL + UserService.ROUTE,
            {
                headers: {
                    ...UserService.HEADERS,
                    'SOAPAction': 'CreateUser'
                },
                data: createPayload
            })

        const responseObject = parseXml(await response.text());

        return responseObject['soap:Envelope']['soap:Body']['tns:CreateUserResponse'].user.id;
    }

    async createUser(createUserPayload) {
        return await this.request.post(UserService.BASE_URL + UserService.ROUTE,
            {
                headers: {
                    ...UserService.HEADERS,
                    'SOAPAction': 'CreateUser'
                },
                data: createUserPayload
            })
    }

    async updateUser(updateUserPayload) {
        return await this.request.post(UserService.BASE_URL + UserService.ROUTE,
            {
                headers: {
                    ...UserService.HEADERS,
                    'SOAPAction': 'UpdateUser'
                },
                data: updateUserPayload
            })
    }

    async deleteUserByID(deleteUserByIDPayload) {
        return await this.request.post(UserService.BASE_URL + UserService.ROUTE,
            {
                headers: {
                    ...UserService.HEADERS,
                    'SOAPAction': 'DeleteUser'
                },
                data: deleteUserByIDPayload
            })
    }
}