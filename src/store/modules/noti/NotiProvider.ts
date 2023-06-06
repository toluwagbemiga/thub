
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import Noti from '@/object/Noti';
import NotiParameterHolder from '@/object/holder/NotiParameterHolder';
import NotiRegisterHolder from '@/object/holder/NotiRegisterHolder';
import NotiUnRegisterHolder from '@/object/holder/NotiUnRegisterHolder';
import ChatNotiPrameterHolder from '@/object/holder/ChatNotiParameterHolder';
import ApiStatus from '@/object/ApiStatus';

export class NotiProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    notiList = reactive<PsResource<Noti[]>>(new PsResource());
    noti = reactive<PsResource<Noti>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    private updateNotiList(responseData: PsResource<Noti[]>) {

        if (this.notiList != null
            && this.notiList.data != null
            && this.notiList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.notiList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.notiList.code = responseData.code;
            this.notiList.status = responseData.status;
            this.notiList.message = responseData.message;

        } else {

            this.notiList = responseData;


        }

        if (this.notiList != null && this.notiList.data != null) {
            this.offset = this.notiList.data.length;
        }

    }

    async loadNotiList(holder: NotiParameterHolder) {
        this.loading.value = true;

        const responseData = await PsApiService.getNotificationList<Noti>(new Noti(), this.limit, this.offset, holder.toMap());

        this.updateNotiList(responseData);

        this.loading.value = false;

    }

    async resetNotiList(holder: NotiParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getNotificationList<Noti>(new Noti(), this.limit, this.offset, holder.toMap());

        this.updateNotiList(responseData);

        this.loading.value = false;

    }

    async postNoti(holder: NotiParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.postNoti<Noti>(new Noti(), holder.toMap());

        this.loading.value = false;

    }

    async loadNoti(notificationId: string, loginUserId: string) {

        this.loading.value = true;
        
        this.noti = await PsApiService.getNotiDetail<Noti>(new Noti(), notificationId, loginUserId, this.limit, this.offset);

        this.loading.value = false;


    }

    async postChatNoti(itemId, sellerUserId, buyerUserId, message, type) {
        const holder = new ChatNotiPrameterHolder();
        holder.itemId = itemId;
        holder.sellerUserId = sellerUserId;
        holder.buyerUserId = buyerUserId;
        holder.message = message;
        holder.type = type;

        const returnData = await PsApiService.postChatNoti<ApiStatus>(new ApiStatus(), holder.toMap());
    }

    async registerNotiToken(holder: NotiRegisterHolder) {
       
        this.loading.value = true;

        const status = await PsApiService.rawRegisterNotiToken<ApiStatus>( new ApiStatus(), holder.toMap());

        // alert(JSON.stringify(status));
       
        this.loading.value = false;

        return status;


    }

    async unRegisterNotiToken(holder: NotiUnRegisterHolder) {

        this.loading.value = true;

        const status = await PsApiService.rawUnRegisterNotiToken<ApiStatus>( new ApiStatus(), holder.toMap());


        this.loading.value = false;

        return status;


    }

}

export const notiProviderSymbol = Symbol('NotiProvider')
export const createNotiProviderState = () => {
    return reactive(new NotiProvider())
}

export const useNotiProviderState = () => inject(notiProviderSymbol) as NotiProvider
export const provideNotiProviderState = () => provide(
    notiProviderSymbol,
    createNotiProviderState()
)