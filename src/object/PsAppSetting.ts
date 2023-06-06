import { PsObject } from "./core/PsObject";

export default class PsAppSetting extends PsObject<PsAppSetting>{

    latitude : string = '';
    longitude : string = '';
    isSubLocation : string = '';
    isThumbnailGenerate : string = '';
    isPaidApp : string = '';
    isBlockUser : string = '';
    isSubcatSubscription : string = '';
    maxImgUploadOfItem : string = '';
   
    init(
        latitude : string,
        longitude : string,
        isSubLocation : string,
        isThumbnailGenerate :string,
        isPaidApp : string,
        isBlockUser : string,
        isSubcatSubscription : string,
        maxImgUploadOfItem : string,
        
       

    ) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.isSubLocation = isSubLocation;
        this.isThumbnailGenerate = isThumbnailGenerate;
        this.isPaidApp = isPaidApp;
        this.isBlockUser = isBlockUser;
        this.isSubcatSubscription = isSubcatSubscription;
        this.maxImgUploadOfItem = maxImgUploadOfItem;
        

        return this;

    }

    getPrimaryKey(): string {
        return this.latitude;
    }

    toMap(object: PsAppSetting): any {
        const map = {};
        map['lat'] = object.latitude;
        map['lng'] = object.longitude;
        map['is_sub_location'] = object.isSubLocation;
        map['is_thumb2x_3x_generate'] = object.isThumbnailGenerate;
        map['is_paid_app'] = object.isPaidApp;
        map['is_block_user'] = object.isBlockUser;
        map['is_subcat_subscription'] = object.isSubcatSubscription;
        map['max_img_upload_of_item'] = object.maxImgUploadOfItem;
        
        
        return map;
    }

    toMapList(objectList: PsAppSetting[]) : any[] {
        const mapList : any[] = [];
        for(let i = 0; i < objectList.length; i++) {
            if(objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new PsAppSetting().init(


            obj.lat,
            obj.lng,
            obj.is_sub_location,
            obj.is_thumb2x_3x_generate,
            obj.is_paid_app,
            obj.is_block_user,
            obj.is_subcat_subscription,
            obj.max_img_upload_of_item
            

       );
    }   
    fromMapList(objList : any[] ) : PsAppSetting[] {
        const psAppSettingList : PsAppSetting[] = [];
        for(const obj in objList) {
            if(obj != null) {
                psAppSettingList.push(this.fromMap(obj));
            }
        }

        return psAppSettingList;
    }
    

}