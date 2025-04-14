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
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      );
    } catch (error) {
      console.error("There was an error in creating post.", error);
    }
  }

  //Update an existing database (Post)
  async updatePost(slug, { content, featuredImage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          content,
          featuredImage,
          status
        },
      );
    } catch (error) {
      console.error("There was a problem in updating post.", error);
    }
  }

  //To delete an existing Post
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
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
      console.error("There was a problem in getting post!", error);
      return false;
    }
  }

  //Fetch multiple Data from the database
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Error in getPosts:", error.message);
      return false;
    }
  }
}

const databaseService = new dbService();

export default databaseService;
