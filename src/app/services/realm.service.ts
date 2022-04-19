import { Injectable } from "@angular/core";
import { appendFile } from "fs";
import * as Realm from "realm";

@Injectable({
    providedIn: 'root',
})
export class RealmService {

    realmApp: any;
    realmUser: any;
    localRealm: any;

    realmSchema = {
        name: "Sign",
        required: [
            "_id",
            "_partition",
            "answer",
            "imageUrl",
            "choices"
        ],
        properties: {
            _id: "objectId",
            _partition: "string",
            answer: "string",
            imageUrl: "string"
        },
        additionalProperties: {
            title: "choices",
            properties: {
                choice1: "string",
                choice2: "string",
                choice3: "string",
            }
        },
    };
    
    constructor(){}

    /**
     * Starts Communication between Application and RealmServer
     * @returns 
     */
    async startRealm(): Promise<boolean>{
        this.realmApp = new Realm.App({ id: "ppit-project-ezmnf"});
        const credentials = Realm.Credentials.anonymous();
        try{
            this.realmUser = await this.realmApp.logIn(credentials);
            return true;
        } catch(err){
            console.error("Failed to log in", err);
            return false;
        }
    }

    /**
     * 
     */
    async openRealm(){
        try{
            this.localRealm = await Realm.open({
                schema: [this.realmSchema],
                sync: {
                    user: this.realmUser,
                    partitionValue: 'GeneralUse'
                }
            })
        }catch(err){
            console.log(err);
        }   
    }
}