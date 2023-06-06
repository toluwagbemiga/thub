<template>
    <div class="sm:mt-32 lg:mt-36 mt-28 w-mobile sm:w-median lg:w-large mx-auto">
        <div class=" mb-4 flex items-center mt-24"> 
            <ps-route-link :to="{name: 'category-list'}">
                <ps-label
                    class="hover:underline cursor-pointer font-medium"> 
                        {{ $t("sub_category_list__category") }} 
                </ps-label>
            </ps-route-link>
            

            <ps-icon name="rightArrow" class='mx-2'/>

            <ps-label class="font-light"> {{ $t("sub_category_list__sub_category") }} </ps-label>
            
        </div>
        <!--Start search flex mobile and desktop -->
        <div class="pt-1 lg:flex md:flex lg:justify-between md:justify-between mb-2">
           
           <div class="flex mt-1 ">
                <ps-label-header-4 class="font-medium"> {{ $t("sub_category_list__title") }} </ps-label-header-4>
                <div v-if="appInfoProvider?.appInfo?.data?.psAppSetting?.isSubcatSubscription == PsConst.ONE" class="ms-32 sm:hidden">                                
                    <ps-icon v-if="!scribe" class="ms-2 text-primary-500 dark:text-primaryDark-accent" @click="subCatScribe" name="bell-plus" h="20" w="20"/>
                    <ps-icon v-if="scribe" class="ms-2 text-primary-500 dark:text-primaryDark-accent" name="checkbox-marked" @click="submitScribe" h="30" w="30"/>
                </div>
            </div>

            <div class="flex content-center items-center mt-1">   
                <div class="lg:w-68 lg:h-10 w-51 h-8">
                    <ps-input type="text" class="w-full lg:text-sm text-xs" name="search" v-bind:placeholder="$t('sub_category_list__search')" v-on:keyup.enter="searchClicked" v-model:value="subCategoryProvider.paramHolder.keyword" />
                </div>

                <!-- start keyword search -->
                <ps-dropdown align="left" class="ms-2 lg:w-31 lg:h-10 sm:w-22 sm:h-8">
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
                                    <!-- <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                        @click="sortingFilterClicked({id:'', name:'Sorting'})" >
                                        <ps-label class="ms-2" :class="activeSortingId =='' ? ' font-medium' : 'font-light'"  > {{ $t("category_list__sorting") }}  </ps-label>
                                    </div> -->
                                    <div v-for="sort in currentsorting" :key="sort.id" 
                                        class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="sortingFilterClicked(sort)" >
                                        <ps-label class="ms-2" :class="sort.id==activeSortingId ? ' font-medium' : 'font-light'"  > {{sort.name}} </ps-label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </template>
                </ps-dropdown>
                <!-- end keyword search -->
                <div v-if="appInfoProvider?.appInfo?.data?.psAppSetting?.isSubcatSubscription == PsConst.ONE" class="lg:block md:block hidden">                                
                    <ps-icon v-if="!scribe" class="ms-2 text-primary-500 dark:text-primaryDark-accent" @click="subCatScribe" name="bell-plus" h="20" w="20"/>
                    <ps-icon v-if="scribe" class="ms-2 text-primary-500 dark:text-primaryDark-accent" name="checkbox-marked" @click="submitScribe" h="30" w="30"/>
                </div>
            </div>
        </div>
        <!-- subcategory list -->
        <div class="flex flex-col ">
            <div class="flex flex-col items-start mt-2 ">
                <ps-route-link
                    :to="{name: 'item-list', 
                    query: { 
                    cat_id: catId, 
                    cat_name: catName } }"> 
                    <ps-label-header-4  
                    class="hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer border border-primary-500 dark:border-primaryDark-accent rounded-md px-2 "> 
                            {{ catName }}
                    </ps-label-header-4>      
                </ps-route-link> 
                
            </div>
           
            <div class="flex flex-row mb-8 ">
                <div class='w-full flex flex-col' >
                    <div class="grid lg:grid-cols-12 sm:grid-cols-6 grid-cols-4  gap-2 sm:gap-3.5 lg:gap-4 sm:mt-4 mt-2 gap-y-4 ">

                        <!-- Column -->
                        <div class="w-full lg:col-span-2  col-span-1" v-for="subCategory in subCategoryProvider.subCategoryList.data" :key="subCategory.id">
                         
                            <div class="flex flex-col mt-2 w-full h-auto cursor-pointer">
        
                                <div class="relative bg-black lg:h-40 sm:h-28 h-20 rounded-md">
                                    
                                    <div class="absolute opacity-50">
                                        
                                        <img alt="Placeholder" width="150px" height="100px" class="w-screen block mx-auto lg:h-40 sm:h-28 h-20 object-cover rounded-md" :src="subCategoryProvider.imageUrl(subCategory ? subCategory.defaultPhoto.imgPath : '',3) " @error="subCategoryProvider.defaultCarImage">
                                        
                                    </div>
                                    <div class="relative justify-end flex">
                                        <custom-checkbox :isScribe="subCategory.isSubScribe" :checked="subCategory.id+'_FE'" :value="subCategory.id+'_FE'" 
                                            @updateSelectedValue="updateValue" v-model:selectedValue="checkedSelectedList" v-if="scribe"></custom-checkbox>
                                    </div>
                                    <div class="mx-auto lg:pt-16 sm:pt-12 pt-10 relative flex">
                                        <ps-route-link class="flex-grow"
                                            :to="{name: 'item-list', 
                                            query: { 
                                                cat_id: catId, 
                                                cat_name: catName,
                                                sub_cat_id: subCategory.id, 
                                                sub_cat_name: subCategory.name, } }" > 
                                        
                                        <ps-label class="absolute w-full  lg:text-lg sm:text-sm text-xs text-center leading-4" textColor="text-textLight"> {{subCategory ? subCategory.name : ''}} </ps-label>
                                         </ps-route-link>
                                    </div>

                                </div>  
                            </div>
                        </div>
                        <!-- END Column -->
                       
                    </div>

                    <ps-button v-if="subCategoryProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="subCategoryProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("sub_category_list__load_more") }} </ps-button>
                    <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("sub_category_list__loading") }} </ps-button>

                </div>

            </div>
        </div>
    </div>
    <ps-loading-dialog ref="ps_loading_dialog" class='z-40' />
    <ps-success-dialog ref="success" />
    <ps-error-dialog ref="ps_error_dialog" />
</template>

<script lang="ts">

import {  ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import CustomCheckbox from '@/components/core/checkbox/CustomCheckbox.vue';
//import SubCategoryHorizontalItem from '@/components/modules/subCategory/SubCategoryHorizontalItem.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsSuccessDialog from '@/components/core/dialog/PsSuccessDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsConst from '@/object/constant/ps_constants';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt,faFilter } from '@fortawesome/free-solid-svg-icons';
library.add(faMapMarkedAlt,faFilter)

import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { createSubCategoryProviderState } from '@/store/modules/subCategory/SubCategoryProvider';
import { createSubCategoryScribeProviderState } from '@/store/modules/subCategory/SubCategoryScribeProvider';
import SubCategoryScribeParameterHolder from '@/object/holder/SubCategoryScribeParameterHolder';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import PsStatus from '@/api/common/PsStatus';
import  firebase  from 'firebase/app';
import 'firebase/messaging'
import { i18n } from '@/assets/locales/index';

export default {
    name: 'SubCategoryListView',
    components : {
        PsButton,
        PsLabel,
        PsLabelHeader4,
       // SubCategoryHorizontalItem,
        PsIcon,
        PsRouteLink,
        PsInput,
        PsDropdown,
        PsLoadingDialog,
        PsErrorDialog,
        CustomCheckbox,
        PsSuccessDialog
    },
    setup (){
        localStorage.catId = "";
        const route = useRoute();
        const catId = route.params.catId.toString();
        const catName = route.params.catName.toString();
        const subCategoryProvider = createSubCategoryProviderState();
        const subCategoryScribeProvider = createSubCategoryScribeProviderState();
        const holder = new SubCategoryScribeParameterHolder();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        const appInfoProvider = usePsAppInfoProviderState();
        
        const ps_loading_dialog = ref();
        let activeSortingId = ref('');
        let activeSortingName = ref('');
        let scribe = ref(false);
        let checkedSelectedList = ref([]);
        const success = ref();
        const ps_error_dialog =ref();
        const currentsorting = [
            { 
                id:"0", 
                orderBy:"name", 
                orderType:PsConst.FILTERING__ASC, 
                name:"Ascending"
            },
            { 
                id:"1", 
                orderBy:"name", 
                orderType:PsConst.FILTERING__DESC, 
                name:"Decending"
            }
        ];
        async function loadAppInfo(){
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
        }
        loadAppInfo();

        subCategoryProvider.paramHolder.catId = catId;
        setTimeout(async ()=>{
               
            await loadDataList();
            
                    
        },1000);

        function sortingFilterClicked(value) {
            activeSortingId.value = value.id;
            activeSortingName.value = value.name;
            subCategoryProvider.paramHolder.orderBy = value.orderBy;
            subCategoryProvider.paramHolder.orderType = value.orderType;
            loadDataList();
            
        }

        function subCatScribe() {
            scribe.value= true;
        }

        ///start firebase subscribe
        const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
        function subscribeTokenToTopic(token, topic) {
            if(!messaging) return;
            fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'key=' + appInfoProvider.appInfo.data.frontendConfigSetting.fcmServerKey
                })
            }).then(response => {
                if (response.status < 200 || response.status >= 400) {

                    throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
                }
                console.log('Subscribed to "' + topic + '"');
            }).catch(error => {
                console.error(error);
            })
        }
        ///end firebase

        async function submitScribe() {
          
            for (var i = 0; i < checkedSelectedList.value.length; i++) {  
                subscribeTokenToTopic(localStorage.deviceToken,checkedSelectedList.value[i]);
            }
            holder.userId = loginUserId;
            holder.catId = catId;
            holder.subCatIds = checkedSelectedList.value;
            console.log(checkedSelectedList);
            checkedSelectedList.value = [];
            const status = await subCategoryScribeProvider.subCategoryScription(holder);
             if(status.status == PsStatus.SUCCESS){

                await subCategoryProvider.resetSearchSubCategoryList(loginUserId,subCategoryProvider.paramHolder);

                ps_loading_dialog.value.closeModal();
                success.value.openModal('', i18n.global.t('sub_category_list__scribe_success'));
                scribe.value= false;
            }
           
        }
       
        function searchClicked() {
            loadDataList();
        }
        async function loadDataList() {
            ps_loading_dialog.value.openModal();

            await subCategoryProvider.resetSearchSubCategoryList(loginUserId,subCategoryProvider.paramHolder);

            ps_loading_dialog.value.closeModal();
        }    
        
        function loadMore() {             
            subCategoryProvider.resetSearchSubCategoryList(loginUserId,subCategoryProvider.paramHolder);
        }


        function categoryClick(){
            router.push({
                name: "category-list"
            });
        }
        function updateValue(value){
            checkedSelectedList.value = value;
        }

        return {
            updateValue,
            subCategoryProvider,
            loadMore,
            categoryClick,
            catId,
            catName,
            currentsorting,
            sortingFilterClicked,
            activeSortingId,
            activeSortingName,
            ps_loading_dialog,
            searchClicked,
            subCatScribe,
            scribe,
            submitScribe,
            checkedSelectedList,
            success,
            ps_error_dialog,
            appInfoProvider,
            PsConst
        }
    }
    
}
</script>