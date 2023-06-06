
import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import ChatHistory from '@/object/ChatHistory';
import ResetUnReadMessageHolder from '@/object/holder/ResetUnReadMessageHolder';
import SyncChatHistoryParameterHolder from '@/object/holder/SyncChatHistoryParameterHolder';
import ChatHistoryParameterHolder from '@/object/holder/ChatHistoryParameterHolder';

export class ChatHistoryListProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    chatHistoryList = reactive<PsResource<ChatHistory[]>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    async postChatHistory( itemId, buyerUserId, sellerUserId, type ) {
        const holder = new SyncChatHistoryParameterHolder();
        holder.itemId = itemId;
        holder.buyerUserId = buyerUserId;
        holder.sellerUserId = sellerUserId;
        holder.type = type;

        const data = await PsApiService.syncChatHistory<ChatHistory>(new ChatHistory(), holder.toMap());

    }

    private updateChatHistoryList(responseData: PsResource<ChatHistory[]>) {

        if (this.chatHistoryList != null
            && this.chatHistoryList.data != null
            && this.chatHistoryList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.chatHistoryList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.chatHistoryList.code = responseData.code;
            this.chatHistoryList.status = responseData.status;
            this.chatHistoryList.message = responseData.message;

        } else {

            this.chatHistoryList = responseData;


        }

        if (this.chatHistoryList != null && this.chatHistoryList.data != null) {
            this.offset = this.chatHistoryList.data.length;
        }

    }

    async loadChatHistoryList(holder: ChatHistoryParameterHolder) {
      
        this.loading.value = true;

        const responseData = await PsApiService.getChatHistoryList<ChatHistory>(new ChatHistory(),this.limit, this.offset, holder.toMap());
        this.updateChatHistoryList(responseData)

        this.loading.value = false;

    }

    async resetChatHistoryList(holder: ChatHistoryParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getChatHistoryList<ChatHistory>(new ChatHistory(),this.limit, this.offset, holder.toMap());

        this.updateChatHistoryList(responseData)

        this.loading.value = false;

    }

    async resetUnreadMessageCount(holder: ResetUnReadMessageHolder) {

        this.loading.value = true;

        await PsApiService.resetUnreadMessageCount<ChatHistory>(new ChatHistory(), holder.toMap());


        this.loading.value = false;

    }

}

export const chatHistoryListProviderSymbol = Symbol('ChatHistoryListProvider')
export const createChatHistoryListProviderState = () => {
    return reactive(new ChatHistoryListProvider())
}

export const useChatHistoryListProviderState = () => inject(chatHistoryListProviderSymbol) as ChatHistoryListProvider
export const provideChatHistoryListProviderState = () => provide(
    chatHistoryListProviderSymbol,
    createChatHistoryListProviderState()
)