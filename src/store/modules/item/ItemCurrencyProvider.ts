import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import ItemCurrency from '@/object/ItemCurrency';
import PsResource from '@/api/common/PsResource';

export class ItemCurrencyProvider extends PsProvider {

    itemCurrencyList = reactive<PsResource<ItemCurrency[]>>(new PsResource());
    item = reactive<PsResource<ItemCurrency>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";
    isNoMoreRecord = reactive({
        value: false
    })

    private updateItemCurrencyList(responseData: PsResource<ItemCurrency[]>) {

        if (this.itemCurrencyList != null
            && this.itemCurrencyList.data != null
            && this.itemCurrencyList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.itemCurrencyList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.itemCurrencyList.code = responseData.code;
            this.itemCurrencyList.status = responseData.status;
            this.itemCurrencyList.message = responseData.message;

        } else {

            this.itemCurrencyList = responseData;


        }

        if (this.itemCurrencyList != null && this.itemCurrencyList.data != null) {
            this.offset = this.itemCurrencyList.data.length;
        }

    }

    async loadItemCurrencyList() {
        
        this.loading.value = true;

        const responseData = await PsApiService.getItemCurrencyList<ItemCurrency>(new ItemCurrency(),  this.limit, this.offset);
        this.updateItemCurrencyList(responseData);

        this.loading.value = false;


    }


    async resetItemCurrencyList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemCurrencyList<ItemCurrency>(new ItemCurrency(), this.limit, this.offset);

        this.updateItemCurrencyList(responseData);

        this.loading.value = false;

    }

}

export const itemCurrencyProviderSymbol = Symbol('ItemCurrencyProvider')
export const createItemCurrencyProviderState = () => {
    return reactive(new ItemCurrencyProvider())
}

export const useItemCurrencyProviderState = () => inject(itemCurrencyProviderSymbol) as ItemCurrencyProvider
export const provideItemCurrencyProviderState = () => provide(
    itemCurrencyProviderSymbol,
    createItemCurrencyProviderState()
)