import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class CulinaryIconeDatabase {
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
        conf.culinaryiconeCollactionId,
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
        conf.culinaryiconeCollactionId,
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
        conf.culinaryiconeCollactionId,
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
        conf.culinaryiconeCollactionId
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
        conf.culinaryiconeCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async listQuery() {
    try {
      const latest = await this.databases.listDocuments(
        conf.databaseId,
        conf.culinaryiconeCollactionId,
        [Query.limit(4), Query.orderDesc("$createdAt")]
      );
      return latest;
    } catch (error) {
      throw error;
    }
  }
}

const culinaryIconeDatabase = new CulinaryIconeDatabase();
export default culinaryIconeDatabase;
