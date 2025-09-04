import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class Philosophy {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({title, content, icone}) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.philosophyCollactionId,
        ID.unique(),

        {
          title,
          content,
          icone,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id,{title, content, icone}) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.philosophyCollactionId,
        id,
        {
          title,
          content,
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
        conf.philosophyCollactionId,
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
        conf.philosophyCollactionId
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
        conf.philosophyCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
       async philosophyQuery () {
  try {
    const latest = await this.databases.listDocuments(
      conf.databaseId,
      conf.philosophyCollactionId,
      [Query.limit(3),Query.orderDesc("$createdAt")],
    );
    return latest;
  } catch (error) {
    throw error;
  }
}

}

const philosophy = new Philosophy();

export default philosophy;
