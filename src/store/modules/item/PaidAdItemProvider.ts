import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import PaidAdItem from '@/object/PaidAdItem';
import PsUtils from '@/utils/PsUtils';

export class PaidAdItemProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    paidAdItemList = reactive<PsResource<PaidAdItem[]>>(new PsResource());
    loading = reactive({
        value: false 
    });

    limit: Number = 30;
    offset: Number = 0;

    id: string = "";

    private updatePaidAdItemList(responseData: PsResource<PaidAdItem[]>) {

        if (this.paidAdItemList != null
            && this.paidAdItemList.data != null
            && this.paidAdItemList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.paidAdItemList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.paidAdItemList.code = responseData.code;
            this.paidAdItemList.status = responseData.status;
            this.paidAdItemList.message = responseData.message;

        } else {

            this.paidAdItemList = responseData;


        }

        if (this.paidAdItemList != null && this.paidAdItemList.data != null) {
            this.offset = this.paidAdItemList.data.length;
        }

    }

    async loadPaidAdItemList(loginUserId: string) {

        this.loading.value = true;

        const responseData = await PsApiService.getPaidAdItemList<PaidAdItem>(new PaidAdItem(), loginUserId, this.limit, this.offset);
        // PsUtils.log("paid ad");
        // PsUtils.log(responseData);
        this.updatePaidAdItemList(responseData);

        this.loading.value = false;


    }


    async resetPaidAdItemList(loginUserId: string) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getPaidAdItemList<PaidAdItem>(new PaidAdItem(), loginUserId, this.limit, this.offset);

        this.updatePaidAdItemList(responseData);
        
        this.loading.value = false;

    }

}

export const paidAdItemProviderSymbol = Symbol('PaidAdItemProvider')
export const createPaidAdItemProviderState = () => {
    return reactive(new PaidAdItemProvider())
}

export const usePaidAdItemProviderState = () => inject(paidAdItemProviderSymbol) as PaidAdItemProvider
export const providePaidAdItemProviderState = () => provide(
    paidAdItemProviderSymbol,
    createPaidAdItemProviderState()
)