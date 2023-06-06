export default class GetChatHistoryParameterHolder {

    itemId: string = '';
    buyerUserId: string = '';
    sellerUserId: string = '';



    GetChatHistoryParameterHolder() {
        this.itemId = '';
        this.buyerUserId = '';
        this.sellerUserId = '';

    }

    toMap(): {} {
        const map = {};
        map['item_id'] = this.itemId;
        map['buyer_user_id'] = this.buyerUserId;
        map['seller_user_id'] = this.sellerUserId;

        return map;
    }
}