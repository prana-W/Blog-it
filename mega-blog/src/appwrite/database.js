import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

class dbService {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    this.database = new Databases(this.client);
  }

  //Creating a Post
  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      return await database.createDocument(
        appwriteDatabaseId,
        appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("There was an error in creating post.");
    }
  }

  //Update an existing database (Post)
  async updatePost({ content, slug, featuredImage, status }) {
    try {
      return await this.database.updatePost(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("There was a problem in updating post.");
    }
  }

  //To delete an existing Post
  async deletePost(slug) {
    try {
      await this.database.deletePost(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.error("There was a problem in deleting the post!");
      return false;
    }
  }

  //Fetch Data from the database
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("There was a problem in getting post!");
      return false;
    }
  }

  //Fetch multiple Data from the database
  async getPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("There was a problem in getting post!");
      return false;
    }
  }
}

const databaseService = new databaseService();

export default databaseService;
