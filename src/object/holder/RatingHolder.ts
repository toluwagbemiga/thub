export default class RatingHolder {

    fromUserId: string = '';
    toUserId: string = '';
    title: string = '';
    description: string = '';
    rating: string = '';


    RatingHolder() {
        this.fromUserId = '';
        this.toUserId = '';
        this.title = '';
        this.description = '';
        this.rating = '';

    }

    toMap(): {} {
        const map = {};
        map['from_user_id'] = this.fromUserId;
        map['to_user_id'] = this.toUserId;
        map['title'] = this.title;
        map['description'] = this.description;
        map['rating'] = this.rating;

        return map;
    }
}