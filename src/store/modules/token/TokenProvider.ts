import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ApiStatus from '@/object/ApiStatus';


export class TokenProvider extends PsProvider {

    token = reactive<PsResource<ApiStatus>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";



    async loadToken() {

        this.loading.value = true;

        const status = await PsApiService.getToken<ApiStatus>(new ApiStatus());
        
        this.loading.value = false;

        return status;
    }

}

export const tokenProvider = Symbol('TokenProvider')
export const createTokenProviderState = () => {
    return reactive(new TokenProvider())
}

export const useTokenProviderState = () => inject(tokenProvider) as TokenProvider
export const provideTokenProviderState = () => provide(
    tokenProvider,
    createTokenProviderState()
)