import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import ConditionOfItem from '@/object/ConditionOfItem';
import PsResource from '@/api/common/PsResource';

export class ItemConditionProvider extends PsProvider {

    conditionList = reactive<PsResource<ConditionOfItem[]>>(new PsResource());
    item = reactive<PsResource<ConditionOfItem>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;
    isNoMoreRecord = reactive({
        value: false
    })

    id: string = "";

    private updateConditionOfItemList(responseData: PsResource<ConditionOfItem[]>) {

        if (this.conditionList != null
            && this.conditionList.data != null
            && this.conditionList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.conditionList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.conditionList.code = responseData.code;
            this.conditionList.status = responseData.status;
            this.conditionList.message = responseData.message;

        } else {

            this.conditionList = responseData;


        }

        if (this.conditionList != null && this.conditionList.data != null) {
            this.offset = this.conditionList.data.length;
        }

    }

    async loadItemConditionList() {

        this.loading.value = true;

        const responseData = await PsApiService.getItemConditionList<ConditionOfItem>(new ConditionOfItem(),  this.limit, this.offset);

        this.updateConditionOfItemList(responseData);

        this.loading.value = false;


    }


    async resetItemConditionList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemConditionList<ConditionOfItem>(new ConditionOfItem(), this.limit, this.offset);

        this.updateConditionOfItemList(responseData);

        this.loading.value = false;

    }

}

export const itemConditionProviderSymbol = Symbol('ItemConditionProvider')
export const createItemConditionProviderState = () => {
    return reactive(new ItemConditionProvider())
}

export const useItemConditionProviderState = () => inject(itemConditionProviderSymbol) as ItemConditionProvider
export const provideItemConditionProviderState = () => provide(
    itemConditionProviderSymbol,
    createItemConditionProviderState()
)