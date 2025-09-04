import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite";
 export class AuthService {
   client = new Client();
  account;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.account = new Account(this.client);
  }
    async cerateAccount({ email, password, name }) {
    try {
      const useAccount = await this.account.create(
        ID.unique(),

        email,
        password,
        name
      );
    } catch (error) {
      throw error;
    }
  }
    async logIn({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }
  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
    async updateName(name) {
    try {
      await this.account.updateName(name);
    } catch (error) {
      throw error;
    }
  }
  async updateEmail({ email, password }) {
    try {
      await this.account.updateEmail(email, password);
    } catch (error) {
      throw error;
    }
  }
  async updatePassword({ oldpassword, password }) {
    try {
      await this.account.updatePassword(password, oldpassword);
    } catch (error) {
      throw error;
    }
  }
 }

 const authService = new AuthService();
 export default authService;