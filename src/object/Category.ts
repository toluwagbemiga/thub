import DefaultIcon from "./DefaultIcon";
import { PsObject } from "@/object/core/PsObject";
import DefaultPhoto from "./DefaultPhoto";


export default class Category extends PsObject<Category> {

    catId : string = '';
    catName : string = '';
    catOrdering : string = '';
    status : string = '';
    addedDate : string = '';
    addedDateStr : string = '';
    defaultPhoto: DefaultPhoto = new DefaultPhoto();
    defaultIcon: DefaultIcon = new DefaultIcon();
   

    init(
        catId : string,
        catName : string,
        catOrdering : string,
        status : string,
        addedDate : string,
        addedDateStr : string,
        defaultPhoto: DefaultPhoto,
        defaultIcon: DefaultIcon        
    ) {
        this.catId = catId;
        this.catName = catName;
        this.catOrdering = catOrdering;
        this.status = status;
        this.addedDate = addedDate;
        this.addedDateStr = addedDateStr;
        this.defaultPhoto = defaultPhoto;
        this.defaultIcon = defaultIcon;
       

        return this;

    }

    getPrimaryKey(): string {
        return this.catId;
    }

    toMap(object: Category): any {
        const map = {};

        map['cat_id'] = object.catId;
        map['cat_name'] = object.catName;
        map['cat_ordering'] = object.catOrdering;
        map['status'] = object.status;
        map['added_date'] = object.addedDate;
        map['added_date_str'] = object.addedDateStr;
        map['default_photo'] = new DefaultPhoto().toMap(object.defaultPhoto);
        map['default_icon'] = new DefaultIcon().toMap(object.defaultIcon);
        

        return map;
    }

    toMapList(objectList: Category[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new Category().init(
            obj.cat_id,
            obj.cat_name,
            obj.cat_ordering,
            obj.status,
            obj.added_date,
            obj.added_date_str,
            new DefaultPhoto().fromMap(obj.default_photo),
            new DefaultIcon().fromMap(obj.default_icon),
           
        );
    }

    fromMapList(objList: any[]): Category[] {
        const category: Category[] = [];
        for (const obj in objList) {
            if (obj != null) {
                category.push(this.fromMap(obj));
            }
        }

        return category;
    }
}
