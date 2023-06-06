export default class BlogListParameterHolder {

    searchterm: string = '';
    locationId: string = '';
    

    BlogListParameterHolder() {
        this.searchterm = '';
        this.locationId = '';

        return this;
    }

    toMap(): {} {
        const map = {};
        map['searchterm'] = this.searchterm;
        map['city_id'] = this.locationId;

        return map;
    }
}