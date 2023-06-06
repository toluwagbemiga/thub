
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import BlockedUser from '@/object/BlockedUser';

export class BlockUserProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    blockUserList = reactive<PsResource<BlockedUser[]>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    private updateBlockedUserList(responseData: PsResource<BlockedUser[]>) {

        if (this.blockUserList != null
            && this.blockUserList.data != null
            && this.blockUserList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null  && responseData.data.length > 0) {
                this.blockUserList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.blockUserList.code = responseData.code;
            this.blockUserList.status = responseData.status;
            this.blockUserList.message = responseData.message;

        } else {

            this.blockUserList = responseData;


        }

        if (this.blockUserList != null && this.blockUserList.data != null) {
            this.offset = this.blockUserList.data.length;
        }

    }

    async loadBlockedUserList(loginUserId: string) {

        this.loading.value = true;

        const responseData = await PsApiService.getBlockedUserList<BlockedUser>(new BlockedUser(),loginUserId, this.limit, this.offset);

        this.updateBlockedUserList(responseData);

        this.loading.value = false;

    }

    async resetBlockedUserList(loginUserId: string) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getBlockedUserList<BlockedUser>(new BlockedUser(),loginUserId, this.limit, this.offset);

        this.updateBlockedUserList(responseData);

        this.loading.value = false;

    }

}

export const blockUserProviderSymbol = Symbol('BlockUserProvider')
export const createBlockUserProviderState = () => {
    return reactive(new BlockUserProvider())
}

export const useBlockUserProviderState = () => inject(blockUserProviderSymbol) as BlockUserProvider
export const provideBlockUserProviderState = () => provide(
   blockUserProviderSymbol,
    createBlockUserProviderState()
)