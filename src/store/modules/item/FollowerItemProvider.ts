import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import FollowItemParameterHolder from '@/object/holder/FollowItemParameterHolder';
import PsApiService from '@/api/PsApiService';
import Product from '@/object/Product';
import PsResource from '@/api/common/PsResource';
import PsUtils from '@/utils/PsUtils';

export class FollowerItemProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    itemList = reactive<PsResource<Product[]>>(new PsResource());
    item = reactive<PsResource<Product>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";

    private updateProductList(responseData: PsResource<Product[]>) {

        if (this.itemList != null
            && this.itemList.data != null
            && this.itemList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null  && responseData.data.length > 0) {
                this.itemList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.itemList.code = responseData.code;
            this.itemList.status = responseData.status;
            this.itemList.message = responseData.message;

        } else {

            this.itemList = responseData;


        }

        if (this.itemList != null && this.itemList.data != null) {
            this.offset = this.itemList.data.length;
        }

    }

    async loadItemList(loginUserId:string,holder: FollowItemParameterHolder) {

        this.loading.value = true;

        const responseData = await PsApiService.getFollowerItemListByUserId<Product>(new Product(), this.limit, this.offset, loginUserId, holder.toMap());
       
        this.updateProductList(responseData);

        this.loading.value = false;


    }


    async resetProductList(loginUserId:string,holder: FollowItemParameterHolder) {
        PsUtils.log(holder);
        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getFollowerItemListByUserId<Product>(new Product(), this.limit, this.offset, loginUserId, holder.toMap());
       
        this.updateProductList(responseData);

        this.loading.value = false;

    }

}

export const followerItemProviderSymbol = Symbol('FollowerItemProvider')
export const createFollowerItemProviderState = () => {
    return reactive(new FollowerItemProvider())
}

export const useFollowerItemProviderState = () => inject(followerItemProviderSymbol) as FollowerItemProvider
export const provideFollowerItemProviderState = () => provide(
    followerItemProviderSymbol,
    createFollowerItemProviderState()
)