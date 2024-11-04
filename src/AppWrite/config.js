import conf from "../conf/conf";
import { Client, Databases, Storage,Query, ID } from "appwrite";
// import { Service } from "appwrite/types/service";

export class Service{
    client=new Client();
    databases;
    storage;
    constructor(){
        this.client
        .setProject(conf.appwriteProjectId)
        .setEndpoint(conf.appwriteUrl);
        this.databases=new Databases(this.client);
        this.storage=new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userid}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userid
            })
        } catch (error) {
            console.log("CREATE POST",error)
        }
    }
    async updatePost(slug,{title, content, featuredImage, status, userid}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status,
                userid
            })
        } catch (error) {
            console.log("Error Update Post")
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(conf.appwriteDatabseId,conf.appwriteCollectionId,slug)
            return true
        } catch (error) {
            console.log("Error Delete Post")
            return false
        }
    }
    async getPost(slug){
        try {
           return await this.databases.getDocument(conf.appwriteDatabseId,conf.appwriteCollectionId,slug)
            
        } catch (error) {
            console.log("Error Get Post",error)
            return false
        }
    }
    async getPosts(slug){
        try {
           return await this.databases.listDocuments(conf.appwriteDatabseId,conf.appwriteCollectionId,
            [
                Query.equal("status","active")
           ])
            
        } catch (error) {
            console.log("Error Get Posts",error)
            return false
        }
    }
        //File Upload service

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("UPLOAD FILE ERROR");
        }

    }
    async deleteFile(fileId, ){
        try {
             await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true

        } catch (error) {
            console.log("UDelete FILE ERROR");
            return false
        }
      

            
        }
        getFilePreview(fileId){   
        return this.storage.getFilePreview(conf.appwriteBucketId,fileId)
    }
     
    
}
const service= new Service()
export default service
