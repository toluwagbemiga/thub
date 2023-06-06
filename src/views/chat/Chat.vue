<template>
    <ps-content-container class=" h-screen ">
        <template #content>
            <div class="relative flex flex-col " style="height:90vh" > 
                
                <div class='lg:mt-32 mt-28 h-40 flex flex-col ' >
                    <div class='flex flex-row justify-between mb-2'>
                        <div class=" ms-4 mb-4 flex items-center" > 
                            <ps-route-link :to="{name : 'chat-list'}">
                            <ps-label class="hover:underline cursor-pointer font-medium" > {{ $t("chat__chat_list") }} </ps-label>
                            </ps-route-link>
                            <ps-icon name="rightArrow" class='mx-2'/>
                            <ps-label > {{ $t("chat__chat") }} </ps-label>
                        </div>
                        <ps-route-link :to="{
                            name: 'other-profile',
                            params: { userId: userProvider.user?.data?.userId }}">
                            <div class="flex flex-row content-end items-center cursor-pointer">
                                <img alt="Placeholder"  width="300px" height="200px" class="w-10 h-10 p-2 object-cover bg-white rounded-full me-2" :src="userProvider.imageUrl(userProvider.user?.data?.userProfilePhoto,1) " @error="chatHistoryProvider.defaultProfileImage">
                                <ps-label class=""> {{userProvider.user?.data?.userName }} </ps-label>
                            </div>
                        </ps-route-link>
                    </div>
                    <div v-if="dataReady" class='flex flex-row justify-between'>
                        <ps-route-link :to="{ name: 'item', params: { itemName: itemName.split(' ').join('-').toLowerCase() }, query: { item_id: itemId, item_name: itemName.split(' ').join('-').toLowerCase()   }}">
                            <div class='flex flex-row cursor-pointer'>
                                <img alt="Placeholder"  width="300px" height="200px" class="w-20 h-20 p-2 object-cover bg-white rounded-md" :src="chatHistoryProvider.imageUrl(itemImageName,2) " @error="chatHistoryProvider.defaultCarImage">
                                <div class='flex flex-col ms-4 mt-2'>
                                    <ps-label-title-3> {{ itemName }} </ps-label-title-3>
                                    <ps-label class='mt-1'> {{ currency }} {{ itemPrice }} ( {{condition}} )  </ps-label>
                                    <div v-if="isOtherUserOnline" class="flex flex-row items-center">
                                        <ps-label> {{ $t("chat__online") }} </ps-label>
                                        <ps-icon name='dot' class=' text-green-500 mt-1 ms-2'> </ps-icon>
                                    </div>
                                    <div v-else class="flex flex-row items-center">
                                        <ps-label> {{ $t("chat__offline") }} </ps-label>
                                        <ps-icon name='dot' class=' text-red-500 mt-1 ms-2'> </ps-icon>
                                    </div>
                                </div>
                                
                            </div>
                        </ps-route-link>
                    
                        <div v-if="isSoldOut == '1' || chatHistoryProvider.chatHistory.data?.item.isSoldOut == '1'" class="flex flex-col content-end items-center">
                            <div >
                                <ps-label class="select-none px-4 py-3 my-auto bg-primary-500 dark:bg-primaryDark-accent text-median font-medium text-textLight dark:text-textDark rounded-xl lg:rounded-2xl " 
                                textColor="text-textLight dark:text-textDark"> {{ $t("chat__sold") }}</ps-label>
                            </div>
                        </div>
                        <div v-else-if="chatFlag == PsConst.CHAT_FROM_SELLER && showOffer" class="flex flex-col content-end items-center">
                            <div  @click = "makeOfferClicked">
                                <ps-label class="select-none px-4 py-3 my-auto bg-primary-500 dark:bg-primaryDark-accent text-median font-medium text-textLight dark:text-textDare rounded-xl lg:rounded-2xl  cursor-pointer" 
                                textColor="text-textLight dark:text-textDark"> {{ $t("chat__make") }} <br/> {{ $t("chat__offer") }}</ps-label>
                            </div>
                        </div>

                    </div>
                    
                </div>
                
                <ps-line class="mt-2"/>
                
                <div ref="messages" v-on:scroll="handleScroll" id="messages"  
                    class="px-4 flex flex-col-reverse  overflow-y-auto h-full scrolling-touch  ">
                    <div v-for="chat in chats.data" :key="chat.id ?? ''">
                        <div class=" " v-if='chat.message != "" && chat.message != null '>

                            
                            <!-- Chat Date UI -->
                            <div v-if='chat.type == PsConst.CHAT_TYPE_DATE'>
                                <div class="flex w-full justify-center">
                                    <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block font-medium ">
                                        <ps-label> {{chat.message}} </ps-label> 
                                    </span>
                                </div>
                            </div>
                            

                            <!-- Chat Normal Text UI -->
                            <div v-else-if="chat.type == PsConst.CHAT_TYPE_TEXT">

                                <!-- Chat Offer UI -->
                                <div v-if="chat.offerStatus == PsConst.CHAT_STATUS_OFFER">
                                    <!-- Send by me UI -->
                                    <div v-if='chat.sendByUserId == loginUserId' class='w-full flex justify-end ps-1/3 flex-row items-end'>
                                        <ps-label-caption-2 class="me-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                        <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-br-none bg-yellow-200 ">
                                            <ps-label class="text-center " textColor="text-secondary-500 dark:text-secondaryDark-black" > {{ $t("chat__make_offer") }} <br/>{{ itemPrice == '0' ? $t("item_price__free") : chat.message}} </ps-label> 
                                        </span>
                                    </div> 

                                    <!-- Receive Message UI -->
                                    <div v-else class="pe-1/3 flex flex-col">
                                        <div  class=" flex flex-row items-end">
                                            <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-bl-none bg-yellow-200 ">
                                                <ps-label  textColor="text-secondary-500 dark:text-secondaryDark-black" > {{ $t("chat__make_offer") }} <br/>{{ itemPrice == '0' ? $t("item_price__free") : chat.message}}</ps-label> 
                                            </span>
                                            <ps-label-caption-2 class="ms-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>                                                    
                                        </div>                                             
                                    </div>  

                                </div>
                                <!-- End Chat Offer UI -->

                                <!-- Reject Offer -->
                                <div v-else-if="chat.offerStatus == PsConst.CHAT_STATUS_REJECT">

                                    <!-- Send by me UI -->
                                    <div v-if='chat.sendByUserId == loginUserId' class='w-full flex justify-end ps-1/3 flex-row items-end'>
                                        <ps-label-caption-2 class="me-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                        <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-br-none bg-red-400 ">
                                            <ps-label class="text-center" textColor="text-secondary-500 dark:text-secondaryDark-black" > {{ $t("chat__offer_rejected") }} <br/>{{itemPrice == '0' ? $t("item_price__free") : chat.message}} </ps-label> 
                                        </span>
                                    </div> 

                                    <!-- Receive Message UI -->
                                    <div v-else class="pe-1/3 flex flex-col">
                                        <div  class=" flex flex-row items-end">
                                            <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-bl-none bg-red-400 ">
                                                <ps-label  textColor="text-secondary-500 dark:text-secondaryDark-black"  >  {{ $t("chat__offer_rejected") }}<br/>{{itemPrice == '0' ? $t("item_price__free") : chat.message}}</ps-label> 
                                            </span>
                                            <ps-label-caption-2 class="ms-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                            
                                        </div>
                                    </div>   
                                                            
                                </div>
                                <!-- End Reject Offer -->

                                <!-- Chat Accept offer UI -->
                                <div v-else-if="chat.offerStatus == PsConst.CHAT_STATUS_ACCEPT ">

                                    <div v-if='chat.isSold && chat.isUserBought'>
                                    </div>
                                    
                                    <div v-else>
                                        <!-- Send by me UI -->
                                        <div v-if='chat.sendByUserId == loginUserId' class="w-full ps-1/3 flex flex-col justify-end items-end">
                                            <div  class=' flex  flex-row '>
                                                <ps-label-caption-2 class="me-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                                <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-br-none bg-green-400 ">
                                                    <ps-label class="text-center  " textColor="text-secondary-500 dark:text-secondaryDark-black"  >  {{ $t("chat__offer_accepted") }} <br/>{{itemPrice == '0' ? $t("item_price__free") : chat.message}} </ps-label> 
                                                </span>
                                            </div> 
                                        
                                            <div v-if="chat.offerStatus == PsConst.CHAT_STATUS_ACCEPT && chat.isUserBought == false" class="me-2">
                                                <ps-label @click="isUserBought(chat)" class="p-2 flex flex-shrink-0 bg-primary-500 dark:bg-primaryDark-accent rounded-lg cursor-pointer " textColor="text-textLight dark:textDark "> {{ $t("chat__is_user_bought") }} </ps-label>
                                            </div>
                                        </div>

                                        <!-- Receive Message UI -->
                                        <div v-else class="pe-1/3 flex flex-col">
                                            <div  class=" flex flex-row items-end">
                                                <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-bl-none bg-green-400 ">
                                                    <ps-label class="  " textColor="text-secondary-500 dark:text-secondaryDark-black"  > {{ $t("chat__offer_accepted") }} <br/>{{itemPrice == '0' ? $t("item_price__free") : chat.message}}</ps-label> 
                                                </span>
                                                <ps-label-caption-2 class="ms-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                                
                                            </div>
                                        </div>  
                                    </div> 
                                                            
                                </div>
                                <!-- End Chat Accept offer UI -->
                                
                                <!-- Chat Normal Text UI -->
                                <div v-else>
                                    <!-- Send by me UI -->
                                    <div v-if='chat.sendByUserId == loginUserId' class='w-full flex justify-end ps-1/3 flex-row items-end'>
                                        <ps-label-caption-2 class="me-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                        <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-br-none bg-secondary-100 dark:bg-secondaryDark-black  ">
                                            <ps-label> {{chat.message}} </ps-label> 
                                        </span>
                                    </div> 

                                    <!-- Receive Message UI -->
                                    <div v-else class="pe-1/3 flex flex-row items-end">
                                        <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-bl-none bg-primary-100 dark:bg-primaryDark-black ">
                                            <ps-label> {{chat.message}} </ps-label> 
                                        </span>
                                        <ps-label-caption-2 class="ms-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                    </div>      
                                </div>                           
                            </div>
                            
                            <!-- Is User Bought -->
                            <div v-else-if="chat.type == PsConst.CHAT_TYPE_BOUGHT">

                                <!-- Send by me UI -->
                                <div  class="w-full flex flex-col justify-center items-center">
                                    <div  class='flex  flex-row '>
                                        
                                        <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block bg-primary-000 dark:bg-primaryDark-black ">
                                            <ps-label class="text-center " > {{ $t("chat__item_bought") }} <br/>{{itemPrice == '0' ? $t("item_price__free") : chat.message}} </ps-label> 
                                        </span>
                                    </div> 
                                    <div >
                                        <div @click="clickGiveReview()">
                                            <ps-label class="p-2 mb-1 flex flex-shrink-0 bg-primary-500 dark:bg-primaryDark-accent cursor-pointer rounded-lg " textColor="text-textLight dark:text-textDark"> {{ $t("chat__give_review") }} </ps-label>
                                        </div>
                                    </div>
                                    <div v-if='chat.sendByUserId == loginUserId && chat.offerStatus == PsConst.CHAT_STATUS_IS_USER_BOUGHT'>
                                        <ps-label @click="markAsSoldClick(chat)" class="p-2 flex flex-shrink-0 bg-primary-500 dark:bg-primaryDark-accent cursor-pointer rounded-lg" textColor="text-textLight dark:text-textDark"> {{ $t("chat__mark_as_sold") }} </ps-label>
                                    </div>
                                </div>
                        
                            </div>
                            <!-- sold -->
                            <div v-else-if="chat.type == PsConst.CHAT_TYPE_SOLD">

                                <!-- Send by me UI -->
                                <div  class="w-full flex flex-col justify-center items-center">
                                   
                                    <div  class='flex  flex-row '>
                                        <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block bg-primary-100 dark:bg-primaryDark-black ">
                                            <ps-label class="text-center " > {{ $t("chat__item_bought") }} <br/>{{itemPrice == '0' ? $t("item_price__free") : chat.message}} </ps-label> 
                                        </span>
                                    </div> 
                                    <div >
                                        <div @click="clickGiveReview()">
                                            <ps-label class="p-2 mb-1 flex flex-shrink-0 bg-primary-500 dark:bg-primaryDark-accent cursor-pointer rounded-lg " textColor="text-textLight dark:text-textDark"> {{ $t("chat__give_review") }} </ps-label>
                                        </div>
                                    </div>
                                    <div  class='flex  flex-row '>
                                        <span class="px-4 py-2 mt-2 mb-1 rounded-xl lg:rounded-2xl inline-block bg-primary-100 dark:bg-primaryDark-black">
                                            <ps-label class="text-center " >{{ $t("chat__item_sold") }} <br/>{{itemPrice == '0' ? $t("item_price__free") : chat.message}} </ps-label> 
                                        </span>
                                    </div> 
                                </div>
                          
                            </div>
                            
                            <!-- Chat Offer UI -->
                            <div v-else-if="chat.type == PsConst.CHAT_TYPE_OFFER">
                                <!-- Send by me UI -->
                                <div v-if='chat.sendByUserId == loginUserId' class='w-full flex justify-end ps-1/3 flex-row items-end'>
                                    <ps-label-caption-2 class="me-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                    <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-br-none bg-yellow-200 ">
                                        <ps-label class="text-center " textColor="text-secondary-500 dark:text-secondaryDark-black" > {{ $t("chat__make_offer") }} <br/>{{itemPrice == '0' ? $t("item_price__free") : chat.message}} </ps-label> 
                                    </span>
                                </div> 

                                <!-- Receive Message UI -->
                                <div v-else class="pe-1/3 flex flex-col">
                                    <div  class=" flex flex-row items-end">
                                        <span class="px-4 py-2 mt-2 mb-1 rounded-lg inline-block rounded-bl-none bg-yellow-200 ">
                                            <ps-label class=" dark:text-primaryDark-black" textColor="text-secondary-500 dark:text-secondaryDark-black" > {{ $t("chat__make_offer") }} <br/>{{itemPrice == '0' ? $t("item_price__free") : chat.message}}</ps-label> 
                                        </span>
                                        <ps-label-caption-2 class="ms-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                            
                                    </div> 
                                    <div v-if="chat.offerStatus == PsConst.CHAT_STATUS_OFFER" class="ms-2 mb-2 flex flex-row space-x-2">
                                        <ps-label @click="acceptOffer(chat)" class="p-2 bg-green-600 hover:bg-green-700 cursor-pointer rounded-lg text-textLight" textColor="text-textLight"> {{ $t("chat__accept") }} </ps-label>
                                        <ps-label @click="rejectOffer(chat)" class="p-2 bg-gray-600 hover:bg-gray-700 cursor-pointer rounded-lg text-textLight" textColor="text-textLight"> {{ $t("chat__reject") }} </ps-label>
                                    </div> 
                                </div>  

                            </div>
                            <!-- End Chat Offer UI -->

                            <!-- Image UI -->
                            <div v-else-if="chat.type == PsConst.CHAT_TYPE_IMAGE">

                                <!-- Send by me -->
                                <div v-if='chat.sendByUserId == loginUserId' class='w-full flex justify-end ps-1/3 flex-row items-end h-48 mt-4'>
                                    <ps-label-caption-2 class="me-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                    <img @click="imageView(chat.message)"  width="300px" height="200px" alt="Placeholder" class="cursor-pointer w-auto h-48 p-2 object-cover  rounded-md" :src="chatHistoryProvider.imageUrl(chat.message,3) " @error="chatHistoryProvider.defaultCarImage">
                                </div> 

                                <!-- Receive -->
                                <div v-else class="pe-1/3 flex flex-row items-end h-48 mt-4">
                                    <img @click="imageView(chat.message)"  width="300px" height="200px" alt="Placeholder" class="cursor-pointer w-auto h-48 p-2 object-cover rounded-md" :src="chatHistoryProvider.imageUrl(chat.message,3) " @error="chatHistoryProvider.defaultCarImage">
                                    <ps-label-caption-2 class="ms-2 mb-2"> {{chat.timeString}} </ps-label-caption-2>
                                </div>                                 
                            </div>
                        </div>
                    </div>                      
                </div>
                
                <!-- Send Message -->
                <div class=" px-4 mt-2 mb-0 sm:mb-0 absolute inset-y-full w-full">
                    <div class="relative flex ">
                        <span class="absolute inset-y-0 flex items-center">

                            <div class="" @click="onImageClick" for="upload-image1">
                                <input class="py-2" type="file" size=1 max=1 accept=".jpg,.jpeg,.png"  @change="onImageSelected($event)" ref="image" id="upload-image1" style="display: none;" :ordering="1" />
                                <button type="button" 
                                class="inline-flex items-center justify-center rounded-full h-10 w-10 
                                transition duration-500 ease-in-out text-secondary-500 dark:text-secondaryDark-white " >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-secondary-500 dark:text-secondaryDark-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                                </svg>
                                </button>
                                
                            </div>
  
                        </span>
                        <ps-input v-bind:placeholder="$t('chat__write_message')" @keyup.enter="sendNormalMessage(inputMessageController)"  v-model:value="inputMessageController" class="w-full mt-1 ps-12 py-2 me-8 " 
                        theme="form-input bg-primary-000 dark:bg-primaryDark-black text-secondary-500 dark:text-secondaryDark-white"/>
                        <div class="absolute right-0 items-center mb-0 ">
                            <button type="button" @click="sendNormalMessage(inputMessageController)" class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-textLight dark:text-textDark bg-primary-500 dark:bg-primaryDark-accent  focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </ps-content-container>  

    <ps-loading-dialog ref="ps_loading_dialog" />
    <ps-confirm-dialog ref="ps_confirm_dialog" />
    <ps-error-dialog ref="ps_error_dialog" />
    <ps-success-dialog ref="ps_success_dialog" />
    <chat-image-detail ref='chat_image' />
    <offer-modal ref="offer_modal" :price="itemPrice" @submit="submitOffer" />
    <review-modal ref="review_modal"  />

</template>

<script lang="ts">
import router from '@/router';
import firebaseApp from 'firebase/app';
import "firebase/auth";
import 'firebase/database'; 
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsLine from '@/components/core/line/PsLine.vue';
import PsContentContainer from "@/components/layouts/container/PsContentContainer.vue";
import { useRoute } from 'vue-router'
import PsUtils from '@/utils/PsUtils';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelTitle3 from '@/components/core/label/PsLabelTitle3.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsLabelCaption2 from '@/components/core/label/PsLabelCaption2.vue';
import PsConst from '@/object/constant/ps_constants';
import { createNotiProviderState } from '@/store/modules/noti/NotiProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsSuccessDialog from '@/components/core/dialog/PsSuccessDialog.vue';
import ChatImageDetail from '@/components/modules/chat/ChatImageDetail.vue'
import OfferModal from '@/components/modules/chat/OfferModal.vue';
import ReviewModal from '@/components/modules/review/ReviewModal.vue';
import { createGalleryProviderState } from '@/store/modules/gallery/GalleryProvider';
import PsStatus from '@/api/common/PsStatus';
import { createUserProviderState } from '@/store/modules/user/UserProvider';
import GetChatHistoryParameterHolder from '@/object/holder/GetChatHistoryParameterHolder';
import MakeOfferParameterHolder from '@/object/holder/MakeOfferParameterHolder';
import { createGetChatHistoryProviderState } from '@/store/modules/chat/GetChatHistoryProvider'
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { createChatHistoryListProviderState } from '@/store/modules/chat/ChatHistoryListProvider'
import { createOfferProviderState } from '@/store/modules/offer/OfferProvider';
import ChatParameterHolder from '@/object/holder/ChatParameterHolder';
import ResetUnReadMessageHolder from '@/object/holder/ResetUnReadMessageHolder';
import ChatMessage from '@/object/ChatMessage';
import IsUserBoughtParameterHolder from '@/object/holder/IsUserBoughtParameterHolder';
import format from 'number-format.js';
import { i18n } from '@/assets/locales/index';

export default {
    name: "ChatView",
    components :{ 
        PsLabel,
        PsInput,
        PsLine,
        PsContentContainer,
        PsIcon,
        PsLabelTitle3,
        PsLabelCaption2,
        PsLoadingDialog,
        OfferModal,
        PsConfirmDialog,
        PsErrorDialog,
        PsSuccessDialog,
        ChatImageDetail,
        PsRouteLink,
        ReviewModal
    },
    
    setup() { 
       
        const route = useRoute();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const dataReady = ref(false);

                    
        if(loginUserId == null || loginUserId == '' || loginUserId == PsConst.NO_LOGIN_USER) {
            router.push({ name : "login"});
        }
        // Get Data
        const buyerUserId = route.query.buyer_user_id?.toString() ?? '';
        const sellerUserId = route.query.seller_user_id?.toString() ?? '';
        const itemName = route.query.item_name?.toString() ?? '';
        const itemId = route.query.item_id?.toString() ?? '';
        const itemImageName = route.query.item_image_name?.toString() ?? '';
        let itemPrice = route.query.item_price?.toString() ?? '';
        
        const currency = route.query.currency?.toString() ?? '';
        const condition = route.query.condition?.toString() ?? '';
        const chatFlag = route.query.chat_flag?.toString() ?? ''; 
        let isSoldOut = ref(route.query.is_sold_out?.toString() ?? ''); 

        function formatPrice(value) {
            if(value.toString() == '0') {
                return i18n.global.t('item_price__free');
            }else {
                return format(appInfoProvider.appInfo.data.frontendConfigSetting.priceFormat, parseFloat(value))
            }
        }
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        const appInfoProvider = usePsAppInfoProviderState();
        async function loadAppInfo(){
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            itemPrice = format(appInfoProvider.appInfo.data.frontendConfigSetting.priceFormat, parseFloat(itemPrice)).toString();
        }
        loadAppInfo();
        
        // Init Provider
        const chatHistoryProvider = createGetChatHistoryProviderState();
        const chatHistoryListProvider = createChatHistoryListProviderState();
        const galleryProvider = createGalleryProviderState();
        const notiProvider = createNotiProviderState();
        const offerProvider = createOfferProviderState();
        const chatHistoryHolder = new GetChatHistoryParameterHolder();
        const holder = new MakeOfferParameterHolder();
        const chatHolder = new ChatParameterHolder().ChatParameterHolder();
        const userBoughtHolder = new IsUserBoughtParameterHolder();
        const resetHolder = new ResetUnReadMessageHolder();

        // Prepare Data
        const ps_loading_dialog = ref();
        const ps_confirm_dialog = ref();
        const ps_success_dialog = ref();
        const ps_error_dialog = ref();
        const chat_image = ref();
        const offer_modal = ref();
        const review_modal =ref();
        const showOffer = ref(false);
        const image = ref();
        const isOtherUserOnline = ref(false);
        const sessionId = PsUtils.sortinUserId(sellerUserId, buyerUserId);
        const dataRef = firebaseApp.database().ref('Message/' + sessionId);
        const chatRef = firebaseApp.database().ref('Current_Chat_With');
        const userRef = firebaseApp.database().ref('User_Presence');
        let otherUserId;
     
        if(sellerUserId == loginUserId) {
            otherUserId = buyerUserId;
        }else {
            otherUserId = sellerUserId;
        }
        const userProvider = createUserProviderState();

        // Load User By ID List
        userProvider.getUser(otherUserId);

        //reset unread message
        resetHolder.itemId = itemId;
        resetHolder.buyerUserId = buyerUserId;
        resetHolder.sellerUserId = sellerUserId;
        if(chatFlag == PsConst.CHAT_FROM_SELLER) {
            resetHolder.type = PsConst.CHAT_TO_BUYER;
        } else {
            resetHolder.type = PsConst.CHAT_TO_SELLER;
        }
       
        chatHistoryListProvider.resetUnreadMessageCount(resetHolder);
      
        // Init Refs
        const inputMessageController = ref('');
        const chats = reactive(
            {
                data : [] as ChatMessage[]
            }
        );

        // Functions
        async function loadChatHistory(){
            chatHistoryHolder.itemId = itemId;
            chatHistoryHolder.buyerUserId = buyerUserId;
            chatHistoryHolder.sellerUserId =sellerUserId;
           
            await chatHistoryProvider.loadChatHistory(chatHistoryHolder);
            showOffer.value = true;
            if(chatHistoryProvider.chatHistory?.data?.isOffer == '1') {
                showOffer.value = false;
            }
            
        }

        function handleScroll (evt) { 
           
            if (evt.target.scrollTop < 50) {
                PsUtils.log("load more......");                
            }
        }

        function getCurrentDateTimeStamp() {
            const startDate = new Date().getTime();
            return PsUtils.getTimeStampDividedByOneThousand(parseInt(startDate.toString(), 10));
        }

        async function sendNormalMessage(message){
            
            chatHolder.id = '';
            chatHolder.addedDateTimeStamp = getCurrentDateTimeStamp();
            chatHolder.isSold = false;
            chatHolder.isUserBought = false;
            chatHolder.itemId =itemId;
            chatHolder.message = message;
            chatHolder.offerStatus = PsConst.CHAT_STATUS_NULL;
            chatHolder.sendByUserId = loginUserId;
            chatHolder.sessionId = sessionId;
            chatHolder.type = PsConst.CHAT_TYPE_TEXT;
       
            await sendMessage(chatHolder);
        }

        async function sendMessage(
            chatHolder : ChatParameterHolder ) {
            let _refKey;
            if( chatHolder.id == ''){
                _refKey = dataRef.push().key ?? "";

            }else{
                _refKey = chatHolder.id;    
            }
            const senderId = chatHolder.sendByUserId;
          
            const data = {
                addedDate: chatHolder.addedDateTimeStamp,
                id: _refKey,
                isSold : chatHolder.isSold,
                isUserBought : chatHolder.isUserBought,
                itemId : chatHolder.itemId,
                message: chatHolder.message,
                offerStatus : chatHolder.offerStatus,
                sendByUserId : chatHolder.sendByUserId,
                sessionId: chatHolder.sessionId,
                type : chatHolder.type
            };

            const chat = {
                itemId : chatHolder.itemId,
                receiverId : otherUserId,
                senderId : senderId 
            };

            const chat_user_presence = {
                userId : senderId,
                userName : psValueHolder.loginUserName
            };
            // console.log("User Presence");
            // console.log(chat_user_presence);
            dataRef.child(_refKey).set(data);
            chatRef.child(senderId).set(chat);
            userRef.child(senderId).set(chat_user_presence);

            let isUserOnlineFlag = "0"; // Default offline
            if(isOtherUserOnline.value) {
                isUserOnlineFlag = "1";
            }

            if(chatFlag == PsConst.CHAT_FROM_SELLER) {
                chatHistoryProvider.postChatHistory(itemId,  buyerUserId, sellerUserId, PsConst.CHAT_TO_SELLER, isUserOnlineFlag ,chatHolder.message);                    
            }else {
                chatHistoryProvider.postChatHistory(itemId,  buyerUserId, sellerUserId, PsConst.CHAT_TO_BUYER, isUserOnlineFlag, chatHolder.message );
            }

            if(!isOtherUserOnline.value) {
                if(chatFlag == PsConst.CHAT_FROM_SELLER) {
                    notiProvider.postChatNoti(itemId, sellerUserId, buyerUserId, chatHolder.message, PsConst.CHAT_TO_SELLER);
                }else {
                    notiProvider.postChatNoti(itemId, sellerUserId, buyerUserId, chatHolder.message, PsConst.CHAT_TO_BUYER);
                }
            }
                
            inputMessageController.value = '';
            
            scrollToBottom(700);
            
        }
        let el;
        function scrollToBottom(time) {
            
            setTimeout(function(){
                if(el != null) {
                    
                    el.scrollTop = el.scrollHeight + 400
                }else {
                    PsUtils.log("it null");
                } 
            }, time );
            
            
        }
        
        onMounted( async () => {

            await loadChatHistory();
            dataReady.value= true;
           
            window.addEventListener('scroll', handleScroll);
            el = document.getElementById('messages')
            dataRef.orderByChild('itemId').equalTo(itemId).on('value', (snapshot) => {
            chats.data = [];
            const data = [] as ChatMessage[];
            let lastDateTime = '';
            let tempShowOffer = showOffer.value;
            snapshot.forEach((doc) => {
                
                const item = doc.val()
                item.key = doc.key
                
                if(item.offerStatus == PsConst.CHAT_STATUS_REJECT || item.offerStatus == PsConst.CHAT_STATUS_IS_USER_BOUGHT) {
                    tempShowOffer = true;
                }else if(item.offerStatus == PsConst.CHAT_STATUS_SOLD){
                    tempShowOffer = false;
                    isSoldOut.value = '1';
                }else{
                    tempShowOffer = showOffer.value;
                }
                if(item != null) {
                    item.dateTimeString = PsUtils.timeStampToDateString(item.addedDate);
                    if(item.dateTimeString != null 
                        && item.dateTimeString != ''
                        && item.dateTimeString.includes(' ')) {
                            const dateTimeArr = item.dateTimeString.split(' ');
                            item.dateString = dateTimeArr[0];
                            item.timeString = dateTimeArr[1];

                            if(lastDateTime == '' || lastDateTime != item.dateString) {
                                lastDateTime = item.dateString;           
                                
                                const date : any = {};
                                date.message = item.dateString;
                                date.type = PsConst.CHAT_TYPE_DATE;
                                data.push(date);
                            }
                            
                    }
                    let chatMessage = new ChatMessage();
                    chatMessage = chatMessage.fromMap(item);
                   
                    data.push(chatMessage);
                    
                }
            
            });
            showOffer.value = tempShowOffer;
            chats.data = data.reverse();
            scrollToBottom(1500);
            
            userRef.child(otherUserId).on('value', (snapshot) => {
               
                if(snapshot.val() != null){
                   
                    const tmpUserId = snapshot.val().userId;
                    if(tmpUserId == otherUserId) {
                        isOtherUserOnline.value = true;
                    }else {
                        isOtherUserOnline.value = false;
                    }
                }else {
                    isOtherUserOnline.value = false;
                }
              
            });
            });

        });
        onUnmounted(() => {
            chatRef.child(loginUserId).remove();
            userRef.child(loginUserId).remove();
            window.removeEventListener('scroll', handleScroll);
        });

        function onImageClick() {
            image.value.click();

        }

        async function onImageSelected(event) {
            const selectedFiles = event.target.files;

            if(selectedFiles && selectedFiles.length > 1) {
                PsUtils.log(selectedFiles.length);
            }else {
                let selectedFile;
                for(let i=0; i<selectedFiles.length; i++) {
                    
                    selectedFile = selectedFiles[i];                       
                }      
                
                 if(selectedFile != undefined){
                    ps_loading_dialog.value.openModal();
                    ps_loading_dialog.value.setMessage(i18n.global.t('chat__uploading_image'));
                    let chatImageType;
                    if(loginUserId == sellerUserId){
                        chatImageType = PsConst.CHAT_TO_BUYER;
                    }
                    else{
                        chatImageType = PsConst.CHAT_TO_SELLER;
                    }
                    const returnData = await galleryProvider.postChatImageUpload( loginUserId,
                                                                sellerUserId,
                                                                buyerUserId,
                                                                itemId,
                                                                chatImageType,
                                                                selectedFile);

                    if(returnData.status == PsStatus.SUCCESS) {
                        chatHolder.addedDateTimeStamp = getCurrentDateTimeStamp();
                        chatHolder.isSold = false;
                        chatHolder.isUserBought = false;
                        chatHolder.itemId = itemId;
                        chatHolder.message = returnData.data.imgPath;
                        chatHolder.offerStatus = PsConst.CHAT_STATUS_NULL;
                        chatHolder.sendByUserId = loginUserId;
                        chatHolder.sessionId = sessionId;            
                        chatHolder.type =  PsConst.CHAT_TYPE_IMAGE;
                        
                        await sendMessage(chatHolder);

                    }
                    else{
                        PsUtils.log('error');
                    }
                    ps_loading_dialog.value.closeModal();


                } 
            }
        }
        
        function makeOfferClicked(){
            // console.log(itemName);
            offer_modal.value.openModal(
                itemName,
                itemImageName,
                currency,
                itemPrice);
            
        }
        
        async function submitOffer(negoPrice){
            let isUserOnlineFlag = "0"; // Default offline
            if(isOtherUserOnline.value) {
                isUserOnlineFlag = "1";
            }
            
            holder.itemId = itemId;
            holder.buyerUserId = buyerUserId;
            holder.sellerUserId = sellerUserId;
            holder.negoPrice = negoPrice;
            holder.type = PsConst.CHAT_TO_SELLER;
            holder.isUserOnline = isUserOnlineFlag;
            holder.message = negoPrice;
            
            ps_loading_dialog.value.openModal();
            const item = await offerProvider.makeOffer(buyerUserId, holder);

            if(item.status == PsStatus.ERROR) {
                PsUtils.log(item.message);
            }
            else{
                chatHolder.id = '';
                chatHolder.addedDateTimeStamp = getCurrentDateTimeStamp();
                chatHolder.isSold = false;
                chatHolder.isUserBought = false;                
                chatHolder.itemId = itemId;
                chatHolder.message = currency + " " + negoPrice;
                chatHolder.offerStatus = PsConst.CHAT_STATUS_OFFER;
                chatHolder.sendByUserId = loginUserId;
                chatHolder.sessionId = sessionId;
                chatHolder.type = PsConst.CHAT_TYPE_OFFER;
                
                await sendMessage(chatHolder);
            }
            await loadChatHistory();
            ps_loading_dialog.value.closeModal();
        }
        
        function acceptOffer(chat) {
            ps_confirm_dialog.value.openModal(
                i18n.global.t('chat__confirm'),
                i18n.global.t('chat__confirm_to_accept'),                
                i18n.global.t('chat__yes'),
                i18n.global.t('chat__no'),
                () => {                    
                    doAcceptOffer(chat);
                },
                () => {
                    PsUtils.log("cancel");                     
                }
            );
        }
        
        async function doAcceptOffer( chat){
           let isUserOnlineFlag = "0"; // Default offline
            if(isOtherUserOnline.value) {
                isUserOnlineFlag = "1";
            }

            holder.itemId = itemId;
            holder.buyerUserId = buyerUserId;
            holder.sellerUserId = sellerUserId;
            holder.negoPrice = chat.message;
            holder.type = PsConst.CHAT_TO_BUYER;
            holder.isUserOnline = isUserOnlineFlag;
            holder.message = chat.message;
            
            ps_loading_dialog.value.openModal();
            const item = await offerProvider.acceptOffer(loginUserId, holder);

            if(item.status == PsStatus.ERROR) {
                PsUtils.log(item.message);
            }
            else{
                chatHolder.id = chat.id;
                chatHolder.isSold = false;
                chatHolder.isUserBought = false;
                chatHolder.itemId = chat.itemId;
                chatHolder.message = chat.message;
                chatHolder.offerStatus = PsConst.CHAT_STATUS_OFFER;
                chatHolder.sendByUserId = chat.sendByUserId;
                chatHolder.sessionId = chat.sessionId;
                chatHolder.type = PsConst.CHAT_TYPE_ACCEPT;
                chatHolder.addedDateTimeStamp = chat.addedDate;
                
                await sendMessage(chatHolder);  //update message

                const chatAcceptHolder = new ChatParameterHolder().ChatAcceptParameterHolder();
                chatAcceptHolder.addedDateTimeStamp = getCurrentDateTimeStamp();
                chatAcceptHolder.isSold = false;
                chatAcceptHolder.isUserBought = false;
                chatAcceptHolder.itemId = itemId;
                chatAcceptHolder.message = chat.message;
                chatAcceptHolder.offerStatus = PsConst.CHAT_STATUS_ACCEPT;
                chatAcceptHolder.type = PsConst.CHAT_TYPE_ACCEPT;
                chatAcceptHolder.sendByUserId = loginUserId;
                chatAcceptHolder.sessionId = sessionId;
                await sendMessage(chatAcceptHolder);  //accept message
            }
            await loadChatHistory();
            ps_loading_dialog.value.closeModal();
        }
        
        async function isUserBought( chat){
            let isUserOnlineFlag = "0"; // Default offline
            if(isOtherUserOnline.value) {
                isUserOnlineFlag = "1";
            }

            userBoughtHolder.itemId = itemId;
            userBoughtHolder.buyerUserId = buyerUserId;
            userBoughtHolder.sellerUserId = sellerUserId;
            userBoughtHolder.isUserOnline = isUserOnlineFlag;
           
            ps_loading_dialog.value.openModal();
            const item = await offerProvider.isUserBought(loginUserId, userBoughtHolder);

            if(item.status == PsStatus.ERROR) {
                PsUtils.log(item.message);
            }
            else{
                
                chatHolder.addedDateTimeStamp = chat.addedDate;
                chatHolder.isSold = false;
                chatHolder.isUserBought = true;
                chatHolder.id = chat.id;
                chatHolder.itemId = chat.itemId;
                chatHolder.message = chat.message;
                chatHolder.offerStatus = PsConst.CHAT_STATUS_ACCEPT;
                chatHolder.sendByUserId = chat.sendByUserId;
                chatHolder.sessionId = chat.sessionId;
                chatHolder.type = PsConst.CHAT_TYPE_TEXT;
                await sendMessage(chatHolder);  //update message

                const chatMessageHolder = new ChatParameterHolder();
                chatMessageHolder.addedDateTimeStamp = getCurrentDateTimeStamp();
                chatMessageHolder.isSold = false;
                chatMessageHolder.isUserBought = true;
                chatMessageHolder.itemId = itemId;
                chatMessageHolder.message = chat.message;
                chatMessageHolder.offerStatus = PsConst.CHAT_STATUS_IS_USER_BOUGHT;
                chatMessageHolder.sendByUserId = loginUserId;
                chatMessageHolder.sessionId = sessionId;
                chatMessageHolder.type = PsConst.CHAT_TYPE_BOUGHT;
                
                
                await sendMessage(chatMessageHolder);  //accept message
            }
            await loadChatHistory();
            ps_loading_dialog.value.closeModal();
        }

        function markAsSoldClick(chat){
            ps_confirm_dialog.value.openModal(
                i18n.global.t('item_detail__confirm'),
                i18n.global.t('item_detail__confirm_to_mark_as_sold'),
                i18n.global.t('item_detail__mark_as_sold'),
                i18n.global.t('item_detail__cancel'),
                () => {
                    markAsSold(chat);
                },
                () => {
                    PsUtils.log("Cancel");
                }
                );
        }
        
        async function markAsSold( chat){
           
            userBoughtHolder.itemId = itemId;
            userBoughtHolder.buyerUserId = buyerUserId;
            userBoughtHolder.sellerUserId = sellerUserId;
           
            ps_loading_dialog.value.openModal();
            const item = await offerProvider.markAsSold(loginUserId, userBoughtHolder);

            if(item.status == PsStatus.ERROR) {
                PsUtils.log(item.message);
            }
            else{
                chatHolder.id = chat.id;
                chatHolder.isSold = true;
                chatHolder.isUserBought = true;
                chatHolder.itemId = chat.itemId;
                chatHolder.message = chat.message;
                chatHolder.offerStatus = PsConst.CHAT_STATUS_ACCEPT;
                chatHolder.sendByUserId = chat.sendByUserId;
                chatHolder.sessionId = chat.sessionId;
                chatHolder.type = PsConst.CHAT_TYPE_TEXT;
                chatHolder.addedDateTimeStamp = chat.addedDate;
                
                await sendMessage(chatHolder);  //update message

                const chatMessageHolder = new ChatParameterHolder();
                chatMessageHolder.addedDateTimeStamp = getCurrentDateTimeStamp();
                chatMessageHolder.isSold = true;
                chatMessageHolder.isUserBought = true;
                chatMessageHolder.itemId = itemId;
                chatMessageHolder.message = chat.message;
                chatMessageHolder.offerStatus = PsConst.CHAT_STATUS_SOLD;
                chatMessageHolder.sendByUserId = loginUserId;
                chatMessageHolder.sessionId = sessionId;
                chatMessageHolder.type = PsConst.CHAT_TYPE_SOLD;
                
                await sendMessage(chatMessageHolder);  //accept message
            }
            await loadChatHistory();
            ps_loading_dialog.value.closeModal();
        }

        function rejectOffer(chat) {
            ps_confirm_dialog.value.openModal(
                i18n.global.t('chat__confirm'),
                i18n.global.t('chat__confirm_to_reject'),
                i18n.global.t('chat__yes'),
                i18n.global.t('chat__no'),
                () => {
                    
                    doRejectOffer(chat);
                },
                () => {
                   PsUtils.log("cancel"); 
                    
                }
            );
        }

        async function doRejectOffer( chat){

            let isUserOnlineFlag = "0"; // Default offline
            if(isOtherUserOnline.value) {
                isUserOnlineFlag = "1";
            }

            holder.itemId = itemId;
            holder.buyerUserId = buyerUserId;
            holder.sellerUserId = sellerUserId;
            holder.negoPrice = "0";
            holder.type = PsConst.CHAT_TO_BUYER;
            holder.isUserOnline = isUserOnlineFlag;
            holder.message = chat.message;
            
            ps_loading_dialog.value.openModal();
            const item = await offerProvider.makeOffer(loginUserId, holder);

            if(item.status == PsStatus.ERROR) {
                PsUtils.log(item.message);
            }
            else{
                chatHolder.id = chat.id;
                chatHolder.isSold = false;
                chatHolder.isUserBought = false;
                chatHolder.itemId = chat.itemId;
                chatHolder.message = chat.message;
                chatHolder.offerStatus = PsConst.CHAT_STATUS_OFFER;
                chatHolder.sendByUserId = chat.sendByUserId;
                chatHolder.sessionId = chat.sessionId;
                chatHolder.type = PsConst.CHAT_TYPE_REJECT;
                chatHolder.addedDateTimeStamp = chat.addedDate;
                await sendMessage(chatHolder);  //update message

                const chatRejectHolder = new ChatParameterHolder().ChatAcceptParameterHolder();
                
                chatRejectHolder.addedDateTimeStamp = getCurrentDateTimeStamp();
                chatRejectHolder.isSold = false;
                chatRejectHolder.isUserBought = false;
                chatRejectHolder.itemId = itemId;
                chatRejectHolder.message = chat.message;
                chatRejectHolder.offerStatus = PsConst.CHAT_STATUS_REJECT;
                chatRejectHolder.type = PsConst.CHAT_TYPE_REJECT;
                chatRejectHolder.sendByUserId = loginUserId;
                chatRejectHolder.sessionId = sessionId;

                await sendMessage(chatRejectHolder);  //reject message
            }
            await loadChatHistory();
            ps_loading_dialog.value.closeModal();
        }

        function imageView(image){
            chat_image.value.openModal(image);
        }

        function clickGiveReview(){
           
            review_modal.value.openModal(otherUserId,
                () => {
                     ps_error_dialog.value.openModal(i18n.global.t('chat__review_error'),);
                    
                },
                () => {
                   ps_success_dialog.value.openModal('',i18n.global.t('chat__review_sent'),)
                    
                },

            )

           
        }
        
        return { 
            dataReady,
            chatHistoryProvider,
            userProvider,
            sellerUserId,
            handleScroll,
            chats,
            chatFlag,
            sendMessage,
            inputMessageController,
            itemName,
            itemId,
            itemImageName,
            itemPrice,
            currency,
            condition,
            PsConst,
            loginUserId,
            otherUserId,
            isOtherUserOnline,
            onImageClick,
            image,
            onImageSelected,
            ps_loading_dialog,
            ps_confirm_dialog,
            makeOfferClicked,
            offer_modal,
            review_modal,
            submitOffer,
            offerProvider,
            acceptOffer,
            rejectOffer,
            sendNormalMessage,
            isUserBought,
            markAsSoldClick,
            imageView,
            chat_image,
            showOffer,
            clickGiveReview,
            ps_error_dialog,
            ps_success_dialog,
            formatPrice,
            isSoldOut

        };
    }

}
</script>
