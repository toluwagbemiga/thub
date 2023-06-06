
import { PsObject } from "@/object/core/PsObject";
import ItemCurrency from "./ItemCurrency";

export default class Package extends PsObject<Package> {

    packageId : string ='';
    title : string ='';
    price : string ='';
    currencyId : string ='';
    postCount : string ='';
    status : string ='';
    addedDate : string ='';
    addedDateStr : string =''; 
    itemCurrency   : ItemCurrency = new ItemCurrency();

    init(

        packageId: string,
        title: string,
        price: string,
        currencyId: string,
        postCount: string,
        status: string,
        addedDate: string,
        addedDateStr: string,
        itemCurrency: ItemCurrency,
        

    ) {
        this.packageId = packageId;
        this.title = title;
        this.price = price;
        this.currencyId = currencyId;
        this.postCount = postCount;
        this.status = status;
        this.addedDate = addedDate;
        this.addedDateStr = addedDateStr;
        this.itemCurrency =itemCurrency;

        return this;

    }

    getPrimaryKey(): string {
        return this.packageId;
    }

    toMap(object: Package): any {
        const map = {};

        map['package_id'] = object.packageId;
        map['title'] = object.title;
        map['price'] = object.price;
        map['currency_id'] = object.currencyId;
        map['post_count'] = object.postCount;
        map['status'] = object.status;
        map['added_date'] = object.addedDate;
        map['added_date_str'] = object.addedDateStr;
        map['currency'] = new ItemCurrency().toMap(object.itemCurrency);

        return map;
    }

    toMapList(objectList: Package[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new Package().init(

            obj.package_id,
            obj.title,
            obj.price,
            obj.currency_id,
            obj.post_count,
            obj.status,
            obj.added_date,
            obj.added_date_str,
            new ItemCurrency().fromMap(obj.currency),
            
        );
    }

    fromMapList(objList: any[]): Package[] {
        const ratingList: Package[] = [];
        for (const obj in objList) {
            if (obj != null) {
                ratingList.push(this.fromMap(obj));
            }
        }

        return ratingList;
    }
}
