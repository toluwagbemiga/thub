import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import ItemLocationTownship from '@/object/ItemLocationTownship';
import LocationTownshipParameterHolder from '@/object/holder/LocationTownshipParameterHolder';
import PsResource from '@/api/common/PsResource';

export class ItemLocationTownshipProvider extends PsProvider {
    
    locationTownshipList = reactive<PsResource<ItemLocationTownship[]>>(new PsResource());
    locationId = '';
    loading = reactive({
        value : false
    });

    limit: Number = 10;
    offset: Number = 0;
    isNoMoreRecord = reactive({
        value: false
    })
    
    private updateItemLocationTownshipList(responseData : PsResource<ItemLocationTownship[]>) {
        
        if(this.locationTownshipList != null 
            && this.locationTownshipList.data != null 
            && this.locationTownshipList.data.length > 0
            && this.offset != 0) {

            if(responseData.data != null && responseData.data.length > 0) {
                this.locationTownshipList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.locationTownshipList.code = responseData.code;
            this.locationTownshipList.status = responseData.status;
            this.locationTownshipList.message = responseData.message;            

        }else {
            
            this.locationTownshipList = responseData;
            
        }

        if(this.locationTownshipList != null && this.locationTownshipList.data != null ) {
            this.offset = this.locationTownshipList.data.length;
        }

    }

    filtersubLocationUpdate(loginUserId: string, holder: LocationTownshipParameterHolder) {
        this.resetLocationTownshipList(loginUserId, holder);
    }

    async resetLocationTownshipList(loginUserId: string, holder: LocationTownshipParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getItemSubLocationList<ItemLocationTownship>(new ItemLocationTownship(), this.limit, this.offset, loginUserId, holder.toMap());

        this.updateItemLocationTownshipList(responseData);

        this.loading.value = false;

    }

    async loadItemLocationTownshipList(locationId: string) {
        
        if(this.locationId != locationId) {
            this.locationTownshipList = reactive<PsResource<ItemLocationTownship[]>>(new PsResource());
            this.offset = 0;
            this.isNoMoreRecord.value = false;
        }

        this.locationId = locationId.toString();

        this.loading.value = true;

        const responseData = await PsApiService.getLocationTownshipList<ItemLocationTownship>(new ItemLocationTownship(),  this.limit, this.offset, this.locationId);
        
        this.loading.value = false;

        this.updateItemLocationTownshipList(responseData);

    }

    async resetItemLocationTownshipList(locationId: string) {
        
        if(this.locationId != locationId) {
            this.locationTownshipList = new PsResource();
        }

        this.offset = 0;
        
        this.locationId = locationId.toString();

        this.loading.value = true;

        const responseData = await PsApiService.getLocationTownshipList<ItemLocationTownship>(new ItemLocationTownship(), this.limit, this.offset, this.locationId);
        
        this.updateItemLocationTownshipList(responseData);

        this.loading.value = false;
        
    }
    
}

export const itemLocationTownshipProviderSymbol = Symbol('ItemLocationTownshipProvider')
export const createItemLocationTownshipProviderState = () => {
  return reactive(new ItemLocationTownshipProvider())
}

export const useItemLocationTownshipProviderState = () => inject(itemLocationTownshipProviderSymbol) as ItemLocationTownshipProvider
export const provideItemLocationTownshipProviderState = () => provide(
    itemLocationTownshipProviderSymbol,
    createItemLocationTownshipProviderState()
)