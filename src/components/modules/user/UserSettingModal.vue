<template>
    <ps-modal ref="psmodal" line="hidden" bodyHeight="max-h-90" maxWidth="784px" :isClickOut='true' class=" z-50 " >
        <template #title>
            <div class="sm:px-4 px-10 flex justify-between">
                <ps-label class="font-medium lg:text-3xl text-xl"> {{ $t('user_setting_modal__user_setting') }} </ps-label>
                <ps-label  class="font-medium lg:text-base text-xs hover:underline cursor-pointer" @click="psmodal.toggle(false)">  {{ $t('user_setting_modal__close') }} </ps-label>
            </div>
        </template>
        <template #body>
            <div class="px-6 sm:px-0 flex sm:flex-row flex-col justify-between mt-6">
                <div class="px-4">
                    <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="  font-medium lg:text-xs text-xxs" >  {{ $t('user_setting_modal__posts') }} </ps-label>
                    <ps-route-link class="" :to="{name: 'pending-items' }">
                        <div class='mt-4 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">  {{ $t('user_setting_modal__pending_posts') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__pending_posts_caption') }} </ps-label>                
                        </div>
                    </ps-route-link>


                    <ps-route-link class="" :to="{name: 'reject-items' }">
                        <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label  textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">  {{ $t('user_setting_modal__rejected_posts') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__rejected_posts_caption') }} </ps-label>                
                        </div>
                    </ps-route-link>

                    <ps-route-link class="mt-2" :to="{name: 'active-items' }">
                        <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">  {{ $t('user_setting_modal__active_posts') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__active_posts_caption') }} </ps-label>                
                        </div>
                    </ps-route-link>

                    <ps-route-link class="mt-2" :to="{name: 'paid-items' }">
                        <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">{{ $t('user_setting_modal__paid_ads') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__paid_ads_caption') }} </ps-label>                
                        </div>
                    </ps-route-link>

                     <ps-route-link v-if="appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp ==PsConst.ONE" class="mt-2" :to="{name: 'limit-ads' }">
                        <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">{{ $t('user_setting_modal__limit_ads') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__limit_ads_caption') }} </ps-label>                
                        </div>
                    </ps-route-link>

                    
                
                </div>
                <div class="px-4 mt-6 sm:mt-0"> 
                    
                    <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="font-medium lg:text-xs text-xxs" > {{ $t('user_setting_modal__activities') }} </ps-label>

                    <ps-route-link class="" :to="{name: 'favourite' }">
                        <div class='mt-4 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs"> {{ $t('user_setting_modal__favourite') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs">{{ $t('user_setting_modal__favourite_caption') }}  </ps-label>                
                        </div>
                    </ps-route-link>
                    <ps-route-link class="mt-2" :to="{name: 'offer-list' }">
                        <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs"> {{ $t('user_setting_modal__offers') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__offers_caption') }}</ps-label>                
                        </div>
                    </ps-route-link>

                    <ps-route-link class="mt-2" :to="{name: 'followers' }">
                        <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs"> {{ $t('user_setting_modal__followers') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__followers_caption') }}</ps-label>                
                        </div>
                    </ps-route-link>

                    <ps-route-link class="mt-2" :to="{name: 'following' }">
                        <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs"> {{ $t('user_setting_modal__followings') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__followings_caption') }} </ps-label>                
                        </div>
                    </ps-route-link>
                </div>
                <div class="px-4 mt-6 sm:mt-0">
                    <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="font-medium lg:text-xs text-xxs" > {{ $t('user_setting_modal__setting_and_privacy') }} </ps-label>
                    <ps-route-link  class="" :to="{name: 'blocked-users' }">
                        <div v-if="appInfoProvider?.appInfo?.data.psAppSetting?.isBlockUser ==PsConst.ONE" class='mt-4 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">{{ $t('user_setting_modal__blocked_users') }} </ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__blocked_users_caption') }} </ps-label>                
                        </div>
                    </ps-route-link>

                    <ps-route-link class="mt-2" :to="{name: 'reported-items' }">
                        <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                            <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">{{ $t('user_setting_modal__reported_posts') }}</ps-label>
                            <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__reported_posts_caption') }} </ps-label>                
                        </div>
                    </ps-route-link>

                    <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col' @click="openUserDeactivate(LoginUserId)">
                        <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs"> {{ $t('user_setting_modal__deactivate_account') }} </ps-label>
                        <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__deactivate_account_caption') }} </ps-label>                
                    </div>
                    <div class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col' @click="openPasswordUpdate">
                        <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">{{ $t('user_setting_modal__password_update') }}  </ps-label>
                        <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__password_update_caption') }} </ps-label>                
                    </div>
                    <div v-if="psValueHolder.showProfile == 'show'" @click="showProfile('hide')" class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                        <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">{{ $t('user_setting_modal__hide_profile') }}  </ps-label>
                        <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__hide_profile_caption') }}</ps-label>                
                    </div>
                    <div v-else @click="showProfile('show')" class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                        <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">{{ $t('user_setting_modal__show_profile') }}  </ps-label>
                        <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ $t('user_setting_modal__show_profile_caption') }}</ps-label>                
                    </div>
                    <div v-if="psValueHolder.notiSetting == 'true'" @click="shownotiSetting('hide')" class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                        <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">{{ $t('user_setting_modal__hide_noti') }}  </ps-label>
                        <!-- <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ psValueHolder.deviceToken }}</ps-label>    -->
                    </div>
                    <div v-else @click="shownotiSetting('true')" class='mt-3.5 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer  flex flex-col'>
                        <ps-label textColor="text-primary-500 dark:text-primaryDark-accent" class="lg:text-base text-xs">{{ $t('user_setting_modal__show_noti') }}  </ps-label>
                        <!-- <ps-label  class="mt-1 font-light lg:text-xs text-xxs"> {{ psValueHolder.deviceToken  }}</ps-label>    -->
                    </div>
                </div>
            </div>
            
        </template>
        <template #footer>
           
        </template>
    </ps-modal>

    <password-update-modal ref="password_update_modal" />

    <credit-card-modal ref="credit_card_modal" />

    <ps-confirm-dialog ref='ps_confirm_dialog' />

    <ps-loading-dialog ref="psloading"  :isClickOut='false'/>
    
</template>

<script lang='ts'>
import { defineComponent,ref } from 'vue';
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import CreditCardModal from '@/components/modules/credit/CreditCardModal.vue';
import PasswordUpdateModal from '@/components/modules/password/PasswordUpdateModal.vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import UserDeleteItemParameterHolder from '@/object/holder/UserDeleteItemParameterHolder';
import { createUserProviderState } from "@/store/modules/user/UserProvider";
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import PsStatus from '@/api/common/PsStatus';
import { i18n } from '@/assets/locales/index';
import router from '@/router';
import PsUtils from '@/utils/PsUtils';
import { createNotiProviderState } from '@/store/modules/noti/NotiProvider';
import NotiRegisterHolder from '@/object/holder/NotiRegisterHolder';
import NotiUnRegisterHolder from '@/object/holder/NotiUnRegisterHolder';
import PsConst from '@/object/constant/ps_constants';

export default defineComponent({
    name : 'UserSettingModal',
    components : {
        PsModal,
        PsLabel,
        CreditCardModal,
        PasswordUpdateModal,
        PsConfirmDialog,
        PsLoadingDialog,
        PsRouteLink
    },
    setup() {
        const psmodal = ref();
        const message = ref("Loading the data ....");
        const isPostCreditCardBool = true;
        let onSuccess;
        const credit_card_modal = ref();
        const password_update_modal = ref();
        const ps_confirm_dialog = ref();
        const psloading = ref();

        // Get Login User Id
        const psValueHolder = PsValueProvider.psValueHolder;
        const LoginUserId = psValueHolder.getLoginUserId();
        const notiProvider = createNotiProviderState();
        const holder = new NotiRegisterHolder();
        const holder1 = new NotiUnRegisterHolder();
        
        //for block user setting
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = LoginUserId;
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);

        const userdelete = new UserDeleteItemParameterHolder();

        //Inject Provider
        const userProvider = createUserProviderState();

        function openModal() {

            psmodal.value.toggle(true);
        }

        function closeModal() {
            psmodal.value.toggle(false);
        }

        function setMessage(messageStr) {
            message.value = messageStr;
        }
        
        // confirm dialog for user deactivate

        function openUserDeactivate(LoginUserId) {
           ps_confirm_dialog.value.openModal(
               i18n.global.t('user_setting_modal__confirm'),
               i18n.global.t('user_setting_modal__deactivate_msg'),
               i18n.global.t('user_setting_modal__ok'),
               i18n.global.t('user_setting_modal__cancel'),
                () => {
                     
                    doDeactivate(LoginUserId);
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
        }

        // Deactive Account

        async function doDeactivate(LoginUserId) {

            userdelete.userId = LoginUserId;

            psloading.value.openModal();
            const returnData = await userProvider.postDeleteUser(userdelete);
            psloading.value.closeModal();

            if(returnData.status == PsStatus.ERROR) {
               
                return;
            }else if(returnData.status == PsStatus.SUCCESS) {

                psValueHolder.logout();
             
                router.push({
                    name: "dashboard",
                });
                
            }

        }

        //password update modal

        function openPasswordUpdate() {
            password_update_modal.value.openModal();
        }

        // credit card update modal

        function openUpdateCreditCard() {
            credit_card_modal.value.openModal(isPostCreditCardBool, onSuccess);
        }
        
        function showProfile(value){
            psValueHolder.replaceshowProfile(value);
        }

        function shownotiSetting(value){
            if(value == 'hide') {
                
                holder1.platformName = PsConst.PLATFORM;
                holder1.deviceId = localStorage.deviceToken;
                holder1.userId = LoginUserId;
                notiProvider.unRegisterNotiToken(holder1);
               
            }else {
                
                holder.platformName = PsConst.PLATFORM;
                holder.deviceId = localStorage.deviceToken;
                holder.loginUserId = LoginUserId;
                notiProvider.registerNotiToken(holder);
               
            }
            psValueHolder.replaceNotiSetting(value);
        }
        return {
            showProfile,
            shownotiSetting,
            psmodal,
            openModal,
            closeModal,
            message,
            setMessage,
            credit_card_modal,
            password_update_modal,
            openUpdateCreditCard,
            openPasswordUpdate,
            openUserDeactivate,
            ps_confirm_dialog,
            psloading,
            LoginUserId,
            doDeactivate,
            psValueHolder,
            appInfoProvider,
            PsConst
        }
    },
})
</script>
