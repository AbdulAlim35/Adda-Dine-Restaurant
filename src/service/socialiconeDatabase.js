import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class SocialIconeDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ sociallink, iconename }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.socialiconeCollactionId,
        ID.unique(),

        {
          sociallink, iconename
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { sociallink, iconename }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.socialiconeCollactionId,
        id,
        {
          sociallink, iconename
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
        conf.socialiconeCollactionId
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
        conf.socialiconeCollactionId,
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
        conf.socialiconeCollactionId,
        [Query.limit(1)]
      );
      return response.documents[0]; // একটার জন্য
    } catch (error) {
      console.log("Error fetching post", error);
    }
  }
}
const socialIconeDatabase = new SocialIconeDatabase();
export default socialIconeDatabase;
