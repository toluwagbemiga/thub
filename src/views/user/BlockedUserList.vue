<template>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 ">
                <div class="flex flex-col items-start">
                    <ps-label-header-4 class=" mb-4 font-medium"> {{ $t("block_user_list__block_user_list") }}</ps-label-header-4>
                    <ps-label > {{ $t("block_user_list__text") }}</ps-label>
                </div>
                <div class=" mb-4 flex items-center  mt-8"> 
                    <ps-route-link :to="{ name: 'profile'}">                          
                        <ps-label
                            class="hover:underline cursor-pointer font-medium"> 
                                {{ breadcrumbuserProvider.user.data ? breadcrumbuserProvider.user.data.userName:'' }}
                        </ps-label>
                    </ps-route-link> 

                    <ps-icon name="rightArrow" class='mx-2'/>

                    <ps-label class="font-light dark:text-secondaryDark-white"> {{ $t("block_user_list__block_user_list") }} </ps-label>
                </div>

                <div class="flex flex-col pb-16">
                    <div class="flex flex-row ">
                        <div class='w-full ' >
                            <div v-if="blockuserProvider.blockUserList.data != null" class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4  ">
                                <div class="w-full col-span-2 lg:col-span-3" v-for="block in blockuserProvider.blockUserList.data" :key="block.userId">
                                    <block-user-list-horizontal  :block="block" :onClick="unBlockClicked"  /> 
                                </div>
                            </div>
                            <div v-else-if="blockuserProvider.loading.value==false" class="w-full flex justify-center">
                                <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white lg:text-xl sm:text-lg text-base font-medium" class="mt-10 flex-grow-0 mx-auto"> {{ $t("list__no_result") }} </ps-label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <ps-button v-if="blockuserProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="blockuserProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("block_user_list__load_more") }} </ps-button>
                    <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("block_user_list__loading") }} </ps-button> 
                </div>
                         
            </div>
        </template>
    </ps-content-container>
    <ps-confirm-dialog ref='ps_confirm_dialog' />
    <ps-loading-dialog ref="psloading"  :isClickOut='false'/> 
</template>

<script lang="ts">
// Vue
import { ref } from 'vue';

import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

//Modules
import { createBlockUserProviderState } from "@/store/modules/user/BlockUserProvider";
import { createUserProviderState } from "@/store/modules/user/UserProvider";
import BlockUserListHorizontal from "@/components/modules/user/BlockUserListHorizontal.vue";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { createOtherUserProviderState } from "@/store/modules/user/OtherUserProvider";

import UserBlockParameterHolder from '@/object/holder/UserBlockParameterHolder';
import PsStatus from '@/api/common/PsStatus';
import { i18n } from '@/assets/locales/index';
import PsUtils from '@/utils/PsUtils';

export default {
    name : "BlockedUserListView",
    components : {
        PsContentContainer,
        PsLabelHeader4,
        BlockUserListHorizontal,
        PsLabel,
        PsButton,
        PsIcon,
        PsLoadingDialog,
        PsConfirmDialog,
        PsRouteLink
    },
    setup() {
     
        const ps_confirm_dialog = ref();
        const psloading = ref();
        const psValueHolder = PsValueProvider.psValueHolder;
        const blockuserProvider = createBlockUserProviderState();
        const breadcrumbuserProvider = createUserProviderState();
        const userProvider = createOtherUserProviderState();

        const loginUserId = psValueHolder.getLoginUserId();
        const userblock = new UserBlockParameterHolder();
        // Load User By ID List
        blockuserProvider.loadBlockedUserList(loginUserId);
      
        // Load User By ID List
        breadcrumbuserProvider.getUser(loginUserId);

        function loadMore() {             
            blockuserProvider.loadBlockedUserList(loginUserId);
        }

       // UnBlock this user

        function unBlockClicked(block) {
            ps_confirm_dialog.value.openModal(
                i18n.global.t('blocked_user_list__confirm'),
                i18n.global.t('blocked_user_list__confirm_to_unblock_user'),
                i18n.global.t('blocked_user_list__unblock'),
                i18n.global.t('blocked_user_list__cancel'),
                () => {
                    doUnBlock(block.userId);
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
        }
        //unblock user

        //Block User
        async function doUnBlock(userId) {

            userblock.loginUserId = loginUserId;
            userblock.addedUserId = userId;
            psloading.value.openModal();
            const returnData = await userProvider.postUnBlockUser(userblock);
            
            if(returnData.status == PsStatus.ERROR) { 
                 psloading.value.closeModal();
                return;
            }else if(returnData.status == PsStatus.SUCCESS) {
              
                blockuserProvider.resetBlockedUserList(loginUserId);
                psloading.value.closeModal();
                
            }
        }
        return {
            blockuserProvider,
            loadMore,
            breadcrumbuserProvider,
            unBlockClicked,
            doUnBlock,
            ps_confirm_dialog,
            psloading
        }
    }
}
</script>