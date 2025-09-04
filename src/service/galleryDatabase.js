import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class GalleryDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ title, image, category }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.galleryCollactionId,
        ID.unique(),

        {
          title,
          image,
          category,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { title, image, category }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.galleryCollactionId,
        id,
        {
          title,
          image,
          category,
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
        conf.galleryCollactionId,
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
        conf.galleryCollactionId
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
        conf.galleryCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
  async galleryQuery(category) {
    try {
      const latest = await this.databases.listDocuments(
        conf.databaseId,
        conf.galleryCollactionId,
       category === "All"
        ? [Query.orderDesc("$createdAt")] // শুধু সাজাবে, filter হবে না
        : [Query.equal("category", category), Query.orderDesc("$createdAt")]
      );
      return latest;
    } catch (error) {
      throw error;
    }
  }
}

const galleryDatabase = new GalleryDatabase();
export default galleryDatabase;
