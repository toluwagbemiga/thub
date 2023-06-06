<template>
    <div class="w-mobile sm:w-median lg:w-large mx-auto sm:mt-32 lg:mt-36 mt-28 mb-16">
        <div>
            <div class="flex flex-col ">
                <div class="flex items-center "> 
                    <ps-route-link
                        :to="{name: 'dashboard'}"> 
                        <ps-label 
                            class="hover:underline cursor-pointer font-medium lg:text-sm sm:text-xs text-xxs"> 
                                {{ $t("item_list__home") }}
                        </ps-label>      
                    </ps-route-link>
                    
                    <div v-if="itemProvider.paramHolder.catId.length > 1" class="flex items-center">
                        <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-white mx-2'/>
                    
                        <ps-label @click="categoryFilterClicked({catId:itemProvider.paramHolder.catId, catName:itemProvider.paramHolder.catName})" 
                            class="hover:underline cursor-pointer font-medium lg:text-sm sm:text-xs text-xxs"> 
                            {{ itemProvider.paramHolder.catName }}
                        </ps-label>  
                    </div>    
                    
                    <div v-if="itemProvider.paramHolder.subCatId.length > 1 " class="flex items-center">
                        <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-white mx-2'/>
                        
                        <ps-label
                            class=" font-medium lg:text-sm sm:text-xs text-xxs"> 
                                {{ itemProvider.paramHolder.subCatName }}
                        </ps-label>
                    </div>

                </div>
                   
            </div>
             
            <div class="relative">
                <!-- start user keyword search -->
                <div class="lg:flex md:flex justify-between hidden mb-2">
                    <div class="mt-4 h-6">
                        <ps-label class="lg:text-3xl text-xl font-medium sm:text-2xl" > {{ itemProvider.paramHolder.searchTerm }} </ps-label>
                    </div>
                    <div class="flex content-center items-center mt-4">   

                        <div class="w-68 h-10">
                            <ps-input type="text" class="w-full" name="search" v-bind:placeholder="$t('item_list__user_search')" v-model:value="userProvider.userparamHolder.keyword" @keyup.enter="usernameFilterClicked" />
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
                   
                </div>
                <!-- end user keyword search -->
                <!-- End Filter For Small Screen -->
                <div class="pt-2 sm:pt-0 grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">

                    <!-- Filter For Normal and Large Screen -->
                    <div class='w-full lg:col-span-3 sm:col-span-2 col-span-2 hidden sm:flex flex-col' >
                        
                        <div class="flex flex-row items-center justify-between w-full">
                            <ps-label class="font-medium text-md lg:text-xl"> {{ $t("item_list__filter_by") }} </ps-label>
                            
                            <ps-label-caption class="font-light cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent" @click="clearAllFilter"> {{ $t("item_list__clear_filter") }} </ps-label-caption>
                        </div>

                        <div class="w-full flex flex-col">
                            <ps-label class="mt-4 lg:mt-5 lg:text-base font-medium text-sm">  {{ $t("item_list__sorting") }} </ps-label>
                            <div class="flex flex-row w-full text-sm font-medium">
                                <ps-radio v-for=" selectData  in itemProvider.paramHolder.sortingList" 
                                    :key="selectData.id" 
                                    :value="selectData" 
                                    v-model:selectedValue="currentsorting"
                                    :title="selectData.name" 
                                    :onChange = "sortingFilterClicked"
                                    class="text-xs lg:text-sm lg:me-6 sm:me-2 mt-1 lg:mt-2"></ps-radio>
                            </div>
                        </div>
                        
                        <div v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.discountRate==PsConst.ONE" class="mt-4 flex flex-row w-full text-sm font-medium">
                            <ps-checkbox-value title="" 
                            class="lg:mt-1 mt-0.5" v-model:value="isDiscount" 
                            @click="isDiscountFilterClicked" />
                            <ps-label class='me-2 font-medium text-sm lg:text-base'>{{ $t("item_list__is_discount") }}</ps-label>
                        </div>

                        <div class="w-full">
                            <ps-label class="mt-4 lg:mt-5 lg:text-base font-medium text-sm">  {{ $t("item_list__name") }} </ps-label>
                            <ps-input type="text" class="w-full mt-1 lg:mt-2 lg:text-sm text-xs" v-bind:placeholder="$t('item_list__name')" v-model:value="itemProvider.paramHolder.searchTerm" @keyup.enter="nameFilterClicked" />
                        </div>
                        
                        <!-- Price Range -->
                        <div class="w-full">
                            
                            <ps-label class="mt-4 lg:mt-5 lg:text-base font-medium text-sm">  {{ $t("item_list__price_range") }} </ps-label>
                            <ps-input type="text" class="w-full" v-bind:placeholder="$t('item_list__min')" v-model:value="itemProvider.paramHolder.minPrice" @keypress="checkPrice($event)" @keyup.enter="pricerangeItemFilterClicked" />
                            <ps-input type="text" class="w-full mt-1" v-bind:placeholder="$t('item_list__max')" v-model:value="itemProvider.paramHolder.maxPrice" @keypress="checkPrice($event)" @keyup.enter="pricerangeItemFilterClicked"/>
    
                        </div>
                        
                        <!-- Category -->
                        <ps-label class="mt-4 lg:mt-5 lg:text-base font-medium text-sm"> {{ $t("item_list__category") }} </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-2 ' @onClick="loadCategory" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.catName" />                                    
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30">
                                        <div v-if="categoryProvider.itemList.data == null">
                                            <ps-label class='p-2 flex' @click="loadCategory"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="categoryFilterClicked({catId:'', catName:'All'})" >
                                                <ps-label class="ms-2" :class="itemProvider.paramHolder.catId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in categoryProvider.itemList.data" :key="selectData.catId" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="categoryFilterClicked(selectData)" >
                                                <ps-label class="ms-2" :class="selectData.catId==itemProvider.paramHolder.catId ? ' font-medium' : 'font-light'"  > {{selectData.catName}} </ps-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="categoryProvider.itemList.data != null
                                        && categoryProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex" v-if="!categoryProvider.isNoMoreRecord"  @click="loadCategory" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        
                        <!-- for sub category dropdown -->
                        <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.subCatId==PsConst.ONE" align="left" class='mt-1' @click="loadSubCategory(itemProvider.paramHolder.catId)" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.subCatName
                                " />                                    
                            </template>
                            <template #filter >
                                <div class="w-56">
                                    <ps-input-with-right-icon class="rounded-xl flex-1 " @keyup.enter="filterSubCatUpdate(subCatKeyword)" v-model:value="subCatKeyword" v-bind:placeholder= "$t('item_list__search_subcat')" >
                                    <template #icon>
                                        <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="search" class='cursor-pointer' @click="filterSubCatUpdate(subCatKeyword)"/>
                                    </template>
                                    </ps-input-with-right-icon>            
                                </div>
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="subCategoryProvider.subCategoryList.data == null">
                                            <ps-label class='p-2 flex' > {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="subCategoryFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="itemProvider.paramHolder.subCatId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectSubCat in subCategoryProvider.subCategoryList.data" :key="selectSubCat.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                @click="subCategoryFilterClicked(selectSubCat)" >
                                                <ps-label class="ms-2" :class="selectSubCat.id==itemProvider.paramHolder.subCatId ? ' font-medium' : 'font-light'"  > {{selectSubCat.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="subCategoryProvider.subCategoryList.data != null
                                        && subCategoryProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label v-if="itemProvider.paramHolder.catId != '' &&  !subCategoryProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadSubCategory(itemProvider.paramHolder.catId)" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        <!-- end sub category -->
  
                        <!-- Item Conditions -->
                        <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.conditionOfItemId==PsConst.ONE" class="mt-4 lg:mt-5 lg:text-base font-medium text-sm"> {{ $t("item_list__item_condition") }} </ps-label>
                        
                        <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.conditionOfItemId==PsConst.ONE" align="left" class='mt-1 lg:mt-2 ' @onClick="loadCondition" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemConditionName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="itemConditionProvider.conditionList.data == null">
                                            <ps-label class='p-2 flex' @click="loadCondition"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="conditionFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="itemProvider.paramHolder.conditionOfItemId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="itemcondition in itemConditionProvider.conditionList.data" 
                                            :key="itemcondition.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="conditionFilterClicked(itemcondition)" >
                                                <ps-label class="ms-2" :class="itemcondition.id==itemProvider.paramHolder.conditionOfItemId ? ' font-medium' : 'font-light'"  > {{itemcondition.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="itemConditionProvider.conditionList.data != null
                                        && itemConditionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label v-if="!itemConditionProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadCondition" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>

                        <!-- Deal option -->
                        <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.dealOptoionId==PsConst.ONE" class="mt-4 lg:mt-5 lg:text-base font-medium text-sm"> {{ $t("item_list__deal_option") }} </ps-label>
                        <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.dealOptoionId==PsConst.ONE" align="left" class='mt-1 lg:mt-2 ' @onClick="loadDealOption" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.dealOptionName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="dealOptionProvider.dealOptionList.data == null">
                                            <ps-label class='p-2 flex' @click="loadDealOption"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="dealOptionFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="itemProvider.paramHolder.dealOptionId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="dealoption in dealOptionProvider.dealOptionList.data" 
                                            :key="dealoption.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="dealOptionFilterClicked(dealoption)" >
                                                <ps-label class="ms-2" :class="dealoption.id==itemProvider.paramHolder.dealOptionId ? ' font-medium' : 'font-light'"  > {{dealoption.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="dealOptionProvider.dealOptionList.data != null
                                        && dealOptionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label v-if="!dealOptionProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadDealOption" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>

                        <!-- Type -->
                        <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemTypeId==PsConst.ONE" class="mt-4 lg:mt-5 lg:text-base font-medium text-sm"> {{ $t("item_list__type") }}  </ps-label>
                        <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemTypeId==PsConst.ONE" align="left" class='mt-1 lg:mt-2 ' @onClick="loadItemType" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemTypeName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="itemTypeProvider.itemTypeList.data == null">
                                            <ps-label class='p-2 flex' @click="loadItemType"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="itemtypeFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="itemProvider.paramHolder.itemTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="itemvehicletype in itemTypeProvider.itemTypeList.data" 
                                            :key="itemvehicletype.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="itemtypeFilterClicked(itemvehicletype)" >
                                                <ps-label class="ms-2" :class="itemvehicletype.id==itemProvider.paramHolder.itemTypeId ? ' font-medium' : 'font-light'"  > {{itemvehicletype.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="itemTypeProvider.itemTypeList.data != null
                                        && itemTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label v-if="!itemTypeProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadItemType" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>

                        <!-- Price Type -->
                        <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemPriceTypeId==PsConst.ONE" class="mt-4 lg:mt-5 lg:text-base font-medium text-sm"> {{ $t("item_list__price_type") }} </ps-label>
                        <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemPriceTypeId==PsConst.ONE" align="left" class='mt-1 lg:mt-2 ' @onClick="loadItemPriceType" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemPriceTypeName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="itemPriceTypeProvider.itemPriceTypeList.data == null">
                                            <ps-label class='p-2 flex' @click="loadItemPriceType"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="itemPriceTypeFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="itemProvider.paramHolder.itemPriceTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="itempricetype in itemPriceTypeProvider.itemPriceTypeList.data" 
                                            :key="itempricetype.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="itemPriceTypeFilterClicked(itempricetype)" >
                                                <ps-label class="ms-2" :class="itempricetype.id==itemProvider.paramHolder.itemPriceTypeId ? ' font-medium' : 'font-light'"  > {{itempricetype.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="itemPriceTypeProvider.itemPriceTypeList.data != null
                                        && itemPriceTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label v-if="!itemPriceTypeProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadItemPriceType" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>

                        <!-- Sold item -->
                        <ps-label class="mt-4 lg:mt-5 lg:text-base font-medium text-sm"> {{ $t("item_list__sold_item") }} </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-2'>
                            <template #select>
                                <ps-dropdown-select :selectedValue="soldItemName" />  
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="soldOutItem == null">
                                            <ps-label class='p-2 flex'> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="soldItemFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="soldItemId =='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="sold in soldOutItem" 
                                            :key="sold.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="soldItemFilterClicked(sold)" >
                                                <ps-label class="ms-2" :class="sold.id==soldItemId ? ' font-medium' : 'font-light'"  > {{sold.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </ps-dropdown>
                        <!-- end item sold -->
                        
                        <!-- Location -->
                        <ps-label class="mt-4 lg:mt-5 lg:text-base font-medium text-sm"> {{ $t("item_list__location") }} </ps-label>
                        <ps-dropdown align="left" class='mt-1 lg:mt-2 ' @onClick="loadLocation" >
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemLocationName" />                                    
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30">
                                        <div v-if="itemlocationProvider.itemLocationList.data == null">
                                            <ps-label class='p-2 flex' @click="loadLocation"> {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="itemlocFilterClicked('', 'All')" >
                                                <ps-label class="ms-2" :class="itemProvider.paramHolder.itemLocationId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectData in itemlocationProvider.itemLocationList.data" :key="selectData.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="itemlocFilterClicked(selectData.id, selectData.name)" >
                                                <ps-label class="ms-2" :class="selectData.id==itemProvider.paramHolder.itemLocationId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="itemlocationProvider.itemLocationList.data != null
                                        && itemlocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label v-if="!itemlocationProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadLocation" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                                
                        <!-- for sub Location -->
                        <ps-dropdown align="left" class='mt-1 ' @click="loadSubLocation(itemProvider.paramHolder.itemLocationId)" v-if="appInfoProvider.appInfo.data?.psAppSetting?.isSubLocation == '1'">
                            <template #select>
                                <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemLocationTownshipName
                                " />                                    
                            </template>
                            <template #list >
                                <div class="rounded-md shadow-xs w-56 " >
                                    <div class="pt-2 z-30 ">
                                        <div v-if="subLocationProvider.locationTownshipList.data == null">
                                            <ps-label class='p-2 flex' > {{ $t("list__loading") }} </ps-label>
                                        </div>
                                        <div v-else>
                                            <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                            @click="subLocFilterClicked({id:'', name:'All'})" >
                                                <ps-label class="ms-2" :class="itemProvider.paramHolder.itemLocationTownship=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                            </div>
                                            <div v-for="selectSubLoc in subLocationProvider.locationTownshipList.data" :key="selectSubLoc.id" 
                                            class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                @click="subLocFilterClicked(selectSubLoc)" >
                                                <ps-label class="ms-2" :class="selectSubLoc.id==itemProvider.paramHolder.itemLocationTownship ? ' font-medium' : 'font-light'"  > {{selectSubLoc.townshipName}} </ps-label>
                                            </div>
                                        </div>
                                    </div>                                        
                                </div>
                            </template>
                            <template #loadmore>
                                
                                <div class="mb-2 w-56">

                                    <div  v-if="subLocationProvider.locationTownshipList.data != null
                                        && subLocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                        <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                    </div>

                                    <ps-label v-if="itemProvider.paramHolder.itemLocationId != '' && !subLocationProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadSubLocation(itemProvider.paramHolder.itemLocationId)" > {{ $t("list__load_more") }} </ps-label>
                                </div>
                                
                            </template>
                        </ps-dropdown>
                        <!-- end sub Location -->

                        <ps-label  v-if="appInfoProvider.appInfo.data?.frontendConfigSetting?.noFilterWithLocationOnMap != '1'"  @click="mapFilterClicked()" class=" mt-4 lg:mt-5 w-full cursor-pointer bg-primary-500 dark:bg-primaryDark-accent  py-3 text-center  lg:rounded-2xl rounded-xl text-xs lg:text-sm" textColor="text-textLight dark:text-textDark"> 
                            <font-awesome-icon :icon="['fas', 'map-marked-alt']" class="text-textLight dark:text-textDark text-lg me-2"  />
                                {{ $t("item_list__pick_location") }}
                        </ps-label>
  
                                
                        <ps-button theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark py-3" class="w-full text-center mt-5 lg:mt-8 mb-2" @click="locationFilterClicked"> {{ $t("item_list__filter") }} </ps-button>

                    </div>
                    <!-- End Filter For Normal and Large Screen -->

                    <!-- Content -->
                    <div class=' mt-12 lg:mt-0 lg:col-span-9 sm:col-span-6 col-span-4' > 
                        <!-- start user keyword search -->
                        <div class="flex mt-2 mb-4 sm:hidden">   

                            <div class="w-51 h-8 ">
                                <ps-input type="text" class="w-full" name="search" v-bind:placeholder="$t('item_list__user_search')" v-model:value="userProvider.userparamHolder.keyword" @keyup.enter="usernameFilterClicked" />
                            </div>
                    
                            <ps-dropdown align="left" class="ms-1 w-22 h-8">
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
                         <!-- end user keyword search -->
                        <div class="grid lg:grid-cols-9 grid-cols-12 gap-4 mb-4" v-if="userProvider.userList?.data != null">
                            <div class="col-span-3 w-full" v-for="user in userProvider.userList.data" :key="user.userId">
                                <div class="cursor-pointer w-full">
                                <div class="flex w-full flex-col">
                                    <img alt="Placeholder"  width="30px" height="30px"  class="rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover mx-auto" :src="userProvider.imageUrl(user ? user.userProfilePhoto : '',2)" @error="userProvider.defaultProfileImage" >
                                    <div class="flex flex-col mt-2 lg:mt-3 justify-center"> 
                                        <ps-label class=" text-center lg:text-sm text-xs font-medium"> {{  user ? user.userName:'' }} </ps-label>
                                        <img v-if="user != null && user.isVerifybluemark == '1'" alt="Placeholder" class="mx-1 w-4 h-4 object-fill" width="15px" height="10px" src="@/assets/images/mark2.png" >
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="grid sm:grid-cols-9 grid-cols-4 gap-4 sm:gap-3.5 lg:gap-4">

                            <div class=" sm:col-span-9 col-span-4 w-full" v-if="itemProvider.productList?.code.toString() == notDataCode && itemProvider.productList.data == null">
                                <div class="flex flex-col text-center content-center">
                                    <ps-label-title class="mt-16"> {{ $t("list__no_result") }} </ps-label-title>
                                    <ps-label class="mt-2 mb-20"> {{ $t("list__adjust_the_filter_message") }} </ps-label>
                                </div>
                            </div>
 
                            <!-- Column -->
                            <div class="col-span-2 sm:col-span-3 w-full" v-for="item in itemProvider.productList.data" :key="item.id">
                                
                                <ps-route-link :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                                    <item-horizontal-item  :item="item" class="infobox-item-properties" />
                                </ps-route-link>
                                
                            </div>
                            <!-- END Column -->

                        </div>
                       
                        <div v-if="itemProvider.productList?.code != null && itemProvider.productList?.code.toString() != notDataCode ">
                            
                            <div class="flex flex-wrap justify-center"> 
                                <ps-button v-if="itemProvider.loading.value == false" class="w-60 mx-auto mt-8" @click="loadItemList" :class="itemProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("list__load_more") }} </ps-button>
                                <ps-button v-else class="w-60 mx-auto mt-8" @click="loadItemList" :disabled="true">{{ $t("list__loading") }}</ps-button>
                            </div>
                        </div>

                    </div>
                    <!-- End Content -->
                   
                    <!-- Filter For Small Screen -->
                    <div class='flex justify-between absolute sm:hidden' >
                         <div class="mb-2 w-31 h-6">
                            <ps-label class="lg:text-3xl text-xl font-medium sm:text-2xl" > {{ itemProvider.paramHolder.searchTerm }} </ps-label>
                        </div>
                        <div class="flex flex-col"  >
                            
                            <div class="ms-32 bg-white rounded-x shadow-xl p-2 items-end" @click="toggleShowFilter">
                                <!-- For Mobile -->
                                <font-awesome-icon :icon="['fas', 'filter']" class="text-primary-500 dark:text-primaryDark-accent text-2xl "  />
                            </div>

                        <div>

                        <transition @enter="enter" @leave="leave">

                            <div class='flex flex-col w-44 p-4 h-auto bg-white dark:bg-gray-900 shadow-xl rounded-xl' v-if="showFilter" >
                                
                                <div class="flex flex-row items-center justify-between w-full">
                                    <ps-label class="font-medium text-base">  {{ $t("item_list__filter_by") }} </ps-label>
                                    
                                    <ps-label class="font-light cursor-pointer text-xxs" textColor="text-primary-500 dark:text-primaryDark-accent" @click="clearAllFilter"> {{ $t("item_list__clear_filter") }} </ps-label>
                                </div>

                                <div class="w-full flex flex-col">
                                    <ps-label class="mt-4 font-medium text-sm">  {{ $t("item_list__sorting") }} </ps-label>
                                    <div class="flex flex-row w-full mt-1 text-sm font-medium">
                                        <ps-radio v-for=" selectData  in itemProvider.paramHolder.sortingList" 
                                            :key="selectData.id" 
                                            :value="selectData" 
                                            v-model:selectedValue="currentsorting"
                                            :title="selectData.name" 
                                            :onChange = "sortingFilterClicked"
                                            class="text-xs  mt-1 me-2"></ps-radio>
                                    </div>
                                </div>

                                <div class="w-full">
                                    <ps-label class="mt-4 font-medium text-sm">  {{ $t("item_list__name") }} </ps-label>
                                    <ps-input type="text" class="w-full mt-1 text-xs" v-bind:placeholder="$t('item_list__name')" v-model:value="itemProvider.paramHolder.searchTerm" @keyup.enter="nameFilterClicked" />
                                </div>

                                <!-- Price Range -->
                                <div class="w-full">
                                    
                                    <ps-label class="mt-4 font-medium text-sm">  {{ $t("item_list__price_range") }} </ps-label>
                                    <ps-input type="text" class="w-full" v-bind:placeholder="$t('item_list__min')" v-model:value="itemProvider.paramHolder.minPrice" @keypress="checkPrice($event)" @keyup.enter="pricerangeItemFilterClicked" />
                                    <ps-input type="text" class="w-full mt-1" v-bind:placeholder="$t('item_list__max')" v-model:value="itemProvider.paramHolder.maxPrice" @keypress="checkPrice($event)" @keyup.enter="pricerangeItemFilterClicked"/>
                                        
                                </div>
                                
                                <!-- Category -->
                                <ps-label class="mt-4 font-medium text-sm"> {{ $t("item_list__category") }} </ps-label>
                                <ps-dropdown align="right" class='mt-1 w-full' @onClick="loadCategory" >
                                    <template #select>
                                        <ps-dropdown-select :selectedValue="itemProvider.paramHolder.catName" />                                    
                                    </template>
                                    <template #list >
                                        <div class="rounded-md shadow-xs w-56 " >
                                            <div class="pt-2 z-30">
                                                <div v-if="categoryProvider.itemList.data == null">
                                                    <ps-label class='p-2 flex' @click="loadCategory"> {{ $t("list__loading") }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="categoryFilterClicked({catId:'', catName:'All'})" >
                                                        <ps-label class="ms-2" :class="itemProvider.paramHolder.catId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                    </div>
                                                    <div v-for="selectData in categoryProvider.itemList.data" :key="selectData.catId" 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="categoryFilterClicked(selectData)" >
                                                        <ps-label class="ms-2" :class="selectData.catId==itemProvider.paramHolder.catId ? ' font-medium' : 'font-light'"  > {{selectData.catName}} </ps-label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #loadmore>
                                        
                                        <div class="mb-2 w-56">

                                            <div  v-if="categoryProvider.itemList.data != null
                                                && categoryProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                            </div>

                                            <ps-label v-if="!categoryProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadCategory" > {{ $t("list__load_more") }} </ps-label>
                                        </div>
                                        
                                    </template>
                                </ps-dropdown>
                                
                                <!-- for sub category dropdown -->
                                <ps-dropdown align="right" class='mt-1 w-full' @click="loadSubCategory(itemProvider.paramHolder.catId)" >
                                    <template #select>
                                        <ps-dropdown-select :selectedValue="itemProvider.paramHolder.subCatName
                                        " />                                    
                                    </template>
                                    <template #filter >
                                        <div class="w-56">
                                            <ps-input-with-right-icon class="rounded-xl flex-1 " @keyup.enter="filterSubCatUpdate(subCatKeyword)" v-model:value="subCatKeyword" v-bind:placeholder= "$t('search_for_large_screem__location')" >
                                            <template #icon>
                                                <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="search" class='cursor-pointer' @click="filterSubCatUpdate(subCatKeyword)"/>
                                            </template>
                                            </ps-input-with-right-icon>            
                                        </div>
                                    </template>
                                    <template #list >
                                        <div class="rounded-md shadow-xs w-56 " >
                                            <div class="pt-2 z-30 ">
                                                <div v-if="subCategoryProvider.subCategoryList.data == null">
                                                    <ps-label class='p-2 flex' > {{ $t("list__loading") }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="subCategoryFilterClicked({id:'', name:'All'})" >
                                                        <ps-label class="ms-2" :class="itemProvider.paramHolder.subCatId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                    </div>
                                                    <div v-for="selectSubCat in subCategoryProvider.subCategoryList.data" :key="selectSubCat.id" 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                        @click="subCategoryFilterClicked(selectSubCat)" >
                                                        <ps-label class="ms-2" :class="selectSubCat.id==itemProvider.paramHolder.subCatId ? ' font-medium' : 'font-light'"  > {{selectSubCat.name}} </ps-label>
                                                    </div>
                                                </div>
                                            </div>                                        
                                        </div>
                                    </template>
                                    <template #loadmore>
                                        
                                        <div class="mb-2 w-56">

                                            <div  v-if="subCategoryProvider.subCategoryList.data != null
                                                && subCategoryProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                            </div>

                                            <ps-label v-if="itemProvider.paramHolder.catId != '' && !subCategoryProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadSubCategory(itemProvider.paramHolder.catId)" > {{ $t("list__load_more") }} </ps-label>
                                        </div>
                                        
                                    </template>
                                </ps-dropdown>
                                <!-- end sub category -->
    
                                <!-- Item Conditions -->
                                <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.conditionOfItemId==PsConst.ONE" class="mt-4 font-medium text-sm"> {{ $t("item_list__item_condition") }} </ps-label>
                                
                                <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.conditionOfItemId==PsConst.ONE" align="right" class='mt-1 w-full ' @onClick="loadCondition" >
                                    <template #select>
                                        <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemConditionName" />  
                                    </template>
                                    <template #list >
                                        <div class="rounded-md shadow-xs w-56 " >
                                            <div class="pt-2 z-30 ">
                                                <div v-if="itemConditionProvider.conditionList.data == null">
                                                    <ps-label class='p-2 flex' @click="loadCondition"> {{ $t("list__loading") }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="conditionFilterClicked({id:'', name:'All'})" >
                                                        <ps-label class="ms-2" :class="itemProvider.paramHolder.conditionOfItemId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                    </div>
                                                    <div v-for="itemcondition in itemConditionProvider.conditionList.data" 
                                                    :key="itemcondition.id" 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="conditionFilterClicked(itemcondition)" >
                                                        <ps-label class="ms-2" :class="itemcondition.id==itemProvider.paramHolder.conditionOfItemId ? ' font-medium' : 'font-light'"  > {{itemcondition.name}} </ps-label>
                                                    </div>
                                                </div>
                                            </div>                                        
                                        </div>
                                    </template>
                                    <template #loadmore>
                                        
                                        <div class="mb-2 w-56">

                                            <div  v-if="itemConditionProvider.conditionList.data != null
                                                && itemConditionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                            </div>

                                            <ps-label v-if="!itemConditionProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadCondition" > {{ $t("list__load_more") }} </ps-label>
                                        </div>
                                        
                                    </template>
                                </ps-dropdown>

                                <!-- Deal option -->
                                <ps-label class="mt-4 font-medium text-sm"> {{ $t("item_list__deal_option") }} </ps-label>
                                <ps-dropdown align="right" class='mt-1 w-full ' @onClick="loadDealOption" >
                                    <template #select>
                                        <ps-dropdown-select :selectedValue="itemProvider.paramHolder.dealOptionName" />  
                                    </template>
                                    <template #list >
                                        <div class="rounded-md shadow-xs w-56 " >
                                            <div class="pt-2 z-30 ">
                                                <div v-if="dealOptionProvider.dealOptionList.data == null">
                                                    <ps-label class='p-2 flex' @click="loadDealOption"> {{ $t("list__loading") }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="dealOptionFilterClicked({id:'', name:'All'})" >
                                                        <ps-label class="ms-2" :class="itemProvider.paramHolder.dealOptionId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                    </div>
                                                    <div v-for="dealoption in dealOptionProvider.dealOptionList.data" 
                                                    :key="dealoption.id" 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="dealOptionFilterClicked(dealoption)" >
                                                        <ps-label class="ms-2" :class="dealoption.id==itemProvider.paramHolder.dealOptionId ? ' font-medium' : 'font-light'"  > {{dealoption.name}} </ps-label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #loadmore>
                                        
                                        <div class="mb-2 w-56">

                                            <div  v-if="dealOptionProvider.dealOptionList.data != null
                                                && dealOptionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                            </div>

                                            <ps-label v-if="!dealOptionProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadDealOption" > {{ $t("list__load_more") }} </ps-label>
                                        </div>
                                        
                                    </template>
                                </ps-dropdown>

                                <!-- Type -->
                                <ps-label class="mt-4 font-medium text-sm"> {{ $t("item_list__type") }}  </ps-label>
                                <ps-dropdown align="right" class='mt-1 w-full ' @onClick="loadItemType" >
                                    <template #select>
                                        <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemTypeName" />  
                                    </template>
                                    <template #list >
                                        <div class="rounded-md shadow-xs w-56 " >
                                            <div class="pt-2 z-30 ">
                                                <div v-if="itemTypeProvider.itemTypeList.data == null">
                                                    <ps-label class='p-2 flex' @click="loadItemType"> {{ $t("list__loading") }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="itemtypeFilterClicked({id:'', name:'All'})" >
                                                        <ps-label class="ms-2" :class="itemProvider.paramHolder.itemTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                    </div>
                                                    <div v-for="itemvehicletype in itemTypeProvider.itemTypeList.data" 
                                                    :key="itemvehicletype.id" 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="itemtypeFilterClicked(itemvehicletype)" >
                                                        <ps-label class="ms-2" :class="itemvehicletype.id==itemProvider.paramHolder.itemTypeId ? ' font-medium' : 'font-light'"  > {{itemvehicletype.name}} </ps-label>
                                                    </div>
                                                </div>
                                            </div>                                    
                                        </div>
                                    </template>
                                    <template #loadmore>
                                        
                                        <div class="mb-2 w-56">

                                            <div  v-if="itemTypeProvider.itemTypeList.data != null
                                                && itemTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                            </div>

                                            <ps-label v-if="!itemTypeProvider.isNoMoreRecord"  class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadItemType" > {{ $t("list__load_more") }} </ps-label>
                                        </div>
                                        
                                    </template>
                                </ps-dropdown>

                                <!-- Price Type -->
                                <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemPriceTypeId==PsConst.ONE" class="mt-4 font-medium text-sm"> {{ $t("item_list__price_type") }} </ps-label>
                                <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemPriceTypeId==PsConst.ONE" align="right" class='mt-1 w-full ' @onClick="loadItemPriceType" >
                                    <template #select>
                                        <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemPriceTypeName" />  
                                    </template>
                                    <template #list >
                                        <div class="rounded-md shadow-xs w-56 " >
                                            <div class="pt-2 z-30 ">
                                                <div v-if="itemPriceTypeProvider.itemPriceTypeList.data == null">
                                                    <ps-label class='p-2 flex' @click="loadItemPriceType"> {{ $t("list__loading") }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="itemPriceTypeFilterClicked({id:'', name:'All'})" >
                                                        <ps-label class="ms-2" :class="itemProvider.paramHolder.itemPriceTypeId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                    </div>
                                                    <div v-for="itempricetype in itemPriceTypeProvider.itemPriceTypeList.data" 
                                                    :key="itempricetype.id" 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="itemPriceTypeFilterClicked(itempricetype)" >
                                                        <ps-label class="ms-2" :class="itempricetype.id==itemProvider.paramHolder.itemPriceTypeId ? ' font-medium' : 'font-light'"  > {{itempricetype.name}} </ps-label>
                                                    </div>
                                                </div>
                                            </div>                                        
                                        </div>
                                    </template>
                                    <template #loadmore>
                                        
                                        <div class="mb-2 w-56">

                                            <div  v-if="itemPriceTypeProvider.itemPriceTypeList.data != null
                                                && itemPriceTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                            </div>

                                            <ps-label v-if="!itemPriceTypeProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadItemPriceType" > {{ $t("list__load_more") }} </ps-label>
                                        </div>
                                        
                                    </template>
                                </ps-dropdown>

                                <!-- Sold item -->
                                <ps-label class="mt-4 font-medium text-sm"> {{ $t("item_list__sold_item") }} </ps-label>
                                <ps-dropdown align="right" class='mt-1 w-full'>
                                    <template #select>
                                        <ps-dropdown-select :selectedValue="soldItemName" />  
                                    </template>
                                    <template #list >
                                        <div class="rounded-md shadow-xs w-56 " >
                                            <div class="pt-2 z-30 ">
                                                <div v-if="soldOutItem == null">
                                                    <ps-label class='p-2 flex'> {{ $t("list__loading") }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="soldItemFilterClicked({id:'', name:'All'})" >
                                                        <ps-label class="ms-2" :class="soldItemId =='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                    </div>
                                                    <div v-for="sold in soldOutItem" 
                                                    :key="sold.id" 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="soldItemFilterClicked(sold)" >
                                                        <ps-label class="ms-2" :class="sold.id==soldItemId ? ' font-medium' : 'font-light'"  > {{sold.name}} </ps-label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </ps-dropdown>
                                <!-- end item sold -->
                                
                                <!-- Location -->
                                <ps-label class="mt-4 font-medium text-sm"> {{ $t("item_list__location") }} </ps-label>
                                <ps-dropdown align="right" class='mt-1 w-full ' @onClick="loadLocation" >
                                    <template #select>
                                        <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemLocationName" />                                    
                                    </template>
                                    <template #list >
                                        <div class="rounded-md shadow-xs w-56 " >
                                            <div class="pt-2 z-30">
                                                <div v-if="itemlocationProvider.itemLocationList.data == null">
                                                    <ps-label class='p-2 flex' @click="loadLocation"> {{ $t("list__loading") }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="itemlocFilterClicked('', 'All')" >
                                                        <ps-label class="ms-2" :class="itemProvider.paramHolder.itemLocationId=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                    </div>
                                                    <div v-for="selectData in itemlocationProvider.itemLocationList.data" :key="selectData.id" 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="itemlocFilterClicked(selectData.id, selectData.name)" >
                                                        <ps-label class="ms-2" :class="selectData.id==itemProvider.paramHolder.itemLocationId ? ' font-medium' : 'font-light'"  > {{selectData.name}} </ps-label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #loadmore>
                                        
                                        <div class="mb-2 w-56">

                                            <div  v-if="itemlocationProvider.itemLocationList.data != null
                                                && itemlocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                            </div>

                                            <ps-label v-if="!itemlocationProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadLocation" > {{ $t("list__load_more") }} </ps-label>
                                        </div>
                                        
                                    </template>
                                </ps-dropdown>
                                        
                                <!-- for sub Location -->
                                <ps-dropdown align="right" class='mt-1 w-full ' @click="loadSubLocation(itemProvider.paramHolder.itemLocationId)" v-if="appInfoProvider.appInfo.data?.psAppSetting?.isSubLocation == '1'">
                                    <template #select>
                                        <ps-dropdown-select :selectedValue="itemProvider.paramHolder.itemLocationTownshipName
                                        " />                                    
                                    </template>
                                    <template #list >
                                        <div class="rounded-md shadow-xs w-56 " >
                                            <div class="pt-2 z-30 ">
                                                <div v-if="subLocationProvider.locationTownshipList.data == null">
                                                    <ps-label class='p-2 flex' > {{ $t("list__loading") }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                    @click="subLocFilterClicked({id:'', name:'All'})" >
                                                        <ps-label class="ms-2" :class="itemProvider.paramHolder.itemLocationTownship=='' ? ' font-medium' : 'font-light'"  > {{ $t("item_list__all") }}  </ps-label>
                                                    </div>
                                                    <div v-for="selectSubLoc in subLocationProvider.locationTownshipList.data" :key="selectSubLoc.id" 
                                                    class="w-72 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  
                                                        @click="subLocFilterClicked(selectSubLoc)" >
                                                        <ps-label class="ms-2" :class="selectSubLoc.id==itemProvider.paramHolder.itemLocationTownship ? ' font-medium' : 'font-light'"  > {{selectSubLoc.townshipName}} </ps-label>
                                                    </div>
                                                </div>
                                            </div>                                        
                                        </div>
                                    </template>
                                    <template #loadmore>
                                        
                                        <div class="mb-2 w-56">

                                            <div  v-if="subLocationProvider.locationTownshipList.data != null
                                                && subLocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                                <ps-label-caption > {{ $t("list__loading") }} </ps-label-caption>
                                            </div>

                                            <ps-label v-if="itemProvider.paramHolder.itemLocationId != '' && !subLocationProvider.isNoMoreRecord" class="mt-4 ms-4 mb-2 underline font-medium cursor-pointer flex"   @click="loadSubLocation(itemProvider.paramHolder.itemLocationId)" > {{ $t("list__load_more") }} </ps-label>
                                        </div>
                                        
                                    </template>
                                </ps-dropdown>
                                <!-- end sub Location -->

                                <ps-label v-if="appInfoProvider.appInfo.data?.frontendConfigSetting?.noFilterWithLocationOnMap != '1'" @click="mapFilterClicked()" class=" mt-4 w-full cursor-pointer bg-primary-500 dark:bg-primaryDark-accent  py-3 text-center rounded-xl text-xs " textColor="text-textLight dark:text-textDark"> 
                                    <font-awesome-icon :icon="['fas', 'map-marked-alt']" class="text-textLight dark:text-textDark text-lg me-2"  />
                                        {{ $t("item_list__pick_location") }}
                                </ps-label>
                                        
                                <ps-button theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark py-3 " textSize="text-xs" class="w-full text-center mt-5 mb-2" @click="locationFilterClicked"> {{ $t("item_list__filter") }} </ps-button>
                                
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
                
    </div>
</div>
        <!-- google adsense desktop view -->
        <div class="mx-auto">
            <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
        </div>
            
    </div>

    <ps-error-dialog ref="ps_error_dialog" />
    <ps-loading-dialog ref="ps_loading_dialog" class='z-40' />
    <map-with-circle-filter-modal ref="map_with_circle_filter_modal" />

</template>

<script lang="ts">

// Vue
import { useRoute } from 'vue-router'
import { onMounted,onUnmounted, ref,reactive ,defineAsyncComponent } from 'vue';

// Core UI
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsInputWithRightIcon from '@/components/core/input/PsInputWithRightIcon.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@/components/core/dropdown/PsDropdownSelect.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import MapWithCircleFilterModal from '@/components/layouts/map/MapWithCircleFilterModal.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsRadio from '@/components/core/radio/PsRadio.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';
import PsCheckboxValue from '@/components/core/checkbox/PsCheckboxValue.vue';


// Models
import { createSubCategoryProviderState } from '@/store/modules/subCategory/SubCategoryProvider';
import { useProductProviderState } from '@/store/modules/item/ProductProvider';
import { createUserListProviderState } from "@/store/modules/user/UserListProvider";
import { useCategoryProviderState } from '@/store/modules/category/CategoryProvider';
import { useItemLocationProviderState } from '@/store/modules/itemlocation/ItemLocationProvider';
import { createItemLocationTownshipProviderState } from '@/store/modules/itemLocationTownship/ItemLocationTownshipProvider';
import { createItemTypeProviderState } from '@/store/modules/itemType/ItemTypeProvider';
import { createItemPriceTypeProviderState } from '@/store/modules/itemPriceType/ItemPriceTypeProvider';
import { createDealOptionProviderState } from '@/store/modules/dealOption/DealOptionProvider';
import { createItemConditionProviderState } from '@/store/modules/item/ItemConditionProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';

// Params Holders
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsConst from '@/object/constant/ps_constants';
import LocationParameterHolder from '@/object/holder/LocationParameterHolder';
import SubCategoryListParameterHolder from '@/object/holder/SubCategoryListParameterHolder';
import Velocity from "velocity-animate";

//language
import { i18n } from '@/assets/locales/index';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkedAlt,faFilter } from '@fortawesome/free-solid-svg-icons';
library.add(faMapMarkedAlt,faFilter)


const ItemHorizontalItem = defineAsyncComponent(() => import('@/components/modules/item/ItemHorizontalItem.vue'));

export default {
    name : "ItemListView",
    components : {
        PsLabel,
        PsLabelTitle,
        ItemHorizontalItem,
        PsButton,
        PsRadio,
        PsInput,
        PsDropdown,
        PsDropdownSelect,
        PsLabelCaption,
        PsLoadingDialog,
        PsErrorDialog,
        MapWithCircleFilterModal,
        PsRouteLink,
        PsIcon,
        PsAdSense,
        PsCheckboxValue,
        PsInputWithRightIcon
    }, 
    setup() {
    
        /**
         * Init Providers & Refs
         */
        const subCategoryProvider = createSubCategoryProviderState();
        const categoryProvider = useCategoryProviderState();
        const itemlocationProvider = useItemLocationProviderState();
        const subLocationProvider = createItemLocationTownshipProviderState();
        const itemProvider = useProductProviderState();
        const userProvider = createUserListProviderState();
        const appInfoProvider = usePsAppInfoProviderState();
        const itemTypeProvider = createItemTypeProviderState();
        const itemPriceTypeProvider = createItemPriceTypeProviderState();
        const itemConditionProvider = createItemConditionProviderState();
        const dealOptionProvider = createDealOptionProviderState();
        const locationKeyword = ref('');
        const psValueHolder = PsValueProvider.psValueHolder;
        const ps_loading_dialog = ref();
        const map_with_circle_filter_modal = ref();
        const loginUserId = psValueHolder.getLoginUserId();
        const paramHolder = new LocationParameterHolder().getDefaultParameterHolder();
        const subcatHolder = new SubCategoryListParameterHolder();
        
        const ps_error_dialog = ref();
        const radius = ref("0");
        const subCatKeyword = ref("");
        
        const soldOutItem = ref([
            {
                id: "0",name : "Not Yet Sold"
            },
            {
                id: "1",name : "Sold"
            }
        ]);
        const soldItemId = ref('');
        const soldItemName = ref('');

        const filtering = ref(false);

        const showFilter = ref(false);
        
        const notDataCode =  PsConst.ERROR_CODE_10001;
        let activeSortingId = ref('');
        let activeSortingName = ref('');
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
        
        /**
         * Init Data
         */
        const route = useRoute();
        let isDiscount = ref(false);
        
        itemProvider.paramHolder.parseParamsAndQuery(route.params, route.query);

        // console.log(route.params);
        // console.log(route.query);

        let currentsorting = reactive({
            id:"0", 
            orderBy:PsConst.FILTERING__ADDED_DATE, 
            orderType:PsConst.FILTERING__DESC, 
            name:"Latest"
        });


        if(itemProvider.paramHolder.sortingName == 'POPULAR'){
            currentsorting = reactive({
                id:"1", 
                orderBy:PsConst.FILTERING_TRENDING, 
                orderType:PsConst.FILTERING__DESC, 
                name:"Popular"
            });
        }

        async function usernameFilterClicked() {
            loadUserDataList()
        }

        async function usersortingFilterClicked(value) {
            
            activeSortingId.value = value.id;
            activeSortingName.value = value.name;
            userProvider.userparamHolder.orderBy = value.orderBy;
            userProvider.userparamHolder.orderType = value.orderType;
            loadUserDataList()
            
            
        }

        function filterSubCatUpdate(value){
            subcatHolder.keyword = value;
            subCategoryProvider.filtersubCatUpdate(loginUserId,subcatHolder);
        }

        async function loadUserDataList() {
          
           await userProvider.loadUserSearchList( loginUserId,userProvider.userparamHolder);

        }

        function isDiscountFilterClicked() {
            itemProvider.paramHolder.isDiscount = isDiscount.value == false ? '1' : '0';
            loadDataList();
        }

        /**
         * Loading Data
         */
        onMounted(async () => {
            setTimeout(async ()=>{
                // console.log(router.currentRoute.value.meta.metaTags);
               if(itemProvider.paramHolder.isDiscount == '1'){
                   isDiscount.value = true;
               }
                await loadDataList();
                if(itemProvider.paramHolder.catId != '') {
                    loadSubCategory(itemProvider.paramHolder.catId);
                }
               
            },1000);
        });
         onUnmounted(() => {
            // Search Terms
            itemProvider.paramHolder.searchTerm = '';
            
            // Price Range
            itemProvider.paramHolder.minPrice = '';
            itemProvider.paramHolder.maxPrice = '';

            // Category
            itemProvider.paramHolder.catId = '';
            itemProvider.paramHolder.catName = '';

            // SubCategory
            itemProvider.paramHolder.subCatId = '';
            itemProvider.paramHolder.subCatName = '';

            // Item Type
            itemProvider.paramHolder.itemTypeId = '';
            itemProvider.paramHolder.itemTypeName = '';

            // Item Conditions
            itemProvider.paramHolder.conditionOfItemId = '';
            itemProvider.paramHolder.itemConditionName = '';

            // Item Price Type
            itemProvider.paramHolder.itemPriceTypeId = '';
            itemProvider.paramHolder.itemPriceTypeName = '';

            // deal option
            itemProvider.paramHolder.dealOptionId = '';
            itemProvider.paramHolder.dealOptionName = '';

            itemProvider.paramHolder.itemLocationId = '';
            itemProvider.paramHolder.itemLocationName = 'All';
            itemProvider.paramHolder.itemLocationTownship = '';
            itemProvider.paramHolder.itemLocationTownshipName = '';
            itemProvider.paramHolder.lat = '';
            itemProvider.paramHolder.lng = '';
            itemProvider.paramHolder.mile = '';
        });

        function loadSubCategory(catId) { 
            subCategoryProvider.loadSubCategoryList(catId);      
        }

        function loadSubLocation(itemLocationId) { 
            subLocationProvider.loadItemLocationTownshipList(itemLocationId);      
        }

        function loadItemType() {
            itemTypeProvider.loadItemTypeList( );
        }

        function loadItemPriceType() {
            itemPriceTypeProvider.loadItemPriceTypeList( );
        }

        function loadCondition() {
            itemConditionProvider.loadItemConditionList();
        }

        function loadDealOption() {
            dealOptionProvider.loadDealOptionList();
        }

        function loadItemList() {             
            itemProvider.loadItemList(psValueHolder.getLoginUserId(), itemProvider.paramHolder);
        }

        function loadCategory() {
            categoryProvider.loadItemList(psValueHolder.getLoginUserId(), categoryProvider.paramHolder);
        }

        function loadLocation() {
            itemlocationProvider.loadItemLocationList(psValueHolder.getLoginUserId(), paramHolder);
        }

        /**
         * Actions
         */

        function sortingFilterClicked(value) {
            currentsorting = value;
            itemProvider.paramHolder.orderBy = value.orderBy;
            itemProvider.paramHolder.orderType = value.orderType;
            itemProvider.paramHolder.sortingId = value.id;
            itemProvider.paramHolder.sortingName = value.name;
                   
            loadDataList();
        }

        function soldItemFilterClicked(value) {
            
            itemProvider.paramHolder.isSoldOut = value.id;
            
            soldItemId.value = value.id;
            soldItemName.value = value.name;
            
            loadDataList();
        }
       

        function conditionFilterClicked(value) {
            itemProvider.paramHolder.conditionOfItemId = value.id;
            itemProvider.paramHolder.itemConditionName = value.name;
           
            loadDataList();
        }


        
        function checkPrice(e) {

            const char = String.fromCharCode(e.keyCode); // Get the character
            if(/^[0-9]+$/.test(char)) return true; // Match with regex 
            else e.preventDefault(); // If not match, don't add to input text 
            
        }
        function checklocation(e) {

            const char = String.fromCharCode(e.keyCode); // Get the character
            if(/^[0-9]*\.?[0-9]*$/.test(char)) return true; // Match with regex 
            else e.preventDefault(); // If not match, don't add to input text 
            
        }

        function pricerangeItemFilterClicked() {  
            
            if(itemProvider.paramHolder.minPrice != '' && itemProvider.paramHolder.maxPrice != '') {
                const maxPrice : number = parseFloat(itemProvider.paramHolder.maxPrice.toString());
                const minPrice : number = parseFloat(itemProvider.paramHolder.minPrice.toString())
                if( minPrice >= maxPrice) {
                    ps_error_dialog.value.openModal(
                        i18n.global.t('item_list__warning'),
                        i18n.global.t('item_list__invalid_min_max_prices'));
                    return;
                }
            }

            loadDataList();
        }



        function nameFilterClicked() {
           
            loadDataList();
        }

        function subCategoryFilterClicked(value) {
            
            itemProvider.paramHolder.subCatId = value.id;
            itemProvider.paramHolder.subCatName = value.name;
      
            loadDataList();
        }

        function categoryFilterClicked(value) {
            subcatHolder.catId = value.catId;
            itemProvider.paramHolder.catId = value.catId;
            itemProvider.paramHolder.catName = value.catName;

            itemProvider.paramHolder.subCatId = '';
            itemProvider.paramHolder.subCatName = '';

            loadDataList();
            subCategoryProvider.resetSubCategoryList(value.id);
            
        }

        function itemlocFilterClicked(id, name) {

            
            
            itemProvider.paramHolder.itemLocationId = id;
            itemProvider.paramHolder.itemLocationName = name;

            itemProvider.paramHolder.itemLocationTownship = '';
            itemProvider.paramHolder.itemLocationTownshipName = '';

            loadDataList();
            subLocationProvider.resetItemLocationTownshipList(id);
            
        }

        function subLocFilterClicked(value) {
            
            itemProvider.paramHolder.itemLocationTownship = value.id;
            itemProvider.paramHolder.itemLocationTownshipName = value.townshipName;
           
            loadDataList();
        }

        function itemtypeFilterClicked(value) {
            
            itemProvider.paramHolder.itemTypeId = value.id;
            itemProvider.paramHolder.itemTypeName = value.name;

            loadDataList();
        }
         function itemPriceTypeFilterClicked(value) {
            
            itemProvider.paramHolder.itemPriceTypeId = value.id;
            itemProvider.paramHolder.itemPriceTypeName = value.name;

            loadDataList();
        }
        function dealOptionFilterClicked(value) {
            
            itemProvider.paramHolder.dealOptionId = value.id ;
            itemProvider.paramHolder.dealOptionName = value.name;
         
            loadDataList();
        }
        function mapFilterClicked(){
            let lat : number = 0;
            let lng : number = 0; 
            let mile : number = 1;
            
            if(itemProvider.paramHolder.lat == undefined || itemProvider.paramHolder.lat == '') {
                lat = parseFloat((psValueHolder.locationLat == null || psValueHolder.locationLat == '' ? '0' : psValueHolder.locationLat).toString());
                lng = parseFloat((psValueHolder.locationLng == null || psValueHolder.locationLng == '' ? '0' : psValueHolder.locationLng).toString());                       
            }else {
                lat = parseFloat(itemProvider.paramHolder.lat.toString());
                lng = parseFloat(itemProvider.paramHolder.lng.toString());
                mile = parseFloat(itemProvider.paramHolder.mile.toString());
            }
      
           map_with_circle_filter_modal.value.openModal(lat,lng, mile, updateLocation);
            
        }
        function updateLocation(lat, lng, mile) {
            if(lat == null || lng == null) {
                return;
            }

            itemProvider.paramHolder.lat = lat;
            itemProvider.paramHolder.lng = lng;
            itemProvider.paramHolder.mile = mile;
            loadDataList();
        } 
        function locationFilterClicked(){
            loadDataList();
        }

        function filterKeywordUpate(value) {
            itemlocationProvider.filterKeywordUpate(value,loginUserId, paramHolder);
        }
        let tmpLat = '';
        let tmpLng = '';
        async function loadDataList() {

            if(showFilter.value == true){
                showFilter.value = false;
            }

            ps_loading_dialog.value.openModal();

            if(itemProvider.paramHolder.mile == '0' || itemProvider.paramHolder.mile.toString() == '') {
                
                tmpLat = itemProvider.paramHolder.lat.toString();
                tmpLng = itemProvider.paramHolder.lng.toString();
                itemProvider.paramHolder.lat = '';
                itemProvider.paramHolder.lng = '';
            }else {
                if(itemProvider.paramHolder.lat == undefined || itemProvider.paramHolder.lat.toString() == '') {
                    if( psValueHolder != null && psValueHolder.locationLat != null && psValueHolder.locationLng != null ) {
                        tmpLat = psValueHolder.locationLat.toString();
                        tmpLng = psValueHolder.locationLng.toString();
                        itemProvider.paramHolder.lat = tmpLat;
                        itemProvider.paramHolder.lng = tmpLng;
                    }
                }
            }
            console.log(itemProvider.paramHolder);
            await itemProvider.resetItemList(psValueHolder.getLoginUserId(), itemProvider.paramHolder);

            ps_loading_dialog.value.closeModal();
            isFiltering();
        }
        function toggleShowFilter(){
            showFilter.value = !showFilter.value;
        }
        async function clearAllFilter() {
            // Search Terms
            itemProvider.paramHolder.searchTerm = '';
            
            // Price Range
            itemProvider.paramHolder.minPrice = '';
            itemProvider.paramHolder.maxPrice = '';

            // Category
            itemProvider.paramHolder.catId = '';
            itemProvider.paramHolder.catName = '';

            // SubCategory
            itemProvider.paramHolder.subCatId = '';
            itemProvider.paramHolder.subCatName = '';

            // Item Type
            itemProvider.paramHolder.itemTypeId = '';
            itemProvider.paramHolder.itemTypeName = '';

            // Item Conditions
            itemProvider.paramHolder.conditionOfItemId = '';
            itemProvider.paramHolder.itemConditionName = '';

            // Item Price Type
            itemProvider.paramHolder.itemPriceTypeId = '';
            itemProvider.paramHolder.itemPriceTypeName = '';

            // deal option
            itemProvider.paramHolder.dealOptionId = '';
            itemProvider.paramHolder.dealOptionName = '';

            itemProvider.paramHolder.itemLocationId = '';
            itemProvider.paramHolder.itemLocationName = 'All';
            itemProvider.paramHolder.itemLocationTownship = '';
            itemProvider.paramHolder.itemLocationTownshipName = '';
            itemProvider.paramHolder.lat = '';
            itemProvider.paramHolder.lng = '';
            itemProvider.paramHolder.mile = '';
            loadDataList();
            
        }
        function isFiltering() {
            
            filtering.value = false;
            if(
            itemProvider.paramHolder.searchTerm != '' ||
            itemProvider.paramHolder.minPrice != '' ||
            itemProvider.paramHolder.maxPrice != '' ||
            itemProvider.paramHolder.catId != '' ||
            itemProvider.paramHolder.subCatId != '' ||
            itemProvider.paramHolder.itemTypeId != '' ||
            itemProvider.paramHolder.conditionOfItemId != '' ||
            itemProvider.paramHolder.itemPriceTypeId != '' ||
            itemProvider.paramHolder.dealOptionId != '' ||
            itemProvider.paramHolder.itemLocationId != '' ||
            itemProvider.paramHolder.itemLocationTownship != '' ||
            itemProvider.paramHolder.lat != '' ||
            itemProvider.paramHolder.lng != '' ||
            itemProvider.paramHolder.mile != '' ){
                filtering.value = true;
            }
            
            
        }

        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
        const arrowIcon = ref("downArrow");
        function enter(el, done) {
            arrowIcon.value = "upArrow";
			Velocity(
				el,
				"slideDown",
				{
				duration: 300
				},
				{
				complete: done
				}
			);
        }
        
		function leave(el, done) {
            arrowIcon.value = "downArrow";
			Velocity(
				el,
				"slideUp",
				{
				duration: 300
				},
				{
				complete: done
				}
			);
        }

        return {
            ps_loading_dialog,
            ps_error_dialog,
            map_with_circle_filter_modal,
            activeSortingId,
            subCategoryProvider,            
            itemProvider,
            itemlocationProvider,
            subLocationProvider,
            itemTypeProvider,
            itemPriceTypeProvider,
            itemConditionProvider,
            dealOptionProvider,
            categoryProvider,
            userProvider,

            loadItemList,
            loadCategory,
            loadSubCategory,
            loadItemType,
            loadItemPriceType,
            loadCondition,
            loadDealOption,
                
            nameFilterClicked,
            usernameFilterClicked,
            categoryFilterClicked,
            subCategoryFilterClicked,
            itemtypeFilterClicked,
            conditionFilterClicked,
            itemPriceTypeFilterClicked,
            dealOptionFilterClicked,
            sortingFilterClicked,
            pricerangeItemFilterClicked,
            clearAllFilter,
            mapFilterClicked,
            locationFilterClicked,
            notDataCode,
            filterKeywordUpate,
            locationKeyword,
            checkPrice,
            checklocation,
            radius,
            loadLocation,
            itemlocFilterClicked,
            subLocFilterClicked,
            isDiscountFilterClicked,
            loadSubLocation,
            appInfoProvider,
            currentsorting,
            filtering,
            soldOutItem,
            soldItemId,
            soldItemName,
            soldItemFilterClicked,
            showFilter,
            toggleShowFilter,
            usersortingFilterClicked,
            usersorting,
            enter,
            leave,
            isDiscount,
            PsConst,
            activeSortingName,
            subCatKeyword,
            filterSubCatUpdate
        }
    }
}
</script>