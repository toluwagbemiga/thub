
import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ItemLocation from '@/object/ItemLocation';
import LocationParameterHolder from '@/object/holder/LocationParameterHolder';

export class ItemLocationProvider extends PsProvider {

    itemLocationBackupList = reactive<PsResource<ItemLocation[]>>(new PsResource());
    itemLocationList = reactive<PsResource<ItemLocation[]>>(new PsResource());
    filterKeyword : string = '';
    public loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;
    isNoMoreRecord = reactive({
        value: false
    })

    filterKeywordUpate(keyword: string, loginUserId: string,  holder: LocationParameterHolder) {
        holder.keyword = keyword;
        this.resetItemLocationList(loginUserId, holder);
    }

    // For Offline ( But need to pull all list at once)
    filterKeywordUpateOffline(keyword: string) {
        this.filterKeyword = keyword;

        // Keyword length is 0
        //  Restore all from backup
        //  Delete backup
        if(keyword == '') {
            if(this.itemLocationBackupList.data != null
                && this.itemLocationBackupList.data.length > 0 ) {
                    this.itemLocationList.data = [];
                    Array.prototype.push.apply(this.itemLocationList.data, this.itemLocationBackupList.data);
                }
            this.itemLocationBackupList.data = [];
        }

        // Keyword lenght == 1, 
        //  Backup item list
        else if(keyword.length == 1) {
            if(this.itemLocationBackupList.data == null 
                || this.itemLocationBackupList.data.length == 0) {
                this.itemLocationBackupList.data = [];
                Array.prototype.push.apply(this.itemLocationBackupList.data, this.itemLocationList.data);
                }
        }else {
        
            this.itemLocationList.data = [];
            Array.prototype.push.apply(this.itemLocationList.data, this.itemLocationBackupList.data);
        }
        const tmp = this.itemLocationList.data.filter( itemLocation => itemLocation.name.toLocaleLowerCase().includes(this.filterKeyword.toLowerCase()));
        this.itemLocationList.data= tmp;
    }

    private updateItemLocationList(responseData: PsResource<ItemLocation[]>) {

        if (this.itemLocationList != null
            && this.itemLocationList.data != null
            && this.itemLocationList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.itemLocationList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.itemLocationList.code = responseData.code;
            this.itemLocationList.status = responseData.status;
            this.itemLocationList.message = responseData.message;

        } else {
            this.itemLocationList = responseData;
        }

        if (this.itemLocationList != null && this.itemLocationList.data != null) {
            this.offset = this.itemLocationList.data.length;

            
            
        }

    }

    async loadItemLocationList(loginUserId: string, holder: LocationParameterHolder) {
        this.loading.value = true;

        const responseData = await PsApiService.getItemLocationList<ItemLocation>(new ItemLocation(), this.limit, this.offset, loginUserId, holder.toMap());

        this.updateItemLocationList(responseData);

        this.loading.value = false;

    }

    async resetItemLocationList(loginUserId: string, holder: LocationParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemLocationList<ItemLocation>(new ItemLocation(), this.limit, this.offset, loginUserId, holder.toMap());

        this.updateItemLocationList(responseData);

        this.loading.value = false;

    }

}

export const itemLocationProviderSymbol = Symbol('ItemLocationProvider')
export const createItemLocationProviderState = () => {
    return reactive(new ItemLocationProvider())
}

export const useItemLocationProviderState = () => inject(itemLocationProviderSymbol) as ItemLocationProvider
export const provideItemLocationProviderState = () => provide(
    itemLocationProviderSymbol,
    createItemLocationProviderState()
)