import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class MenuHeroBanner {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({
    herotitle,
    herohading,
    image,
    bannertitle,
    bannercontent,
  }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.menuherobannerCollactionId,
        ID.unique(),

        {
          herotitle,
          herohading,
          image,
          bannertitle,
          bannercontent,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(
    id,
    { herotitle, herohading, image, bannertitle, bannercontent }
  ) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.menuherobannerCollactionId,
        id,
        {
          herotitle,
          herohading,
          image,
          bannertitle,
          bannercontent,
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
        conf.menuherobannerCollactionId,
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
        conf.menuherobannerCollactionId
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
        conf.menuherobannerCollactionId,
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
        conf.menuherobannerCollactionId,
        [Query.limit(1)]
      );
      return response.documents[0]; // একটার জন্য
    } catch (error) {
      console.log("Error fetching post", error);
    }
  }
}
const menuHeroBanner = new MenuHeroBanner();
export default menuHeroBanner;
