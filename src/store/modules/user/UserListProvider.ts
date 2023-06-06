
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import User from '@/object/User';
import UserParameterHolder from '@/object/holder/UserParameterHolder';
import UserListParameterHolder from '@/object/holder/UserListParameterHolder';

export class UserListProvider extends PsProvider {
    
    isNoMoreRecord = reactive({
        value: false
    })
    userList = reactive<PsResource<User[]>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id : string = '';
    paramHolder = reactive<UserParameterHolder>(new UserParameterHolder());
    userparamHolder = reactive<UserListParameterHolder>(new UserListParameterHolder());

    private updateUserList(responseData: PsResource<User[]>) {

        if (this.userList != null
            && this.userList.data != null
            && this.userList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.userList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.userList.code = responseData.code;
            this.userList.status = responseData.status;
            this.userList.message = responseData.message;

        } else {

            this.userList = responseData;


        }

        if (this.userList != null && this.userList.data != null) {
            this.offset = this.userList.data.length;
        }

    }

    async loadUserList(holder: UserParameterHolder) {


        this.loading.value = true;

        const responseData = await PsApiService.getUserList<User>(new User(), this.limit, this.offset,holder.toMap());
        

        this.updateUserList(responseData);

        this.loading.value = false;

    }

    async loadUserSearchList(loginUserId :string,holder: UserListParameterHolder) {

        this.offset = 0;
        
        this.loading.value = true;

        const responseData = await PsApiService.getUserSearchList<User>(new User(), this.limit, this.offset, loginUserId, holder.toMap());
        

        this.updateUserList(responseData);

        this.loading.value = false;

    }
    async refleshUserSearchList(loginUserId :string, holder: UserListParameterHolder) {

        this.loading.value = true;
        const tempOffset = 0;
        const tempLimit = this.userList.data.length;
        const responseData = await PsApiService.getUserSearchList<User>(new User(), tempLimit, tempOffset,loginUserId,holder.toMap());
        this.userList = responseData;
        this.loading.value = false;
    }
    async resetUserSearchList(loginUserId :string, holder: UserListParameterHolder) {

        this.offset = 0;
        this.loading.value = true;
        
        const responseData = await PsApiService.getUserSearchList<User>(new User(), this.limit, this.offset,loginUserId, holder.toMap());
        this.updateUserList(responseData);
        this.loading.value = false;
    }

    async resetUserList( holder:UserParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getUserList<User>(new User(), this.limit, this.offset, holder.toMap());

        this.updateUserList(responseData);

        this.loading.value = false;

    }

}

export const userListProviderSymbol = Symbol('UserListProvider')
export const createUserListProviderState = () => {
    return reactive(new UserListProvider())
}

export const useUserListProviderState = () => inject(userListProviderSymbol) as UserListProvider
export const provideUserListProviderState = () => provide(
   userListProviderSymbol,
    createUserListProviderState()
)