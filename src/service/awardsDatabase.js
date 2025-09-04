import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class AwardsDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ title, hading, icone }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.awardsCollactionId,
        ID.unique(),

        {
          title,
          hading,
          icone,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { title, hading, icone }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.awardsCollactionId,
        id,
        {
          title,
          hading,
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
        conf.awardsCollactionId,
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
        conf.awardsCollactionId
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
        conf.awardsCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async awardsQuery() {
    try {
      const latest = await this.databases.listDocuments(
        conf.databaseId,
        conf.awardsCollactionId,
        [Query.limit(4), Query.orderDesc("$createdAt")]
      );
      return latest;
    } catch (error) {
      throw error;
    }
  }
}

const awardsDatabase = new AwardsDatabase();
export default awardsDatabase;
