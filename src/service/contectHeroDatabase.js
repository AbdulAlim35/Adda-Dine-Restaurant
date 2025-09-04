import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class ContectHeroDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ herotitle, herohading, image }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.contectheroCollactionId,
        ID.unique(),

        {
          herotitle,
          herohading,
          image,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { herotitle, herohading, image }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.contectheroCollactionId,
        id,
        {
          herotitle,
          herohading,
          image,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async listPost() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.contectheroCollactionId
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
        conf.contectheroCollactionId,
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
        conf.contectheroCollactionId,
        [Query.limit(1)]
      );
      return response.documents[0]; // একটার জন্য
    } catch (error) {
      console.log("Error fetching post", error);
    }
  }
}
const contectHeroDatabase = new ContectHeroDatabase();
export default contectHeroDatabase;
