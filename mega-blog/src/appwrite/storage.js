import conf from "../conf/conf";
import { Client, ID, Storage } from "appwrite";

class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  //Upload file (image)
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("There was an error in uploading the file!");
      return false;
    }
  }

  //Delete File
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBuckefileId, fileId);
      return true;
    } catch (error) {
      console.error("There was an error in deleeting the file!");
      return false;
    }
  }

  //File View
  fileView(fileId) {
    try {
      return this.storage.getFileView(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("There was a problem in previewing the file!");
    }
  }
}

const storageService = new StorageService();

export default storageService;
