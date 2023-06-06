import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ApiStatus from '@/object/ApiStatus';
import TouchCountParameterHolder from '@/object/holder/TouchCountParameterHolder';

export class TouchCountProvider extends PsProvider {

    touchcount = reactive<PsResource<ApiStatus>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";

    async postTouchCount(holder: TouchCountParameterHolder) {

        this.loading.value = true;

        await PsApiService.postTouchCount<ApiStatus>(new ApiStatus(), holder.toMap());

        this.loading.value = false;

    }

}

export const touchCountProvider = Symbol('TouchCountProvider')
export const createTouchCountProviderState = () => {
    return reactive(new TouchCountProvider())
}

export const useTouchCountProviderState = () => inject(touchCountProvider) as TouchCountProvider
export const provideTouchCountProviderState = () => provide(
    touchCountProvider,
    createTouchCountProviderState()
)