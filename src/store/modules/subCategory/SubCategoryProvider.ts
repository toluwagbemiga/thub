import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import SubCategory from '@/object/SubCategory';
import PsResource from '@/api/common/PsResource';
import SubCategoryListParameterHolder from '@/object/holder/SubCategoryListParameterHolder';

export class SubCategoryProvider extends PsProvider {
    
    isNoMoreRecord = reactive({
        value: false
    })
    subCategoryList = reactive<PsResource<SubCategory[]>>(new PsResource());
    catId = '';
    loading = reactive({
        value : false
    });

    limit: Number = 30;
    offset: Number = 0;

    paramHolder = reactive<SubCategoryListParameterHolder>(new SubCategoryListParameterHolder().SubCategoryListParameterHolder());
    
    private updateSubCategoryList(responseData : PsResource<SubCategory[]>) {
        
        if(this.subCategoryList != null 
            && this.subCategoryList.data != null 
            && this.subCategoryList.data.length > 0
            && this.offset != 0) {

            if(responseData.data != null && responseData.data.length > 0) {
                this.subCategoryList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.subCategoryList.code = responseData.code;
            this.subCategoryList.status = responseData.status;
            this.subCategoryList.message = responseData.message;            

        }else {
            
            this.subCategoryList = responseData;
            
        }

        if(this.subCategoryList != null && this.subCategoryList.data != null ) {
            this.offset = this.subCategoryList.data.length;
        }

    }

    async loadSubCategoryList(catId: string) {
        
        if(this.catId != catId) {
            this.subCategoryList = new PsResource();
            this.offset = 0;
        }

        this.catId = catId.toString();

        this.loading.value = true;

        const responseData = await PsApiService.getSubCategoryList<SubCategory>(new SubCategory(), this.catId, this.limit, this.offset);
        
        this.loading.value = false;

        this.updateSubCategoryList(responseData);

        
    }

    async resetSubCategoryList(catId: string) {
        
        if(this.catId != catId) {
            this.subCategoryList = new PsResource();
        }

        this.offset = 0;
        
        this.catId = catId.toString();

        this.loading.value = true;

        const responseData = await PsApiService.getSubCategoryList<SubCategory>(new SubCategory(), this.catId, this.limit, this.offset);
        
        this.updateSubCategoryList(responseData);

        this.loading.value = false;
        
    }

    filtersubCatUpdate(loginUserId:string,holder: SubCategoryListParameterHolder) {
        this.resetSearchSubCategoryList(loginUserId,holder);
    }

    async resetSearchSubCategoryList(loginUserId:string,holder: SubCategoryListParameterHolder) {
        
        this.offset = 0;
        
        this.loading.value = true;

        const responseData = await PsApiService.searchSubCategoryList<SubCategory>(new SubCategory(), loginUserId, this.limit, this.offset, holder.toMap());
        
        this.updateSubCategoryList(responseData);

        this.loading.value = false;
        
    }
    
}

export const subCategoryProviderSymbol = Symbol('SubCategoryProvider')
export const createSubCategoryProviderState = () => {
  return reactive(new SubCategoryProvider())
}

export const useSubCategoryProviderState = () => inject(subCategoryProviderSymbol) as SubCategoryProvider
export const provideSubCategoryProviderState = () => provide(
    subCategoryProviderSymbol,
    createSubCategoryProviderState()
)