<template>
    <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 w-mobile sm:w-median lg:w-large mx-auto">
        <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">
            <div class="col-span-4 sm:col-span-8 lg:col-span-12">
                <ps-label class="text-xl sm:text-3xl font-medium"> {{ $t("chat_list__messages") }}</ps-label>
            </div>
            <div class="col-start-0 col-span-4 sm:col-span-2 lg:col-span-3" >
               
                <div class=" ">
                    <div class=" flex flex-row space-x-3.5 sm:space-x-0 space-y-0 sm:space-y-3.5 sm:flex-col" id="sellerbtn" v-if="isSellerFocus" :disabled="true">
                        <ps-button class="w-full" @click="sellerClicked" >
                            <span :class="parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) == 0 ? 'mr-4' : ''">{{ $t("chat_list__from_seller") }}</span>
                            <span v-if="parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) > 0" class="rounded-full h-auto w-3 lg:w-5 float-right bg-primary-500 text-textLight">{{ userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount}}</span>
                        </ps-button>
                        
                        <ps-button class="w-full" theme="dark:bg-secondary-100 dark:text-textLight bg-primary-000 text-primary-400" @click="buyerClicked">
                            <span :class="parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount) == 0 ? 'mr-4' : ''">{{ $t("chat_list__from_buyer") }}</span>
                            <span v-if="parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount) > 0" class="rounded-full h-auto w-3 lg:w-5 float-right bg-primary-500 text-textLight">{{ userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount }}</span>
                        </ps-button>
                    </div>

                    <div class="flex flex-row space-x-3.5 sm:space-x-0 space-y-0 sm:space-y-3.5 sm:flex-col" id="buyerbtn"  v-else :disabled="true">
                        <ps-button class="w-full" theme='dark:bg-secondary-100 dark:text-textLight bg-primary-000 text-primary-400' @click="sellerClicked" >
                            <span :class="parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) == 0 ? 'mr-4' : ''">{{ $t("chat_list__from_seller") }}</span>
                            <span v-if="parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) > 0" class="rounded-full h-auto w-3 lg:w-5 float-right bg-primary-500 text-textLight">{{ userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount}}</span>
                        </ps-button>
                        
                        <ps-button class="w-full" @click="buyerClicked">
                            <span :class="parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount) == 0 ? 'mr-4' : ''">{{ $t("chat_list__from_buyer") }}</span>
                            <span v-if="parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount) > 0" class="rounded-full h-auto w-3 lg:w-5 float-right bg-primary-500 text-textLight">{{ userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount }}</span>
                        </ps-button>
                    </div>
                </div>
                 <!-- google adsense desktop view -->
                <ps-ad-sense></ps-ad-sense>
               

            </div>

            <div class="col-span-4 sm:col-span-6 lg:col-span-9">
                <div class="col-span-4 sm:col-span-6 lg:col-span-9 mb-2" v-if="isSellerFocus">
                    <ps-label class="text-sm sm:text-xl font-medium" > {{ $t("chat_list__messages_from_seller") }}</ps-label>
                </div>
                <div class="col-span-4 sm:col-span-6 lg:col-span-9 mb-2" v-else>
                    <ps-label class="text-sm sm:text-xl font-medium">{{ $t("chat_list__messages_from_buyer") }}</ps-label>
                </div>
                <div v-if="ps_loading == true">
                    <div id="seller" class="w-full flex flex-col bg-primary-000 dark:bg-primaryDark-black lg:p-4 p-2 sm:p-3 rounded-2xl" >
                        <div class='w-full ' >
                            <div class=" flex flex-col">
                                <!-- Column -->
                                <div class="w-full mt-2" v-for="index in 3" :key="index">
                                    <chat-skeletor-item />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Seller Chat horizontal -->
                <div id="seller" class="flex flex-col mb-16" v-if="isSellerFocus && ps_loading == false">
                    <div class="flex flex-row">
                        <div v-if="chathistorylistProvider.chatHistoryList.data == null "
                        class="w-full flex flex-col bg-primary-000 dark:bg-primaryDark-black lg:p-4 p-2 sm:p-3 rounded-2xl">
                        <ps-icon name="chatalt" textColor="text-secondary-400 dark:text-secondaryDark-grey" class='mt-2 w-full mx-auto' w="80" h="80" />  
                        <ps-label-caption-3 class="text-center mb-2" >{{ $t("chat_list__no_message_from_seller") }} </ps-label-caption-3>
                        
                        </div>
                        <div v-else class='w-full flex flex-col bg-primary-000 dark:bg-primaryDark-black lg:p-4 p-2 sm:p-3 rounded-2xl' >
                            <div class="flex flex-wrap ">
                                <!-- Column -->
                                <div class=" mt-2 w-full" v-for="chathistory in chathistorylistProvider.chatHistoryList.data" :key="chathistory.id">
                                    <ps-route-link :to="{
                                        name : 'chat', 
                                        query: { 
                                            buyer_user_id : chathistory.buyerUserId,
                                            seller_user_id : chathistory.sellerUserId,
                                            item_name : chathistory.item.title ,
                                            item_id : chathistory.itemId,
                                            item_image_name : chathistory.item.defaultPhoto.imgPath,
                                            item_price : getPrice(chathistory.item),
                                            currency : chathistory.item.itemCurrency.currencySymbol,
                                            condition : chathistory.item.conditionOfItem.name,
                                            chat_flag : PsConst.CHAT_FROM_SELLER.toString(),
                                            is_sold_out : chathistory.item.isSoldOut

                                        }
                                    }">
                                    <chat-horizontal-item  :chathistory="chathistory" />
                                    </ps-route-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-end justify-end">
                        <ps-button v-if="chathistorylistProvider.loading.value == false" class="w-60 mt-4 " @click="loadMore" :class="chathistorylistProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("list__load_more") }} </ps-button>
                        <ps-button v-else class="w-60 mt-4" :disabled="true"> {{ $t("list__loading") }} </ps-button>
                    </div>
                </div>
                <!-- End Seller Chat horizontal -->

                <!-- Buyer Chat horizontal -->
                <div id="buyer" class="flex flex-col mb-16 " v-else-if="ps_loading == false">
                    <div class="flex flex-row">
                        <div v-if="chatbuyerhistorylistProvider.chatHistoryList.data == null "
                        class="w-full flex flex-col bg-primary-000 dark:bg-primaryDark-black lg:p-4 p-2 sm:p-3 rounded-2xl">
                        <ps-icon name="chatalt" textColor="text-secondary-400 dark:text-secondaryDark-grey" class='mt-2 w-full mx-auto' w="80" h="80" />  
                        <ps-label-caption-3 class="text-center mb-2" >{{ $t("chat_list__no_message_from_buyer") }} </ps-label-caption-3>
                        
                        </div>
                        <div v-else class='w-full ' >
                            <div class="w-full flex flex-col bg-primary-000 dark:bg-primaryDark-black lg:p-4 p-2 sm:p-3 rounded-2xl ">
                                <!-- Column -->
                                <div class="w-full mt-2" v-for="chathistory in chatbuyerhistorylistProvider.chatHistoryList.data" :key="chathistory.id">
                                <ps-route-link :to="{
                                        name : 'chat', 
                                        query: { 
                                            buyer_user_id : chathistory.buyerUserId,
                                            seller_user_id : chathistory.sellerUserId,
                                            item_name : chathistory.item.title ,
                                            item_id : chathistory.itemId,
                                            item_image_name : chathistory.item.defaultPhoto.imgPath,
                                            item_price : getPrice(chathistory.item),
                                            currency : chathistory.item.itemCurrency.currencySymbol,
                                            condition : chathistory.item.conditionOfItem.name,
                                            chat_flag : PsConst.CHAT_FROM_BUYER.toString(),
                                            is_sold_out : chathistory.item.isSoldOut,

                                        }
                                    }">
                                <chat-buyer-horizontal-item  :chathistory="chathistory" />
                                    </ps-route-link>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-end justify-end">
                        <ps-button v-if="chatbuyerhistorylistProvider.loading.value == false" class="w-60 mt-4 " @click="loadMoreBuyer" :class="chatbuyerhistorylistProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("list__load_more") }} </ps-button>
                        <ps-button v-else class="w-60 mt-4" :disabled="true"> {{ $t("list__loading") }} </ps-button>
                    </div>
                </div>
                <!-- End Buyer Chat horizontal -->
               
            </div>
        </div>
    </div>
</template>


<script lang="ts">

import { ref } from 'vue';
import router from '@/router';
import PsIcon from '@/components/core/icons/PsIcon.vue'
import PsLabelCaption3 from '@/components/core/label/PsLabelCaption3.vue'
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

// Providers
import { createChatHistoryListProviderState, useChatHistoryListProviderState } from "@/store/modules/chat/ChatHistoryListProvider";
import { createUserUnReadMessageProviderState } from "@/store/modules/chat/UserUnReadMessageProvider";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
// Holders
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import ChatHistoryParameterHolder from '@/object/holder/ChatHistoryParameterHolder';
import UserUnReadMessageParameterHolder from '@/object/holder/UserUnReadMessageParameterHolder';

import ChatHorizontalItem from "@/components/modules/chat/ChatHorizontalItem.vue";
import ChatBuyerHorizontalItem from "@/components/modules/chat/ChatBuyerHorizontalItem.vue";
import ChatSkeletorItem from "@/components/modules/chat/ChatSkeletorItem.vue";
import PsConst from '@/object/constant/ps_constants';

export default {
    name : "ChatListView",
    components : {
        PsButton,
        PsLabel,
        PsLabelCaption3,
        PsIcon,
        ChatHorizontalItem,
        ChatBuyerHorizontalItem,
        ChatSkeletorItem,
        PsRouteLink,
        PsAdSense
    },
    setup () {
        
        // Inject Chat Provider
        const psValueHolder = PsValueProvider.psValueHolder;
        const chathistorylistProvider = useChatHistoryListProviderState(); 
        const chatbuyerhistorylistProvider = createChatHistoryListProviderState();
        const userunreadmsgProvider = createUserUnReadMessageProviderState();
        const loginUserId = psValueHolder.getLoginUserId();
        if(loginUserId == null || loginUserId == '' || loginUserId == PsConst.NO_LOGIN_USER) {
            router.push({ name : "login"});
        }
        const holder = new ChatHistoryParameterHolder().resetParameterHolder();
        const userUnreadHolder = new UserUnReadMessageParameterHolder();
        const ps_loading = ref(true);
        const isSellerFocus = ref(true);
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);

        //load Chat List
        holder.userId = loginUserId;
        holder.returnType = PsConst.CHAT_TYPE_SELLER;

        userUnreadHolder.userId = loginUserId;
        userunreadmsgProvider.postUserUnreadMessageCount(userUnreadHolder);
        loadSellerList();
        async function loadSellerList(){
            await chathistorylistProvider.resetChatHistoryList(holder);
            
            ps_loading.value = false;
        }
        
        async function sellerClicked() {
           
            isSellerFocus.value = true;
            ps_loading.value = true ;
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_SELLER;
            await chathistorylistProvider.resetChatHistoryList(holder);
            await userunreadmsgProvider.postUserUnreadMessageCount(userUnreadHolder);
           
            ps_loading.value = false;
            
        }

        async function buyerClicked() {
            isSellerFocus.value = false;
            ps_loading.value = true ;
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_BUYER;
            await chatbuyerhistorylistProvider.resetChatHistoryList(holder);
            await userunreadmsgProvider.postUserUnreadMessageCount(userUnreadHolder);
          
            ps_loading.value = false ;
           
        }
        async function loadMore() {  
            // ps_loading.value = true ;
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_SELLER;
            await chathistorylistProvider.loadChatHistoryList(holder);
           
            // ps_loading.value = false;
        }
        async function loadMoreBuyer() {  
            holder.userId = loginUserId;
            holder.returnType = PsConst.CHAT_TYPE_BUYER;
            await chatbuyerhistorylistProvider.loadChatHistoryList(holder);
        }
        function getPrice(value){
            if(value.discountRate!='0' && appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE){
                return parseFloat(value.price)-(parseFloat(value.price)*(parseFloat(value.discountRate)/100));
            }else{
                return value.price;
            }
        }

        return {
            getPrice,
            chathistorylistProvider,
            chatbuyerhistorylistProvider,
            userunreadmsgProvider,
            sellerClicked,
            buyerClicked,
            ps_loading,
            isSellerFocus,
            PsConst,
            loadMore,
            loadMoreBuyer,
            appInfoProvider
        }
    }
}
</script>