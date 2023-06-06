
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import DealOption from '@/object/DealOption';

export class DealOptionProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    dealOptionList = reactive<PsResource<DealOption[]>>(new PsResource());

    loading = reactive({ 
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    private updateDealOptionList(responseData: PsResource<DealOption[]>) {

        if (this.dealOptionList != null
            && this.dealOptionList.data != null
            && this.dealOptionList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.dealOptionList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.dealOptionList.code = responseData.code;
            this.dealOptionList.status = responseData.status;
            this.dealOptionList.message = responseData.message;

        } else {

            this.dealOptionList = responseData;


        }

        if (this.dealOptionList != null && this.dealOptionList.data != null) {
            this.offset = this.dealOptionList.data.length;
        }

    }

    async loadDealOptionList() {

        this.loading.value = true;

        const responseData = await PsApiService.getDealOptionList<DealOption>(new DealOption(), this.limit, this.offset);
       
        this.updateDealOptionList(responseData);
        
        this.loading.value = false;

    }

    async resetDealOptionList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getDealOptionList<DealOption>(new DealOption(), this.limit, this.offset);

        this.updateDealOptionList(responseData);

        this.loading.value = false;

    }

}

export const dealOptionProviderSymbol = Symbol('DealOptionProvider')
export const createDealOptionProviderState = () => {
    return reactive(new DealOptionProvider())
}

export const useDealOptionProviderState = () => inject(dealOptionProviderSymbol) as DealOptionProvider
export const provideDealOptionProviderState = () => provide(
    dealOptionProviderSymbol,
    createDealOptionProviderState()
)