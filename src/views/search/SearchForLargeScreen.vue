<template>
    <div class=" w-full lg:rounded-2xl sm:rounded-xl rounded-2xl sm:flex mt-4 sm:mt-0 ">
        <div class="me-1 flex-grow">
            <ps-input-with-left-icon theme="ring-primary-200 dark:ring-primaryDark-grey focus:outline-none focus:ring focus:border-primary-200 lg:rounded-2xl rounded-x bg-primary-000 dark:bg-primaryDark-black text-secondary-500 dark:text-secondaryDark-white" height="h-10" v-on:keyup.enter="searchClicked"  v-model:value="searchKeyword" :placeholder= "$t('search_for_large_screem__search')" >
                <template #icon>
                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="search" class='cursor-pointer'  />
                </template>
            </ps-input-with-left-icon>
        </div>
        <ps-dropdown :id="locationId ?? 'locaitonid'" align="left" class='sm:w-3/12 my-2 sm:my-0 w-full h-full lg:rounded-2xl rounded-x' @onClick="loadLocationList" v-on:keyup.enter="filterKeywordUpate(locationKeyword)">
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
                     <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="location" />
                    <ps-label class=" text-start text-xs sm:text-xxs lg:text-xs"> {{locationName}} </ps-label>
                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="downArrow"   />
                    </button>
                </ps-label>
            </template>
            <template #filter >
                <div class="w-56">
                    <ps-input-with-right-icon class="rounded-xl flex-1 " @keyup.enter="filterKeywordUpate(locationKeyword)" v-model:value="locationKeyword" v-bind:placeholder= "$t('search_for_large_screem__location')" >
                    <template #icon>
                        <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="search" class='cursor-pointer' @click="filterKeywordUpate(locationKeyword)"/>
                    </template>
                    </ps-input-with-right-icon>            
                </div>
            </template>
            <template #list >
                                
                <div class="pt-2 z-30">
                    <div  v-if="itemlocationProvider.loading.value == true" class='w-56 flex py-4 px-2 items-center'>
                        <ps-label-caption class="ms-2" > {{ $t("search_for_large_screem__loading") }} </ps-label-caption>
                    </div>
                    <div v-else class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  @click="locationFilterClicked('','All','','')" >
                        <ps-label class="ms-2" :class="locationId =='' ? ' font-bold text-primary-700' : ''"  > All </ps-label>
                    </div>
                    <div v-for="selectData in itemlocationProvider.itemLocationList.data" :key="selectData.id" class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  @click="locationFilterClicked(selectData.id,selectData.name,selectData.lat,selectData.lng)" >
                        <ps-label class="ms-2" :class="selectData.id==locationId ? ' font-bold text-primary-700' : ''"  > {{selectData.name}} </ps-label>
                    </div>
                    <div class="border-t border-gray-100 "></div>
                </div>
            </template>
            <template #loadmore>
                                
                <div class=" w-56">
                    <div  v-if="itemlocationProvider.itemLocationList.data != null
                    && itemlocationProvider.loading.value == true" class='py-4 px-2 flex'>
                    <ps-label-caption >{{ $t("search_for_large_screem__loading") }} </ps-label-caption>
                    </div>
                    <ps-label class="flex py-4 px-2 underline font-bold cursor-pointer ms-2"   @click="loadLocationList" > {{ $t("search_for_large_screem__load_more") }} </ps-label>
                </div>   
             </template>
        </ps-dropdown>
 
    <div class="me-1">
   </div>
        <ps-dropdown :id="sublocationId ?? 'sublocation'" align="left" class='sm:w-4/12 w-full h-full lg:rounded-2xl rounded-x' @onClick="loadSubLocation(locationId)" v-if="appInfoProvider.appInfo.data?.psAppSetting?.isSubLocation == '1'">
            <template #select>
                <ps-label class="lg:rounded-2xl rounded-xshadow-sm h-full">
                    <button
                    type="button"
                    class="inline-flex items-center content-start justify-between w-full h-10 lg:rounded-2xl rounded-x
                    px-4  bg-primary-000 text-sm leading-5 font-medium text-secondary-500 
                    hover:text-secondary-400 focus:outline-none focus:border-blue-300 
                    focus:shadow-outline-blue active:bg-gray-100 active:text-secondary-600 transition 
                    ease-in-out duration-150 btn-focus
                    dark:bg-primaryDark-black dark:border-backgrounddark-500 "
                    aria-haspopup="true"
                     aria-expanded="true">
                     <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="location" />
                    <ps-label class=" text-start text-xs sm:text-xxs lg:text-xs"> {{sublocationName}} </ps-label>
                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="downArrow"   />
                    </button>
                </ps-label>
            </template>
            <template #filter >
                <div class="w-56">
                    <ps-input-with-right-icon class="rounded-xl flex-1 " @keyup.enter="filtersubLocationUpdate(sublocationKeyword)" v-model:value="sublocationKeyword" v-bind:placeholder= "$t('search_for_large_screem__sub_location')" >
                    <template #icon>
                        <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="search" class='cursor-pointer' @click="filtersubLocationUpdate(sublocationKeyword)"/>
                    </template>
                    </ps-input-with-right-icon>            
                </div>
            </template>
            <template #list >
                                
                <div class="pt-2 z-30">
                    <div  v-if="subLocationProvider.loading.value == true" class='mt-4 ms-4 mb-4 flex'>
                        <ps-label-caption > {{ $t("search_for_large_screem__loading") }} </ps-label-caption>
                    </div>
                    <div v-else class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  @click="subLocationFilterClicked('','All')" >
                        <ps-label class="ms-2" :class="sublocationId == '' ? 'font-bold text-primary-700' : ''"  > All </ps-label>
                    </div>
                    <div v-for="selectData in subLocationProvider.locationTownshipList.data" :key="selectData.id" class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  @click="subLocationFilterClicked(selectData.id, selectData.townshipName)" >
                        <ps-label class="ms-2" :class="selectData.id==sublocationId ? 'font-bold text-primary-700' : ''"  > {{selectData.townshipName}} </ps-label>
                    </div>
                    <div class="border-t border-gray-100 "></div>
                </div>
            </template>
            <template #loadmore>
                                
                <div class="mb-2 w-56">
                    <div  v-if="subLocationProvider.locationTownshipList.data != null
                    && subLocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                    <ps-label-caption >{{ $t("search_for_large_screem__loading") }} </ps-label-caption>
                    </div>
                    <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"   @click="loadSubLocation(locationId)" > {{ $t("search_for_large_screem__load_more") }} </ps-label>
                </div>   
             </template>
        </ps-dropdown>
    <div class="me-1">
   </div>
    <div class="flex">
        <div class="flex-grow-0 mx-auto my-2 sm:my-0">
            <ps-button v-bind:title="$t('search_for_large_screem__search')" class="py-3 bg-primary-500 dark:bg-primaryDark-accent hover:bg-primary-400 " rounded="lg:rounded-2xl rounded-x" @click="searchClicked">
                <ps-label class="text-xs font-medium" textColor="text-textLight dark:text-textDark"> {{ $t("search_for_large_screem__search") }} </ps-label>
            </ps-button>
        </div>
    </div>
    </div>

    <ps-loading-dialog ref="ps_loading_dialog"  :isClickOut='false'/> 
</template>

<script lang="ts">

// Libs
import {  ref } from 'vue';

import router from "@/router";

// Components
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsInputWithLeftIcon from '@/components/core/input/PsInputWithLeftIcon.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsInputWithRightIcon from '@/components/core/input/PsInputWithRightIcon.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';

// Providers
import { useItemLocationProviderState } from '@/store/modules/itemlocation/ItemLocationProvider';
import { createItemLocationTownshipProviderState } from '@/store/modules/itemLocationTownship/ItemLocationTownshipProvider';
import { useProductProviderState } from '@/store/modules/item/ProductProvider';
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';

import LocationParameterHolder from '@/object/holder/LocationParameterHolder';
import LocationTownshipParameterHolder from '@/object/holder/LocationTownshipParameterHolder';


export default {
    name : "SearchForLargeScreenView",
    components: {
        PsButton,
        PsLabel,
        PsLabelCaption,
        PsInputWithLeftIcon,
        PsIcon,
        PsDropdown,
        PsInputWithRightIcon,
        PsLoadingDialog,        
    },
    props : {
        data : {
            type: String,
            default: '0'
        },  
    },
    emits: ['clicklocation','onSubclick'],
    setup( props, context ) {
        
        // Inject Provider
        const locationKeyword = ref('');
        const sublocationKeyword = ref('');
        
        const psValueHolder = PsValueProvider.psValueHolder;
        const ps_loading_dialog = ref();
    
        psValueHolder.updateExpiryTimeForAction(); // only call from dashboard
        const appInfoProvider = usePsAppInfoProviderState();
        const searchKeyword = ref("");
        const locationName = ref(psValueHolder.locationName ?? 'All');
        const locationId = ref(psValueHolder.locationId);
        const sublocationId = ref(psValueHolder.locationId); 
        const sublocationName = ref(psValueHolder.subLocationName ?? 'All'); 

        const itemlocationProvider = useItemLocationProviderState();
        const subLocationProvider = createItemLocationTownshipProviderState();

        const itemProvider = useProductProviderState();


        const loginUserId = psValueHolder.getLoginUserId();

        const paramHolder = new LocationParameterHolder().getDefaultParameterHolder();
        const subparamHolder = new LocationTownshipParameterHolder();


        async function searchClicked() {
     
            itemProvider.paramHolder.searchTerm = searchKeyword.value;
            itemProvider.paramHolder.itemLocationName = locationName.value.toString();
            itemProvider.paramHolder.itemLocationId = locationId.value;
            itemProvider.paramHolder.itemLocationTownship = psValueHolder.subLocationId;
            itemProvider.paramHolder.itemLocationName = psValueHolder.locationName;
            itemProvider.paramHolder.itemLocationTownshipName = psValueHolder.subLocationName;
            itemProvider.paramHolder.status = '1';

            searchKeyword.value = '';
                
            const params = itemProvider.paramHolder.getUrlParamsAndQuery();
            params['name'] = 'item-list';
            console.log(params);
            router.push(params);
            
        }

        function loadLocationList() {
        
            itemlocationProvider.loadItemLocationList(psValueHolder.getLoginUserId(), paramHolder);
        }

        function loadSubLocation(itemLocationId) { 
            subLocationProvider.loadItemLocationTownshipList(itemLocationId);      
        }

        async function locationFilterClicked(id,name,lat,lng) {
                
            locationId.value = id;
            locationName.value = name;

            psValueHolder.replaceLocation(id, name, lat, lng);   
            psValueHolder.replaceSubLocation('', 'All');    
            
            sublocationId.value = '';
            sublocationName.value = 'All';
            itemProvider.paramHolder.itemLocationTownship = ''; 
            itemProvider.paramHolder.itemLocationTownshipName = 'All';
            await itemProvider.updateLocation(loginUserId, locationId.value, locationName.value);
            subLocationProvider.resetItemLocationTownshipList(id);
            context.emit('clicklocation', {id: id,name: name,lat: lat,lng: lng});

        }

        async function subLocationFilterClicked(id,townshipName) {
            sublocationId.value = id; 
            sublocationName.value = townshipName; 
            psValueHolder.replaceSubLocation(id, townshipName);    
            itemProvider.paramHolder.itemLocationTownship = id; 
            itemProvider.paramHolder.itemLocationTownshipName = townshipName;
            context.emit('onSubclick', {id: locationId.value,name: locationName.value,subId: id,subName: townshipName});
            
        }

        function filterKeywordUpate(value) {
            itemlocationProvider.filterKeywordUpate(value,loginUserId, paramHolder);
        }

        function filtersubLocationUpdate(value) {
            subparamHolder.keyword = value;
            subparamHolder.locationId = locationId.value;
            subLocationProvider.filtersubLocationUpdate(loginUserId,subparamHolder);
        }

        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);

        return {
            PsValueProvider,
            itemlocationProvider,
            subLocationProvider,
            itemProvider,
            searchKeyword,
            searchClicked,
            locationName,
            locationId,
            sublocationId,
            sublocationName,
            loadLocationList,
            locationFilterClicked,
            locationKeyword,
            sublocationKeyword,
            ps_loading_dialog,
            filterKeywordUpate,
            subLocationFilterClicked,
            loadSubLocation,
            appInfoProvider,
            filtersubLocationUpdate
        };
    },
};
</script>
