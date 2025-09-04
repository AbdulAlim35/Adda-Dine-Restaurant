import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class ChefDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ name, image, title, content,  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.chefCollactionId,
        ID.unique(),

        {
          name,
          image,
          title,
          content,
          
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { name, image, title, content,  }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.chefCollactionId,
        id,
        {
          name,
          image,
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
        conf.chefCollactionId,
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
        conf.chefCollactionId
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
        conf.chefCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
     async queryChif () {
  try {
    const latest = await this.databases.listDocuments(
      conf.databaseId,
      conf.chefCollactionId,
      [,Query.limit(3)]
    );
    return latest;
  } catch (error) {
    throw error;
  }
}
}
const chefDatabase = new ChefDatabase();
export default chefDatabase;
