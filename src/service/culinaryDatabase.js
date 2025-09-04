import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class CulinaryDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ title, content }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.culinaryCollactionId,
        ID.unique(),

        {
          title,
          content,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { title, content }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.culinaryCollactionId,
        id,
        {
          title,
          content,
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
        conf.culinaryCollactionId,
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
        conf.culinaryCollactionId
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
        conf.culinaryCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async listQuery() {
    try {
      const response = await this.databases.listDocuments(
        conf.databaseId,
        conf.culinaryCollactionId,
        [Query.limit(1)]
      );
      return response.documents[0]; // একটার জন্য
    } catch (error) {
      console.log("Error fetching post", error);
    }
  }
}

const culinaryDatabase = new CulinaryDatabase();
export default culinaryDatabase;
