import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ApiStatus from '@/object/ApiStatus';
import Rating from '@/object/Rating';
import RatingHolder from '@/object/holder/RatingHolder';

export class RatingProvider extends PsProvider {

    rating = reactive<PsResource<Rating>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";

 

    async postRating(holder:RatingHolder): Promise<PsResource<ApiStatus>> {

        this.loading.value = true;

        const status = await PsApiService.postRating<ApiStatus>(new ApiStatus(),holder.toMap());
        
        this.loading.value = false;
        return status;


    }

}

export const ratingProvider = Symbol('RatingProvider')
export const createRatingProviderState = () => {
    return reactive(new RatingProvider())
}

export const useRatingProviderState = () => inject(ratingProvider) as RatingProvider
export const provideRatingProviderState = () => provide(
    ratingProvider,
    createRatingProviderState()
)