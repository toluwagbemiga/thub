import PsConfig from '@/config/PsConfig';
import PsResource from '@/api/common/PsResource';
import Axios from 'axios';
import PsStatus from './PsStatus';
import { PsObject } from '@/object/core/PsObject';
import PsUtils from '@/utils/PsUtils';

export default class PsApi {

    // getData
    static async getData<T extends PsObject<T>, R>(obj: T, url: String): Promise<PsResource<R>> {

        const psResource: PsResource<R> = new PsResource();

        await Axios.get(PsConfig.baseUrl + '' + url
        ).then(response => {
            PsUtils.clear();
            if (this.isSuccessful(response.status)) {

                if (Array.isArray(response.data)) {

                    const tList: T[] = [];

                    for (let i = 0; i < response.data.length; i++) {

                        tList.push(obj.fromMap(response.data[i]));
                    }

                    psResource.init(PsStatus.SUCCESS, response.status, "", tList as any);

                } else {

                    psResource.init(PsStatus.SUCCESS, response.status, "", obj.fromMap(response.data) as any);
                }
            } else {
                if (response) {
                    if(response.data.message.includes("##")) {
                        const arr = response.data.message.split('##');
                        psResource.init(PsStatus.ERROR, arr[0], arr[1], null as any);
                    }else {
                        psResource.init(PsStatus.ERROR, response.status, response.data.message, null as any);
                    }

                } else {

                    psResource.init(PsStatus.ERROR, 404, "Get Error 1", null as any);
                }
            }

        }).catch(error => {
            PsUtils.clear();
            if (error.response) {
                if(error.response && error.response.status === 404) {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                    console.clear();
                }else if(error.response.data.message.includes("##")) {
                    const arr = error.response.data.message.split('##');
                    psResource.init(PsStatus.ERROR, arr[0], arr[1], null as any);
                }else {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                }
              

            } else {
                psResource.init(PsStatus.ERROR, 404, "Get Error 2", null as any);
            }

        });
        return psResource;
    }

    // post Data
    static async postData<T extends PsObject<T>, R>(obj: T, url: String, postData: any): Promise<PsResource<R>> {
       
        const psResource: PsResource<R> = new PsResource();
        await Axios.post(PsConfig.baseUrl + '' + url, postData
        ).then(response => {
            PsUtils.clear();
            if (this.isSuccessful(response.status)) {
                if (Array.isArray(response.data)) {
                   
                    const tList: T[] = [];
                  
                    try {
                        for (let i = 0; i < response.data.length; i++) {
                            tList.push(obj.fromMap(response.data[i]));
                        }
                    } catch (e) {
                        PsUtils.log(e);
                    }
                
                    psResource.init(PsStatus.SUCCESS, response.status, "", tList as any);

                } else {
                    psResource.init(PsStatus.SUCCESS, response.status, "", obj.fromMap(response.data) as any);
                }
            } else {
                
                if (response) {
                   
                    if(response.data.message.includes("##")) {
                        const arr = response.data.message.split('##');
                        psResource.init(PsStatus.ERROR, arr[0], arr[1], null as any);
                    }else {
                        psResource.init(PsStatus.ERROR, response.status, response.data.message, null as any);
                    }
                    

                } else {
                    psResource.init(PsStatus.ERROR, 404, "Post Error 1", null as any);
                }
            }

        }).catch(error => {
            PsUtils.clear();
            if (error.response != null 
                && error.response.data != null
                && error.response.data.message != null) {
                if(error.response && error.response.status === 404) {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                    console.clear();
                }else if(error.response.data.message.includes("##")) {
                    const arr = error.response.data.message.split('##');
                    psResource.init(PsStatus.ERROR, arr[0], arr[1], null as any);
                }else {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                }

            } else {
                psResource.init(PsStatus.ERROR, 404, "Post Error 2", null as any);
            }

        });

        return psResource;
    }

    // post upload chat image
    static async postUploadChatImage<T extends PsObject<T>, R>(
        obj: T, 
        url: String, 
        senderIdText : String,
        senderId : String,
        sellerUserIdText : String,
        sellerUserId : String,
        buyerUserIdText : String,
        buyerUserId : String,
        itemIdText : String,
        itemId : String,
        typeText : String,
        type : String,
        file: File): Promise<PsResource<R>> {
        
            /*
          Initialize the form data
        */
        const formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
       
        formData.append('file', file);
       

        formData.append(senderIdText+'', senderId+'');
        formData.append(sellerUserIdText+'', sellerUserId+'');
        formData.append(buyerUserIdText+'', buyerUserId+'');
        formData.append(itemIdText+'', itemId+'');
        formData.append(typeText+'', type+'');
        const psResource: PsResource<R> = new PsResource();
        await Axios.post(PsConfig.baseUrl + '' + url, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            PsUtils.clear();
            if (this.isSuccessful(response.status)) {

                if (Array.isArray(response.data)) {

                    const tList: T[] = [];
                  
                    try {
                        for (let i = 0; i < response.data.length; i++) {
                            tList.push(obj.fromMap(response.data[i]));
                        }
                    } catch (e) {
                        PsUtils.log(e);
                    }
                   
                    psResource.init(PsStatus.SUCCESS, response.status, "", tList as any);

                } else {

                    psResource.init(PsStatus.SUCCESS, response.status, "", obj.fromMap(response.data) as any);
                }
            } else {
                if (response) {
                    psResource.init(PsStatus.ERROR, response.status, response.data.message, null as any);

                } else {
                    psResource.init(PsStatus.ERROR, 404, "Post Error 1", null as any);
                }
            }

        }).catch(error => {
            PsUtils.clear();
            if (error.response) {
                if(error.response && error.response.status === 404) {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                    console.clear();
                } else {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                }
            } else {
                psResource.init(PsStatus.ERROR, 404, "Post Error 2", null as any);
            }

        });

        return psResource;
    }

    // postUploadImage 
    static async postUploadImage<T extends PsObject<T>, R>(
        obj: T, 
        url: String, 
        userIdText : String,
        userId : String,
        platformNameText : String,
        platformName : String,
        file: File,
        imgIdText : String,
        imgId): Promise<PsResource<R>> {
            /*
          Initialize the form data
        */
        const formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
       
        formData.append('file', file);

        formData.append(userIdText+'', userId+'');
        formData.append(platformNameText+'', platformName+'');
        formData.append(imgIdText+'', imgId+'');
        const psResource: PsResource<R> = new PsResource();
        await Axios.post(PsConfig.baseUrl + '' + url, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            PsUtils.clear();
            if (this.isSuccessful(response.status)) {

                if (Array.isArray(response.data)) {

                    const tList: T[] = [];
                  
                    try {
                        for (let i = 0; i < response.data.length; i++) {
                            tList.push(obj.fromMap(response.data[i]));
                        }
                    } catch (e) {
                        PsUtils.log(e);
                    }
                    
                    psResource.init(PsStatus.SUCCESS, response.status, "", tList as any);

                } else {

                    psResource.init(PsStatus.SUCCESS, response.status, "", obj.fromMap(response.data) as any);
                }
            } else {
                if (response) {
                    psResource.init(PsStatus.ERROR, response.status, response.data.message, null as any);

                } else {
                    psResource.init(PsStatus.ERROR, 404, "Post Error 1", null as any);
                }
            }

        }).catch(error => {
            PsUtils.clear();
            if (error.response) {
                if(error.response && error.response.status === 404) {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                    console.clear();
                } else {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                }
            } else {
                psResource.init(PsStatus.ERROR, 404, "Post Error 2", null as any);
            }

        });

        return psResource;
    }

    // postUploadImage 
    static async postUploadItemImage<T extends PsObject<T>, R>(
        obj: T, 
        url: String, 
        item_id : String,
        imgParentId : String,
        img_type : String,
        imgType : String,
        ordering : Number,
        imgDesc : String,
        file: File,
        img_id : String,
        imgId : String): Promise<PsResource<R>> {
        
        /*
          Initialize the form data
        */
        const formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
       
        formData.append('file', file);
        formData.append(item_id+'', imgParentId+'');
        formData.append(img_type+'', imgType+'');
        formData.append('ordering', ordering+'');
        formData.append('img_desc', imgDesc+'');
        formData.append(img_id+'', imgId+'');
        const psResource: PsResource<R> = new PsResource();
        await Axios.post(PsConfig.baseUrl + '' + url, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            PsUtils.clear();
            if (this.isSuccessful(response.status)) {

                if (Array.isArray(response.data)) {

                    const tList: T[] = [];
                
                    try {
                        for (let i = 0; i < response.data.length; i++) {
                            tList.push(obj.fromMap(response.data[i]));
                        }
                    } catch (e) {
                        PsUtils.log(e);
                    }
                 
                    psResource.init(PsStatus.SUCCESS, response.status, "", tList as any);

                } else {

                    psResource.init(PsStatus.SUCCESS, response.status, "", obj.fromMap(response.data) as any);
                }
            } else {
                if (response) {
                    psResource.init(PsStatus.ERROR, response.status, response.data.message, null as any);

                } else {
                    psResource.init(PsStatus.ERROR, 404, "Post Error 1", null as any);
                }
            }

        }).catch(error => {
            PsUtils.clear();
            if (error.response) {
                if(error.response && error.response.status === 404) {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                    console.clear();
                } else {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                }
            } else {
                psResource.init(PsStatus.ERROR, 404, "Post Error 2", null as any);
            }

        });

        return psResource;
    }

     // postUploadImage 
     static async postUploadVideoImage<T extends PsObject<T>, R>(
        obj: T, 
        url: String, 
        item_id : String,
        imgParentId : String,
        file: File): Promise<PsResource<R>> {
        
        /*
          Initialize the form data
        */
        const formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
       
        formData.append('file', file);
        formData.append(item_id+'', imgParentId+'');
       
        const psResource: PsResource<R> = new PsResource();
        await Axios.post(PsConfig.baseUrl + '' + url, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            PsUtils.clear();
            if (this.isSuccessful(response.status)) {

                if (Array.isArray(response.data)) {

                    const tList: T[] = [];
                   
                    try {
                        for (let i = 0; i < response.data.length; i++) {
                            tList.push(obj.fromMap(response.data[i]));
                        }
                    } catch (e) {
                        PsUtils.log(e);
                    }
                   
                    psResource.init(PsStatus.SUCCESS, response.status, "", tList as any);

                } else {

                    psResource.init(PsStatus.SUCCESS, response.status, "", obj.fromMap(response.data) as any);
                }
            } else {
                if (response) {
                    psResource.init(PsStatus.ERROR, response.status, response.data.message, null as any);

                } else {
                    psResource.init(PsStatus.ERROR, 404, "Post Error 1", null as any);
                }
            }

        }).catch(error => {
            PsUtils.clear();
            if (error.response) {
                if(error.response && error.response.status === 404) {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                    console.clear();
                } else {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                }
            } else {
                psResource.init(PsStatus.ERROR, 404, "Post Error 2", null as any);
            }

        });

        return psResource;
    }

     // postUploadImage 
     static async postUploadVideoThumbUpload<T extends PsObject<T>, R>(
        obj: T, 
        url: String, 
        item_id : String,
        imgParentId : String,
        file: File): Promise<PsResource<R>> {
        
        /*
          Initialize the form data
        */
        const formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
       
        formData.append('file', file);
        formData.append(item_id+'', imgParentId+'');
       
        const psResource: PsResource<R> = new PsResource();
        await Axios.post(PsConfig.baseUrl + '' + url, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            PsUtils.clear();
            if (this.isSuccessful(response.status)) {

                if (Array.isArray(response.data)) {

                    const tList: T[] = [];
                   
                    try {
                        for (let i = 0; i < response.data.length; i++) {
                            tList.push(obj.fromMap(response.data[i]));
                        }
                    } catch (e) {
                        PsUtils.log(e);
                    }
                  
                    psResource.init(PsStatus.SUCCESS, response.status, "", tList as any);

                } else {

                    psResource.init(PsStatus.SUCCESS, response.status, "", obj.fromMap(response.data) as any);
                }
            } else {
                if (response) {
                    psResource.init(PsStatus.ERROR, response.status, response.data.message, null as any);

                } else {
                    psResource.init(PsStatus.ERROR, 404, "Post Error 1", null as any);
                }
            }

        }).catch(error => {
            PsUtils.clear();
            if (error.response) {
                if(error.response && error.response.status === 404) {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                    console.clear();
                } else {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                }
            } else {
                psResource.init(PsStatus.ERROR, 404, "Post Error 2", null as any);
            }

        });

        return psResource;
    }

    // postUploadChatImage
    // TODO


    // postUploadDealership
    static async postUploadDealerUpload<T extends PsObject<T>, R>(
        obj: T, 
        url: String, 
        user_id : String,
        imgParentId : String,
        file: File): Promise<PsResource<R>> {
            
        
        /*
          Initialize the form data
        */
        const formData = new FormData();

        /*
          Iteate over any file sent over appending the files
          to the form data.
        */
       
        formData.append('file', file);
        formData.append(user_id+'', imgParentId+'');
       
        const psResource: PsResource<R> = new PsResource();
        await Axios.post(PsConfig.baseUrl + '' + url, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(response => {
            PsUtils.clear();
            if (this.isSuccessful(response.status)) {

                if (Array.isArray(response.data)) {

                    const tList: T[] = [];
                   
                    try {
                        for (let i = 0; i < response.data.length; i++) {
                            tList.push(obj.fromMap(response.data[i]));
                        }
                    } catch (e) {
                        PsUtils.log(e);
                    }
                 
                    psResource.init(PsStatus.SUCCESS, response.status, "", tList as any);

                } else {

                    psResource.init(PsStatus.SUCCESS, response.status, "", obj.fromMap(response.data) as any);
                }
            } else {
                if (response) {
                    psResource.init(PsStatus.ERROR, response.status, response.data.message, null as any);

                } else {
                    psResource.init(PsStatus.ERROR, 404, "Post Error 1", null as any);
                }
            }

        }).catch(error => {
            PsUtils.clear();
            if (error.response) {
                if(error.response && error.response.status === 404) {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                    console.clear();
                } else {
                    psResource.init(PsStatus.ERROR, error.response.status, error.response.data.message, null as any);
                }
            } else {
                psResource.init(PsStatus.ERROR, 404, "Post Error 2", null as any);
            }

        });

        return psResource;
    }


    static isSuccessful(code: Number): boolean {
        return code >= 200 && code < 300;
    }
}
