import PsConfig from "@/config/PsConfig";

export default class PsUrl {
  
  static  ps_follower_item_url = "/rest/items/get_item_by_followuser/api_key/" + PsConfig.apiKey;

  static  ps_item_detail_url = "/rest/items/get/api_key/" + PsConfig.apiKey;

  static ps_location_township_url = "/rest/item_location_townships/get/api_key/" + PsConfig.apiKey;

  static ps_deal_option_url = "/rest/options/get/api_key/" + PsConfig.apiKey;

  static  ps_sub_cat_url = "/rest/subcategories/get/api_key/" + PsConfig.apiKey;

  static  ps_sub_cat_search_url = "/rest/subcategories/search/api_key/" + PsConfig.apiKey;

  static  ps_category_url = "/rest/categories/search/api_key/" + PsConfig.apiKey;

  static  ps_packages_url = "/rest/packages/get/api_key/" + PsConfig.apiKey;

  static  ps_package_bought_url = "/rest/packages/is_package_bought/api_key/" + PsConfig.apiKey;

  static ps_limit_ad_item_list_url = "/rest/buy_ad_post_transaction/search/api_key/" + PsConfig.apiKey;

  static  ps_search_item_url : String  = "/rest/items/search/api_key/" + PsConfig.apiKey;

  static  ps_search_user_url : String  = "/rest/userfollows/search/api_key/" + PsConfig.apiKey;

  static  ps_user_follow_url : String  = "/rest/userfollows/add_follow/api_key/" + PsConfig.apiKey;

  static  ps_blocked_user_url : String  = "/rest/users/get_blocked_user_by_loginuser/api_key/" + PsConfig.apiKey;

  static  ps_reported_item_url : String  = "/rest/items/get_reported_item_by_loginuser/api_key/" + PsConfig.apiKey;

  static  ps_user_detail_url : String  ="/rest/userfollows/search/api_key/"+ PsConfig.apiKey;

  static ps_search_user_keyword_url : String  ="/rest/users/search/api_key/"+ PsConfig.apiKey;

  static  ps_chat_history_url : String  ="/rest/chat_items/get_buyer_seller_list/api_key/"+ PsConfig.apiKey;

  static  ps_add_chat_history_url : String  ="/rest/chats/add/api_key/"+ PsConfig.apiKey;

  static  ps_accepted_offer_url : String  ="/rest/chats/update_accept/api_key/"+ PsConfig.apiKey;

  static  ps_rejected_offer_url : String  ="/rest/chats/update_price/api_key/"+ PsConfig.apiKey;

  static ps_is_user_bought_url : String  ="/rest/chats/is_user_bought/api_key/"+ PsConfig.apiKey;

  static  ps_maked_offer_url : String  ="/rest/chats/update_price/api_key/"+ PsConfig.apiKey;

  static  ps_get_chat_history_url : String  ="/rest/chats/get_chat_history/api_key/"+ PsConfig.apiKey;

  static  ps_mark_as_sold_url : String  ="/rest/chats/item_sold_out/api_key/"+ PsConfig.apiKey;

  static  ps_sold_out_item_url : String  ="/rest/items/get_sold_item_list/api_key/"+ PsConfig.apiKey;

  static  ps_about_us_url : String  = "/rest/abouts/get/api_key/"+ PsConfig.apiKey;

  static  ps_mark_sold_out_url : String  ="/rest/items/sold_out_from_itemdetails/api_key/"+ PsConfig.apiKey;

  static  ps_report_item_url : String  ="rest/itemreports/add/api_key/"+ PsConfig.apiKey;

  static  ps_block_user_url : String  ="/rest/blockusers/add/api_key/"+ PsConfig.apiKey;

  static  ps_blue_mark_user_url : String  ="/rest/users/apply_blue_mark/api_key/"+ PsConfig.apiKey;

  static  ps_unblock_user_url : String  ="/rest/blockusers/unblock/api_key/"+ PsConfig.apiKey;

  static  ps_reset_unread_message_count_url : String ="/rest/chats/reset_count/api_key/"+ PsConfig.apiKey;

  static  ps_user_unread_count_url : String ="/rest/users/unread_count/api_key/"+ PsConfig.apiKey;

  static  ps_chat_image_upload_url : String ="/rest/images/chat_image_upload/api_key/"+ PsConfig.apiKey;

  static  ps_shipping_method_url : String ="/rest/shippings/get/api_key/"+ PsConfig.apiKey;

  static  ps_news_feed_url : String ="/rest/feeds/get/api_key/"+ PsConfig.apiKey;

  //  String ps_category_url = 'rest/categories/get/';

  static  ps_subCategory_url :String = "/rest/subcategories/get/api_key/" + PsConfig.apiKey;

  static  ps_subCategory_subscription_url :String = "/rest/subcat_subscribes/subcategory_subscribe/api_key/" + PsConfig.apiKey;

  static  ps_home_bunner_url :String = "/rest/banners/get/api_key/" + PsConfig.apiKey;

  static  ps_manufacturer_url :String = "/rest/manufacturers/get/api_key/" + PsConfig.apiKey;

  static  ps_model_url :String = "/rest/models/get/api_key/" + PsConfig.apiKey;

  static  ps_transmission_url :String = "/rest/transmissions/get/api_key/" + PsConfig.apiKey;

  static  ps_item_color_url :String = "/rest/colors/get/api_key/" + PsConfig.apiKey;

  static  ps_fuel_type_url :String = "/rest/fueltypes/get/api_key/" + PsConfig.apiKey;

  static  ps_build_type_url :String = "/rest/bodystyles/get/api_key/" + PsConfig.apiKey;

  static  ps_seller_type_url :String = "/rest/sellertypes/get/api_key/" + PsConfig.apiKey;

  static  ps_user_state_url :String = '/rest/states/get/api_key/' + PsConfig.apiKey;
  
  static  ps_vehicle_type_url :String = "/rest/vehicle_types/get/api_key/" + PsConfig.apiKey;

  static  ps_contact_us_url : String  ="/rest/contacts/add/api_key/"+ PsConfig.apiKey;

  static  ps_image_upload_url : String  ="/rest/images/upload/api_key/"+ PsConfig.apiKey;

  static  ps_certificate_upload_url : String  ="/rest/images/upload_certificate/api_key/"+ PsConfig.apiKey;

  static  ps_video_upload_url : String  ="/rest/images/video_upload/api_key/"+ PsConfig.apiKey;
  
  static  ps_video_thumb_upload_url : String  ="/rest/images/upload_video_icon/api_key/"+ PsConfig.apiKey;

  static  ps_dealership_upload_url : String  ="/rest/images/upload_certificate/api_key/"+ PsConfig.apiKey;

  static  ps_item_image_upload_url : String  ="/rest/images/upload_item/api_key/"+ PsConfig.apiKey;

  static  ps_collection_url : String = "/rest/collections/get/api_key/"+ PsConfig.apiKey;

  static  ps_all_collection_url : String  ="/rest/products/all_collection_products/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_app_info_url : String  ="/rest/appinfo/get_delete_history/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_user_register_url :String ="/rest/users/add/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_user_email_verify_url :String ="/rest/users/verify/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_add_bidding :String ="/rest/biddings/add/api_key/"+ PsConfig.apiKey;

  static  ps_offer_url :String ="/rest/chats/offer_list/api_key/"+ PsConfig.apiKey;

  static  ps_offline_payment_method_url :String ="/rest/offline_payments/get_offline_payment/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_zone_shipping_method_url :String ="/rest/shipping_zones/get_shipping_cost/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_user_login_url :String ="/rest/users/login/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_user_forgot_password_url :String ="/rest/users/reset/api_key/"+ PsConfig.apiKey;

  static  ps_post_seller_credit_care_url :String ="/rest/transaction_payments/add/api_key/"+ PsConfig.apiKey;

  static  ps_post_credit_card_update_url :String ="/rest/transaction_payments/update_card_info/api_key/"+ PsConfig.apiKey;

  static  ps_post_report_item_url :String ="/rest/itemreports/add/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_user_change_password_url :String ="/rest/users/password_update/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_user_update_profile_url :String ="/rest/users/profile_update/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_phone_login_url :String ="/rest/users/phone_register/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_fb_login_url :String ="/rest/users/facebook_register/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_google_login_url :String ="/rest/users/google_register/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_apple_login_url :String ="/rest/users/apple_register/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_resend_code_url :String ="/rest/users/request_code/api_key/"+ PsConfig.apiKey;

  static  ps_post_ps_touch_count_url :String ="/rest/touches/touch_item/api_key/"+ PsConfig.apiKey;

  static  ps_product_url :String = "/rest/items/search/api_key/"+ PsConfig.apiKey;
  
  static  ps_item_reorder_image_url :String = "/rest/images/reorder_image/api_key/"+ PsConfig.apiKey;

  static  ps_add_membership_url :String = "/rest/members/add/api_key/"+ PsConfig.apiKey;

  static  ps_products_search_url :String ="/rest/products/search/api_key/"+ PsConfig.apiKey;

  static  ps_user_url :String = "/rest/users/get/api_key/"+ PsConfig.apiKey;

  static  ps_noti_url :String = "/rest/noti_messages/all_notis/api_key/"+ PsConfig.apiKey;

  static  ps_bloglist_url :String = "/rest/feeds/search/api_key/"+ PsConfig.apiKey;

  static  ps_blog_url :String = "/rest/feeds/get/api_key/"+ PsConfig.apiKey;

  static  ps_notidetail_url :String = "/rest/noti_messages/get/api_key/"+ PsConfig.apiKey;

  static  ps_transactionList_url :String = "/rest/transactionheaders/get/api_key/"+ PsConfig.apiKey;

  static  ps_transactionDetail_url :String = "/rest/transactiondetails/get/api_key/"+ PsConfig.apiKey;

  static  ps_shipping_country_url : String ="/rest/shipping_zones/get_shipping_country/api_key/"+ PsConfig.apiKey;

  static  ps_shipping_city_url : String ="/rest/shipping_zones/get_shipping_city/api_key/ "+ PsConfig.apiKey;

  static  ps_relatedProduct_url : String ="/rest/products/related_product_trending/api_key/"+ PsConfig.apiKey;

  static  ps_commentList_url : String = "/rest/commentheaders/get/api_key/"+ PsConfig.apiKey;

  static  ps_commentDetail_url : String = "/rest/commentdetails/get/api_key/"+ PsConfig.apiKey;

  static  ps_commentHeaderPost_url : String ="/rest/commentheaders/press/api_key/"+ PsConfig.apiKey;

  static  ps_commentDetailPost_url : String ="/rest/commentdetails/press/api_key/"+ PsConfig.apiKey;

  static  ps_downloadProductPost_url : String ="/rest/downloads/download_product/api_key/"+ PsConfig.apiKey;

  static  ps_noti_register_url : String ="/rest/notis/register/api_key/"+ PsConfig.apiKey;

  static  ps_delete_user_url : String ="/rest/users/user_delete/api_key/"+ PsConfig.apiKey;

  static  ps_chat_noti_url : String ="/rest/notis/send_chat_noti/api_key/"+ PsConfig.apiKey;

  static  ps_noti_post_url : String ="/rest/notis/is_read/api_key/"+ PsConfig.apiKey;

  static  ps_noti_unregister_url : String ="/rest/notis/unregister/api_key/"+ PsConfig.apiKey;

  static  ps_ratingPost_url : String ="/rest/rates/add_rating/api_key/"+ PsConfig.apiKey;

  static  ps_ratingList_url : String = "/rest/rates/rating_user/api_key/"+ PsConfig.apiKey;

  static  ps_favouritePost_url : String ="/rest/favourites/press/api_key/"+ PsConfig.apiKey;

  static  ps_favouriteList_url : String = "/rest/items/get_favourite/api_key/"+ PsConfig.apiKey;

  static  ps_selling_bid_item_url : String ="/rest/biddings/get_seller_bid_approved/api_key/"+ PsConfig.apiKey;

  static  ps_active_selling_bid_item_url : String ="/rest/biddings/get_seller_to_do/api_key/"+ PsConfig.apiKey;

  static  ps_buying_bid_item_url : String ="/rest/biddings/get_buyer_bid_approved/api_key/"+ PsConfig.apiKey;

  static  ps_active_buying_bid_item_url : String ="/rest/biddings/get_buyer_to_do/api_key/"+ PsConfig.apiKey;

  static  ps_gallery_url : String = "/rest/images/get_item_gallery/api_key/"+ PsConfig.apiKey;

  static  ps_delete_image_url : String = "/rest/images/delete_item_image/api_key/"+ PsConfig.apiKey;

  static ps_delete_video_url : String = "/rest/images/delete_video_and_icon/api_key/"+ PsConfig.apiKey;

  static  ps_couponDiscount_url : String ="/rest/coupons/check/api_key/"+ PsConfig.apiKey;

  static  ps_token_url : String = "/rest/paypal/get_token/api_key/"+ PsConfig.apiKey;

  static  ps_collection_product_url : String ="/rest/products/all_collection_products/api_key/"+ PsConfig.apiKey;

  static  ps_item_location_url : String = "/rest/itemlocations/search/api_key/"+ PsConfig.apiKey;

  static  ps_item_sub_location_url : String = "/rest/item_location_townships/search/api_key/"+ PsConfig.apiKey;

  static  ps_item_list_from_followers_url : String ="/rest/items/get_item_by_followuser/api_key/"+ PsConfig.apiKey;

  static  ps_paid_ad_item_list_url : String = "/rest/paid_items/get/api_key/"+ PsConfig.apiKey;

  static  ps_item_entry_url : String ="/rest/items/add/api_key/"+ PsConfig.apiKey;

  static  ps_item_type_url : String = "/rest/itemtypes/get/api_key/"+ PsConfig.apiKey;

  static  ps_item_condition_url : String = "/rest/conditions/get/api_key/"+ PsConfig.apiKey;

  static  ps_item_price_type_url : String = "/rest/pricetypes/get/api_key/"+ PsConfig.apiKey;

  static  ps_item_currency_type_url : String = "/rest/currencies/get/api_key/"+ PsConfig.apiKey;

  static  ps_item_deal_option_url : String = "/rest/options/get/api_key/"+ PsConfig.apiKey;

  static  ps_item_promotion_entry_url : String ="/rest/paid_items/add/api_key/"+ PsConfig.apiKey;

  static  ps_item_bidding_stripe_url : String ="/rest/bidding_transactions/add/api_key/"+ PsConfig.apiKey;

  static  ps_approve_reject_bidding_url : String ="/rest/biddings/bidding_approval_reject/api_key/"+ PsConfig.apiKey;

  static  ps_update_end_time_url : String ="/rest/biddings/update_start_time/api_key/"+ PsConfig.apiKey;

  static  ps_item_delete_url : String ="/rest/items/item_delete/api_key/"+ PsConfig.apiKey;

  static  ps_user_logout_url : String ="/rest/users/logout/api_key/"+ PsConfig.apiKey;

  static  ps_user_dealership_cancel_url : String ="/rest/users/dealership_cancel/api_key/"+ PsConfig.apiKey;
}