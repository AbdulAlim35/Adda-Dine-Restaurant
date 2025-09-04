import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

export class AboutDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({
    title,
    content,
    image,
    years,
    excellence,
    daily,
    customer,
    award,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.aboutCollactionId,
        ID.unique(),

        {
          title,
          content,
          image,
          years,
          excellence,
          daily,
          customer,
          award,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(
    id,
    { title, content, image, years, excellence, daily, customer, award }
  ) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.aboutCollactionId,
        id,
        {
          title,
          content,
          image,
          years,
          excellence,
          daily,
          customer,
          award,
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
        conf.aboutCollactionId
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
        conf.aboutCollactionId,
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
      conf.aboutCollactionId,
       [Query.limit(1)]
    );
    return response.documents[0]; // একটার জন্য
  } catch (error) {
    console.log("Error fetching post", error);
  }
}
}

const aboutDatabase = new AboutDatabase();

export default aboutDatabase;
