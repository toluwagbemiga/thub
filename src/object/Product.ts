import { PsObject } from "@/object/core/PsObject";
import DefaultPhoto from "./DefaultPhoto";
import Category from "./Category";
import SubCategory from "./SubCategory";
import ItemType from "./ItemType";
import ItemPriceType from "./ItemPriceType";
import ItemCurrency from "./ItemCurrency";
import ItemLocation from "./ItemLocation";
import ItemLocationTownship from "./ItemLocationTownship";
import ConditionOfItem from "./ConditionOfItem";
import DealOption from "./DealOption";
import User from "./User";

export default class Product extends PsObject<Product> {

    id : string = '';
    catId : string = '';
    subCatId : string = '';
    itemTypeId : string = '';
    itemPriceTypeId : string = '';
    itemCurrencyId : string = '';
    itemLocationId : string = '';
    itemLocationTownshipId : string = '';
    conditionOfItemId : string = '';
    dealOptionRemark : string = '';
    description : string = '';
    highlightInformation : string = '';
    price : string = '';
    dealOptionId : string = '';
    brand : string = '';
    businessMode : string = '';
    isSoldOut : string = '';
    title : string = '';
    address : string = '';
    lat : string = '';
    lng : string = '';
    status : string = '';
    addedDate : string = '';
    addedUserId : string = '';
    updatedDate : string = '';
    updatedUserId : string = '';
    updatedFlag : string = '';
    touchCount : string = '';
    favouriteCount : string = '';
    isPaid : string = '';
    dynamicLink : string = '';
    addedDateStr : string = '';
    paidStatus : string = '';
    photoCount : string = '';
    defaultPhoto : DefaultPhoto = new DefaultPhoto();
    video: DefaultPhoto = new DefaultPhoto();
    videoThumbnail: DefaultPhoto = new DefaultPhoto();
    category : Category = new Category();
    subCategory : SubCategory = new SubCategory();
    itemType : ItemType = new ItemType();
    itemPriceType : ItemPriceType = new ItemPriceType();
    itemCurrency : ItemCurrency = new ItemCurrency();
    itemLocation : ItemLocation = new ItemLocation();
    itemLocationTownship : ItemLocationTownship = new ItemLocationTownship();
    conditionOfItem : ConditionOfItem = new ConditionOfItem();
    dealOption : DealOption = new DealOption();
    user : User = new User();
    isFavourited : string = '' ;
    isOwner : string = '';
    discountRate : string = '';
    discountPrice : string = '';
    adType : string = '';

    init(

        id : string,
        catId : string,
        subCatId : string,
        itemTypeId : string,
        itemPriceTypeId : string,
        itemCurrencyId : string,
        itemLocationId : string,
        itemLocationTownshipId : string,
        conditionOfItemId : string,
        dealOptionRemark : string,
        description : string,
        highlightInformation : string,
        price : string,
        dealOptionId : string,
        brand : string,
        businessMode : string,
        isSoldOut : string,
        title : string,
        address : string,
        lat : string,
        lng : string,
        status : string,
        addedDate : string,
        addedUserId : string,
        updatedDate : string,
        updatedUserId : string,
        updatedFlag : string,
        touchCount : string,
        favouriteCount : string,
        isPaid : string,
        dynamicLink : string,
        addedDateStr : string,
        paidStatus : string,
        photoCount : string,
        defaultPhoto : DefaultPhoto,
        video: DefaultPhoto,
        videoThumbnail: DefaultPhoto,
        category : Category,
        subCategory : SubCategory,
        itemType : ItemType,
        itemPriceType : ItemPriceType,
        itemCurrency : ItemCurrency,
        itemLocation : ItemLocation,
        itemLocationTownship : ItemLocationTownship,
        conditionOfItem : ConditionOfItem,
        dealOption : DealOption,
        user : User,
        isFavourited : string,
        isOwner : string,    
        discountRate : string,  
        discountPrice : string,  
        adType : string,

    ) {
        this.id = id;
        this.catId = catId;
        this.subCatId = subCatId;
        this.itemTypeId = itemTypeId;
        this.itemPriceTypeId = itemPriceTypeId;
        this.itemCurrencyId = itemCurrencyId;
        this.itemLocationId = itemLocationId;
        this.itemLocationTownshipId = itemLocationTownshipId;
        this.conditionOfItemId = conditionOfItemId;
        this.dealOptionRemark = dealOptionRemark;
        this.description = description;
        this.highlightInformation  = highlightInformation;
        this.price = price;
        this.dealOptionId = dealOptionId;
        this.brand = brand;
        this.businessMode = businessMode;
        this.isSoldOut = isSoldOut;
        this.title = title;
        this.address = address;
        this.lat = lat;
        this.lng = lng;
        this.status = status;
        this.addedDate = addedDate;
        this.addedUserId = addedUserId;
        this.updatedDate = updatedDate;
        this.updatedUserId = updatedUserId;
        this.updatedFlag = updatedFlag;
        this.touchCount = touchCount;
        this.favouriteCount = favouriteCount;
        this.isPaid = isPaid;
        this.dynamicLink = dynamicLink;
        this.addedDateStr = addedDateStr;
        this.paidStatus = paidStatus;
        this.photoCount = photoCount;
        this.defaultPhoto = defaultPhoto;
        this.video = video;
        this.videoThumbnail = videoThumbnail;
        this.category = category;
        this.subCategory = subCategory;
        this.itemType = itemType;
        this.itemPriceType = itemPriceType;
        this.itemCurrency = itemCurrency;
        this.itemLocation = itemLocation;
        this.itemLocationTownship = itemLocationTownship;
        this.conditionOfItem = conditionOfItem;
        this.dealOption = dealOption;
        this.user = user;
        this.isFavourited = isFavourited ;
        this.isOwner = isOwner;
        this.discountRate = discountRate;
        this.discountPrice = discountPrice;
        this.adType = adType;
        
        return this;

    }

    getPrimaryKey(): string {
        return this.id;
    }

    toMap(object: Product): any {
        const map = {};

        map['id'] = object.id;
        map['cat_id'] = object.catId;
        map['sub_cat_id'] = object.subCatId;
        map['item_type_id'] = object.itemTypeId;
        map['item_price_type_id'] = object.itemPriceTypeId;
        map['item_currency_id'] = object.itemCurrencyId;
        map['item_location_id'] = object.itemLocationId;
        map['item_location_township_id'] = object.itemLocationTownshipId;
        map['condition_of_item_id'] = object.conditionOfItemId;
        map['deal_option_remark'] = object.dealOptionRemark;
        map['description'] = object.description;
        map['highlight_info '] = object.highlightInformation;
        map['price'] = object.price;
        map['deal_option_id'] = object.dealOptionId;
        map['brand'] = object.brand;
        map['business_mode'] = object.businessMode;
        map['is_sold_out'] = object.isSoldOut;
        map['title'] = object.title;
        map['address'] = object.address;
        map['lat'] = object.lat;
        map['lng'] = object.lng;
        map['status'] = object.status;
        map['added_date'] = object.addedDate;
        map['added_user_id'] = object.addedUserId;
        map['updated_date'] = object.updatedDate;
        map['updated_user_id'] = object.updatedUserId;
        map['updated_flag'] = object.updatedFlag;
        map['touch_count'] = object.touchCount;
        map['favourite_count'] = object.favouriteCount;
        map['is_paid'] = object.isPaid;
        map['dynamic_link'] = object.dynamicLink;
        map['added_date_str'] = object.addedDateStr;
        map['paid_status'] = object.paidStatus;
        map['photo_count'] = object.photoCount;
        map['default_photo'] = new DefaultPhoto().toMap(object.defaultPhoto);
        map['default_video'] = new DefaultPhoto().toMap(object.video);
        map['default_video_icon'] = new DefaultPhoto().toMap(object.videoThumbnail);
        map['category'] = new Category().toMap(object.category);
        map['sub_category'] = new SubCategory().toMap(object.subCategory);
        map['item_type'] = new ItemType().toMap(object.itemType);
        map['item_price_type'] = new ItemPriceType().toMap(object.itemPriceType);
        map['item_currency'] = new ItemCurrency().toMap(object.itemCurrency);
        map['item_location'] = new ItemLocation().toMap(object.itemLocation);
        map['item_location_township'] = new ItemLocationTownship().toMap(object.itemLocationTownship);
        map['condition_of_item'] = new ConditionOfItem().toMap(object.conditionOfItem);
        map['deal_option'] = new DealOption().toMap(object.dealOption);
        map['user'] = new User().toMap(object.user);
        map['is_favourited'] = object.isFavourited ;
        map['is_owner'] = object.isOwner;
        map['discount_rate_by_percentage'] = object.discountRate;
        map['discount_price'] = object.discountPrice;
        map['ad_type'] = object.adType;

        return map;
    }

    toMapList(objectList: Product[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new Product().init(

            obj.id,
            obj.cat_id,
            obj.sub_cat_id,
            obj.item_type_id,
            obj.item_price_type_id,
            obj.item_currency_id,
            obj.item_location_id,
            obj.item_location_township_id,
            obj.condition_of_item_id,
            obj.deal_option_remark,
            obj.description,
            obj.highlight_info,
            obj.price,
            obj.deal_option_id,
            obj.brand,
            obj.business_mode,
            obj.is_sold_out,
            obj.title,
            obj.address,
            obj.lat,
            obj.lng,
            obj.status,
            obj.added_date,
            obj.added_user_id,
            obj.updated_date,
            obj.updated_user_id,
            obj.updated_flag,
            obj.touch_count,
            obj.favourite_count,
            obj.is_paid,
            obj.dynamic_link,
            obj.added_date_str,
            obj.paid_status,
            obj.photo_count,
            new DefaultPhoto().fromMap(obj.default_photo),
            new DefaultPhoto().fromMap(obj.default_video),
            new DefaultPhoto().fromMap(obj.default_video_icon),
            new Category().fromMap(obj.category),
            new SubCategory().fromMap(obj.sub_category),
            new ItemType().fromMap(obj.item_type),
            new ItemPriceType().fromMap(obj.item_price_type),
            new ItemCurrency().fromMap(obj.item_currency),
            new ItemLocation().fromMap(obj.item_location),
            new ItemLocationTownship().fromMap(obj.item_location_township),
            new ConditionOfItem().fromMap(obj.condition_of_item),
            new DealOption().fromMap(obj.deal_option),
            new User().fromMap(obj.user),
            obj.is_favourited,
            obj.is_owner,
            obj.discount_rate_by_percentage,
            obj.discount_price,
            obj.ad_type
        );
    }

    fromMapList(objList: any[]): Product[] {
        const productList: Product[] = [];
        for (const obj in objList) {
            if (obj != null) {
                productList.push(this.fromMap(obj));
            }
        }

        return productList;
    }
}
