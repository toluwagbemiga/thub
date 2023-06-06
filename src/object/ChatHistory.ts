
import { PsObject } from "@/object/core/PsObject";
import DefaultPhoto from "./DefaultPhoto";
import Product from "./Product";
import User from "./User";

export default class ChatHisory extends PsObject<ChatHisory> {

    id : string = '';
    itemId : string = '';
    buyerUserId : string = '';
    sellerUserId : string = '';
    negoPrice : string = '';
    buyerUnreadCount : string = '';
    sellerUnreadCount : string = '';
    isAccept : string = '';
    addedDate : string = '';
    isOffer : string = '';
    offerAmount : string = '';
    photoCount : string = '';
    addedDateStr : string = '';
    isFavourited : string = '';
    isOwner : string = '';
    defaultPhoto : DefaultPhoto = new DefaultPhoto();
    item : Product = new Product();
    buyer   : User = new User();
    seller   : User = new User();
    


    init(

        id : string,
        itemId : string,
        buyerUserId : string,
        sellerUserId : string,
        negoPrice : string,
        buyerUnreadCount : string,
        sellerUnreadCount : string,
        isAccept : string,
        addedDate : string,
        isOffer : string,
        offerAmount : string,
        photoCount : string,
        addedDateStr : string,
        isFavourited : string,
        isOwner : string,
        defaultPhoto : DefaultPhoto,
        item: Product,
        buyer: User,
        seller: User
        

    ) {
        this.id = id;
        this.itemId = itemId;
        this.buyerUserId = buyerUserId;
        this.sellerUserId = sellerUserId;
        this.negoPrice = negoPrice;
        this.buyerUnreadCount = buyerUnreadCount;
        this.sellerUnreadCount = sellerUnreadCount;
        this.isAccept = isAccept;
        this.addedDate = addedDate;
        this.isOffer = isOffer;
        this.offerAmount = offerAmount;
        this.photoCount = photoCount;
        this.addedDateStr = addedDateStr;
        this.isFavourited = isFavourited;
        this.isOwner = isOwner;
        this.defaultPhoto = defaultPhoto;
        this.item = item;
        this.buyer =buyer;
        this.seller=seller;

        return this;

    }

    getPrimaryKey(): string {
        return this.id;
    }

    toMap(object: ChatHisory): any {
        const map = {};

        map['id'] = object. id;
        map['item_id'] = object. itemId;
        map['buyer_user_id'] = object. buyerUserId;
        map['seller_user_id'] = object. sellerUserId;
        map['nego_price'] = object. negoPrice;
        map['buyer_unread_count'] = object. buyerUnreadCount;
        map['seller_unread_count'] = object. sellerUnreadCount;
        map['is_accept'] = object. isAccept;
        map['added_date'] = object. addedDate;
        map['is_offer'] = object. isOffer;
        map['offer_amount'] = object. offerAmount;
        map['photo_count'] = object. photoCount;
        map['added_date_str'] = object. addedDateStr;
        map['is_favourited'] = object. isFavourited;
        map['is_owner'] = object. isOwner;
        map['default_photo'] = new DefaultPhoto().toMap(object.defaultPhoto);
        map['item'] = new Product().toMap(object.item);
        map['buyer'] = new User().toMap(object.buyer);
        map['seller'] = new User().toMap(object.seller);

        return map;
    }

    toMapList(objectList: ChatHisory[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new ChatHisory().init(
            obj.id,
            obj.item_id,
            obj.buyer_user_id,
            obj.seller_user_id,
            obj.nego_price,
            obj.buyer_unread_count,
            obj.seller_unread_count,
            obj.is_accept,
            obj.added_date,
            obj.is_offer,
            obj.offer_amount,
            obj.photo_count,
            obj.added_date_str,
            obj.is_favourited,
            obj.is_owner,    
            new DefaultPhoto().fromMap(obj.default_photo),     
            new Product().fromMap(obj.item),
            new User().fromMap(obj.buyer),
            new User().fromMap(obj.seller)
        );
    }

    fromMapList(objList: any[]): ChatHisory[] {
        const chatHisory: ChatHisory[] = [];
        for (const obj in objList) {
            if (obj != null) {
                chatHisory.push(this.fromMap(obj));
            }
        }

        return chatHisory;
    }
}
