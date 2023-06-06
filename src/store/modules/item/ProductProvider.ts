import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import ProductParameterHolder from '@/object/holder/ProductParameterHolder';
import ItemEntryParameterHolder from '@/object/holder/ItemEntryParameterHolder';
import PsApiService from '@/api/PsApiService';
import Product from '@/object/Product';
import PsResource from '@/api/common/PsResource';
import DefaultPhoto from '@/object/DefaultPhoto';
import LocationParameterHolder from '@/object/holder/LocationParameterHolder';
import ApiStatus from '@/object/ApiStatus';
import UserDeleteItemParameterHolder from '@/object/holder/UserDeleteItemParameterHolder';

export class ProductProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    productList = reactive<PsResource<Product[]>>(new PsResource());
    product = reactive<PsResource<Product>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";
    paramHolder = reactive(new ProductParameterHolder());
    localtionParameterHolder = reactive<LocationParameterHolder>(new LocationParameterHolder().getDefaultParameterHolder());

    private updateItemList(responseData: PsResource<Product[]>) {
        if (this.productList != null
            && this.productList.data != null
            && this.productList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.productList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            
            this.productList.code = responseData.code;
            this.productList.status = responseData.status;
            this.productList.message = responseData.message;

        } else {

            this.productList = responseData;


        }

        if (this.productList != null && this.productList.data != null) {
            this.offset = this.productList.data.length;
        }

    }

    async loadItemList(loginUserId: string, holder: ProductParameterHolder) {
        this.loading.value = true;
        
        const responseData = await PsApiService.getItemListByUserId<Product>(new Product(), this.limit, this.offset, loginUserId, holder.toMap());
        this.updateItemList(responseData);

        this.loading.value = false;

    }


    async loadSoldoutItemList(loginUserId: string) {
       
        this.loading.value = true;
        
        const responseData = await PsApiService.getSoldoutItemList<Product>(new Product(), this.limit, this.offset, loginUserId);
        this.updateItemList(responseData);

        this.loading.value = false;


    }

    async loadItem(itemId: string, loginUserId: string) {

        this.loading.value = true;
        
        this.product = await PsApiService.getItemDetail<Product>(new Product(), itemId, loginUserId);
    
        this.loading.value = false;

        return this.product;

    }

    async updateLocation(loginUserId, locationId, locationName){
        this.paramHolder.itemLocationId = locationId;
        this.paramHolder.itemLocationName = locationName;
        await this.resetItemList(loginUserId, this.paramHolder);

    }
    
    async updateSearch(loginUserId, searchTerm){
        this.paramHolder.searchTerm = searchTerm;
        await this.resetItemList(loginUserId, this.paramHolder);

    }

    async resetItemList(loginUserId: string, holder: ProductParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemListByUserId<Product>(new Product(), this.limit, this.offset, loginUserId, holder.toMap());

        this.updateItemList(responseData);

        this.loading.value = false;

        return responseData;
    }

    async resetPaidProductList(loginUserId:string, holder: ProductParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemListByUserId<Product>(new Product(), this.limit, this.offset, loginUserId, holder.toMap());
        
        this.updateItemList(responseData);

        this.loading.value = false;

    }

    async submitItemEntry(holder: ItemEntryParameterHolder,loginUserId : string): Promise<PsResource<Product>> {
        this.loading.value = true;
        this.product = await PsApiService.postItemEntry<Product>(new Product(), holder.toMap(),loginUserId);
        this.loading.value = false;

        return this.product;

    }

    async postItemImageUpload(loginUserId : string,imgParentId : string, imgType : string, ordering : Number, imgDesc : string, imageFile: any, imgId : string) : Promise<PsResource<DefaultPhoto>> {
        this.loading.value = true;
        console.log(imgId);
        console.log(ordering);
        const returnData = await PsApiService.postItemImageUpload<DefaultPhoto>(new DefaultPhoto(), imgParentId, imgType, ordering, imgDesc, imageFile, imgId, loginUserId);
        
        this.loading.value = false;

        return returnData;
    }

    async postReorderItemImage(loginUserId : string, reorderImages : any[]) : Promise<PsResource<ApiStatus>> {
        this.loading.value = true;
      
        const status = await PsApiService.postReorderItemImage<ApiStatus>(new ApiStatus(), loginUserId ,reorderImages);
        this.loading.value = false;

        return status;
    }

    async postItemVideoUpload(imgParentId : string, videoFile: File,loginUserId : String) : Promise<PsResource<DefaultPhoto>> {
        this.loading.value = true;
        
        const returnData = await PsApiService.postItemVideoUpload<DefaultPhoto>(new DefaultPhoto(), imgParentId, videoFile,loginUserId);
        
        this.loading.value = false;

        return returnData;
    }

    async postItemVideoThumbUpload(imgParentId : string, videoThumbFile: File,loginUserId : String) : Promise<PsResource<DefaultPhoto>>  {
        this.loading.value = true;
        
        const returnData = await PsApiService.postItemVideoThumbUpload<DefaultPhoto>(new DefaultPhoto(), imgParentId, videoThumbFile,loginUserId);
        this.loading.value = false;

        return returnData;
    }

    async postCreditCard(holder: any) : Promise<PsResource<ApiStatus>> {
        this.loading.value = true;
        const status = await PsApiService.postSellerCreditCard<ApiStatus>( new ApiStatus(), holder);//holder?.toMap());
        this.loading.value = false;
        return status;
    }

    async updateCreditCard(holder: any) : Promise<PsResource<ApiStatus>> {
        this.loading.value = true;
        const status = await PsApiService.postCreditCardUpdate<ApiStatus>( new ApiStatus(), holder); //holder.toMap());
        this.loading.value = false;
        return status;
    }


    async userDeleteItem(itemId) : Promise<PsResource<ApiStatus>> {

        const holder = new UserDeleteItemParameterHolder();
        holder.itemId =itemId;
        
        this.loading.value = true;
    
        const returnedData = await PsApiService.deleteItem<ApiStatus>(new ApiStatus(), holder.toMap());
    
        this.loading.value = false;
        
        return returnedData;
      }

}

export const productProviderSymbol = Symbol('ItemProvider')
export const createProductProviderState = () => {
    return reactive(new ProductProvider())
}

// export const itemPendingProviderSymbol = Symbol('ItemProvider')
// export const createItemPendingProviderState = () => {
//     return reactive(new ItemProvider())
// }

export const useProductProviderState = () => inject(productProviderSymbol) as ProductProvider
export const provideproductProviderState = () => provide(
    productProviderSymbol,
    createProductProviderState()
)