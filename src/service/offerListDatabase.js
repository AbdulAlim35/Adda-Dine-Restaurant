import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class OfferListDatabase{
client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
    async creatPost({title, hading, date}) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.offerlistCollactionId,
        ID.unique(),

        {
          title,
          hading,
          date,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id,{title, hading, date}) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.offerlistCollactionId,
        id,
        {
          title,
          hading,
          date, 
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
        conf.offerlistCollactionId,
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
        conf.offerlistCollactionId
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
        conf.offerlistCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async listQuery () {
  try {
    const latest = await this.databases.listDocuments(
      conf.databaseId,
      conf.offerlistCollactionId,
      [Query.limit(3),Query.orderDesc("$createdAt")],
    );
    return latest;
  } catch (error) {
    throw error;
  }
}
}

const offerListDatabase = new OfferListDatabase()
export default offerListDatabase;