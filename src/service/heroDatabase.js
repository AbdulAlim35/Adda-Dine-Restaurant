import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class HeroDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ title, content, image }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.heroCollactionId,
        ID.unique(),

        {
          title,
          content,
          image,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { title, content, image }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.heroCollactionId,
        id,
        {
          title,
          content,
          image,
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
        conf.heroCollactionId,
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
        conf.heroCollactionId
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
        conf.heroCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
      async heroQuery() {
  try {
    const response = await this.databases.listDocuments(
      conf.databaseId,
      conf.heroCollactionId,
       [Query.limit(1)]
    );
    return response.documents[0]; // একটার জন্য
  } catch (error) {
    console.log("Error fetching post", error);
  }
}
}

const heroDatabase = new HeroDatabase();
export default heroDatabase;
