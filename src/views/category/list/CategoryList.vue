<template>
    <div class="sm:mt-32 lg:mt-36 mt-28 w-mobile sm:w-median lg:w-large mx-auto">
        <div>
        <!-- category list -->
        <div class="flex flex-col mb-4">
            <div class="flex flex-col items-start mt-2">
                <div class=" flex items-center mt-8"> 
                    <ps-route-link :to="{ name: 'dashboard'}">                          
                        <ps-label
                            class="hover:underline cursor-pointer font-medium"> 
                                Home
                        </ps-label>
                    </ps-route-link> 

                    <ps-icon name="rightArrow" class='mx-2'/>

                    <ps-label class="font-light" > {{ $t("category_list__title") }} </ps-label>
                    
                </div>
                
            </div>
            <!--Start search flex mobile and desktop -->
            <div class="pt-1 lg:flex md:flex lg:justify-between md:justify-between mb-2">
                
                <div class="flex mt-1 items-center">
                    <ps-label-header-4 class="font-medium"> {{ $t("category_list__title") }} </ps-label-header-4>
                </div>
                 <!-- start keyword search -->
                <div class="flex content-center items-center mt-1 ">   
                    <div class="lg:w-68 lg:h-10 w-51 h-8">
                        <ps-input type="text" class="w-full lg:text-sm text-xs" name="search" v-bind:placeholder="$t('category_list__search')" v-on:keyup.enter="searchClicked" v-model:value="categoryProvider.paramHolder.keyword" />
                    </div>
                   
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
                                <font-awesome-icon :icon="['fas', 'filter']" class="text-sm  lg:block hidden"  />
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
                </div>
                 <!-- end keyword search -->
            </div>
             <!-- End search flex mobile and desktop -->
            <div class="flex flex-row mb-8 mt-4">
                <div class='w-full ' >
                    <div class="grid lg:grid-cols-12 sm:grid-cols-6 grid-cols-4  gap-2 sm:gap-3.5 lg:gap-4 mt-6 gap-y-4 ">

                        <!-- Column -->
                        <div class="w-full lg:col-span-2  col-span-1" v-for="category in categoryProvider.itemList.data" :key="category.catId">
                            <ps-route-link
                                :to="{name: 'sub-category-list', 
                                params: {catId: category.catId , catName: category.catName} }"> 
                                <category-horizontal-item  :category="category" />
                            </ps-route-link> 
                        </div>
                        <!-- END Column -->

                    </div>

                    <ps-button v-if="categoryProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadMore" :class="categoryProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("category_list__load_more") }} </ps-button>
                    <ps-button v-else class="w-60 mx-auto mt-8" @click="loadMore" :disabled="true"> {{ $t("category_list__loading") }} </ps-button>
                </div>
            </div>
        </div>
        <!-- End category List -->
        </div>
    </div>
    <ps-loading-dialog ref="ps_loading_dialog" class='z-40' />
</template>

<script lang="ts">

import { createCategoryProviderState } from "@/store/modules/category/CategoryProvider";
import {  ref } from 'vue';
 import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
 import PsIcon from '@/components/core/icons/PsIcon.vue';

import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import CategoryHorizontalItem from '@/components/modules/category/CategoryHorizontalItem.vue';
import PsConst from '@/object/constant/ps_constants';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt,faFilter } from '@fortawesome/free-solid-svg-icons';
library.add(faMapMarkedAlt,faFilter)

export default {
    name: 'CategoryListView',
    components : {
        PsButton,
        PsLabel,
        PsLabelHeader4,
        CategoryHorizontalItem,
        PsRouteLink,
        PsIcon,
        PsInput,
        PsDropdown,
        PsLoadingDialog
    },
    setup (){
       
        const categoryProvider = createCategoryProviderState();
        const ps_loading_dialog = ref();
        let activeSortingId = ref('');
        let activeSortingName = ref('');
        const currentsorting = [
            { 
                id:"0", 
                orderBy:"cat_name", 
                orderType:PsConst.FILTERING__ASC, 
                name:"Ascending"
            },
            { 
                id:"1", 
                orderBy:"cat_name", 
                orderType:PsConst.FILTERING__DESC, 
                name:"Decending"
            }
        ];

        setTimeout(async ()=>{
               
            await loadDataList();
                    
        },1000);

        function sortingFilterClicked(value) {
            activeSortingId.value = value.id;
            activeSortingName.value = value.name;
            categoryProvider.paramHolder.orderBy = value.orderBy;
            categoryProvider.paramHolder.orderType = value.orderType;
            loadDataList();
            
        }

        function searchClicked() {
            loadDataList();
        }

        async function loadDataList() {
            ps_loading_dialog.value.openModal();

            await categoryProvider.resetCategoryList(PsConst.NO_LOGIN_USER, categoryProvider.paramHolder);
            
            ps_loading_dialog.value.closeModal();
        }
       

        function loadMore() {  
            categoryProvider.loadItemList(PsConst.NO_LOGIN_USER, categoryProvider.paramHolder);
        }

        return {
            categoryProvider,
            loadMore,
            currentsorting,
            sortingFilterClicked,
            activeSortingId,
            activeSortingName,
            ps_loading_dialog,
            searchClicked
        }
    }
    
}
</script>