
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import User from '@/object/User';
import UserParameterHolder from '@/object/holder/UserParameterHolder';
import UserFollowHolder from '@/object/holder/UserFollowHolder';
import ApiStatus from '@/object/ApiStatus';
import UserBlockParameterHolder from '@/object/holder/UserBlockParameterHolder';

export class OtherUserProvider extends PsProvider {
    
    user = reactive<PsResource<User>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    id : string = '';
    paramHolder = reactive<UserParameterHolder>(new UserParameterHolder());

    private updateUser(responseData: PsResource<User>) {

        this.user = responseData;

    }

    async loadUser(holder: UserParameterHolder) {


        this.loading.value = true;

        const responseData = await PsApiService.getOtherUser<User>(new User(), this.limit, this.offset,holder.toMap());
  
        this.updateUser(responseData);

        this.loading.value = false;

    }

    async postUserFollow(holder: UserFollowHolder) {

        this.loading.value = true;

        this.user = await PsApiService.postUserFollow<User>(new User(), holder.toMap());

        this.loading.value = false;

    }

    async resetUser(holder:UserParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getOtherUser<User>(new User(), this.limit, this.offset,holder.toMap());

        this.updateUser(responseData);

        this.loading.value = false;

    }
    async blockUser(holder: UserBlockParameterHolder) {

        this.loading.value = true;

        const status = await PsApiService.blockUser<ApiStatus>( new ApiStatus(), holder.toMap());

        this.loading.value = false;

        return status;

    }
    async postUnBlockUser(holder: UserBlockParameterHolder) {

        this.loading.value = true;

        const status = await PsApiService.postUnBlockUser<ApiStatus>( new ApiStatus(), holder.toMap());

        this.loading.value = false;

        return status;
    }

}

export const otherUserProviderSymbol = Symbol('OtherUserProvider')
export const createOtherUserProviderState = () => {
    return reactive(new OtherUserProvider())
}

export const useOtherUserProviderState = () => inject(otherUserProviderSymbol) as OtherUserProvider
export const provideOtherUserProviderState = () => provide(
    otherUserProviderSymbol,
    createOtherUserProviderState()
)