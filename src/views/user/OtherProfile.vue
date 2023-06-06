<template>

    <div class="sm:mt-32 lg:mt-36 mt-28 w-mobile sm:w-median lg:w-large mx-auto">
        <div>
            <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">
                <!-- User Profile Normal -->
                <div class='w-full col-span-4 sm:col-span-2 lg:col-span-3 mt-2 ' >
                    <ps-card class="flex flex-row sm:flex-col bg-primary-000 dark:bg-primaryDark-black lg:p-5 p-3">
                        <div class="w-1/2 sm:w-full">
                            <img alt="Placeholder"  width="30px" height="30px"  class="rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover mx-auto" :src="userProvider.imageUrl(userProvider.user.data ? userProvider.user.data.userProfilePhoto : '',2)" @error="userProvider.defaultProfileImage" >
                            <div class="flex flex-col mt-2 lg:mt-3 justify-center"> 
                                <ps-label class=" text-center text-xl lg:text-2xl"> {{  userProvider.user.data ? userProvider.user.data.userName:'' }} </ps-label>
                                <div v-if="userProvider.user.data?.isVerifybluemark == '1'" class=" mt-2 lg:mt-3 lg:w-32 w-28 mx-auto flex flex-row justify-center py-1.5 px-3 bg-secondary-500 dark:bg-secondaryDark-accent rounded-2xl">
                                    <ps-label textColor="text-textLight dark:text-textDark" class=" text-center text-xxs lg:text-xs"> {{ $t("other_profile__verified_dealer") }}  </ps-label>
                                    <ps-icon name="check" w="12" h="12" class="text-textLight dark:text-textDark" />
                                </div> 
                                
                            </div>
                            <ps-route-link :to="{ name: 'review-list',query: { user_id: userProvider.user?.data?.userId } }">
                            <div class="flex items-center content-center justify-center  mt-2 lg:mt-3 px-4">
                                <rating :grade="userProvider.user.data ? userProvider.user?.data?.overallRating:0" :maxStars="5" :hasCounter="true" />
                                <ps-label-caption class="ms-2">{{  userProvider.user.data ? userProvider.user.data.overallRating:'' }}({{  userProvider.user.data ? userProvider.user.data.ratingCount:'' }}) </ps-label-caption>
                            </div>
                            </ps-route-link>
                            <ps-label v-if="userProvider.user.data && userProvider.user.data.isShowEmail == '1' " class="font-light text-xxs lg:text-xs mt-1 text-center"> {{  userProvider.user.data ? userProvider.user.data.userEmail:'' }} </ps-label>
                            <ps-label v-if="userProvider.user.data && userProvider.user.data.isShowPhone == '1' " class="font-light text-xxs lg:text-xs mt-1 text-center"> {{  userProvider.user.data ? userProvider.user.data.userPhone:'' }} </ps-label>
                            <ps-label class="font-light text-xxs lg:text-xs mt-4 text-center"> {{  userProvider.user.data ? userProvider.user.data.userAboutMe:'' }} </ps-label>
                        </div>
                        <div  class="w-1/2 sm:w-full">
                            <ps-label class="font-light text-xxs lg:text-xs mt-4 text-center">{{ $t("profile__joined") }} - {{userProvider.user.data ? userProvider.user.data.addedDate:''}}</ps-label>

                            
                            <div class="lg:mt-2 mt-1.5 flex justify-between">
                                <ps-label class="font-light text-xs lg:text-sm">{{ $t("other_profile__followers") }} </ps-label>
                                <ps-label class="font-light text-xs lg:text-sm"> : {{userProvider.user.data ? userProvider.user.data.followerCount:'0'}}</ps-label>
                            </div>
                            <div class="lg:mt-2 mt-1.5 flex justify-between">
                                <ps-label class="font-light text-xs lg:text-sm">{{ $t("other_profile__followings") }} </ps-label>
                                <ps-label  class="font-light text-xs lg:text-sm">{{userProvider.user.data ? userProvider.user.data.followingCount:'0'}}</ps-label>
                            </div>
                                <div class=" text-center mt-3 lg:mt-4" v-if="userProvider.user.data?.userId != LoginUserId" @click="followClick"> 
                                <div v-if="userProvider.user.data?.isFollowed == '0'">
                                    <ps-button rounded="rounded-2xl" textSize="text-xxs lg:text-xs" class=" w-full  mx-auto" > {{ $t("other_profile__follow") }}  </ps-button>
                                </div>
                                <div v-else-if="userProvider.user.data?.isFollowed == '1'">
                                    <ps-button rounded="rounded-2xl" textSize="text-xxs lg:text-xs" class=" w-full  mx-auto" > {{ $t("other_profile__unfollow") }}  </ps-button>
                                </div>
                            </div>

                            <div v-if="appInfoProvider?.appInfo?.data.psAppSetting?.isBlockUser ==PsConst.ONE" class="mt-2 py-2 text-center w-full bg-background dark:bg-backgroundDark rounded-2xl  lg:w-full mx-auto mb-2"> 
                                <ps-label class="text-xxs lg:text-xs cursor-pointer" @click="blockClicked(userProvider.user?.data?.userId ?? '')"> 
                                        {{ $t("other_profile__block_user") }} 
                                </ps-label>
                            </div>

                        </div>
                    </ps-card>
                    
                </div>
                <!-- End User Profile Normal -->

                <!-- Latest item listing -->
                <div v-if="itemProvider.productList?.data != null" class="w-full col-span-4 sm:col-span-6 lg:col-span-9 mt-2  mb-6">
                    <div class="w-full ">
                        <ps-label-header-4 class="mt-3 font-medium"> {{ userProvider.user.data ? userProvider.user.data.userName+"'s" :'' }} {{ $t("other_profile__active_post") }} </ps-label-header-4>
                        <div class="w-full h-full grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4  ">
                            <!-- Active Listing -->
                            <div class=" w-full h-full" 
                                v-for="item in itemProvider.productList.data" 
                                :key="item.id">                                            
                                <ps-route-link :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                                    <item-horizontal-item  :item="item" />
                                </ps-route-link>                                         
                            </div>                                    
                            <!-- END Active Listing -->
                        </div>
    
                    </div>
                    <div v-if="itemProvider.productList?.data != null" class="justify-end flex mt-2 mb-4">
                    <div class="flex-grow-0">
                        <ps-route-link :to="{name: 'item-list', query: userItemParams['query']}">
                            <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> {{ $t("other_profile__view_all") }} 
                                <ps-icon textColor="text-textLight dark:text-textDark" class="ms-1 mt-1" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                                   
                        </ps-route-link>
                    </div>
                            
                </div>
                
                <!-- google adsense desktop view -->
                <div class="mx-auto">
                    <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
                </div>
                
                </div>
                <div v-else-if="itemProvider.productList != null && itemProvider.loading.value " class="w-full col-span-4 sm:col-span-6 lg:col-span-9 mt-4  mb-6">
                    <div class="w-full">
                        <div class="grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-3.5 lg:gap-4 ">
                            <div class="w-full" v-for="i in 6" :key="i">
                                <item-horizontal-skeletor-item />
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- end latest item listing -->
            </div>
           
        </div>
    </div>

    <ps-confirm-dialog ref='ps_confirm_dialog' />

    <ps-loading-dialog ref="psloading"  :isClickOut='false'/> 

</template>
<script lang="ts">
//Vue
import { useRoute } from 'vue-router';
import router from "@/router";
import { ref } from 'vue';

import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsCard from '@/components/core/card/PsCard.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import Rating from '@/components/core/rating/Rating.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

import ItemHorizontalItem from "@/components/modules/item/ItemHorizontalItem.vue";
import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
//Models
import { createProductProviderState } from "@/store/modules/item/ProductProvider";
import { createOtherUserProviderState } from "@/store/modules/user/OtherUserProvider";

import ProductParameterHolder from "@/object/holder/ProductParameterHolder";
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import UserBlockParameterHolder from '@/object/holder/UserBlockParameterHolder';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import UserParameterHolder from '@/object/holder/UserParameterHolder';
import UserFollowHolder from '@/object/holder/UserFollowHolder';
import PsStatus from '@/api/common/PsStatus';
import PsConst from "@/object/constant/ps_constants";
import { useUserProviderState } from '@/store/modules/user/UserProvider';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

import "vue-skeletor/dist/vue-skeletor.css";
import { i18n } from '@/assets/locales/index';
import PsUtils from '@/utils/PsUtils';

export default {
    name : "OtherProfileView",
    components : {
        PsIcon,
        PsLabelHeader4,
        PsCard,
        PsLabel,
        PsLabelCaption,
        PsButton,
        Rating,
        ItemHorizontalItem,
        ItemHorizontalSkeletorItem,
        PsConfirmDialog,
        PsLoadingDialog,
        PsRouteLink,
        PsAdSense

    },
    setup() {
       
        // Modals
        const ps_confirm_dialog = ref();
        const psloading = ref();

        const userblock = new UserBlockParameterHolder();

        const route = useRoute();
        const userId = route.params.userId.toString();
        // Inject Item Provider
        const itemProvider = createProductProviderState();

        // Load Item List
        const holder = new ProductParameterHolder().getLatestParameterHolder();
        holder.addedUserId = userId;

        itemProvider.loadItemList(userId, holder);
        
        // Get Login User Id
        const psValueHolder = PsValueProvider.psValueHolder;
        const LoginUserId = psValueHolder.getLoginUserId();
        const paramHolder = new UserParameterHolder().getOtherUserData();
        const followHolder = new UserFollowHolder();

        //for block user setting
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = LoginUserId;
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);

        paramHolder.loginUserId = LoginUserId;
        paramHolder.id = userId;
        let userProvider;
        loadUserData();
    
        async function loadUserData(){
            if(LoginUserId == PsConst.NO_LOGIN_USER){
                userProvider = useUserProviderState();
                await userProvider.getUser(userId);
                
            }else{
                userProvider = createOtherUserProviderState();
                await userProvider.loadUser(paramHolder);
                
            }
        }
        itemProvider.paramHolder.addedUserId = userId;
            
        const userItemParams = itemProvider.paramHolder.getUrlParamsAndQuery();
        
        async function followClick(){
            if(psValueHolder.isUserLoggedIn()){
                psloading.value.openModal();
                if( userProvider.user.data?.isFollowed == '1'){
                    psloading.value.message = i18n.global.t('other_profile__removing_user_from_follower_list');
                }else{
                    psloading.value.message = i18n.global.t('other_profile__adding_user_to_follower_list');
                }
                followHolder.userId = LoginUserId;
                followHolder.followedUserId = userProvider.user?.data?.userId ?? '';
                await userProvider.postUserFollow(followHolder);

                psloading.value.closeModal();
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
            
        }
        
        // Block this user

        function blockClicked(userId) {
            if(psValueHolder.isUserLoggedIn()){
                ps_confirm_dialog.value.openModal(
                    i18n.global.t('other_profile__confirm'),
                    i18n.global.t('other_profile__confirm_to_block_user'),
                    i18n.global.t('other_profile__block'),
                    i18n.global.t('other_profile__cancel'),
                    () => {
                    
                        doBlock(userId);
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
        }
        //unblock user

        //Block User
        async function doBlock(userId) {

            userblock.loginUserId = LoginUserId;
            userblock.addedUserId = userId;

            psloading.value.openModal();
            psloading.value.message = i18n.global.t('other_profile__adding_user_to_block_list');
            const returnData = await userProvider.blockUser(userblock);
            psloading.value.closeModal();

            if(returnData.status == PsStatus.ERROR) {
               
                return;
            }else if(returnData.status == PsStatus.SUCCESS) {
               
                router.push({
                    name: "dashboard",
                });
                
            }
        }


        return {
            itemProvider,
            userProvider,
            userItemParams,
            blockClicked,
            ps_confirm_dialog,
            psloading,
            followClick,
            LoginUserId,
            doBlock,
            appInfoProvider,
            PsConst
        }
    }
}
</script>