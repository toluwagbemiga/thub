<template>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 ">
                <div class="flex flex-col items-start mt-10">
                    <ps-label-header-4 class=" mb-4 font-medium"> {{ $t("follower_list__follower_list") }} </ps-label-header-4>
                    <ps-label textColor=""> {{ $t("follower_list__test") }}</ps-label>
                </div>
                <div class=" flex items-center mt-8"> 
                    <ps-route-link :to="{ name: 'profile'}">                          
                        <ps-label
                            class="hover:underline cursor-pointer font-medium"> 
                                {{ breadcrumbuserProvider.user.data ? breadcrumbuserProvider.user.data.userName:'' }}
                        </ps-label>
                    </ps-route-link> 

                    <ps-icon name="rightArrow" class='mx-2'/>

                    <ps-label class="font-light"> {{ $t("follower_list__follower_list") }} </ps-label>
                </div>

                <div class="flex flex-col pb-16 mt-4">
                    <div class="flex flex-row ">
                        <div class='w-full ' >
                            <div v-if="userProvider.userList.data != null" class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">
                                <div class="w-full col-span-2 lg:col-span-3" v-for="user in userProvider.userList.data" :key="user.userId">
                                    <ps-route-link :to="{ name: 'other-profile', params: { userId: user.userId }}">
                                        <user-list-horizontal  :user="user" /> 
                                    </ps-route-link> 
                                </div>
                            </div>
                            <div v-else-if="userProvider.loading.value==false" class="w-full flex justify-center">
                                <ps-label textColor="text-secondary-500 dark:text-secondaryDark-white lg:text-xl sm:text-lg text-base font-medium" class="mt-10 flex-grow-0 mx-auto"> {{ $t("list__no_result") }} </ps-label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <ps-button v-if="userProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="userProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("follower_list__load_more") }} </ps-button>
                    <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("follower_list__loading") }} </ps-button> 
                </div>
                         
            </div>
        </template>
    </ps-content-container>
</template>

<script lang="ts">
import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

//Modules
import { createUserListProviderState } from "@/store/modules/user/UserListProvider";
import { createUserProviderState } from "@/store/modules/user/UserProvider";
import UserListHorizontal from "@/components/modules/user/UserListHorizontal.vue";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";

import UserParameterHolder from '@/object/holder/UserParameterHolder';

export default {
    name : "FollowerListView",
    components : {
        PsContentContainer,
        PsLabelHeader4,
        UserListHorizontal,
        PsLabel,
        PsButton,
        PsIcon,
        PsRouteLink
    },
    setup() {
        
        const psValueHolder = PsValueProvider.psValueHolder;
        const userProvider = createUserListProviderState();
        const breadcrumbuserProvider = createUserProviderState();
        const loginUserId = psValueHolder.getLoginUserId();
        const paramHolder = new UserParameterHolder().getFollowerUsers();

        paramHolder.loginUserId = loginUserId;

        // Load User By ID List
        userProvider.loadUserList(paramHolder);

        // Load User By ID List
        breadcrumbuserProvider.getUser(loginUserId);

        function loadMore() {             
            userProvider.loadUserList(paramHolder);
        }

        return {
            userProvider,
            loadMore,
            breadcrumbuserProvider
        }
    }
}
</script>