<template>
    <div class="sm:mt-32 lg:mt-36 mt-28 mb-16 w-mobile sm:w-median lg:w-large mx-auto">
        
        <!-- Account list -->
        <div class=" mb-4">
            <div class=" ">
                <ps-label class="text-xl sm:text-2xl lg:text-3xl font-medium">{{ $t("account_list__account_list") }} </ps-label>

            </div>
             <div class="flex content-center items-center mt-4">   

                <div class="w-68 h-10">
                    <ps-input type="text" class="w-full" name="search" v-bind:placeholder="$t('item_list__user_search')" v-model:value="userListHolder.keyword" @keyup.enter="usernameFilterClicked" />
                </div>
                
                <ps-dropdown align="left" class="ms-2 w-31 h-10">
                    <template #select>
                        <ps-label class="lg:rounded-2xl rounded-x h-full">
                            <button
                            type="button"
                            class="inline-flex items-center content-start justify-between w-full h-10 lg:rounded-2xl rounded-x
                            px-4  bg-primary-000 text-sm leading-5 font-medium text-secondary-500 
                            hover:text-secondary-400 focus:outline-none focus:border-blue-300 
                            focus:shadow-outline-blue active:bg-gray-100 active:text-secondary-600 transition 
                            ease-in-out duration-150 btn-focus
                            dark:bg-primaryDark-black dark:border-backgrounddark-500   "
                            aria-haspopup="true"
                            aria-expanded="true">
                            <font-awesome-icon :icon="['fas', 'filter']" class="text-sm  "  />
                            <ps-label class=" text-start text-xs sm:text-xxs lg:text-xs mx-2"> {{activeSortingName ? activeSortingName : 'Sorting'}} </ps-label>
                            <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="downArrow"   />
                            </button>
                        </ps-label>                      
                    </template>
                    <template #list >
                        <div class="rounded-md shadow-xs w-56 " >
                            <div class="pt-2 z-30">
                            
                                <div>
                                    
                                    <div v-for="sort in usersorting" :key="sort.id" 
                                        class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="usersortingFilterClicked(sort)" >
                                        <ps-label class="ms-2" :class="sort.id==activeSortingId ? ' font-medium' : 'font-light'"  > {{sort.name}} </ps-label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </template>
                </ps-dropdown>

            </div>
            <div class="flex flex-row mb-16 mt-4">
                <div class='w-full' >
                    <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                        <div class="w-full col-span-4 " v-for="user in userProvider.userList.data" :key="user.userId">
                             <user-search-list-horizontal @clickFollow="refleshData" :user="user" />
                        </div>
                    </div>

                    <ps-button v-if="userProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="userProvider.isNoMoreRecord ? 'hidden' : ''">{{ $t("notification_list__load_more") }} </ps-button>
                    <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("notification_list__loading") }}  </ps-button>

                </div>

            </div>
        </div>
        <ps-loading-dialog ref="ps_loading_dialog"  :isClickOut='false'/> 
        <!-- End List -->
    </div>
</template>

<script lang="ts">
// Vue
import { ref } from 'vue'
import router from '@/router';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsConst from '@/object/constant/ps_constants';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';

import { usePsValueHolderState } from '@/object/core/PsValueHolder';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import UserListParameterHolder from '@/object/holder/UserListParameterHolder';

// Models
import { createUserListProviderState } from "@/store/modules/user/UserListProvider";

// Modules
import UserSearchListHorizontal from "@/components/modules/user/UserSearchListHorizontal.vue";

export default {
    name : "AccountList",
    components : {
        UserSearchListHorizontal,
        PsButton,
        PsLabel,
        PsInput,
        PsDropdown,
        PsLoadingDialog
    },
    setup() {
        let activeSortingId = ref('');
        let activeSortingName = ref('');
        const userListHolder = new UserListParameterHolder();
        const ps_loading_dialog = ref();
         PsValueProvider.psValueHolder = usePsValueHolderState();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const usersorting = [
            { 
                id:"0", 
                orderBy:"user_name", 
                orderType:PsConst.FILTERING__ASC, 
                name:"Ascending"
            },
            { 
                id:"1", 
                orderBy:"user_name", 
                orderType:PsConst.FILTERING__DESC, 
                name:"Decending"
            }
        ];
        const userProvider = createUserListProviderState();
        async function usernameFilterClicked() {
            ps_loading_dialog.value.openModal();
            await userProvider.resetUserSearchList( loginUserId,userListHolder);

            
            ps_loading_dialog.value.closeModal();
        }

        // async function loadUserDataList() {
        //     ps_loading_dialog.value.openModal();
        //     await userProvider.loadUserSearchList( userListHolder);

            
        //     ps_loading_dialog.value.closeModal();
      
            

        // }

        async function usersortingFilterClicked(value) {
            
            activeSortingId.value = value.id;
            activeSortingName.value = value.name;
            userListHolder.orderBy = value.orderBy;
            userListHolder.orderType = value.orderType;
            refleshData()
            
        }

        userProvider.loadUserSearchList( loginUserId,userListHolder);

        function loadMore() {             
            userProvider.loadUserSearchList(loginUserId, userListHolder);
        }

        function notiClicked(noti: any) {
            // Redirect
            router.push({
                name: "notification",
                params: { 
                    notificationId: noti.id,
                    message: noti.message,
                    description: noti.description,
                    image: noti.defaultPhoto.imgPath

                     },
            });
        }
        async function refleshData(){

            ps_loading_dialog.value.openModal();
            await userProvider.refleshUserSearchList( loginUserId,userListHolder);

            
            ps_loading_dialog.value.closeModal();
        }

        return {
            // loginUserId,
            ps_loading_dialog,
            refleshData,
            userListHolder,
            userProvider,
            notiClicked,
            loadMore,
            usernameFilterClicked,
            usersortingFilterClicked,
            activeSortingId,
            activeSortingName,
            usersorting,
        };
    }
}
</script>