
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import Offer from '@/object/Offer';
import ApiStatus from '@/object/ApiStatus';
import MakeOfferParameterHolder from '@/object/holder/MakeOfferParameterHolder';
import IsUserBoughtParameterHolder from '@/object/holder/IsUserBoughtParameterHolder';
import OfferParameterHolder from '@/object/holder/OfferParameterHolder';
import MarkSoldOutItemParameterHolder from '@/object/holder/MarkSoldOutItemParameterHolder'

export class OfferProvider extends PsProvider {

    offerList = reactive<PsResource<Offer[]>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;
    isNoMoreRecord = reactive({
        value: false
    })

    async makeOffer (loginUserId, holder: MakeOfferParameterHolder){
        this.loading.value = true;

        
        const returnData = await PsApiService.makeOffer<Offer>(new Offer(),loginUserId, holder.toMap());

        this.loading.value = false;
        return returnData;
    }
    async acceptOffer (loginUserId, holder: MakeOfferParameterHolder){
        this.loading.value = true;

        
        const returnData = await PsApiService.acceptedOffer<Offer>(new Offer(),loginUserId, holder.toMap());

        this.loading.value = false;
        return returnData;
    }
    async isUserBought (loginUserId, holder: IsUserBoughtParameterHolder){
        this.loading.value = true;
        
        const returnData = await PsApiService.isUsetBought<ApiStatus>(new ApiStatus(),loginUserId, holder.toMap());

        this.loading.value = false;
        return returnData;
    }
    async markAsSold (loginUserId, holder: IsUserBoughtParameterHolder){
        this.loading.value = true;
        
        const returnData = await PsApiService.makeMarkAsSold<ApiStatus>(new ApiStatus(),loginUserId, holder.toMap());

        this.loading.value = false;
        return returnData;
    }
    async markAsSoldFromDetail (loginUserId, holder: MarkSoldOutItemParameterHolder){

        console.log(loginUserId);
        this.loading.value = true;
        
        const returnData = await PsApiService.markSoldOutItem<ApiStatus>(new ApiStatus(),loginUserId, holder.toMap());

        this.loading.value = false;
        return returnData;
    }

    private updateOfferList(responseData: PsResource<Offer[]>) {

        if (this.offerList != null
            && this.offerList.data != null
            && this.offerList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.offerList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.offerList.code = responseData.code;
            this.offerList.status = responseData.status;
            this.offerList.message = responseData.message;

        } else {

            this.offerList = responseData;


        }

        if (this.offerList != null && this.offerList.data != null) {
            this.offset = this.offerList.data.length;
        }

    }

    async loadOfferList(holder: OfferParameterHolder) {

        this.loading.value = true;

        const responseData = await PsApiService.getOfferList<Offer>(new Offer(), holder.toMap());

        this.updateOfferList(responseData);

        this.loading.value = false;

    }

    async resetOfferList(holder: OfferParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getOfferList<Offer>(new Offer(), holder.toMap());

        this.updateOfferList(responseData);

        this.loading.value = false;

    }

}

export const offerProviderSymbol = Symbol('OfferProvider')
export const createOfferProviderState = () => {
    return reactive(new OfferProvider())
}

export const useOfferProviderState = () => inject(offerProviderSymbol) as OfferProvider
export const provideOfferProviderState = () => provide(
    offerProviderSymbol,
    createOfferProviderState()
)