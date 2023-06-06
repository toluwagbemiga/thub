
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ChatHistory from '@/object/ChatHistory';
import ProductParameterHolder from '@/object/holder/ProductParameterHolder';
import MarkAsSoldParameterHolder from '@/object/holder/MarkAsSoldParameterHolder';
import GetChatHistoryParameterHolder from '@/object/holder/GetChatHistoryParameterHolder';
import SyncChatHistoryParameterHolder from '@/object/holder/SyncChatHistoryParameterHolder';


export class GetChatHistoryProvider extends PsProvider {

    chatHistory = reactive<PsResource<ChatHistory>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    private updateChatHistory(responseData: PsResource<ChatHistory>) {

        this.chatHistory = responseData;

    }

    async loadChatHistory(holder: GetChatHistoryParameterHolder) {

        this.loading.value = true;

        const returnData = await PsApiService.getChatHistory<ChatHistory>(new ChatHistory(), holder.toMap());
        
        this.updateChatHistory(returnData);

        this.loading.value = false;

    }

    async postChatHistory( itemId, buyerUserId, sellerUserId, type ,isOnline, message) {
        const holder = new SyncChatHistoryParameterHolder();
        holder.itemId = itemId;
        holder.buyerUserId = buyerUserId;
        holder.sellerUserId = sellerUserId;
        holder.type = type;
        holder.isUserOnline = isOnline;
        holder.message = message;

        const data = await PsApiService.syncChatHistory<ChatHistory>(new ChatHistory(), holder.toMap());
       
    }


    async postAcceptedOffer(loginUserId: string,holder: ProductParameterHolder) {

        this.loading.value = true;

        await PsApiService.acceptedOffer<ChatHistory>(new ChatHistory(),loginUserId, holder.toMap());

        this.loading.value = false;

    }


    async postRejectedOffer(loginUserId: string,holder: ProductParameterHolder) {

        this.loading.value = true;

        await PsApiService.rejectedOffer<ChatHistory>(new ChatHistory(),loginUserId, holder.toMap());

        this.loading.value = false;

    }

    async makeMarkAsSold(loginUserId: string, itemId: string, buyerUserId: string, sellerUserId: string) : Promise<PsResource<ChatHistory>>{

        const markAsSoldParameterHolder = new MarkAsSoldParameterHolder(); 
        markAsSoldParameterHolder.itemId = itemId.toString();
        markAsSoldParameterHolder.buyerUserId = buyerUserId.toString();
        markAsSoldParameterHolder.sellerUserId = sellerUserId.toString();

        this.loading.value = true;

        const returnData = await PsApiService.makeMarkAsSold<ChatHistory>(new ChatHistory(),loginUserId, markAsSoldParameterHolder.toMap());

        this.loading.value = false;

        return returnData;

    }

}

export const getChatHistoryProviderSymbol = Symbol('GetChatHistoryProvider')
export const createGetChatHistoryProviderState = () => {
    return reactive(new GetChatHistoryProvider())
}

export const useGetChatHistoryProviderState = () => inject(getChatHistoryProviderSymbol) as GetChatHistoryProvider
export const provideGetChatHistoryProviderState = () => provide(
    getChatHistoryProviderSymbol,
    createGetChatHistoryProviderState()
)