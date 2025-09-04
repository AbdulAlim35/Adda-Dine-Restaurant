import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class GalleryHeroBannerDatabase{
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
        conf.galleryherobannerCollactionId,
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
        conf.galleryherobannerCollactionId,
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
        conf.galleryherobannerCollactionId,
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
        conf.galleryherobannerCollactionId
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
        conf.galleryherobannerCollactionId,
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
        conf.galleryherobannerCollactionId,
        [Query.limit(1)]
      );
      return response.documents[0]; // একটার জন্য
    } catch (error) {
      console.log("Error fetching post", error);
    }
}
}
const galleryHeroBannerDatabase = new GalleryHeroBannerDatabase()

export default galleryHeroBannerDatabase;