import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class SettingDatabase{
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
    async creatPost({ name, content, }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.settingCollactionId,
        ID.unique(),

        {
         name, content,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { name, content,}) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.settingCollactionId,
        id,
        {
         name, content,
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
        conf.settingCollactionId
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
        conf.settingCollactionId,
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
      conf.settingCollactionId,
       [Query.limit(1)]
    );
    return response.documents[0]; // একটার জন্য
  } catch (error) {
    console.log("Error fetching post", error);
  }
}
}
const settingDatabase = new SettingDatabase()
export default settingDatabase;