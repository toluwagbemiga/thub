import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import ItemType from '@/object/ItemType';
import PsResource from '@/api/common/PsResource';

export class ItemTypeProvider extends PsProvider {

    itemTypeList = reactive<PsResource<ItemType[]>>(new PsResource());
    item = reactive<PsResource<ItemType>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";
    isNoMoreRecord = reactive({
        value: false
    })

    private updateItemTypeList(responseData: PsResource<ItemType[]>) {

        if (this.itemTypeList != null
            && this.itemTypeList.data != null
            && this.itemTypeList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.itemTypeList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.itemTypeList.code = responseData.code;
            this.itemTypeList.status = responseData.status;
            this.itemTypeList.message = responseData.message;

        } else {

            this.itemTypeList = responseData;


        }

        if (this.itemTypeList != null && this.itemTypeList.data != null) {
            this.offset = this.itemTypeList.data.length;
        }

    }

    async loadItemTypeList() {

        this.loading.value = true;

        const responseData = await PsApiService.getItemTypeList<ItemType>(new ItemType(),  this.limit, this.offset);

        this.updateItemTypeList(responseData);

        this.loading.value = false;


    }


    async resetItemTypeList() {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemTypeList<ItemType>(new ItemType(), this.limit, this.offset);

        this.updateItemTypeList(responseData);

        this.loading.value = false;

    }

}

export const itemTypeProviderSymbol = Symbol('ItemTypeProvider')
export const createItemTypeProviderState = () => {
    return reactive(new ItemTypeProvider())
}

export const useItemTypeProviderState = () => inject(itemTypeProviderSymbol) as ItemTypeProvider
export const provideItemTypeProviderState = () => provide(
    itemTypeProviderSymbol,
    createItemTypeProviderState()
)