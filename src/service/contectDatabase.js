import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class ContectDatabase{
client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
   async creatPost({ name, email, subject, message,  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.contectCollactionId,
        ID.unique(),

        {
          name, email, subject, message,
          
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { name, email, subject, message,  }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.contectCollactionId,
        id,
        {
         name, email, subject, message,
          
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
        conf.contectCollactionId,
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
        conf.contectCollactionId
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
        conf.contectCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async totalMassege() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.contectCollactionId,
        [],
        1,
        0
      );
      return res.total;
    } catch (error) {
      throw error;
    }
  }
}

const contectDatabase = new ContectDatabase()
export default contectDatabase