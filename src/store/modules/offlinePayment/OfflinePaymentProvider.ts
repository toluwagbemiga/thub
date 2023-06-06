
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import OfflinePaymentMethod from '@/object/OfflinePaymentMethod';

export class OfflinePaymentProvider extends PsProvider {

    offlinePayment = reactive<PsResource<OfflinePaymentMethod>>(new PsResource());
    item = reactive<PsResource<OfflinePaymentMethod>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    async loadOfflinePaymentMethodList() {

        this.loading.value = true;

        this.offlinePayment = await PsApiService.getOfflinePaymentList<OfflinePaymentMethod>(new OfflinePaymentMethod(), this.limit, this.offset);

        this.loading.value = false;

        return this.offlinePayment;

    }

    async resetOfflinePaymentMethodList() {

        this.offset = 0;

        this.loading.value = true;

        await PsApiService.getOfflinePaymentList<OfflinePaymentMethod>(new OfflinePaymentMethod(), this.limit, this.offset);


        this.loading.value = false;

    }



}

export const offlinePaymentProviderSymbol = Symbol('OfflinePaymentProvider')
export const createOfflinePaymentProviderState = () => {
    return reactive(new OfflinePaymentProvider())
}

export const useOfflinePaymentProviderState = () => inject(offlinePaymentProviderSymbol) as OfflinePaymentProvider
export const provideOfflinePaymentProviderState = () => provide(
    offlinePaymentProviderSymbol,
    createOfflinePaymentProviderState()
)