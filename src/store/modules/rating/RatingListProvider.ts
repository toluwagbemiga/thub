
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import Rating from '@/object/Rating';
import RatingListHolder from '@/object/holder/RatingListHolder';

export class RatingListProvider extends PsProvider {

    ratingList = reactive<PsResource<Rating[]>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;
    isNoMoreRecord = reactive({
        value: false
    })

    private updateRatingList(responseData: PsResource<Rating[]>) {

        if (this.ratingList != null
            && this.ratingList.data != null
            && this.ratingList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.ratingList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.ratingList.code = responseData.code;
            this.ratingList.status = responseData.status;
            this.ratingList.message = responseData.message;

        } else {

            this.ratingList = responseData;


        }

        if (this.ratingList != null && this.ratingList.data != null) {
            this.offset = this.ratingList.data.length;
        }

    }

    async loadRatingList(holder:RatingListHolder) {

        this.loading.value = true;
        
        const responseData = await PsApiService.getRatingList<Rating>(new Rating(), this.limit, this.offset,holder.toMap());
        this.updateRatingList(responseData);

        this.loading.value = false;

    }

    async resetRatingList(holder:RatingListHolder) {

        this.offset = 0;
        
        this.loading.value = true;

        const responseData = await PsApiService.getRatingList<Rating>(new Rating(), this.limit, this.offset,holder.toMap());
        this.updateRatingList(responseData);

        this.loading.value = false;

    }

}

export const ratingListProvider = Symbol('RatingListProvider')
export const createRatingListProviderState = () => {
    return reactive(new RatingListProvider())
}

export const useRatingListProviderState = () => inject(ratingListProvider) as RatingListProvider
export const provideRatingListProviderState = () => provide(
    ratingListProvider,
    createRatingListProviderState()
)