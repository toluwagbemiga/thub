import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import Product from '@/object/Product';
import PsResource from '@/api/common/PsResource';
import FavouriteParameterHolder from '@/object/holder/FavouriteParameterHolder';

export class FavouriteItemProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    favouriteItemList = reactive<PsResource<Product[]>>(new PsResource());
    item = reactive<PsResource<Product>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";

    private updateItemList(responseData: PsResource<Product[]>) {

        if (this.favouriteItemList != null
            && this.favouriteItemList.data != null
            && this.favouriteItemList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.favouriteItemList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.favouriteItemList.code = responseData.code;
            this.favouriteItemList.status = responseData.status;
            this.favouriteItemList.message = responseData.message;

        } else {

            this.favouriteItemList = responseData;


        }

        if (this.favouriteItemList != null && this.favouriteItemList.data != null) {
            this.offset = this.favouriteItemList.data.length;
        }

    }

    async loadFavouriteItemList(loginUserId: string) {

        this.loading.value = true;

        const responseData = await PsApiService.getFavouritesList<Product>(new Product(), loginUserId, this.limit, this.offset);

        this.updateItemList(responseData);

        this.loading.value = false;


    }


    async resetFavouriteItemList(loginUserId: string) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getFavouritesList<Product>(new Product(), loginUserId, this.limit, this.offset);

        this.updateItemList(responseData);

        this.loading.value = false;

    }

    async postFavourite(itemId, userId) {
        const parmaHolder = new FavouriteParameterHolder;
        parmaHolder.itemId = itemId;
        parmaHolder.userId = userId;

        const responseData = await PsApiService.postFavourite<Product>(new Product(),  parmaHolder.toMap());
        
        return responseData;
    }

}

export const favouriteItemProviderSymbol = Symbol('FavouriteItemProvider')
export const createFavouriteItemProviderState = () => {
    return reactive(new FavouriteItemProvider())
}

export const useFavouriteItemProviderState = () => inject(favouriteItemProviderSymbol) as FavouriteItemProvider
export const provideFavouriteItemProviderState = () => provide(
    favouriteItemProviderSymbol,
    createFavouriteItemProviderState()
)