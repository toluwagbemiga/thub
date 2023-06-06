import PsConfig from "@/config/PsConfig";
import PsApi from "./common/PsApi";
import PsResource from "./common/PsResource";
import PsUrl from "./PsUrl";
import { PsObject } from "@/object/core/PsObject";
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
export default class PsApiService extends PsApi {
    
    ///
    /// App InfogetCategoryList
    ///
    static async postPsAppInfo<T extends PsObject<T>>(
        obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_app_info_url, postData);
    }
    ///
    /// Location Township 
    ///
    static async getLocationTownshipList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, cityId: String): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_location_township_url + "/limit/" + limit + "/offset/" + offset + "/city_id/" + cityId;
        return await PsApi.getData<T, T[]>(obj, url);

    }
    ///
    /// CategoryList 
    ///
    static async getCategoryList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, loginUserId: String, postData: any): Promise<PsResource<T[]>> {
       
        const url: String = PsUrl.ps_category_url + "/limit/" + limit + "/offset/" + offset + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T[]>(obj, url, postData);

    }
    
    ///
    /// User Register
    ///
    static async postUserRegister<T extends PsObject<T>>(
        obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_user_register_url, postData);
    }


    ///
    /// Offline Payment
    ///
    static async getOfflinePaymentList<T extends PsObject<T>>(
        obj: T, limit: Number, offset: Number): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_offline_payment_method_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T>(obj, url);
    }

    ////
    ///  Offer sent and received
    ///
    static async getOfferList<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_offer_url;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    ///
    /// User Verify Email
    ///
    static async postUserEmailVerify<T extends PsObject<T>>(
        obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_user_email_verify_url, postData);
    }


    /**
    *
    * Users
    * 
    * @param obj 
    * @param postData 
    **/
    static async postUserLogin<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_user_login_url, postData);
    }

    ///
    /// FB Login
    ///
    static async postFBLogin<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_fb_login_url, postData);
    }

    ///
    /// Google Login
    ///
    static async postGoogleLogin<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_google_login_url, postData);
    }

    ///
    /// Add Membership
    ///
    static async postAddMembership<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_add_membership_url, postData);
    }

    ///
    /// Apple Login
    ///
    static async postAppleLogin<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_apple_login_url, postData);
    }

    ///
    /// User Forgot Password
    ///
    // static async postForgotPassword<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
    //     return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_user_forgot_password_url, postData);
    // }
    static async postForgotPassword
        <T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_user_forgot_password_url, postData);
    }
    ///
    /// User Change Password
    ///
    static async postChangePassword
        <T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_user_change_password_url, postData);
    }

    ///
    /// User Profile Update
    ///
    static async postProfileUpdate<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_user_update_profile_url, postData);
    }

    ///
    /// User States
    ///
    static async getUserStateList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_user_state_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    ///
    /// User Phone Login
    ///
    static async postPhoneLogin<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_phone_login_url, postData);
    }

    ///
    ///  User Follow
    ///
    static async postUserFollow<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_user_follow_url, postData);
    }

    ///
    /// User Resend Code
    ///
    static async postResendCode<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_resend_code_url, postData);

    }

    ///
    /// User Detail
    ///
    static async getUserDetail<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        // const url: String = PsUrl.ps_user_detail_url;
        return await PsApi.postData<T, T>(obj,PsUrl.ps_user_detail_url, postData);
    }

    ///
    /// User Detail
    ///
    static async getSearchUser<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        // const url: String = PsUrl.ps_search_user_keyword_url + "/limit/" + limit + "/offset/" + offset;
       
        return await PsApi.postData<T, T[]>(obj, PsUrl.ps_search_user_keyword_url, postData);

    }

    ///
    /// Seller Credit Card
    ///
    static async postSellerCreditCard<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_seller_credit_care_url, postData);
    }

    static async postCreditCardUpdate<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_credit_card_update_url, postData);
    }

    ///
    /// Report Bid Item
    ///
    static async postReportItem<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_report_item_url, postData);
    }

    ///
    /// Touch Count
    ///
    static async postTouchCount<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_post_ps_touch_count_url, postData);
    }

    ///
    /// Get User
    ///
    static async getUser<T extends PsObject<T>>(obj: T, userId: String): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_user_url + "/user_id/" + userId;
        return await PsApi.getData<T, T[]>(obj, url);
    }


    static async postImageUpload<T extends PsObject<T>>(obj: T, userId : String,  platformName : String, imageFile : File, imgId : String): Promise<PsResource<T>> {
        
      const url: String = PsUrl.ps_image_upload_url;
  
      return await PsApi.postUploadImage<T, T>(
          obj, 
          url, 
          'user_id', 
          userId,
          'platform_name', 
          platformName, 
          imageFile,
          'img_id',
          imgId);
    }

    static async postChatImageUpload<T extends PsObject<T>>(obj: T, 
                                                            senderId : String,  
                                                            sellerUserId : String, 
                                                            buyerUserId : String, 
                                                            itemId: String, 
                                                            type : String,
                                                            imageFile : File ): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_chat_image_upload_url;
    
        return await PsApi.postUploadChatImage<T, T>(
            obj,
            url,
            'sender_id',
            senderId, 
            'seller_user_id',
            sellerUserId, 
            'buyer_user_id', 
            buyerUserId,
            'item_id',
            itemId,            
            'type',
            type,
            imageFile);
    }

    static async postItemImageUpload<T extends PsObject<T>>(obj: T, imgParentId : String,  imgType : String, ordering : Number, imgDesc: String, imageFile : File, imgId : String,loginUserId : String): Promise<PsResource<T>> {
        
        const url: String = PsUrl.ps_item_image_upload_url+ "/login_user_id/" + loginUserId;
    
        return await PsApi.postUploadItemImage<T, T>(
            obj,
            url,
            'item_id',
            imgParentId, 
            'img_type',
            imgType, 
            ordering, 
            imgDesc,
            imageFile,
            'img_id',
            imgId);
    }

    static async postReorderItemImage<T extends PsObject<T>>(obj: T,loginUserId :String, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_item_reorder_image_url+ "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    static async postItemVideoUpload<T extends PsObject<T>>(obj: T, imgParentId : String, videoFile : File,loginUserId :String): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_video_upload_url+ "/login_user_id/" + loginUserId;
        
        return await PsApi.postUploadVideoImage<T, T>(
            obj,
            url,
            'item_id',
            imgParentId,
            videoFile);
    }

    static async postItemVideoThumbUpload<T extends PsObject<T>>(obj: T, imgParentId : String, videoThumbFile : File,loginUserId : String): Promise<PsResource<T>> {
       
        const url: String = PsUrl.ps_video_thumb_upload_url+ "/login_user_id/" + loginUserId;
        
        return await PsApi.postUploadVideoThumbUpload<T, T>(
            obj,
            url,
            'item_id',
            imgParentId,
            videoThumbFile);
    }

    static async postDealerPdfUpload<T extends PsObject<T>>(obj: T, imgParentId : String, pdfFile : File): Promise<PsResource<T>> {

        const url: String = PsUrl.ps_dealership_upload_url;

        
        return await PsApi.postUploadDealerUpload<T, T>(
            obj,
            url,
            'user_id',
            imgParentId,
            pdfFile);
    }

    // Future<PsResource<DefaultPhoto>> postVideoUpload(
    //     String itemId, String videoId, File imageFile) async {
    //   const String url = '${PsUrl.ps_video_upload_url}';

    //   return await postUploadImage<DefaultPhoto, DefaultPhoto>(DefaultPhoto(), url, 'item_id', itemId,
    //       'img_id', videoId, imageFile);
    // }

    // Future<PsResource<DefaultPhoto>> postItemPdfUpload(
    //     String itemId, String videoId, File imageFile) async {
    //   const String url = '${PsUrl.ps_inspection_upload_url}';

    //   return await postUploadImage<DefaultPhoto, DefaultPhoto>(DefaultPhoto(), url, 'item_id', itemId,
    //       'img_id', videoId, imageFile);
    // }

    // Future<PsResource<DefaultPhoto>> postCertificateUpload(
    //     String userId, String imageOrFileId, File imageFile) async {
    //   const String url = '${PsUrl.ps_certificate_upload_url}';

    //   return await postUploadImage<DefaultPhoto, DefaultPhoto>(DefaultPhoto(), url, 'user_id', userId,
    //       'img_id', imageOrFileId, imageFile);
    // }

    // Future<PsResource<DefaultPhoto>> postItemImageUpload(
    //     String itemId, String imgId, String imgDesc, String ordering, File imageFile) async {
    //   const String url = '${PsUrl.ps_item_image_upload_url}';

    //   return postUploadItemImage<DefaultPhoto, DefaultPhoto>(
    //       DefaultPhoto(), url, 'item_id', itemId, 'img_id', imgId,'img_desc',imgDesc,'ordering',ordering, imageFile);
    // }

    ///
    /// Get Shipping Method
    ///
    static async getShippingMethod<T extends PsObject<T>>(obj: T): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_shipping_method_url;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    /**
         * 
         * Manufacture List
         * 
         * @param obj 
         * @param limit 
         * @param offset 
         */
    static async getManufacturerList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_manufacturer_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);

    }

    /**
         * 
         * Package List
         * 
         * @param obj 
         * @param limit 
         * @param offset 
         */
    static async getPackageList<T extends PsObject<T>>(obj: T): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_packages_url;
        return await PsApi.getData<T, T[]>(obj, url);

    }

    ///
    /// Package bought
    ///
    static async postPackageBought<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_package_bought_url;
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    ///
    /// Limit Ad List
    ///
    static async getLimitAdItemList<T extends PsObject<T>>(obj: T, loginUserId, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_limit_ad_item_list_url + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    ///
    /// Item List From Follower
    ///
    static async getAllItemListFromFollower<T extends PsObject<T>>(obj: T, loginUserId: String, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        
        const url: String = PsUrl.ps_item_list_from_followers_url + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);

    }

    ///
    /// Paid Ad List
    ///
    static async getPaidAdItemList<T extends PsObject<T>>(obj: T, loginUserId: String, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_paid_ad_item_list_url + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    /**
         * 
         * Model List
         * 
         * @param obj 
         * @param manufacturerId 
         * @param limit 
         * @param offset 
         */

    static async getSubCategoryList<T extends PsObject<T>>(obj: T, catId: String, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_sub_cat_url + "/cat_id/" + catId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    static async searchSubCategoryList<T extends PsObject<T>>(obj: T, loginUserId: String, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {

        const url: String = PsUrl.ps_sub_cat_search_url + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    static async postSubCategoryScribe<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_subCategory_subscription_url;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    static async getAllModelList<T extends PsObject<T>>(obj: T, manufacturerId: String): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_model_url + "/manufacturer_id/" + manufacturerId;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    ///
    /// Transmission
    ///
    static async getTransmissionList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_transmission_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);

    }


    ///
    /// Buying Item
    ///
    static async getBuyingItemList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_buying_bid_item_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    ///
    /// Selling Item
    ///
    static async getSellingItemList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_selling_bid_item_url + "/limit/" + limit + "/offset/" + offset;
        
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    
    ///
    /// Active Buying Item
    ///
    static async getActiveBuyingItemList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_active_buying_bid_item_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.postData<T, T[]>(obj, url, postData);

    }

    ///
    /// Active Selling Item
    ///
    static async getActiveSellingItemList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_active_selling_bid_item_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.postData<T, T[]>(obj, url, postData);

    }

    ///
    /// Home Bunner
    ///
    static async getBunnerList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_home_bunner_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);

    }

    ///
    /// ItemColor
    ///
    static async getItemColorList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_item_color_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }


    ///
    /// Fuel Type
    ///
    static async getItemFuelTypeList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_fuel_type_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    ///
    /// Build Type
    ///
    static async getItemBuildTypeList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_build_type_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    ///
    /// Seller Type
    ///
    static async getItemSellerTypeList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_seller_type_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }


    ///
    /// Vehicle Type
    ///
    static async getItemVehicleTypeList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_vehicle_type_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    ///
    /// Item Type
    ///
    static async getItemTypeList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_item_type_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    ///
    /// Item Condition
    ///
    static async getItemConditionList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_item_condition_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);

    }

    ///
    /// Item Price Type
    ///
    static async getItemPriceTypeList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_item_price_type_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);

    }

    ///
    /// Deal Option
    ///
    static async getDealOptionList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_deal_option_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);

    }

    ///
    /// Item Currency Type
    ///
    static async getItemCurrencyList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_item_currency_type_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    ///
    /// Item Deal Option
    ///
    static async getItemDealOptionList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_item_deal_option_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    //noti
    static async getNotificationList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_noti_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.postData<T, T[]>(obj, url, postData);

    }

    //
    /// Product
    ///
    static async getProductList<T extends PsObject<T>>(obj: T, loginUserId: String, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_product_url + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.postData<T, T[]>(obj, url, postData);

    }
    

    /**
       * 
       * ItemDetail List
       * 
       * 
       */

    static async getItemDetail<T extends PsObject<T>>(obj: T, itemId: String, loginUserId: String): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_item_detail_url + "/id/" + itemId + "/login_user_id/" + loginUserId ;
        return await PsApi.getData<T, T>(obj, url);
    }

    static async getRelatedProductList<T extends PsObject<T>>(obj: T, productId: String, categoryId: String, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_item_deal_option_url + "/id/" + productId + "/cat_id/" + categoryId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);

    }

    ///
    /// Search Item
    ///
    static async getItemListByUserId<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, loginUserId: String, postData: any): Promise<PsResource<T[]>> {
        
        const url: String = PsUrl.ps_search_item_url + "/limit/" + limit + "/offset/" + offset + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T[]>(obj, url, postData);

    }

    ///Follower Item List
    static async getFollowerItemListByUserId<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, loginUserId: String, postData: any): Promise<PsResource<T[]>> {
 
        const url: String = PsUrl.ps_follower_item_url + "/limit/" + limit + "/offset/" + offset + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T[]>(obj, url, postData);

    }

    ///
    /// Search User
    ///
    static async getUserList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_search_user_url + "/limit/" + limit + "/offset/" + offset;
       
        return await PsApi.postData<T, T[]>(obj, url, postData);

    }
    static async getUserSearchList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number,loginUserId: String, postData: any): Promise<PsResource<T[]>> {

        const url: String = PsUrl.ps_search_user_keyword_url + "/limit/" + limit + "/offset/" + offset+ "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T[]>(obj, url, postData);


    } 

    static async getOtherUser<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_search_user_url + "/limit/" + limit + "/offset/" + offset;
        
        return await PsApi.postData<T, T>(obj, url, postData);

    }

    ///
    /// Reported Item
    ///
    static async getReportedItemList<T extends PsObject<T>>(obj: T, loginUserId: String, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_reported_item_url + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    ///
    /// Block User List
    ///
    static async getBlockedUserList<T extends PsObject<T>>(obj: T, loginUserId: String, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_blocked_user_url + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }


    static async getBlogList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, loginUserId: String, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_bloglist_url +"/limit/" + limit + "/offset/" + offset+ "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }
    

    static async getBlogDetail<T extends PsObject<T>>(obj: T, blogId: String, loginUserId: String, limit: Number, offset: Number): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_blog_url + "/id/" + blogId + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T>(obj, url);
    }

    ///
    /// Favourites
    ///
    static async getFavouritesList<T extends PsObject<T>>(obj: T, loginUserId: String, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_favouriteList_url + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);
    }

    ///
    /// Product List By Collection Id
    ///
    static async getProductListByCollectionId<T extends PsObject<T>>(obj: T, collectionId: String, loginUserId: String, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_all_collection_url + "/id/" + collectionId + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T[]>(obj, url);

    }

    static async postDeleteUser<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_delete_user_url, postData);

    }
    ///
    /// Noti
    ///
    static async rawRegisterNotiToken<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_noti_register_url, postData);

    }

    static async rawUnRegisterNotiToken<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_noti_unregister_url, postData);
    }

    static async postNoti<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_noti_post_url, postData);
    }

    static async postChatNoti<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_chat_noti_url, postData);

    }

    static async getNotiDetail<T extends PsObject<T>>(obj: T, notificationId: String, loginUserId: String, limit: Number, offset: Number): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_notidetail_url + "/id/" + notificationId + "/login_user_id/" + loginUserId + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.getData<T, T>(obj, url);
    }

    ///
    /// Rating
    ///
    static async postRating<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_ratingPost_url, postData);
    }

    static async getRatingList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
       
        const url: String = PsUrl.ps_ratingList_url + "/limit/" + limit + "/offset/" + offset
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }



    static async postFavourite<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_favouritePost_url, postData);
    }

    ///
    /// Gallery
    ///
    static async getImageList<T extends PsObject<T>>(obj: T, imgParentId: String, imageType: String, limit: Number, offset: Number): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_gallery_url + "/img_parent_id/" + imgParentId + "/img_type/" + imageType + "/limit/" + limit + "/offset/" + offset;
        
        return await PsApi.getData<T, T[]>(obj, url);
    }

    static async deleteImage<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, loginUserId: String,postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_delete_image_url + "/limit/" + limit + "/offset/" + offset + "/login_user_id/" + loginUserId;
        
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    static async deleteVideo<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, loginUserId: String,postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_delete_video_url + "/limit/" + limit + "/offset/" + offset + "/login_user_id/" + loginUserId;
        
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }


    ///
    /// Contact
    ///
    static async postContactUs<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_contact_us_url, postData);

    }

    ///
    /// Item Entry
    ///
    static async postItemEntry<T extends PsObject<T>>(obj: T, postData: any,loginUserId :string): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_item_entry_url+ "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T>(obj, url, postData);

    }


    ///
    /// Token
    ///
    static async getToken<T extends PsObject<T>>(obj: T): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_token_url;
        return await PsApi.getData<T, T>(obj, url);
    }

    ///
    /// Shipping Country And City
    ///
    static async getCountryList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_shipping_country_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    static async getCityList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_shipping_city_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.postData<T, T[]>(obj, url, postData);

    }

    ///
    /// CouponDiscount
    ///
    static async postCouponDiscount<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_couponDiscount_url, postData);

    }

    static async getItemLocationList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, loginUserId: String, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_item_location_url + "/limit/" + limit + "/offset/" + offset + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    static async getItemSubLocationList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, loginUserId: String, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_item_sub_location_url + "/limit/" + limit + "/offset/" + offset + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    ///
    /// ChatHistory (or) GetBuyerAndSeller
    ///
    static async getChatHistoryList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, postData: any): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_chat_history_url + "/limit/" + limit + "/offset/" + offset;
        return await PsApi.postData<T, T[]>(obj, url, postData);
    }

    ///
    /// Add Chat History or Sync Chat History
    ///
    static async syncChatHistory<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_add_chat_history_url;
       
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    ///
    /// Accepted Offer
    ///
    static async acceptedOffer<T extends PsObject<T>>(obj: T, loginUserId: String, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_accepted_offer_url + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T>(obj, url, postData);
    }
    ///
    /// Bought 
    ///
    static async isUsetBought<T extends PsObject<T>>(obj: T, loginUserId: String, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_is_user_bought_url + "/limit/30/offset/0/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    ///
    /// Reject Offer
    ///
    static async rejectedOffer<T extends PsObject<T>>(obj: T, loginUserId: String, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_rejected_offer_url + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    static async makeOffer<T extends PsObject<T>>(obj: T, loginUserId: String, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_maked_offer_url + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T>(obj, url, postData);
    }
    

    ///
    /// get Chat History
    ///
    static async getChatHistory<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_get_chat_history_url
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    ///
    /// Make Mark As Sold
    ///
    static async makeMarkAsSold<T extends PsObject<T>>(obj: T, loginUserId: String, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_mark_as_sold_url + "/login_user_id/" + loginUserId;
    
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    ///
    /// Sold Out Item 
    ///
    static async getSoldoutItemList<T extends PsObject<T>>(obj: T, limit: Number, offset: Number, loginUserId: String): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_sold_out_item_url + "/limit/" + limit + "/offset/" + offset + "/login_user_id/" + loginUserId;
        return await PsApi.getData<T, T[]>(obj, url);

    }


    ///
    /// About Us
    ///
    static async getAboutUsDataList<T extends PsObject<T>>(obj: T): Promise<PsResource<T[]>> {
        const url: String = PsUrl.ps_about_us_url;
        return await PsApi.getData<T, T[]>(obj, url);

    }


    ///
    /// Mark As Sold
    ///
    static async markSoldOutItem<T extends PsObject<T>>(obj: T, loginUserId: String, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_mark_sold_out_url + "/login_user_id/" + loginUserId;
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    ///
    /// User Report Item
    ///
    static async reportItem<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_report_item_url;
        return await PsApi.postData<T, T>(obj, url, postData);

    }

    ///
    /// User Block Item
    ///
    static async blockUser<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_block_user_url;
        return await PsApi.postData<T, T>(obj, url, postData);

    }

    ///
    /// User Blue Mark
    ///
    static async blueMarkUser<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_blue_mark_user_url;
        return await PsApi.postData<T, T>(obj, url, postData);

    }

    ///
    /// User UnBlock Item
    ///
    static async postUnBlockUser<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_unblock_user_url;
        return await PsApi.postData<T, T>(obj, url, postData);

    }


    ///
    /// Item Paid History
    ///
    static async postItemPromotion<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_item_promotion_entry_url;
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    ///
    /// Bidding Stripe Payment
    ///
    static async postBiddingPayment<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_item_bidding_stripe_url;
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    ///
    /// Bidding Approve and Reject
    ///
    static async postApproveRejectBidding<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_approve_reject_bidding_url;
        return await PsApi.postData<T, T>(obj, url, postData);
    }

    ///
    /// Update End Time by Seller
    ///
    static async postUpdateStartTime<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_update_end_time_url;
        return await PsApi.postData<T, T>(obj, url, postData);

    }

    /// Reset Unread Message Count
    ///
    static async resetUnreadMessageCount<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_reset_unread_message_count_url;
        return await PsApi.postData<T, T>(obj, url, postData);

    }

    ///
    /// User Unread Message Count
    ///
    static async postUserUnreadMessageCount<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_user_unread_count_url;
        return await PsApi.postData<T, T>(obj, url, postData);

    }


    //     ///
    //     /// Chat Image Upload
    //     ///

    //     Future<PsResource <DefaultPhoto>> postChatImageUpload(
    //         String senderId,
    //         String sellerUserId,
    //         String buyerUserId,
    //         String itemId,
    //         String type,
    //         File imageFile) async {
    //     const String url = '${PsUrl.ps_chat_image_upload_url}';

    //     return postUploadChatImage<DefaultPhoto, DefaultPhoto>(
    //         DefaultPhoto(),
    //         url,
    //         'sender_id',
    //         senderId,
    //         'seller_user_id',
    //         sellerUserId,
    //         'buyer_user_id',
    //         buyerUserId,
    //         'item_id',
    //         itemId,
    //         'type',
    //         type,
    //         imageFile);
    // }

    ///
    /// User Delete Item
    ///
    static async deleteItem<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_item_delete_url;
        return await PsApi.postData<T, T>(obj, url, postData);

    }

    ///
    /// User Logout
    ///
    static async postUserLogout<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        return await PsApi.postData<T, T>(obj, PsUrl.ps_user_logout_url, postData);


    }

    ///
    /// Cancel Dealership
    ///
    static async cancelDealership<T extends PsObject<T>>(obj: T, postData: any): Promise<PsResource<T>> {
        const url: String = PsUrl.ps_user_dealership_cancel_url;
        return await PsApi.postData<T, T>(obj, url, postData);

    }

    

    static imageUrl = (path: String, size: number = 0) => {
       
        const appInfoProvider = usePsAppInfoProviderState();
        
        if(appInfoProvider.isThumbnailGenerate){
            if(size == 1) {
                return PsConfig.fixedPath + "/uploads/thumbnail/" + path;
            }else if(size == 2) {
                return PsConfig.fixedPath + "/uploads/thumbnail2x/" + path;
            }else if(size == 3) {
                return PsConfig.fixedPath + "/uploads/thumbnail3x/" + path;
            }else {
                return PsConfig.fixedPath + "/uploads/" + path;
            }
        }
        else {
            return PsConfig.fixedPath + "/uploads/" + path;
        }
        
    }

    static videoUrl = (path: String) => {
        return PsConfig.fixedPath + "/uploads/" + path;
    }

    static inspectionDocUrl = (path: String) => {
        return PsConfig.fixedPath + "/uploads/" + path;
    }

    static defaultCarImage = (event: any) => {
        event.target.src = require('@/assets/images/default-placeholder.png');
    }

    static defaultProfileImage(e: any) {
        e.target.src = require('@/assets/images/default_profile.png');
    }







}