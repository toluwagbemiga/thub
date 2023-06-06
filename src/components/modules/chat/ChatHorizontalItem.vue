<template>
    <div class="cursor-pointer w-full" v-on:click="onClick != null ? onClick(chathistory) : null">
        
        <!-- Pscard -->
        <ps-card class="h-22 sm:h-24  " :enabledHover="true">
            <div class="flex flex-col bg-background dark:bg-backgroundDark p-2 w-full rounded-2xl">
            <div class="flex flex-row items-center w-full justify-end " >
                <div class="flex-grow w-full justify-start flex flex-row">
                    <div class=" lg:px-3 py-3 sm:px-2 px-1">
                        <img alt="Placeholder" width="100px" height="100px" class="rounded-full bg-transparent lg:w-14 lg:h-14 w-11 h-11  flex object-cover" :src="chathistorylistProvider.imageUrl(chathistory ? chathistory.seller.userProfilePhoto : '',2)" @error="chathistorylistProvider.defaultProfileImage" >
                    </div>
                    <div class="flex flex-col lg:ms-2 ms-1 my-auto">
                        <div class=" flex mt-1"> 
                            <ps-label class="font-medium text-sm lg:text-base"> {{chathistory ? chathistory.seller.userName : ''}} </ps-label>
                            <ps-icon v-if="chathistory && chathistory.buyer.isVerifybluemark == '1' " name="check" w="14" h="14" class="text-primary-500 dark:text-primaryDark-accent" />
                        </div>

                        <div class=" flex flex-row mt-1"> 
                            <ps-label class="font-medium text-xs lg:text-sm"> {{chathistory ? chathistory.item.title : ''}} </ps-label>
                            <ps-label class="lg:ms-2 sm:ms-1 ms-0.5 font-light text-xxs lg:text-xs" textColor="text-primary-500 dark:text-primaryDark-accent"> {{chathistory ? chathistory.item.conditionOfItem.name : ''}} </ps-label>                        
                        </div>
                        <div class=" flex flex-row "> 
                            <div v-if="chathistory && chathistory.item.discountRate!='0' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.discountRate== PsConst.ONE" class="flex flex-col  ">  
                                <div class="flex flex-row">
                                    <ps-label class="line-through font-medium text-xxs lg:text-xs" > {{ chathistory ? chathistory.item.itemCurrency.currencySymbol : '' }} {{ formatPrice(chathistory ? chathistory.item.price : '') }} </ps-label>
                                    <ps-label class=" ps-1 font-medium text-xxs lg:text-xs" > {{ ' - '+parseFloat(chathistory.item.discountRate)+'%' }} </ps-label>
                                </div> 
                                <ps-label class="font-medium text-xs lg:text-sm" textColor="text-primary-500 dark:text-primaryDark-accent" > {{ chathistory ? chathistory.item.itemCurrency.currencySymbol : '' }} {{ formatPrice(chathistory ? parseFloat(chathistory.item.price)-(parseFloat(chathistory.item.price)*(parseFloat(chathistory.item.discountRate)/100)) : '') }} </ps-label>
                                
                            </div>
                            <div v-else class="py-1.5 ">                    
                                <ps-label class="font-medium text-xs lg:text-sm" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ chathistory ? chathistory.item.itemCurrency.currencySymbol : '' }} {{ formatPrice(chathistory ? chathistory.item.price : '') }} </ps-label>
                            </div>
                            <!-- <ps-label class="font-medium text-xs lg:text-sm" textColor="text-primary-500 dark:text-primaryDark-accent"> {{chathistory ? chathistory.item.itemCurrency.currencySymbol : ''}} {{ formatPrice(chathistory ? chathistory.item.price : '')}}  </ps-label> -->
                            <ps-label class="lg:ms-2 sm:ms-1 ms-0.5 font-light text-xxs lg:text-xs"> {{chathistory ? chathistory.item.itemPriceType.name : ''}} </ps-label>
                        </div>

                    </div>
                </div>
                <div class="lg:w-60 w-36 h-18 sm:h-20 rounded-xl bg-primary-000 dark:bg-primaryDark-black">
                    <img alt="Placeholder"  width="400px" height="400px" class="w-36 h-18 sm:h-20 lg:w-60 rounded-xl object-contain" :src="chathistorylistProvider.imageUrl(chathistory ? chathistory.item.defaultPhoto.imgPath : '',2) " @error="chathistorylistProvider.defaultCarImage" >
                </div>
   
                <div class="hidden sm:flex ms-4 lg:ms-8 flex-col w-36 lg:w-40 ">
                    <div class="flex flex-col items-center justify-center mt-3">
                    <div class="flex flex-col">
                        <ps-label class="text-sm font-medium text-center flex-shink-0 mx-auto" textColor="text-primary-500 dark:text-primaryDark-accent" > {{chathistory ? chathistory.buyerUnreadCount : '0'}}  </ps-label>
                        <div v-if="chathistory?.buyerUnreadCount != '1'">
                            <ps-label class="font-light text-center text-xs"  > {{ $t('chat_horizontal_item__message') }} </ps-label>
                        </div>
                        <div v-else>
                            <ps-label class="font-light text-center text-xs"  > {{ $t('chat_horizontal_item__messages') }} </ps-label>
                        </div>
                    </div>
                    </div>
                     <div class="flex justify-end items-end mt-1">
                        <div class="flex-grow-0">
                            <ps-label class=" font-light text-xxs"> {{chathistory ? chathistory.addedDateStr : ''}} </ps-label>
                        </div>
                        
                    </div>
                </div>
                            
            </div>  
            
            <div class="sm:hidden flex-row flex justify-between">
                <div class="flex flex-row ">
                    <div class="flex flex-row">
                        <ps-label class="text-sm font-medium text-center mx-2" textColor="text-primary-500" > {{chathistory ? chathistory.buyerUnreadCount : '0'}}  </ps-label>
                        <div v-if="chathistory?.buyerUnreadCount != '1'">
                            <ps-label class="font-light text-center text-xs"  > {{ $t('chat_horizontal_item__message') }} </ps-label>
                        </div>
                        <div v-else>
                            <ps-label class="font-light text-center text-xs"  > {{ $t('chat_horizontal_item__messages') }} </ps-label>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end items-end mt-1">
                    <div class="flex-grow-0">
                        <ps-label class=" font-light text-xxs"> {{chathistory ? chathistory.addedDateStr : ''}} </ps-label>
                    </div>
                        
                </div>
                </div>
            </div>
        </ps-card>
    </div>
</template>

<script lang="ts">
import PsCard from '@/components/core/card/PsCard.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';

// Providers
import { createChatHistoryListProviderState } from "@/store/modules/chat/ChatHistoryListProvider";
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { usePsValueHolderState } from '@/object/core/PsValueHolder';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import PsConst from '@/object/constant/ps_constants';
// Objects
import chathistory from '@/object/ChatHistory';

import format from 'number-format.js';
import { i18n } from '@/assets/locales/index';

export default {
    name : "ChatHorizontalItem",
    components : {
        PsIcon,
        PsLabel,
        PsCard
    },
    props : {
        chathistory : { type : chathistory } ,
        onClick : Function
    },
    setup() {
        // Inject Provider
        const chathistorylistProvider = createChatHistoryListProviderState();
        PsValueProvider.psValueHolder = usePsValueHolderState();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        const appInfoProvider = usePsAppInfoProviderState();
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
        function formatPrice(value) {
            if(value.toString() == '0') {
                return i18n.global.t('item_price__free');
            }else {
                return format(appInfoProvider.appInfo.data.frontendConfigSetting.priceFormat, value);
            }
        }
        return {
            chathistorylistProvider,
            formatPrice,
            PsConst,
            appInfoProvider
        }
    }
}
</script>