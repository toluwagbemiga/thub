import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import LimitAdTransaction from '@/object/LimitAdTransaction';
import PsUtils from '@/utils/PsUtils';
import ItemLimitParameterHolder from '@/object/holder/ItemLimitParameterHolder';

export class LimitAdItemProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    buyadList = reactive<PsResource<LimitAdTransaction[]>>(new PsResource());
    buyad = reactive<PsResource<LimitAdTransaction>>(new PsResource());
    loading = reactive({
        value: false 
    });

    limit: Number = 30;
    offset: Number = 0;

    id: string = "";

    private updateLimitAdItemList(responseData: PsResource<LimitAdTransaction[]>) {

        if (this.buyadList != null
            && this.buyadList.data != null
            && this.buyadList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.buyadList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.buyadList.code = responseData.code;
            this.buyadList.status = responseData.status;
            this.buyadList.message = responseData.message;

        } else {

            this.buyadList = responseData;


        }

        if (this.buyadList != null && this.buyadList.data != null) {
            this.offset = this.buyadList.data.length;
        }

    }

    async loadPaidAdItemList(loginUserId: string) {
        
        const parmaHolder = new ItemLimitParameterHolder;
     
        parmaHolder.userId = loginUserId;

        this.loading.value = true;

        const responseData = await PsApiService.getLimitAdItemList<LimitAdTransaction>(new LimitAdTransaction(), loginUserId, parmaHolder.toMap());
   
        this.updateLimitAdItemList(responseData);

        this.loading.value = false;


    }


    async resetPaidAdItemList(loginUserId: string) {
        const parmaHolder = new ItemLimitParameterHolder;
     
        parmaHolder.userId = loginUserId;
        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getLimitAdItemList<LimitAdTransaction>(new LimitAdTransaction(), loginUserId, parmaHolder.toMap());
        console.log("Limit Ad");
        console.log(responseData);
        this.updateLimitAdItemList(responseData);
        
        this.loading.value = false;

    }

}

export const LimitAdItemProviderSymbol = Symbol('LimitAdItemProvider')
export const createLimitAdItemProviderState = () => {
    return reactive(new LimitAdItemProvider())
}

export const useLimitAdItemProviderState = () => inject(LimitAdItemProviderSymbol) as LimitAdItemProvider
export const provideLimitAdItemProviderState = () => provide(
    LimitAdItemProviderSymbol,
    createLimitAdItemProviderState()
)