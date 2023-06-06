
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ItemPriceType from '@/object/ItemPriceType';

export class ItemPriceTypeProvider extends PsProvider {

    itemPriceTypeList = reactive<PsResource<ItemPriceType[]>>(new PsResource());

    loading = reactive({ 
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;
    isNoMoreRecord = reactive({
        value: false
    })

    private updateItemPriceTypeList(responseData: PsResource<ItemPriceType[]>) {

        if (this.itemPriceTypeList != null
            && this.itemPriceTypeList.data != null
            && this.itemPriceTypeList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.itemPriceTypeList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.itemPriceTypeList.code = responseData.code;
            this.itemPriceTypeList.status = responseData.status;
            this.itemPriceTypeList.message = responseData.message;

        } else {

            this.itemPriceTypeList = responseData;


        }

        if (this.itemPriceTypeList != null && this.itemPriceTypeList.data != null) {
            this.offset = this.itemPriceTypeList.data.length;
        }

    }

    async loadItemPriceTypeList() {

        this.loading.value = true;

        const responseData = await PsApiService.getItemPriceTypeList<ItemPriceType>(new ItemPriceType(), this.limit, this.offset);

        this.updateItemPriceTypeList(responseData);

        this.loading.value = false;

    }

    async resetItemPriceTypeList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemPriceTypeList<ItemPriceType>(new ItemPriceType(), this.limit, this.offset);

        this.updateItemPriceTypeList(responseData);

        this.loading.value = false;

    }

}

export const itemPriceTypeProviderSymbol = Symbol('ItemPriceTypeProvider')
export const createItemPriceTypeProviderState = () => {
    return reactive(new ItemPriceTypeProvider())
}

export const useItemPriceTypeProviderState = () => inject(itemPriceTypeProviderSymbol) as ItemPriceTypeProvider
export const provideItemPriceTypeProviderState = () => provide(
    itemPriceTypeProviderSymbol,
    createItemPriceTypeProviderState()
)