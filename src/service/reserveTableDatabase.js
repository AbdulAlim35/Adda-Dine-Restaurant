import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";
export class ReserveTableDatabase {
  client = new Client();
  databases;
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);
    this.databases = new Databases(this.client);
  }
  async creatPost({ name, email, phone, guests, date, time, request }) {
    try {
      return await this.databases.createDocument(
        conf.databaseId,
        conf.reservetableCollactionId,
        ID.unique(),

        {
          name,
          email,
          phone,
          guests,
          date,
          time,
          request,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, { name, email, phone, guests, date, time, request }) {
    try {
      await this.databases.updateDocument(
        conf.databaseId,
        conf.reservetableCollactionId,
        id,
        {
          name,
          email,
          phone,
          guests,
          date,
          time,
          request,
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
        conf.reservetableCollactionId
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
        conf.reservetableCollactionId,
        slug
      );
    } catch (error) {
      throw error;
    }
  }
    async totalGeuests() {
    try {
      const res = await this.databases.listDocuments(
        conf.databaseId,
        conf.reservetableCollactionId,
        [],
        1,
        0
      );
      return res.total;
    } catch (error) {
      throw error;
    }
  }
}
const reserveTableDatabase = new ReserveTableDatabase();
export default reserveTableDatabase;
