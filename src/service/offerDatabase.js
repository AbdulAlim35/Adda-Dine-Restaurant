import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class OfferDatabase{
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }    
  async creatPost({ title, hading }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.offerCollactionId,
        ID.unique(),

        {
          title,
          hading,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { title, hading }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.offerCollactionId,
        id,
        {
          title,
          hading,
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
        conf.offerCollactionId,
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
        conf.offerCollactionId
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
        conf.offerCollactionId,
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
        conf.offerCollactionId,
        [Query.limit(1)]
      );
      return response.documents[0]; // একটার জন্য
    } catch (error) {
      console.log("Error fetching post", error);
    }
  }
}
const offerDatabase = new OfferDatabase()
export default offerDatabase;