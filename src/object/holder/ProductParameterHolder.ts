import PsConst from "../constant/ps_constants";

export default class ProductParameterHolder {

    /* URL Params & Query */
    urlParamsAndQuery = {
        'params' : {},
        'query' : {}
    };

    searchTerm: string = '';   
    catId: string = '';
    catName: string= '';
    subCatId: string = '';
    subCatName: string = '';
    itemLocationTownship: string = '';
    itemLocationTownshipName: string = '';
    dealOptionId: string = '';
    dealOptionName: string = '';
    itemTypeId: string = '';
    itemTypeName: string = '';
    itemPriceTypeId: string = '';
    itemPriceTypeName: string = '';
    itemCurrencyId: string = '';
    itemLocationId: string = '';
    itemLocationName: string = '';
    conditionOfItemId: string = '';
    itemConditionName: string = '';
    maxPrice: string = '';
    minPrice: string = '';
    brand: string = '';
    public lat: string = '';
    public lng: string = '';
    engineStatusId: string = '';
    engineStatusName: string = '';
    minYear: string = '';
    maxYear: string = '';
    public mile: string = '';
    orderBy: string = '';
    orderType: string = '';
    addedUserId: string = '';
    isPaid: string = '';
    status: string = '';
    isSoldOut: string = '';
    discountBool : Boolean = false;
    isDiscount: string = '';
    sortingId = '0';
    sortingName = "DEFAULT ORDER";
    
    sortingList = [
        
        {
            id:"0", 
            orderBy:PsConst.FILTERING__ADDED_DATE, 
            orderType:PsConst.FILTERING__DESC, 
            name:"Latest"
        },
        {
            id:"1", 
            orderBy:PsConst.FILTERING_TRENDING, 
            orderType:PsConst.FILTERING__DESC, 
            name:"Popular"
        }
    ]; 

    constructor() {
        
        this.searchTerm = '';
        this.catId = '';
        this.catName = '';
        this.subCatId = '';
        this.subCatName = '';
        this.itemTypeId = '';
        this.itemTypeName = '';
        this.itemPriceTypeId = '';
        this.itemPriceTypeName = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.itemLocationName = '';
        this.conditionOfItemId = '';
        this.itemConditionName = '';
        this.dealOptionName = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.engineStatusId = '';
        this.minYear = '';
        this.maxYear = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.addedUserId = '';
        this.isPaid = '';
        this.status = '1';
        this.isSoldOut = '';
        this.isDiscount = '';

    }

    getUrlParamsAndQuery() { 
        const query = {};
        const param = {};

        if(this.searchTerm != '') {
            query['searchterm'] = this.searchTerm;
        }

        if(this.catId != '') {
            query['cat_id'] = this.catId;
            param['catName'] = this.catName;
        }

        if(this.subCatId != '') {
            query['sub_cat_id'] = this.subCatId;            
            query['sub_cat_name'] = this.subCatName;  
        }


        if(this.minPrice != '') {
            query['min_price'] = this.minPrice;            
        }

        if(this.maxPrice != '') {
            query['max_price'] = this.maxPrice;            
        }

        if(this.searchTerm != '') {
            query['searchterm'] = this.searchTerm;
        }

        if(this.catId != '') {
            query['cat_id'] = this.catId;
        }

        if(this.catName != '') {
            query['cat_name'] = this.catName;
        }

        if(this.subCatId != '') {
            query['sub_cat_id'] = this.subCatId;
        }

        if(this.subCatName != '') {
            query['sub_cat_name'] = this.subCatName;
        }

        if(this.itemTypeId != '') {
            query['item_type_id'] = this.itemTypeId;
        }

        if(this.itemTypeName != '') {
            query['item_type_name'] = this.itemTypeName;
        }

        if(this.itemPriceTypeId != '') {
            query['item_price_type_id'] = this.itemPriceTypeId;
        }

        if(this.itemPriceTypeName != '') {
            query['item_price_type_name'] = this.itemPriceTypeName;
        }

        if(this.dealOptionId != '') {
            query['deal_option_id'] = this.dealOptionId;
        }

        if(this.dealOptionName != '') {
            query['deal_option_name'] = this.dealOptionName;
        }


        if(this.itemCurrencyId != '') {
            query['item_currency_id'] = this.itemCurrencyId;
        }

        if(this.itemLocationId != '') {
            query['item_location_id'] = this.itemLocationId;
        }

        if(this.itemLocationName != '') {
            query['item_location_name'] = this.itemLocationName;
        }

        if(this.conditionOfItemId != '') {
            query['condition_of_item_id'] = this.conditionOfItemId;
        }

        if(this.itemConditionName != '') {
            query['item_condition_name'] = this.itemConditionName;
        }

        if(this.maxPrice != '') {
            query['max_price'] = this.maxPrice;
        }

        if(this.minPrice != '') {
            query['min_price'] = this.minPrice;
        }

        if(this.brand != '') {
            query['brand'] = this.brand;
        }

        if(this.lat != '') {
            query['lat'] = this.lat;
        }

        if(this.lng != '') {
            query['lng'] = this.lng;
        }

        if(this.engineStatusId != '') {
            query['engine_status_id'] = this.engineStatusId;
        }

        if(this.engineStatusName != '') {
            query['engine_status_name'] = this.engineStatusName;
        }

        if(this.minYear != '') {
            query['min_year'] = this.minYear;
        }

        if(this.maxYear != '') {
            query['max_year'] = this.maxYear;
        }

        if(this.mile != '') {
            query['mile'] = this.mile;
        }

        if(this.sortingId != '') {
            query['sorting_id'] = this.sortingId;
        }

        if(this.sortingName != '') {
            query['sorting_name'] = this.sortingName;
        }

        if(this.orderBy != '') {
            query['order_by'] = this.orderBy;

            if(this.orderBy == 'touch_count') {
                query['sorting_id'] = '2';
                query['sorting_name'] = 'POPULAR';
            }

            //http://localhost:3000/item-list?sortingId=2&sortingName=POPULAR&orderBy=touch_count&orderType=desc&status=1
            //http://localhost:3000/item-list?sortingId=2&sortingName=POPULAR&orderBy=touch_count&orderType=asc
            //http://localhost:3000/item-list?sortingId=2&sortingName=POPULAR&orderBy=touch_count&orderType=desc&status=1
            //http://localhost:3000/item-list?sortingId=2&sortingName=POPULAR&orderBy=touch_count&orderType=asc
            // id:"2", 
            // orderBy: PsConst.FILTERING_TRENDING, 
            // orderType:PsConst.FILTERING__ASC, name:"POPULAR"

        }

        if(this.orderType != '') {
            query['orderType'] = this.orderType;
        }

        if(this.addedUserId != '') {
            query['addedUserId'] = this.addedUserId;
        }

        if(this.isPaid != '') {
            query['isPaid'] = this.isPaid;
        }

        if(this.status != '') {
            query['status'] = this.status;
        }
        
        if(this.isSoldOut != '') {
            query['is_sold_out'] = this.isSoldOut;
        }

        if(this.isDiscount != '') {
            query['is_discount'] = this.isDiscount;
        }
        if(this.isPaid != '') {
            query['ad_post_type'] = this.isPaid;
        }

        // this.urlParamsAndQuery['params'] = param;
        this.urlParamsAndQuery.params = param;
        this.urlParamsAndQuery.query = query;
        // this.urlParamsAndQuery['query'] = query;

        return this.urlParamsAndQuery;
    }

    getPopularParameterHolder() : ProductParameterHolder{
        this.searchTerm = '';
        this.catId = ''; 
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.itemLocationTownship = '';
        this.itemLocationTownshipName = '';
        this.dealOptionId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.orderBy = 'touch_count'
        this.orderType = PsConst.FILTERING__DESC;
        this.addedUserId = '';
        this.isPaid = '';
        this.status = '1';
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }
    getFeaturedParameterHolder() : ProductParameterHolder{
        this.searchTerm = '';
        this.catId = ''; 
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.itemLocationTownship = '';
        this.itemLocationTownshipName = '';
        this.dealOptionId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = PsConst.ONLY_PAID_ITEM;
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '1';
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }
    getLatestParameterHolder() : ProductParameterHolder{
        this.searchTerm = '';
        this.catId = ''; 
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.itemLocationTownship = '';
        this.itemLocationTownshipName = '';
        this.dealOptionId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '1';
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }
    getRecentParameterHolder() : ProductParameterHolder{
        this.searchTerm = '';
        this.catId = ''; 
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.itemLocationTownship = '';
        this.itemLocationTownshipName = '';
        this.dealOptionId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '1';
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }


    parseParamsAndQuery(params, query) {

        this.searchTerm = query.searchterm?.toString() ?? '';
        this.catId = query.cat_id?.toString() ?? '';
        this.catName = query.cat_name?.toString() ?? '';
        this.dealOptionName = query.deal_option_ame?.toString() ?? '';
        this.subCatId = query.sub_cat_id?.toString() ?? '';
        this.subCatName = query.sub_cat_name?.toString() ?? '';
        this.itemTypeId = query.item_type_id?.toString() ?? '';
        this.itemTypeName = query.item_type_name?.toString() ?? '';
        this.itemPriceTypeId = query.item_price_type_id?.toString() ?? '';
        this.itemPriceTypeName = query.item_price_type_name?.toString() ?? '';
        this.itemCurrencyId = query.item_currency_id?.toString() ?? '';
        this.itemLocationId = query.item_location_id?.toString() ?? '';
        this.itemLocationName = query.item_location_name?.toString() ?? '';
        this.conditionOfItemId = query.condition_of_item_id?.toString() ?? '';
        this.itemConditionName = query.item_condition_name?.toString() ?? '';
        this.maxPrice = query.max_price?.toString() ?? '';
        this.minPrice = query.min_price?.toString() ?? '';
        this.brand = query.brand?.toString() ?? '';
        this.lat = query.lat?.toString() ?? '';
        this.lng = query.lng?.toString() ?? '';
        this.engineStatusId = query.engine_status_id?.toString() ?? '';
        this.engineStatusName = query.engine_status_name?.toString() ?? '';
        this.minYear = query.min_year?.toString() ?? '';
        this.maxYear = query.max_year?.toString() ?? '';
        this.mile = query.mile?.toString() ?? '';
        this.orderBy = query.order_by?.toString() ?? '';
        this.orderType = query.order_type?.toString() ?? '';
        this.addedUserId = query.added_user_id?.toString() ?? '';
        this.isPaid = query.ad_post_type?.toString() ?? '';
        this.status = query.status?.toString() ?? '';
        this.isSoldOut = query.is_sold_out?.toString() ?? '';
        this.isDiscount = query.is_discount?.toString() ?? '';
        this.sortingId = query.sorting_id?.toString() ?? '';
        this.sortingName = query.sorting_name?.toString() ?? '';

    }
    getDiscountParameterHolder() : ProductParameterHolder {
        this.searchTerm = '';
        this.catId = '';
        this.catName = '';
        this.subCatName = '';
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.engineStatusId = '';
        this.minYear = '';
        this.maxYear = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '1';
        this.isSoldOut = '';
        this.isDiscount = PsConst.ONE;
    
        return this;
    }

    getPaidItemParameterHolder() : ProductParameterHolder {
        this.searchTerm = '';
        this.catId = '';
        this.catName = '';
        this.subCatName = '';
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.engineStatusId = '';
        this.minYear = '';
        this.maxYear = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = PsConst.ONLY_PAID_ITEM;
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '1';
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }
    
    getPendingItemParameterHolder() : ProductParameterHolder{
        this.searchTerm = '';
        this.catId = '';
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '0';
        this.isSoldOut = '';
        this.isDiscount = ''
    
        return this;
    }
    
    getRejectedItemParameterHolder() : ProductParameterHolder {
        this.searchTerm = '';
        this.catId = '';
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.engineStatusId = '';
        this.minYear = '';
        this.maxYear = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '3';
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }
    
    getDisabledProductParameterHolder() : ProductParameterHolder{
        this.searchTerm = '';
        this.catId = '';
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.engineStatusId = '';
        this.minYear = '';
        this.maxYear = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '2';
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }

    getHideItemParameterHolder() : ProductParameterHolder {
        this.searchTerm = '';
        this.catId = '';
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.engineStatusId = '';
        this.minYear = '';
        this.maxYear = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = PsConst.HIDE_ITEM;
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }
    
    getItemByManufacturerIdParameterHolder() : ProductParameterHolder {
        this.searchTerm = '';
        this.catId = '';
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.engineStatusId = '';
        this.minYear = '';
        this.maxYear = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.minYear = '';
        this.maxYear = '';
        this.addedUserId = '';
        this.isPaid = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '1';
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }
    resetParameterHolder() : ProductParameterHolder{
        this.searchTerm = '';
        this.catId = ''; 
        this.subCatId = '';
        this.itemTypeId = '';
        this.itemPriceTypeId = '';
        this.itemCurrencyId = '';
        this.itemLocationId = '';
        this.itemLocationTownship = '';
        this.itemLocationTownshipName = '';
        this.dealOptionId = '';
        this.conditionOfItemId = '';
        this.maxPrice = '';
        this.minPrice = '';
        this.brand = '';
        this.lat = '';
        this.lng = '';
        this.mile = '';
        this.addedUserId = '';
        this.isPaid = '';
        this.orderBy = PsConst.FILTERING__ADDED_DATE;
        this.orderType = PsConst.FILTERING__DESC;
        this.status = '1';
        this.isSoldOut = '';
        this.isDiscount = '';
    
        return this;
    }
    
      
    toMap() : {} {
        const map = {};
        map['searchterm'] = this.searchTerm;
        map['cat_id'] = this.catId;
        map['sub_cat_id'] = this.subCatId;
        map['item_type_id'] = this.itemTypeId;
        map['item_price_type_id'] = this.itemPriceTypeId;
        map['item_currency_id'] = this.itemCurrencyId;
        map['item_location_id'] = this.itemLocationId;
        map['item_location_township_id'] = this.itemLocationTownship;
        map['deal_option_id'] = this.dealOptionId;
        map['condition_of_item_id'] = this.conditionOfItemId;
        map['max_price'] = this.maxPrice;
        map['min_price'] = this.minPrice;
        map['engine_status'] = this.engineStatusId;
        map['min_year'] = this.minYear;
        map['max_year'] = this.maxYear;
        map['lat'] = this.lat;
        map['lng'] = this.lng;
        map['miles'] = this.mile;
        map['brand'] = this.brand;
        map['added_user_id'] = this.addedUserId;
        map['ad_post_type'] = this.isPaid;
        map['order_by'] = this.orderBy;
        map['order_type'] = this.orderType;
        map['status'] = this.status;
        map['is_sold_out'] = this.isSoldOut;
        map['is_discount'] = this.isDiscount;
        
        return map;
    }
      
}