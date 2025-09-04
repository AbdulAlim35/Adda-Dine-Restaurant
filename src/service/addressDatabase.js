import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class AddressDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ name, title1, title2, title3, icone }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.addressCollactionId,
        ID.unique(),

        {
          name,
          title1,
          title2,
          title3,
          icone,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { name, title1, title2, title3, icone }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.addressCollactionId,
        id,
        {
          name,
          title1,
          title2,
          title3,
          icone,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async dealetePost(data) {
    try {
      return await this.databases.deleteDocument(
        conf.databaseId,
        conf.addressCollactionId,
        data
      );
    } catch (error) {
      throw error;
    }
  }
  async listPost() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.addressCollactionId
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.databaseId,
        conf.addressCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
}
const addressDatabase = new AddressDatabase();
export default addressDatabase;
