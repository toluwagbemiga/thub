import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import SubCategoryScribeParameterHolder from '@/object/holder/SubCategoryScribeParameterHolder';
import ApiStatus from '@/object/ApiStatus';

export class SubCategoryScribeProvider extends PsProvider {
    
    loading = reactive({
        value : false
    });

    async subCategoryScription(holder: SubCategoryScribeParameterHolder) {
  
        this.loading.value = true;

        const status = await PsApiService.postSubCategoryScribe<ApiStatus>(new ApiStatus(), holder.toMap());
        
        
        this.loading.value = false;

        return status;
    }
}

export const subCategoryScribeProviderSymbol = Symbol('SubCategoryProvider')
export const createSubCategoryScribeProviderState = () => {
  return reactive(new SubCategoryScribeProvider())
}

export const useSubCategoryScribeProviderState = () => inject(subCategoryScribeProviderSymbol) as SubCategoryScribeProvider
export const provideSubCategoryScribeProviderState = () => provide(
    subCategoryScribeProviderSymbol,
    createSubCategoryScribeProviderState()
)