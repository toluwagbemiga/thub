
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import UserLogin from '@/object/UserLogin';
import ProductParameterHolder from '@/object/holder/ProductParameterHolder';

export class UserLoginLoginProvider extends PsProvider {

    userList = reactive<PsResource<UserLogin>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;


    async getMyUserData(holder: ProductParameterHolder) {

        this.loading.value = true;

        const responseData = await PsApiService.getUserDetail<UserLogin>(new UserLogin(),holder.toMap());

        this.loading.value = false;

    }

    async postDeleteUser(holder:ProductParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.postDeleteUser<UserLogin>(new UserLogin(),holder.toMap);


        this.loading.value = false;

    }

}

export const userLoginProviderSymbol = Symbol('UserLoginLoginProvider')
export const createUserLoginLoginProviderState = () => {
    return reactive(new UserLoginLoginProvider())
}

export const useUserLoginLoginProviderState = () => inject(userLoginProviderSymbol) as UserLoginLoginProvider
export const provideUserLoginLoginProviderState = () => provide(
   userLoginProviderSymbol,
    createUserLoginLoginProviderState()
)