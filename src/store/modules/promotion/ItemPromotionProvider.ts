import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ItemPaidHistoryParameterHolder from '@/object/holder/ItemPaidHistoryParameterHolder';
import ItemPaidHistory from '@/object/ItemPaidHistory';

export class ItemPromotionProvider extends PsProvider {

    reportedReportedItemList = reactive<PsResource<ItemPaidHistory>>(new PsResource());
    paiditem = reactive<PsResource<ItemPaidHistory>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";

    async postItemPromotion(holder:ItemPaidHistoryParameterHolder) : Promise<PsResource<ItemPaidHistory>>  {

        this.loading.value = true;

        this.paiditem = await PsApiService.postItemPromotion<ItemPaidHistory>(new ItemPaidHistory(),holder.toMap());
        
        this.loading.value = false;
        
        return this.paiditem;

    }

}

export const itemPromotionProvider = Symbol('ItemPromotionProvider')
export const createItemPromotionProviderState = () => {
    return reactive(new ItemPromotionProvider())
}

export const useItemPromotionProviderState = () => inject(itemPromotionProvider) as ItemPromotionProvider
export const provideItemPromotionProviderState = () => provide(
    itemPromotionProvider,
    createItemPromotionProviderState()
)