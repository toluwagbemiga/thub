export default class TouchCountParameterHolder {

    itemId: string = '';
    userId: string = '';

    TouchCountParameterHolder() {
        this.itemId = '';
        this.userId = '';
    }

    toMap(): {} {
        const map = {};
        map['item_id'] = this.itemId;
        map['user_id'] = this.userId;

        return map;
    }
}