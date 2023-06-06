import { PsObject } from "./core/PsObject";
import Language from "./Language";
export default class FrontendConfigSetting extends PsObject<FrontendConfigSetting>{

    mapKey : string = '';
    isEnableVideoSetting : string = '';
    showUserProfile : string = '';
    noFilterWithLocationOnMap : string = '';
    priceFormat : string = '';
    enableNotification : string = '';
    fcmServerKey : string = '';
    firebaseWebPushKeyPair : string = '';
    adClient : string = '';
    adSlot : string = '';
    copyRight : string = '';
    googlePlayUrl : string = '';
    appStoreUrl : string = '';
    googleSetting : string = '';
    appStoreSetting : string = '';
    bannerSrc : string = '';
    googleMap : string = '';
    openStreetMap : string = '';
    mile : string = '';
    promoteFirstChoiceDay : string = '';
    promoteSecondChoiceDay : string = '';
    promoteThirdChoiceDay : string = '';
    promoteFourthChoiceDay : string = '';
    itemUploadUi1 : Boolean = false;
    itemUploadUi2 : Boolean = false;
    defaultLanguage: Language = new Language();
    excludeLanguage: Language[] = [new Language()];
   
    init(
        mapKey : string,
        isEnableVideoSetting : string,
        showUserProfile : string,
        noFilterWithLocationOnMap : string,
        priceFormat : string,
        enableNotification : string,
        fcmServerKey : string,
        firebaseWebPushKeyPair : string,
        adClient : string,
        adSlot : string,
        copyRight : string,
        googlePlayUrl : string,
        appStoreUrl : string,
        googleSetting : string,
        appStoreSetting : string,
        bannerSrc : string,
        googleMap : string,
        openStreetMap : string,
        mile : string,
        promoteFirstChoiceDay : string,
        promoteSecondChoiceDay : string,
        promoteThirdChoiceDay : string,
        promoteFourthChoiceDay : string,
        itemUploadUi1 : Boolean,
        itemUploadUi2 : Boolean,
        defaultLanguage: Language,
        excludeLanguage: Language[],
        
       

    ) {
        this.mapKey = mapKey;
        this.isEnableVideoSetting = isEnableVideoSetting;
        this.showUserProfile = showUserProfile;
        this.noFilterWithLocationOnMap = noFilterWithLocationOnMap;
        this.priceFormat = priceFormat;
        this.enableNotification = enableNotification;
        this.fcmServerKey = fcmServerKey;
        this.firebaseWebPushKeyPair = firebaseWebPushKeyPair;
        this.adClient = adClient;
        this.adSlot = adSlot;
        this.copyRight = copyRight;
        this.googlePlayUrl = googlePlayUrl;
        this.appStoreUrl = appStoreUrl;
        this.googleSetting = googleSetting;
        this.appStoreSetting = appStoreSetting;
        this.bannerSrc = bannerSrc;
        this.googleMap = googleMap;
        this.openStreetMap = openStreetMap;
        this.mile = mile;
        this.promoteFirstChoiceDay = promoteFirstChoiceDay;
        this.promoteSecondChoiceDay = promoteSecondChoiceDay;
        this.promoteThirdChoiceDay = promoteThirdChoiceDay;
        this.promoteFourthChoiceDay = promoteFourthChoiceDay;
        this.itemUploadUi1 = itemUploadUi1;
        this.itemUploadUi2 = itemUploadUi2;
        this.defaultLanguage = defaultLanguage;
        this.excludeLanguage = excludeLanguage;
        

        return this;

    }

    getPrimaryKey(): string {
        return this.mapKey;
    }

    toMap(object: FrontendConfigSetting): any {
        const map = {};
        map['map_key'] = object.mapKey;
        map['is_enable_video_setting'] = object.isEnableVideoSetting;
        map['show_user_profile'] = object.showUserProfile;
        map['no_filter_with_location_on_map'] = object.noFilterWithLocationOnMap;
        map['price_format'] = object.priceFormat;
        map['enable_notification'] = object.enableNotification;
        map['fcm_server_key'] = object.fcmServerKey;
        map['firebase_web_push_key_pair'] = object.firebaseWebPushKeyPair;
        map['ad_client'] = object.adClient;
        map['ad_slot'] = object.adSlot;
        map['copy_right'] = object.copyRight;
        map['google_play_url'] = object.googlePlayUrl;
        map['app_store_url'] = object.appStoreUrl;
        map['google_setting'] = object.googleSetting;
        map['app_store_setting'] = object.appStoreSetting;
        map['banner_src'] = object.bannerSrc;
        map['google_map'] = object.googleMap;
        map['open_street_map'] = object.openStreetMap;
        map['mile'] = object.mile;
        map['promote_first_choice_day'] = object.promoteFirstChoiceDay;
        map['promote_second_choice_day'] = object.promoteSecondChoiceDay;
        map['promote_third_choice_day'] = object.promoteThirdChoiceDay;
        map['promote_fourth_choice_day'] = object.promoteFourthChoiceDay;
        map['item_upload_ui1'] = object.itemUploadUi1;
        map['item_upload_ui2'] = object.itemUploadUi2;
        map['default_language'] = new Language().toMap(object.defaultLanguage);
        map['exclude_language'] = new Language().toMapList(object.excludeLanguage);
        
        
        return map;
    }

    toMapList(objectList: FrontendConfigSetting[]) : any[] {
        const mapList : any[] = [];
        for(let i = 0; i < objectList.length; i++) {
            if(objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new FrontendConfigSetting().init(


            obj.map_key,
            obj.is_enable_video_setting,
            obj.show_user_profile,
            obj.no_filter_with_location_on_map,
            obj.price_format,
            obj.enable_notification,
            obj.fcm_server_key,
            obj.firebase_web_push_key_pair,
            obj.ad_client,
            obj.ad_slot,
            obj.copy_right,
            obj.google_play_url,
            obj.app_store_url,
            obj.google_setting,
            obj.app_store_setting,
            obj.banner_src,
            obj.google_map,
            obj.open_street_map,
            obj.mile,
            obj.promote_first_choice_day,
            obj.promote_second_choice_day,
            obj.promote_third_choice_day,
            obj.promote_fourth_choice_day,
            obj.item_upload_ui1,
            obj.item_upload_ui2,
            new Language().fromMap(obj.default_language),
            new Language().fromMapList(obj.exclude_language),

       );
    }   
    fromMapList(objList : any[] ) : FrontendConfigSetting[] {
        const frontendConfigSetting : FrontendConfigSetting[] = [];
        for(const obj in objList) {
            if(obj != null) {
                frontendConfigSetting.push(this.fromMap(obj));
            }
        }

        return frontendConfigSetting;
    }
    

}