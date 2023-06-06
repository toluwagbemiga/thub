import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import CategoryListParameterHolder from '@/object/holder/CategoryListParameterHolder';
import PsApiService from '@/api/PsApiService';
import Category from '@/object/Category';
import PsResource from '@/api/common/PsResource';

export class CategoryProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    itemList = reactive<PsResource<Category[]>>(new PsResource());
    item = reactive<PsResource<Category>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    id: string = "";
    paramHolder = reactive<CategoryListParameterHolder>(new CategoryListParameterHolder().CategoryListParameterHolder());

    private updateCategoryList(responseData: PsResource<Category[]>) {

        if (this.itemList != null
            && this.itemList.data != null
            && this.itemList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.itemList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.itemList.code = responseData.code;
            this.itemList.status = responseData.status;
            this.itemList.message = responseData.message;

        } else {

            this.itemList = responseData;

        }

        if (this.itemList != null && this.itemList.data != null) {
            this.offset = this.itemList.data.length;
        }

    }

    async loadItemList(loginUserId:string, holder: CategoryListParameterHolder) {

        this.loading.value = true;
       
        const responseData = await PsApiService.getCategoryList<Category>(new Category(), this.limit, this.offset, loginUserId, holder.toMap());
       
        this.updateCategoryList(responseData);

        this.loading.value = false;


    }

    async resetCategoryList(loginUserId:string,holder: CategoryListParameterHolder) {

        this.offset = 0;

        this.loading.value = true;
        console.log(this.offset);
        const responseData = await PsApiService.getCategoryList<Category>(new Category(), this.limit, this.offset, loginUserId, holder.toMap());
        // console.log(responseData);
        this.updateCategoryList(responseData);

        this.loading.value = false;

    }

}

export const categoryProviderSymbol = Symbol('CategoryProvider')
export const createCategoryProviderState = () => {
    return reactive(new CategoryProvider())
}

export const useCategoryProviderState = () => inject(categoryProviderSymbol) as CategoryProvider
export const provideCategoryProviderState = () => provide(
    categoryProviderSymbol,
    createCategoryProviderState() 
)