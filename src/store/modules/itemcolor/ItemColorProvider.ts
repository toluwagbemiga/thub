
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ItemColor from '@/object/ItemColor';

export class ItemColorProvider extends PsProvider {

    itemColorList = reactive<PsResource<ItemColor[]>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;
    isNoMoreRecord = reactive({
        value: false
    })

    private updateItemColorList(responseData: PsResource<ItemColor[]>) {

        if (this.itemColorList != null
            && this.itemColorList.data != null
            && this.itemColorList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.itemColorList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.itemColorList.code = responseData.code;
            this.itemColorList.status = responseData.status;
            this.itemColorList.message = responseData.message;

        } else {

            this.itemColorList = responseData;


        }

        if (this.itemColorList != null && this.itemColorList.data != null) {
            this.offset = this.itemColorList.data.length;
        }

    }

    async loadItemColorList() {

        this.loading.value = true;

        const responseData = await PsApiService.getItemColorList<ItemColor>(new ItemColor(), this.limit, this.offset);

        this.updateItemColorList(responseData);

        this.loading.value = false;

    }

    async resetItemColorList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemColorList<ItemColor>(new ItemColor(), this.limit, this.offset);

        this.updateItemColorList(responseData);

        this.loading.value = false;

    }

}

export const itemColorProviderSymbol = Symbol('ItemColorProvider')
export const createItemColorProviderState = () => {
    return reactive(new ItemColorProvider())
}

export const useItemColorProviderState = () => inject(itemColorProviderSymbol) as ItemColorProvider
export const provideItemColorProviderState = () => provide(
    itemColorProviderSymbol,
    createItemColorProviderState()
)