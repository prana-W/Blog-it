import conf from "../conf/conf";
import {Client, Account, ID} from 'appwrite'

class AuthService {
    client = new Client;
    account;

    constructor () {
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    //sign up
    async createAccount ({email, password, name}) {
        try {

            const userAccount = await this.account.create(
                ID.unique,
                email,
                password,
                name
            )

            if (userAccount) {
                return this.login({email, password})
            }
            
        } catch (error) {
            console.error('There was a problem in creating account!');
        }
    }

    //login
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email. password)
        } catch (error) {
            console.error('There was an error in logging in!')
        }
    }

    //get cuurent user

    async getCurrentUser () {
        try {
            return this.account.get()
        } catch (error) {
            console.error('There was a problem in getting current user!')
        }
    }

    //logout
    async logout() {
        try {
            return this.account.deleteSessions()
        } catch (error) {
            console.error('There was a problem in logging out!')
            return false
        }
    }
}

const authService = new AuthService()

export default authService