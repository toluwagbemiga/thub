
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import Bunner from '@/object/Bunner';

export class BunnerProvider extends PsProvider {

    bunnerList = reactive<PsResource<Bunner[]>>(new PsResource());

    loading = reactive({
        value: false
    });
    isNoMoreRecord = reactive({
        value: false
    })

    limit: Number = 30;
    offset: Number = 0;

    private updateBunnerList(responseData: PsResource<Bunner[]>) {

        if (this.bunnerList != null
            && this.bunnerList.data != null
            && this.bunnerList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.bunnerList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.bunnerList.code = responseData.code;
            this.bunnerList.status = responseData.status;
            this.bunnerList.message = responseData.message;

        } else {

            this.bunnerList = responseData;


        }

        if (this.bunnerList != null && this.bunnerList.data != null) {
            this.offset = this.bunnerList.data.length;
        }

    }

    async loadBunnerList() {

        this.loading.value = true;

        const responseData = await PsApiService.getBunnerList<Bunner>(new Bunner(), this.limit, this.offset);
       
        this.updateBunnerList(responseData);
        
        this.loading.value = false;

    }

    async resetBunnerList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getBunnerList<Bunner>(new Bunner(), this.limit, this.offset);

        this.updateBunnerList(responseData);

        this.loading.value = false;

    }

}

export const bunnerProviderSymbol = Symbol('BunnerProvider')
export const createBunnerProviderState = () => {
    return reactive(new BunnerProvider())
}

export const useBunnerProviderState = () => inject(bunnerProviderSymbol) as BunnerProvider
export const provideBunnerProviderState = () => provide(
    bunnerProviderSymbol,
    createBunnerProviderState()
)