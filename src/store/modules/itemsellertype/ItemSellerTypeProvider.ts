
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ItemSellerType from '@/object/ItemSellerType';

export class ItemSellerTypeProvider extends PsProvider {

    itemSellerTypeList = reactive<PsResource<ItemSellerType[]>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;
    isNoMoreRecord = reactive({
        value: false
    })

    private updateItemSellerTypeList(responseData: PsResource<ItemSellerType[]>) {

        if (this.itemSellerTypeList != null
            && this.itemSellerTypeList.data != null
            && this.itemSellerTypeList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.itemSellerTypeList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.itemSellerTypeList.code = responseData.code;
            this.itemSellerTypeList.status = responseData.status;
            this.itemSellerTypeList.message = responseData.message;

        } else {

            this.itemSellerTypeList = responseData;


        }

        if (this.itemSellerTypeList != null && this.itemSellerTypeList.data != null) {
            this.offset = this.itemSellerTypeList.data.length;
        }

    }

    async loadItemSellerTypeList() {

        this.loading.value = true;

        const responseData = await PsApiService.getItemSellerTypeList<ItemSellerType>(new ItemSellerType(), this.limit, this.offset);

        this.updateItemSellerTypeList(responseData);

        this.loading.value = false;

    }

    async resetItemSellerTypeList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemSellerTypeList<ItemSellerType>(new ItemSellerType(), this.limit, this.offset);

        this.updateItemSellerTypeList(responseData);

        this.loading.value = false;

    }

}

export const itemSellerTypeProviderSymbol = Symbol('ItemSellerTypeProvider')
export const createItemSellerTypeProviderState = () => {
    return reactive(new ItemSellerTypeProvider())
}

export const useItemSellerTypeProviderState = () => inject(itemSellerTypeProviderSymbol) as ItemSellerTypeProvider
export const provideItemSellerTypeProviderState = () => provide(
    itemSellerTypeProviderSymbol,
    createItemSellerTypeProviderState()
)