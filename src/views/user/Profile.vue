<template>
    <!-- End message for user -->
    <div class="sm:mt-32 lg:mt-36 mt-28 w-mobile sm:w-median lg:w-large mx-auto">
        <div>
            <!-- <div class="flex flex-col"> -->

                <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">
                    <!-- User Profile Normal -->
                    <div class='w-full col-span-4 sm:col-span-2 lg:col-span-3 mt-2 ' >
                          <ps-card class="flex flex-row sm:flex-col bg-primary-000 dark:bg-primaryDark-black lg:p-5 p-3">
                            <div class=" w-full">
                                <img alt="Placeholder"  width="30px" height="30px"  class="rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover mx-auto" :src="userProvider.imageUrl(userProvider.user.data ? userProvider.user.data.userProfilePhoto : '',2)" @error="userProvider.defaultProfileImage" >
                                <div class="flex flex-col mt-2 lg:mt-3 justify-center"> 
                                    <ps-label class=" text-center text-xl lg:text-2xl"> {{  userProvider.user.data ? userProvider.user.data.userName:'' }} </ps-label>
                                    <div v-if="userProvider.user.data?.isVerifybluemark == '1'" class=" mt-2 lg:mt-3 lg:w-32 w-28 mx-auto flex flex-row justify-center py-1.5 px-3 bg-secondary-500 dark:bg-secondaryDark-accent rounded-2xl">
                                        <ps-label textColor="text-textLight dark:text-textDark" class=" text-center text-xxs lg:text-xs"> {{ $t("profile__verified_dealer") }}  </ps-label>
                                        <ps-icon name="check" w="12" h="12" textColor="text-textLight dark:text-textDark" />
                                    </div>
                                    
                                </div>
                                <ps-route-link :to="{ name: 'review-list',query: { user_id: loginUserId } }">
                                <div class="flex items-center content-center justify-center  mt-2 lg:mt-3 px-4">
                                    <rating :grade="userProvider.user.data ? userProvider.user?.data?.overallRating:0" :maxStars="5" :hasCounter="true" />
                                    <ps-label-caption class="ms-1 mt-1">{{  userProvider.user.data ? userProvider.user.data.overallRating:'' }} ({{  userProvider.user.data ? userProvider.user.data.ratingCount:'' }})</ps-label-caption>
                                </div>
                                </ps-route-link>
                                <ps-label v-if="userProvider.user.data && userProvider.user.data.isShowEmail == '1' " class="font-light text-xxs lg:text-xs mt-1 text-center"> {{  userProvider.user.data ? userProvider.user.data.userEmail:'' }} </ps-label>
                            <ps-label v-if="userProvider.user.data && userProvider.user.data.isShowPhone == '1' " class="font-light text-xxs lg:text-xs mt-1 text-center"> {{  userProvider.user.data ? userProvider.user.data.userPhone:'' }} </ps-label>
                                <ps-label class="font-light text-xxs lg:text-xs mt-4 text-center"> {{  userProvider.user.data ? userProvider.user.data.userAboutMe:'' }} </ps-label>
                               
                                <ps-label class="font-light text-xxs lg:text-xs mt-4 text-center">{{ $t("profile__joined") }} - {{userProvider.user.data ? userProvider.user.data.addedDate:''}}</ps-label>
                                <div v-if="appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == '1'" class="lg:mt-2 mt-1.5 flex justify-between">
                                    <ps-label class="font-light text-xs lg:text-sm">{{ $t("profile__posts_left") }} : </ps-label>
                                    <ps-label class="font-light text-xs lg:text-sm"> {{userProvider.user.data ? userProvider.user.data.remainingPost:'0'}}</ps-label>
                                </div>

                                <div class="lg:mt-2 mt-1.5 flex justify-between">
                                    <ps-label class="font-light text-xs lg:text-sm">{{ $t("profile__active_lists") }} : </ps-label>
                                    <ps-label class="font-light text-xs lg:text-sm"> {{userProvider.user.data ? userProvider.user.data.activeItemCount:'0'}}</ps-label>
                                </div>
                                
                                <div class="lg:mt-2 mt-1.5 flex justify-between">
                                    <ps-label class="font-light text-xs lg:text-sm">{{ $t("profile__followers") }} : </ps-label>
                                    <ps-label class="font-light text-xs lg:text-sm"> {{userProvider.user.data ? userProvider.user.data.followerCount:'0'}}</ps-label>
                                </div>
                                <div class="lg:mt-2 mt-1.5 flex justify-between">
                                    <ps-label class="font-light text-xs lg:text-sm">{{ $t("profile__followings") }} : </ps-label>
                                    <ps-label  class="font-light text-xs lg:text-sm">{{userProvider.user.data ? userProvider.user.data.followingCount:'0'}}</ps-label>
                                </div>
                               <div class="hidden lg:block md:block ">
                                    <div class=" text-center mt-3 lg:mt-4">
                                        <ps-route-link 
                                            :to="{name: 'edit-profile' }"> 
                                            <ps-button rounded="rounded-2xl" textSize="text-xxs lg:text-xs" class=" w-full  lg:w-full mx-auto" > {{ $t("profile__edit") }} </ps-button>
                                        </ps-route-link>
                                    </div>
                                    <div v-if="userProvider.user.data?.isVerifybluemark == '0' || userProvider.user.data?.isVerifybluemark == '3'" class="mt-2 py-2 text-center w-full bg-background dark:bg-backgroundDark rounded-2xl  lg:w-full mx-auto mb-2"  @click="openApplyUserBluemark(loginUserId)">
                                        
                                        <ps-label class="text-xxs lg:text-xs cursor-pointer" > {{ $t("profile__apply_user_blue_mark") }} </ps-label>
                                    
                                    </div>
                                    <div class="mt-2 py-2 text-center w-full bg-background dark:bg-backgroundDark rounded-2xl  lg:w-full mx-auto mb-2" @click="openUserDeactivate(loginUserId)">
                                        
                                        <ps-label class="text-xxs lg:text-xs cursor-pointer" > {{ $t("profile__deactivate_account") }} </ps-label>
                                    
                                    </div> 
                               </div>

                               <div class="flex flex-row mx-auto sm:hidden">

                                    <div class="ms-2 mt-2 py-2 text-center w-full bg-primary-500 dark:bg-primaryDark-accent rounded-2xl  lg:w-full mx-auto mb-2"  @click="openApplyUserBluemark(loginUserId)">
                                        <ps-route-link 
                                        :to="{name: 'edit-profile' }"> 
                                        <ps-label class="text-xxs cursor-pointer" textColor="text-white " > {{ $t("profile__edit") }} </ps-label>
                                        </ps-route-link>
                                    </div>
                                   
                                    <div v-if="userProvider.user.data?.isVerifybluemark == '0' || userProvider.user.data?.isVerifybluemark == '3'" class="ms-2 mt-2 py-2 text-center w-full bg-background dark:bg-backgroundDark rounded-2xl  lg:w-full mx-auto mb-2"  @click="openApplyUserBluemark(loginUserId)">
                                        
                                        <ps-label class="text-xxs cursor-pointer" > {{ $t("profile__apply_user_blue_mark") }} </ps-label>
                                    
                                    </div>

                                    <div class="ms-2 mt-2 py-2 text-center w-full bg-background dark:bg-backgroundDark rounded-2xl  lg:w-full mx-auto mb-2" @click="openUserDeactivate(loginUserId)">
                                    
                                        <ps-label class="text-xxs cursor-pointer" > {{ $t("profile__deactivate_account") }} </ps-label>
                                
                                    </div> 
                               </div>
      
                            </div>
                           
                        </ps-card>
                        <div class="hidden lg:flex md:flex mt-4 ">
                            <div class="flex-grow-0 sm:flex-grow">
                            <ps-button class="sm:justify-end w-36 sm:w-full " @click='openMoreUserSetting' >{{ $t("profile__user_setting") }} </ps-button>                                
                            </div>
                        </div>
                        <div class="justify-end flex mt-2 sm:hidden">
                            <div class="flex-grow-0">
                                <ps-button class="sm:justify-end w-36 sm:w-full " @click='openMoreUserSetting' >{{ $t("profile__user_setting") }} </ps-button>
                            </div>
                                
                        </div>
                       <!-- google adsense desktop view -->
                       <div class=" mx-auto mt-2">
                            <ps-ad-sense adFormat="vertical"></ps-ad-sense>
                        </div>

                  </div>
                    <!-- End User Profile Normal -->
                   
                    <div class="w-full col-span-4 sm:col-span-6 lg:col-span-9 mt-4  mb-6">
                        <!-- Start Purchased Package -->
                        <div v-if="appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == '1'">
                        <div v-if="limitProvider.buyadList?.data != null" class=" ">
                            <div class="">
                                 <ps-label-header-4 class="font-medium"> {{ $t("profile__purchased_package") }} </ps-label-header-4>
                                
                            </div>
                            <div class="w-full lg:mt-2 mt-0">
                                <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4  ">

                                    <!-- Purchased Package List -->                                    
                                        <div 
                                            class="w-full " 
                                            v-for="buyad in limitProvider.buyadList.data" :key="buyad.id">                                            
                                            <limit-ad-horizontal-item  :buyad="buyad" />
                                        </div>                                    
                                    <!-- END Purchased Package List -->

                                </div>
                                
                            </div>
                        </div>
                        <div v-if="limitProvider.buyadList?.data != null" class="justify-end flex mt-2 mb-4">
                            <div class="flex-grow-0">
                                <ps-route-link :to="{ name: 'limit-ads'}">
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                        <ps-icon textColor="text-textLight dark:text-textDark" class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> 
                                    </ps-button>
                                </ps-route-link>
                            </div>
                                
                        </div>
                        </div>
                        <!-- End Purchased Package -->
                        <!-- paid & promote ads -->
                        <div v-if="itempaidProvider.paidAdItemList?.data != null" class=" ">
                            <div class="">
                                 <ps-label-header-4 class="font-medium"> {{ $t("profile__promote_and_paid_ads") }} </ps-label-header-4>
                                
                            </div>
                            <div class="w-full lg:mt-2 mt-0">
                                <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4  ">

                                    <!-- Paid & Promote Ads List -->                                    
                                        <div 
                                            class="w-full " 
                                            v-for="paiditem in itempaidProvider.paidAdItemList.data.slice(0, 2)" 
                                            :key="paiditem.id">                                            
                                            <ps-route-link :to="{ name: 'item', params: { itemName: paiditem.item.title.split(' ').join('-').toLowerCase() }, query: { item_id: paiditem.item.id, item_name: paiditem.item.title.split(' ').join('-').toLowerCase()   }}">
                                                <paid-ad-item-horizontal-item  :paiditem="paiditem" />  
                                            </ps-route-link>                                       
                                        </div>                                    
                                    <!-- END Paid & Promote Ads List -->

                                </div>
                                
                            </div>
                        </div>
                        <div  v-else-if="itempaidProvider.paidAdItemList != null && itempaidProvider.loading.value ">
                            <div class="">
                                 <ps-label-header-4 class="font-medium"> {{ $t("profile__promote_and_paid_ads") }} </ps-label-header-4>
                            </div>
                            <div class="w-full lg:mt-4 mt-2">
                                <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4  ">

                                    <!-- Paid & Promote Ads List -->                                    
                                        <div class="w-full" v-for="i in 3" :key="i">
                                        <item-horizontal-skeletor-item />
                                    </div>                                    
                                    <!-- END Paid & Promote Ads List -->

                                </div>
                            </div>
                        </div>
                        <div v-if="itempaidProvider.paidAdItemList?.data != null" class="justify-end flex mt-2 mb-4">
                            <div class="flex-grow-0">
                                <ps-route-link :to="{ name: 'paid-items'}">
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                        <ps-icon textColor="text-textLight dark:text-textDark" class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> 
                                    </ps-button>
                                </ps-route-link>
                            </div>
                                
                        </div>
                        <!-- end paid ads -->
                        <!-- active listing -->
                        <div v-if="itemactiveProvider.productList.data == null && itemactiveProvider.loading.value ">
                            <ps-label-header-4 class=" mt-3 font-medium"> {{ $t("profile__active_listing") }} </ps-label-header-4>
                            <div class="">
                                <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4   ">
                                    <div class="w-full " v-for="i in 3" :key="i">
                                        <item-horizontal-skeletor-item />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="itemactiveProvider.productList?.data != null" class=" ">
                            <div class="flex justify-between">
                                 <ps-label-header-4 class=" mt-3 font-medium"> {{ $t("profile__active_listing") }} </ps-label-header-4>
                               
                            </div>
                            <div class="lg:mt-4 mt-2">
                                <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4   ">
                                    <!-- Active Listing -->
                                    <div class="w-full " 
                                        v-for="item in itemactiveProvider.productList.data.slice(0, 6)" 
                                        :key="item.id"> 
                                        <ps-route-link :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                                            <profile-item-horizontal-item  :item="item" />    
                                        </ps-route-link> 
                                    </div>                                    
                                    <!-- END Active Listing -->
                                </div>
                            </div>
                        </div>
                        
                        <div v-if="itemactiveProvider.productList?.data != null" class="justify-end flex mt-2">
                            <div class="flex-grow-0">
                                <ps-route-link class="mt-2" :to="{name: 'active-items' }">
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                        <ps-icon textColor="text-textLight dark:text-textDark" class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                                </ps-route-link>
                            </div>
                                
                        </div>
                        <!-- end active listing -->
                        <!-- pending listing -->
                        <div v-if="itempendingProvider.productList?.data != null" class="">
                            <div class="">
                                <ps-label-header-4 class="mt-3 font-medium"> {{ $t("profile__pending_listing") }} </ps-label-header-4>
                                
                            </div>
                           
                            <div class="lg:mt-4 mt-2">
                                <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4  ">

                                    <!-- Pending Listing -->
                                    <div class="w-full " v-for="item in itempendingProvider.productList.data.slice(0, 3)" :key="item.id">
                                        <ps-route-link :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                                            <profile-item-horizontal-item  :item="item" />    
                                        </ps-route-link>                                         
                                    </div>
                                    <!-- END Pending Listing -->

                                </div>                                
                            </div>
                        </div>
                        <div v-if="itempendingProvider.productList?.data != null" class="justify-end flex mt-2">
                            <div class="flex-grow-0">
                                <ps-route-link class="" :to="{name: 'pending-items' }">
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                        <ps-icon textColor="text-textLight dark:text-textDark" class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                                </ps-route-link>
                            </div>
                                
                        </div>
                        <!-- end pending listing -->
                        <!-- rejected listing -->
                        <div v-if="itemrejectProvider.productList?.data != null" class="">
                            <div class="">
                                <ps-label-header-4 class=" mt-3 font-medium"> {{ $t("profile__rejected_listing") }} </ps-label-header-4>
                                
                            </div>
                            
                            <div class="w-full lg:mt-4 mt-2">
                                <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4   ">

                                    <!-- Rejected Listing -->
                                    <div class="w-full " v-for="item in itemrejectProvider.productList.data.slice(0, 3)" :key="item.id">                                        
                                        <ps-route-link :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                                            <profile-item-horizontal-item  :item="item" />    
                                        </ps-route-link>                                        
                                    </div>
                                    <!-- END Rejected Listing -->

                                </div>

                            </div>
                        </div>
                        <div v-if="itemrejectProvider.productList?.data != null"  class="justify-end flex mt-2">
                            <div class="flex-grow-0">
                                <ps-route-link class="" :to="{name: 'reject-items' }">
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                        <ps-icon textColor="text-textLight dark:text-textDark" class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                                </ps-route-link>
                            </div>
                                
                        </div>
                        <!-- end rejected listing -->
                        <!-- disabled listing -->
                        <div v-if="itemdisableProvider.productList?.data != null" class="">
                            <div class="">
                                <ps-label-header-4 class=" mt-3 font-medium"> {{ $t("profile__disabled_listing") }} </ps-label-header-4>
                            </div>
                            
                            <div class="w-full lg:mt-4 mt-2">
                                <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4   ">

                                    <!-- disabled Listing -->
                                    <div class="w-full " v-for="item in itemdisableProvider.productList.data.slice(0, 3)" :key="item.id">                                        
                                        <ps-route-link :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                                            <profile-item-horizontal-item  :item="item" />    
                                        </ps-route-link>                                        
                                    </div>
                                    <!-- END disabled Listing -->

                                </div>

                            </div>
                        </div>
                        <div v-if="itemdisableProvider.productList?.data != null"  class="justify-end flex mt-2">
                            <div class="flex-grow-0">
                                <ps-route-link class="" :to="{name: 'disable-items' }">
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> {{ $t("profile__view_all") }} 
                                        <ps-icon textColor="text-textLight dark:text-textDark" class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                                </ps-route-link>
                            </div>
                                
                        </div>
                        <!-- end disabled listing -->
                    </div>
             
                </div>
            <!-- </div> -->
        </div>
    </div>

    <user-setting-modal ref="user_setting_modal" />

    <user-blue-mark-modal ref="user_blue_mark_modal" />

    <ps-confirm-dialog ref='ps_confirm_dialog' />

    <ps-loading-dialog ref="psloading"  :isClickOut='false'/>

</template>

<script lang="ts">

import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsCard from '@/components/core/card/PsCard.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import Rating from '@/components/core/rating/Rating.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

import ProfileItemHorizontalItem from "@/components/modules/item/ProfileItemHorizontalItem.vue";
import PaidAdItemHorizontalItem from "@/components/modules/item/PaidAdItemHorizontalItem.vue";
import LimitAdHorizontalItem from "@/components/modules/item/LimitAdHorizontalItem.vue";
import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
import ProductParameterHolder from "@/object/holder/ProductParameterHolder";
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import { createProductProviderState } from "@/store/modules/item/ProductProvider";
import { createPaidAdItemProviderState } from "@/store/modules/item/PaidAdItemProvider";
import { createLimitAdItemProviderState } from "@/store/modules/limit/LimitAdItemProvider";
import { createUserProviderState } from "@/store/modules/user/UserProvider";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";

import router from "@/router";

import "vue-skeletor/dist/vue-skeletor.css";
import UserBlueMarkModal from '@/components/modules/user/UserBlueMarkModal.vue';
import { ref, defineAsyncComponent } from 'vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import UserDeleteItemParameterHolder from '@/object/holder/UserDeleteItemParameterHolder';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsStatus from '@/api/common/PsStatus';
import { i18n } from '@/assets/locales/index';
import PsUtils from '@/utils/PsUtils';

const UserSettingModal = defineAsyncComponent(() => import('@/components/modules/user/UserSettingModal.vue'));

export default {
    name : "ProfileView",
    components : {
        PsCard,
        PsLabelCaption,
        PsLabelHeader4,
        PsButton,
        ProfileItemHorizontalItem,
        PaidAdItemHorizontalItem,
        ItemHorizontalSkeletorItem,
        LimitAdHorizontalItem,
        Rating,
        PsIcon,
        PsLabel,
        PsRouteLink,
        UserSettingModal,
        PsConfirmDialog,
        PsLoadingDialog,
        UserBlueMarkModal,
        PsAdSense
    },
    setup() {
      
        const psValueHolder = PsValueProvider.psValueHolder;

        //Modals
        const user_setting_modal = ref();
        const user_blue_mark_modal = ref();
        const dealer_modal = ref();
        const ps_confirm_dialog = ref();
        const psloading = ref();

        // Inject Item Provider
        const itempaidProvider = createPaidAdItemProviderState();
        const itemactiveProvider = createProductProviderState();
        const itempendingProvider = createProductProviderState();
        const itemrejectProvider = createProductProviderState();
        const itemdisableProvider = createProductProviderState();
        const userProvider = createUserProviderState();
        const limitProvider = createLimitAdItemProviderState();

        

        const userdelete = new UserDeleteItemParameterHolder();
         // For Radio
         
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        const appInfoProvider = usePsAppInfoProviderState();
        async function loadAppInfo(){
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
        }
        loadAppInfo();

        loadData();

        async function loadData(){

            await userProvider.getUser(loginUserId);
          
        }

        limitProvider.resetPaidAdItemList(loginUserId);
        // Load Item List
        const latitude  =  psValueHolder.locationLat == null || psValueHolder.locationLat == '' ? '0' : psValueHolder.locationLat;
        const longitude =  psValueHolder.locationLng == null || psValueHolder.locationLng == '' ? '0' : psValueHolder.locationLng;

        const holder1 = new ProductParameterHolder().resetParameterHolder();
        holder1.addedUserId = loginUserId;
        holder1.lat = latitude.toString();
        holder1.lng = longitude.toString();
        holder1.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        const holder2 = new ProductParameterHolder().getPendingItemParameterHolder();
        holder2.addedUserId = loginUserId;
        holder2.lat = latitude.toString();
        holder2.lng = longitude.toString();
        holder2.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        const holder3 = new ProductParameterHolder().getRejectedItemParameterHolder();
        holder3.addedUserId = loginUserId;
        holder3.lat = latitude.toString();
        holder3.lng = longitude.toString();
        holder3.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        const holder4 = new ProductParameterHolder().getDisabledProductParameterHolder();
        holder4.addedUserId = loginUserId;
        holder4.lat = latitude.toString();
        holder4.lng = longitude.toString();
        holder4.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        itempaidProvider.loadPaidAdItemList(loginUserId);
       
        itemactiveProvider.loadItemList(loginUserId, holder1);
        itempendingProvider.loadItemList(loginUserId, holder2);
        itemrejectProvider.loadItemList(loginUserId, holder3);
        itemdisableProvider.loadItemList(loginUserId, holder4);
        // Load User By ID List
        userProvider.getUser(loginUserId);

        // confirm dialog for user deactivate

        function openUserDeactivate(loginUserId) {
           ps_confirm_dialog.value.openModal(
                i18n.global.t('profile__confirm'),
                i18n.global.t('profile__are_you_sure_to_deactivate'),
                i18n.global.t('profile__ok'),
                i18n.global.t('profile__cancel'),
                () => {
                   
                    doDeactivate(loginUserId);
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
        }

        // Deactive Account

        async function doDeactivate(loginUserId) {

            userdelete.userId = loginUserId;
           
            psloading.value.openModal();
            const returnData = await userProvider.postDeleteUser(userdelete);
            
            if(returnData.status == PsStatus.SUCCESS) {

                psValueHolder.logout();
                 psloading.value.closeModal();
               
                // Redirect
                router.push({
                    name: "dashboard",
                });
               
                
            }else {
             
                psloading.value.closeModal();

            }

        }

        // Verify blue mark user
        function openApplyUserBluemark(loginUserId) {
           user_blue_mark_modal.value.openModal(
                loginUserId
            );
        }

        function openMoreUserSetting() {
            user_setting_modal.value.openModal();
        }


        return {
            itempaidProvider,
            PsValueProvider,
            userProvider,
            itemactiveProvider,
            itemrejectProvider,
            itemdisableProvider,
            itempendingProvider,
            user_setting_modal,
            user_blue_mark_modal,
            openMoreUserSetting,
            dealer_modal,        
            ps_confirm_dialog,
            psloading,
            openUserDeactivate,
            openApplyUserBluemark,
            doDeactivate,
            loginUserId,
            limitProvider,
            appInfoProvider
        };
    }
}
</script>