import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import DealOption from '@/object/DealOption';
import PsResource from '@/api/common/PsResource';

export class ItemDealOptionProvider extends PsProvider {

    itemDealOptionList = reactive<PsResource<DealOption[]>>(new PsResource());
    item = reactive<PsResource<DealOption>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";
    isNoMoreRecord = reactive({
        value: false
    })
    private updateItemDealOptionList(responseData: PsResource<DealOption[]>) {

        if (this.itemDealOptionList != null
            && this.itemDealOptionList.data != null
            && this.itemDealOptionList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.itemDealOptionList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.itemDealOptionList.code = responseData.code;
            this.itemDealOptionList.status = responseData.status;
            this.itemDealOptionList.message = responseData.message;

        } else {

            this.itemDealOptionList = responseData;


        }

        if (this.itemDealOptionList != null && this.itemDealOptionList.data != null) {
            this.offset = this.itemDealOptionList.data.length;
        }

    }

    async loadItemDealOptionList() {

        this.loading.value = true;

        const responseData = await PsApiService.getItemDealOptionList<DealOption>(new DealOption(),  this.limit, this.offset);

        this.updateItemDealOptionList(responseData);

        this.loading.value = false;


    }


    async resetItemDealOptionList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemDealOptionList<DealOption>(new DealOption(), this.limit, this.offset);

        this.updateItemDealOptionList(responseData);

        this.loading.value = false;

    }

}

export const itemDealOptionProviderSymbol = Symbol('ItemDealOptionProvider')
export const createItemDealOptionProviderState = () => {
    return reactive(new ItemDealOptionProvider())
}

export const useItemDealOptionProviderState = () => inject(itemDealOptionProviderSymbol) as ItemDealOptionProvider
export const provideItemDealOptionProviderState = () => provide(
    itemDealOptionProviderSymbol,
    createItemDealOptionProviderState()
)