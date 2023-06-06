
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ContactUsParameterHolder from '@/object/holder/ContactUsParameterHolder';
import ApiStatus from '@/object/ApiStatus';

export class ContactUsProvider extends PsProvider {

    buyingitemList = reactive<PsResource<ApiStatus>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;


    async postContactUs(holder: ContactUsParameterHolder) {

        this.loading.value = true;

        await PsApiService.postContactUs<ApiStatus>(new ApiStatus(), holder.toMap());

        this.loading.value = false;

    }

}

export const contactUsProviderSymbol = Symbol('ContactUsProvider')
export const createContactUsProviderState = () => {
    return reactive(new ContactUsProvider())
}

export const useContactUsProviderState = () => inject(contactUsProviderSymbol) as ContactUsProvider
export const provideContactUsProviderState = () => provide(
    contactUsProviderSymbol,
    createContactUsProviderState()
)