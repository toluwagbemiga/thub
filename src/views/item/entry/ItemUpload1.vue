<template>
    <div class='sm:mt-32 lg:mt-36 mt-28 w-mobile sm:w-median lg:w-large mx-auto' v-if="itemId == '0' || dataReady == true ">
       
        <!-- Start Choose Photo and Video --> 
        <div class="w-full grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 mt-2">
            <!-- Item entry title -->
            <div class="px-8 sm:px-0 sm:col-start-2 lg:px-8 lg:col-start-2 col-span-4 sm:col-span-6 lg:col-span-8 ">
                <ps-label v-if="itemId == '0' " class="font-medium text-xl lg:text-3xl">{{ $t("item_entry__listing_entry") }} </ps-label>
                <ps-label v-else class="font-medium text-xl lg:text-3xl">{{ $t("item_entry__update_entry") }} </ps-label>
            </div>
            <!-- End Item entry title -->
            <!-- First Screen for photo -->
            <div class="px-8 sm:px-0 sm:col-start-2 lg:px-8 lg:col-start-2 col-span-4 sm:col-span-6 lg:col-span-8 flex flex-col  rounded-md  dark:-black pt-4">
                <!-- Start Select Item Photo Horizontal -->
                <div class="flex flex-auto">
                    <ps-label class="font-medium text-sm lg:text-base"> {{ $t("item_entry__photo_title") }} </ps-label> 
                    <span style="font-size: 17px; color: red;">*</span>
                </div>
                <div class="">
                    <div class="flex flex-wrap ">
                        <draggable-container :list="galleryProvider.galleryList.data ? galleryProvider.galleryList.data : previewImages.data" :onChange= "dragClick">
                            <div class="me-2 mt-2 w-20 relative cursor-pointer" v-for='index in imageCount' :key='index'>
                                <input type="file" accept=".jpg,.jpeg,.png" @change="onImageSelected($event)" ref="image" style="display: none;">
                                <div  @click="defaultClick(index)" class="bg-primary-000 rounded-xl w-20 h-20  flex items-center justify-center absolute">
                                    <img alt="Placeholder" width="300px" height="300px" class="rounded-xl w-20 h-20 object-cover " :src="getImageUrl(index)" @error="galleryProvider.defaultCarImage" />
                                </div>

                                <ps-label-caption v-if="index == 1" class=" relative w-full mt-14 text-center pt-1 text-textLight h-6 rounded-b-xl bg-secondary-500 dark:text-textDark dark:bg-secondaryDark-accent opacity-90" textColor="text-textLight">
                                    {{ $t("item_entry__default") }}
                                </ps-label-caption>

                                <div @click="imageDelete(index)" v-if="index > 1 && getImageUrl(index) !=''" class="cursor-pointer relative mt-14 ms-11 bg-primary-000 rounded-full dark:bg-primaryDark-black  py-1.5 px-2.5">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class=" text-secondary-500 dark:text-secondaryDark-white lg:text-base text-sm"  />
                            </div>
                    
                            </div>
                        </draggable-container>
                    </div>
                </div> 
                <!-- End Select Item Photo Horizontal -->
            </div>
            <!-- End First Screen for photo -->
            <!-- Start for video -->
            <div v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.isEnableVideoSetting =='1'" class="px-8 sm:px-0 sm:col-start-2 lg:px-8 lg:col-start-2 col-span-4 sm:col-span-6 lg:col-span-8 w-full rounded-md  dark:-black pt-4">
                <div class="flex flex-auto">
                    <ps-label class="text-sm lg:text-base mt-14 sm:mt-0 relative"> {{ $t("item_entry__video") }} {{ $t("item_entry__must_be_less_than_1min") }} </ps-label> 
                </div>

                <div class="flex">
                    <div class="mt-2 w-20 h-20 relative cursor-pointer"  for="upload-video">
                        <input type="file" size=1 max=1 accept=".mov,.mp4"  @change="onVideoSelected" ref="video" id="upload-video" style="display: none;"  />
                        <div @click="onVideoClick" class="bg-primary-000 w-20 h-20 rounded-2xl flex items-center justify-center absolute">
                            <img v-if="previewVideo.data == ''" alt="Placeholder"  width="300px" height="300px"  class="rounded-xl w-20 h-20 object-cover " :src="getVideoUrl()" @error="galleryProvider.defaultCarImage" />
                            <img v-else v-for='video in previewVideo.data' alt="Placeholder"  width="300px" height="300px"  class="rounded-xl w-20 h-20 object-cover " :key="video" v-lazy="video"/>
                        </div>
                        <div @click="videoDelete()" v-if="previewVideo.data != '' || getVideoUrl() !=''" class="cursor-pointer relative mt-14 ms-11 bg-primary-000 rounded-full dark:bg-primaryDark-black  py-1.5 px-2.5">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" class=" text-secondary-500 dark:text-secondaryDark-white lg:text-base text-sm"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Choose Photo -->

        <!-- Start Input Field for md .. -->
        <div class="w-full grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
            <!-- Start Left Screen -->
            <div class="col-span-4 sm:col-span-3 lg:col-span-5 lg:px-8 sm:px-0 lg:col-start-2 sm:col-start-2 px-8 w-full">
                <div class=" w-full">
                
                    <!-- for title -->
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg" id="title">{{ $t("item_entry__title") }}  <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-input class="lg:mt-2 mt-1 w-full" type="text" v-bind:placeholder="$t('item_entry__title')" v-model:value="paramHolder1.title" @keypress="validateTitle"></ps-input>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.titleStatus"> {{ $t("item_entry__title_required_error") }} </ps-label>
                    <!-- end title -->

                    <!-- for category dropdown -->
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__category") }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-dropdown align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadCategory">
                        <template #select>
                        
                            <ps-dropdown-select :showCenter="true" :selectedValue="paramHolder1.catName" />
                            
                        </template>
                        <template #list >
                            <div
                                class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="categoryProvider.itemList.data == null">
                                        <ps-label class='p-2 flex' @click="loadCategory">{{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="selectData in categoryProvider.itemList.data" 
                                        :key="selectData.catId" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primary-900 cursor-pointer items-center"  
                                        @click="categoryFilterClicked(selectData)" >
                                            
                                            <ps-label class="ms-2" :class="selectData.catId == paramHolder1.catId ? ' font-bold' : ''"  > {{selectData.catName}} </ps-label>
                                            
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="categoryProvider.itemList.data != null
                                    && categoryProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }}</ps-label-caption>
                                </div>

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" v-if="!categoryProvider.isNoMoreRecord"   @click="loadCategory" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.catStatus"> {{ $t("item_entry__category_required_error") }} </ps-label>
                    <!-- end category -->

                    <!-- for SubCategory dropdown -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.subCatId==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__sub_category") }} </ps-label>
                    <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.subCatId==PsConst.ONE" align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadSubCategory(paramHolder1.catId)" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.subCatName" />
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
                            <div class="rounded-md shadow-xs w-56" >
                                <div class="pt-2 z-30">
                                    <div v-if="subCategoryProvider.subCategoryList.data == null">
                                        <div v-if="paramHolder1.catId == ''">
                                            <ps-label class='p-2 flex' textColor="text-primary-500"> {{ $t("item_entry__select_category_first") }}</ps-label>
                                        </div>
                                        <div v-else>
                                            <ps-label class='p-2 flex' @click="loadSubCategory(paramHolder1.catId)" > {{ $t("item_entry__loading") }} </ps-label >
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div v-for="selectSubcategory in subCategoryProvider.subCategoryList.data" :key="selectSubcategory.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primary-900 cursor-pointer items-center"  
                                        @click="subCategoryFilterClicked(selectSubcategory)" >                                            
                                            <ps-label class="ms-2" :class="selectSubcategory.id == paramHolder1.subCatId ? ' font-bold' : ''"  > {{selectSubcategory.name}} </ps-label>                                                                                        
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="subCategoryProvider.subCategoryList.data != null
                                    && subCategoryProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption >  {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label v-if="paramHolder1.catId != '' &&  !subCategoryProvider.isNoMoreRecord" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"   @click="loadSubCategory(paramHolder1.catId)" >  {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.subCatStatus"> {{ $t("item_entry__sub_category_required_error") }} </ps-label>
                    <!-- end subCategory -->

                    <!-- for type dropdown-->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemTypeId==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__type") }} </ps-label>
                    <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemTypeId==PsConst.ONE" align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadItemType" >
                        <template #select>
                        
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.itemTypeName" />
                            
                        </template>
                        <template #list >
                            <div
                                class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="itemTypeProvider.itemTypeList.data == null">
                                        <ps-label class='p-2 flex' @click="loadItemType">{{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="selectData in itemTypeProvider.itemTypeList.data" 
                                        :key="selectData.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primary-900 cursor-pointer items-center"  
                                        @click="itemTypeFilterClicked(selectData)" >
                                            
                                            <ps-label class="ms-2" :class="selectData.id == paramHolder1.id ? ' font-bold' : ''"  > {{selectData.name}} </ps-label>
                                            
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="itemTypeProvider.itemTypeList.data != null
                                    && itemTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }}</ps-label-caption>
                                </div>

                                <ps-label v-if="!itemTypeProvider.isNoMoreRecord" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"   @click="loadItemType" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <!-- end type dropdown-->

                    <!-- for item condition -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.conditionOfItemId==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__item_condition") }} </ps-label>
                    <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.conditionOfItemId==PsConst.ONE" align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadCondition" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.conditionOfItemName" />
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="itemConditionProvider.conditionList.data == null">
                                        <ps-label class='p-2 flex' @click="loadCondition"> {{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="itemcondition in itemConditionProvider.conditionList.data" :key="itemcondition.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primary-900 cursor-pointer items-center"  
                                        @click="conditionFilterClicked(itemcondition)" >
                                            <ps-label class="ms-2" :class="itemcondition.id==paramHolder1.conditionOfItemId ? ' font-bold' : ''"  > {{itemcondition.name}} </ps-label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="itemConditionProvider.conditionList.data != null
                                    && itemConditionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label v-if="!itemConditionProvider.isNoMoreRecord" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"   @click="loadCondition" >{{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <!-- <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.conditionOfItemStatus"> {{ $t("item_entry__item_condition_required_error") }} </ps-label> -->
                    <!-- end item condition -->

                    <!-- for brand option -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.brand==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  ">{{ $t("item_entry__brand_option") }}   </ps-label>
                    <ps-input v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.brand==PsConst.ONE" class="lg:mt-2 mt-1  w-full" type="text" v-model:value="paramHolder1.brand" @keypress="validateBrand"></ps-input>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.brandStatus"> {{ $t("item_entry__brand_required_error") }} </ps-label>
                    <!-- end brand option -->

                    <!-- for price type -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemPriceTypeId==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__item_price_type") }} </ps-label>
                    <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemPriceTypeId==PsConst.ONE" align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadItemPriceType" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.itemPriceTypeName" />
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="itemPriceTypeProvider.itemPriceTypeList.data == null">
                                        <ps-label class='p-2 flex' @click="loadItemPriceType"> {{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="pricetype in itemPriceTypeProvider.itemPriceTypeList.data" :key="pricetype.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primary-900 cursor-pointer items-center"  
                                        @click="itemPriceTypeFilterClicked(pricetype)" >
                                            <ps-label class="ms-2" :class="pricetype.id==paramHolder1.itemPriceTypeId ? ' font-bold' : ''"  > {{pricetype.name}} </ps-label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="itemPriceTypeProvider.itemPriceTypeList.data != null
                                    && itemPriceTypeProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label v-if="!itemPriceTypeProvider.isNoMoreRecord" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"   @click="loadItemPriceType" >{{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.itemPriceTypeStatus"> {{ $t("item_entry__price_type_required_error") }} </ps-label>
                    <!-- end price type -->
                    <!-- for currency symbol dropdown -->
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__currency_symbol") }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-dropdown align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadCurrency" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.currencyShortForm" />
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="itemcurrencyProvider.itemCurrencyList.data == null">
                                        <ps-label class='p-2 flex' @click="loadCurrency">  {{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="itemcurrency in itemcurrencyProvider.itemCurrencyList.data" :key="itemcurrency.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primary-900 cursor-pointer items-center"  
                                        @click="currencyFilterClicked(itemcurrency)" >
                                            <ps-label class="ms-2" :class="itemcurrency.id==paramHolder1.itemCurrencyId ? ' font-bold' : ''"  > {{itemcurrency.currencySymbol}} </ps-label>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="itemcurrencyProvider.itemCurrencyList.data != null
                                    && itemcurrencyProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption >  {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label v-if="!itemcurrencyProvider.isNoMoreRecord" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"   @click="loadCurrency" >  {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.itemCurrencyStatus"> {{ $t("item_entry__currency_symbol_required_error") }} </ps-label>
                    <!-- end currency symbol -->

                    <!-- for price -->
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  ">{{ $t("item_entry__price") }}  <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-input class="lg:mt-2 mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__price')" v-model:value="paramHolder1.price" @keypress="validatePrice"></ps-input>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.priceStatus"> {{ $t("item_entry__price_required_error") }} </ps-label>
                    <!-- end price -->

                    <!-- for discount rate -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.discountRate==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  ">{{ $t("item_entry__discount_rate") }} </ps-label>
                    <ps-input v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.discountRate==PsConst.ONE" class="lg:mt-2 mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__discount_rate')" v-model:value="paramHolder1.discountRate"></ps-input>
                    <!-- end discount rate -->


                    <!-- for deal option  -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.dealOptoionId==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__item_deal_option") }} </ps-label>
                    <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.dealOptoionId==PsConst.ONE" align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadDealOption" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.dealOptionName" />
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="dealOptionProvider.dealOptionList.data == null">
                                        <ps-label class='p-2 flex' @click="loadDealOption"> {{ $t("item_entry__loading") }} </ps-label >
                                    </div>
                                    <div v-else>
                                        <div v-for="dealoption in dealOptionProvider.dealOptionList.data" :key="dealoption.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primary-900 cursor-pointer items-center"  
                                        @click="dealOptionFilterClicked(dealoption)" >
                                            <ps-label class="ms-2" :class="dealoption.id==paramHolder1.dealOptionId ? ' font-bold' : ''"  > {{dealoption.name}} </ps-label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="dealOptionProvider.dealOptionList.data != null
                                    && dealOptionProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption > {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label v-if="!dealOptionProvider.isNoMoreRecord" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"   @click="loadDealOption" >{{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <!-- s -->
                    <!-- for remark -->
                    <ps-input v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.dealOptionRemark==PsConst.ONE" class="lg:mt-2 mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__remark')" v-model:value="paramHolder1.remark"></ps-input>
                    <!-- end remark -->
                    <!-- deal option and remark -->
                
                    <!-- for isShop -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.business_mode==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  ">{{ $t("item_entry__shop_setting") }} </ps-label>
                    <ps-checkbox-value v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.business_mode==PsConst.ONE" v-bind:title="$t('item_entry__is_shop')" class="font-medium text-xs sm:text-xxs lg:text-sm lg:mt-2 mt-1  w-full" v-model:value="paramHolder1.businessModeBool" />
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.isShopStatus"> {{ $t("item_entry__is_shop_required_error") }} </ps-label>
                    <!-- end isShop -->

                </div>   
            </div>
            <!-- End Left Screen -->

            <!-- Start Right Screen -->
            <div class="col-span-4 sm:col-span-3 lg:col-span-5 lg:px-8 px-8 sm:px-0 w-full">
                <div class="flex flex-col w-full">

                    <!-- for highlight information textarea -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.highlightInfo==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__highlight_info") }} </ps-label>
                    <ps-textarea v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.highlightInfo==PsConst.ONE" class="lg:mt-2 mt-1  w-full" v-bind:placeholder="$t('item_entry__highlight_info')" :rows="5" v-model:value="paramHolder1.highlightInformation"></ps-textarea>
                    <!-- end highlight information -->

                    <!-- for description textarea -->
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__description") }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-textarea class="lg:mt-2 mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__description')" v-model:value="paramHolder1.description"></ps-textarea>
                    <!-- end description -->

                    <!-- for location dropdown -->
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg "> {{ $t("item_entry__location") }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-dropdown align="left" class='lg:mt-2 mt-1  w-full mb-2' @onClick="loadLocation" v-on:keyup.enter="filterKeywordUpate(locationKeyword)" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.itemLocationName" />
                        </template>
                        <template #filter >
                            <div class="w-56">
                                <ps-input-with-right-icon class="rounded-full flex-1 " v-model:value="locationKeyword" v-bind:placeholder="$t('item_entry__search_location')" >
                                    <template #icon>
                                        <ps-icon name="search" class='cursor-pointer' @click="filterKeywordUpate(locationKeyword)"/>
                                    </template>
                                </ps-input-with-right-icon>
                            </div>
                        </template>
                        <template #list >
                            <div class="rounded-md shadow-xs w-56 " >
                                <div class="pt-2 z-30 ">
                                    <div v-if="itemlocationProvider.loading.value == true" class='mt-4 ms-4 mb-4'>
                                        <ps-label-caption @click="loadLocation"> {{ $t("item_entry__loading") }} </ps-label-caption>
                                    </div>
                                        
                                    <div v-for="selectData in itemlocationProvider.itemLocationList.data" :key="selectData.id" class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  @click="locationFilterClicked(selectData)" >
                                        <ps-label class="ms-2" :class="selectData.id== paramHolder1.itemLocationId ? ' font-bold text-primary-700' : ''"  > {{selectData.name}} </ps-label>
                                    </div>
                                </div>
                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="itemlocationProvider.itemLocationList.data != null
                                    && itemlocationProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption >{{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label  v-if="!itemlocationProvider.isNoMoreRecord" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"   @click="loadLocation" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.itemLocationStatus"> {{ $t("item_entry__location_required_error") }} </ps-label>

                    <!-- for location Township dropdown -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psAppSetting?.isSubLocation==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg "> {{ $t("item_entry__location_township") }} </ps-label>
                    <ps-dropdown v-if="appInfoProvider?.appInfo?.data.psAppSetting?.isSubLocation==PsConst.ONE" align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadLocationTownship(paramHolder1.itemLocationId)" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.locationTownshipName" />
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
                            <div class="rounded-md shadow-xs w-56" >
                                <div class="pt-2 z-30">
                                    <div v-if="locationTownshipProvider.locationTownshipList.data == null">
                                        <div v-if="paramHolder1.itemLocationId == ''">
                                            <ps-label class='p-2 flex' textColor="text-primary-500"> {{ $t("item_entry__select_location_first") }}</ps-label>
                                        </div>
                                        <div v-else>
                                            <ps-label class='p-2 flex' @click="loadLocationTownship(paramHolder1.itemLocationId)" > {{ $t("item_entry__loading") }} </ps-label >
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div v-for="locationTownship in locationTownshipProvider.locationTownshipList.data" :key="locationTownship.id" 
                                        class="w-56 flex py-4 px-2 hover:bg-primary-000 dark:hover:bg-primary-900 cursor-pointer items-center"  
                                        @click="locationTownshipFilterClicked(locationTownship)" >                                            
                                            <ps-label class="ms-2" :class="locationTownship.id == paramHolder1.locationTownshipId ? ' font-bold' : ''"  > {{locationTownship.townshipName}} </ps-label>                                                                                        
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </template>
                        <template #loadmore>
                                
                            <div class="mb-2 w-56">

                                <div  v-if="locationTownshipProvider.locationTownshipList.data != null
                                    && locationTownshipProvider.loading.value == true" class='mt-4 ms-4 flex'>
                                    <ps-label-caption >  {{ $t("item_entry__loading") }} </ps-label-caption>
                                </div>

                                <ps-label v-if="paramHolder1.itemLocationId != '' && !locationTownshipProvider.isNoMoreRecord"  class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"   @click="loadLocationTownship(paramHolder1.itemLocationId)" >  {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.locationTownshipStatus"> {{ $t("item_entry__location_township_required_error") }} </ps-label>
                    <!-- end location Township -->

                    <!-- for address textarea -->
                    <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.address==PsConst.ONE" class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__address") }} </ps-label>
                    <ps-textarea v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.address==PsConst.ONE" class="lg:mt-2 mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__address')" v-model:value="paramHolder1.address"></ps-textarea>
                    <!-- end address -->

                    <div class="flex flex-col justify-start lg:mt-5 mt-4  font-medium text-base lg:text-lg">
                        <ps-label class="  font-medium text-base lg:text-lg  "> {{ $t("item_entry__pick_location") }} </ps-label>
                        <div class="lg:mt-2 mt-1 p-4 pt-2 rounded-md bg-primary-000 dark:bg-primaryDark-black">
                            <ps-label-caption-2 class="mb-2" > {{ $t("item_entry__map_caption") }} </ps-label-caption-2>
                            <map-with-pin-picker v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.googleMap == '1'" class="h-68" :onChange="updateCoordinates" />
                            <open-street-map v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.openStreetMap == '1'" class="h-68" :onChange="updateLeafletCoordinates" />
                        </div>
                    </div>
                    <!-- end location -->

                    <div class="w-full ">
                        <ps-button v-if="itemId == '0' " class="lg:mt-5 mt-4 mb-5 text-center w-full " textSize="lg:text-sm sm:text-xs text-xs" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark py-1" @click="submitClicked"> {{ $t("item_entry__submit") }} </ps-button>
                        <ps-button v-else class="lg:mt-5 mt-4 mb-5 text-center w-full " textSize="lg:text-sm sm:text-xs text-xs" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark py-1" @click="submitClicked"> {{ $t("item_entry__update") }} </ps-button>
                    </div>

                    
                </div>
            </div>
            <!-- End Right Screen -->
        </div>
        <!-- End Input Field -->

    </div>

    <ps-confirm-dialog ref="ps_confirm_dialog" />

    <ps-loading-dialog ref="ps_loading_dialog" />

    <ps-error-dialog ref="ps_error_dialog" />

    <ps-warning-dialog ref="ps_warning_dialog" />

    <limit-item-modal ref="limit_item_modal" />
</template>


<script lang="ts">
    //Vue
    import {reactive, ref, onMounted, defineAsyncComponent} from 'vue';
    import router from '@/router';
    import { useRoute } from 'vue-router';
    // import { VueDraggableNext } from 'vue-draggable-next'

    import PsLabel from '@/components/core/label/PsLabel.vue'
    import PsButton from '@/components/core/buttons/PsButton.vue';
    import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
    import PsLabelCaption2 from '@/components/core/label/PsLabelCaption2.vue';
    import PsInput from '@/components/core/input/PsInput.vue';
    import PsInputWithRightIcon from '@/components/core/input/PsInputWithRightIcon.vue';
    import PsIcon from '@/components/core/icons/PsIcon.vue';
    import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
    import PsDropdownSelect from '@/components/core/dropdown/PsDropdownSelect.vue';
    import PsTextarea from '@/components/core/textarea/PsTextarea.vue';
    import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
    import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
    import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
    import PsWarningDialog from '@/components/core/dialog/PsWarningDialog.vue';
    import PsCheckboxValue from '@/components/core/checkbox/PsCheckboxValue.vue';
    import LimitItemModal from '@/components/modules/item/LimitItemModal.vue';

    // Models
    import { createCategoryProviderState } from '@/store/modules/category/CategoryProvider';
    import { createSubCategoryProviderState } from '@/store/modules/subCategory/SubCategoryProvider';
    import { createItemCurrencyProviderState } from '@/store/modules/item/ItemCurrencyProvider';
    import { createItemTypeProviderState } from '@/store/modules/itemType/ItemTypeProvider';
    import { createItemLocationProviderState } from '@/store/modules/itemlocation/ItemLocationProvider';
    import { createItemLocationTownshipProviderState } from '@/store/modules/itemLocationTownship/ItemLocationTownshipProvider';
    import { createItemPriceTypeProviderState } from '@/store/modules/itemPriceType/ItemPriceTypeProvider';
    import { createProductProviderState } from '@/store/modules/item/ProductProvider';
    import { createDealOptionProviderState } from '@/store/modules/dealOption/DealOptionProvider';
    import { createItemConditionProviderState } from '@/store/modules/item/ItemConditionProvider';
    import { createGalleryProviderState } from '@/store/modules/gallery/GalleryProvider';
    import { useUserProviderState } from '@/store/modules/user/UserProvider';
    import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';

    // Params Holders
    import ItemEntryParameterHolder from '@/object/holder/ItemEntryParameterHolder';
    import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

    import PsConst from '@/object/constant/ps_constants';
    import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
    import LocationParameterHolder from '@/object/holder/LocationParameterHolder';
    import LocationTownshipParameterHolder from '@/object/holder/LocationTownshipParameterHolder';
    import SubCategoryListParameterHolder from '@/object/holder/SubCategoryListParameterHolder';
    import PsStatus from '@/api/common/PsStatus';
    import DefaultPhoto from '@/object/DefaultPhoto';
    import DraggableContainer from '@/components/core/draggable/DraggableContainer.vue';

    //language
    import { i18n } from '@/assets/locales/index';
    import PsUtils from '@/utils/PsUtils';

    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
    import PsConfig from '@/config/PsConfig';
    library.add(faTrashAlt)

    const MapWithPinPicker = defineAsyncComponent(() => import('@/components/layouts/map/MapWithPinPicker.vue'));
    const OpenStreetMap = defineAsyncComponent(() => import('@/components/layouts/map/OpenStreetMap.vue'))

    export default {
        name : "ItemEntryView",
        components : {
            PsButton,
            PsLabelCaption,
            PsLabelCaption2,
            PsLabel,
            PsInput,
            PsDropdown,
            PsDropdownSelect,
            PsTextarea,
            MapWithPinPicker,
            PsLoadingDialog,
            PsErrorDialog,
            PsConfirmDialog,
            PsInputWithRightIcon,
            PsIcon,
            PsWarningDialog,
            PsCheckboxValue,
            LimitItemModal,
            OpenStreetMap,
        //    draggable: VueDraggableNext,
            DraggableContainer
            // Draggable,
            // DraggableContainer
        },
        setup() {
        
            // Variables Init
            const itemProvider = createProductProviderState();
            const appInfoProvider = usePsAppInfoProviderState();
            // const subLocationProvider = createItemLocationTownshipProviderState();
            const subparamHolder = new LocationTownshipParameterHolder();
            const subcatHolder = new SubCategoryListParameterHolder();

            const sublocationKeyword = ref('');
            const subCatKeyword = ref("");

            const validation = ref({
                titleStatus : false,
                catStatus : false,
                subCatStatus : false,
                itemTypeStatus : false,
                conditionOfItemStatus : false,
                brandStatus : false,
                itemPriceTypeStatus : false,
                itemCurrencyStatus : false,
                priceStatus : false,
                dealOptionStatus : false,
                isShopStatus : false,
                itemLocationStatus : false,
                locationTownshipStatus : false
            });

            const imageCount = ref(1);
            const image = ref();
            let twoObject = ref(false);
            const video = ref();
            const previewImages = reactive({
                data : [] as any
            });
            // const reorderImages = reactive({
            //     data : [] as any
            // });
            const previewVideo = reactive({
                data : [] as any
            });
            let selectedFile = new Array();
            // let dragObject = new Array();
            let selectImgIndex = ref(0);

            let selectedFileVideo;
            let selectedFileVideoThumb;

            let imgId = new Array();
            // let isVideoSetting = ref(PsConfig.isEnableVideoSetting);

            const psValueHolder = PsValueProvider.psValueHolder;
            const loginUserId = psValueHolder.getLoginUserId();
            const ps_warning_dialog = ref();

            if(loginUserId == null || loginUserId == '' || loginUserId == PsConst.NO_LOGIN_USER) {
                router.push({ name : "login"});
            }
            
            const paramHolder1 = ref(new ItemEntryParameterHolder());
            const locationKeyword = ref('');
            const paramHolder = new LocationParameterHolder().getDefaultParameterHolder();

            paramHolder1.value.latitude =  psValueHolder.locationLat == null || psValueHolder.locationLat == '' ? '0' : psValueHolder.locationLat;
            paramHolder1.value.longitude =  psValueHolder.locationLng == null || psValueHolder.locationLng == '' ? '0' : psValueHolder.locationLng;       
            const route = useRoute();

            // Inject Providers
            const categoryProvider = createCategoryProviderState();
            const subCategoryProvider = createSubCategoryProviderState();
            const itemlocationProvider = createItemLocationProviderState();
            const galleryProvider = createGalleryProviderState();
            const itemTypeProvider = createItemTypeProviderState();
            const itemConditionProvider = createItemConditionProviderState();
            const itemPriceTypeProvider = createItemPriceTypeProviderState();
            const dealOptionProvider = createDealOptionProviderState();
            const locationTownshipProvider = createItemLocationTownshipProviderState();
            const itemcurrencyProvider = createItemCurrencyProviderState();
            
            const userProvider = useUserProviderState();
            // Get Route Data
            const itemId = route.query.item_id?.toString() ?? '0';
            const map_with_pin_picker_modal = ref();
            const ps_loading_dialog = ref();
            const ps_error_dialog = ref();
            const ps_confirm_dialog = ref();
            const limit_item_modal = ref();

            const dataReady = ref(false);
            

            onMounted (async () => {
                const appInfoParameterHolder = new AppInfoParameterHolder();
                
                appInfoParameterHolder.userId = loginUserId;
                await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
                //show payment modal for limit ad post
                if(appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == PsConst.ONE && itemId == '0' && userProvider.user?.data?.postCount == PsConst.LIMITED && userProvider.user?.data?.remainingPost == '0') {
                    limit_item_modal.value.openModal();
                }
            
                if( parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem) >=1 ){
                    imageCount.value = parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem);
                }
                
                if(itemId != '0') {
                    
                    loadItemForEdit();
                }
            });

            async function loadItemForEdit() {
                
                const item = await itemProvider.loadItem(itemId, loginUserId);
                if(item.status == PsStatus.SUCCESS) {
                    paramHolder1.value.title = item.data.title;
                    paramHolder1.value.catId = item.data.catId;
                    paramHolder1.value.catName = item.data.category.catName;

                    paramHolder1.value.subCatId = item.data.subCatId;
                    paramHolder1.value.subCatName = item.data.subCategory.name;
                    paramHolder1.value.itemTypeId = item.data.itemTypeId;
                    paramHolder1.value.itemTypeName = item.data.itemType.name;
                    paramHolder1.value.conditionOfItemId = item.data.conditionOfItemId;
                    paramHolder1.value.conditionOfItemName = item.data.conditionOfItem.name;
                    paramHolder1.value.brand = item.data.brand;
                    paramHolder1.value.itemPriceTypeId = item.data.itemPriceTypeId;
                    paramHolder1.value.itemPriceTypeName = item.data.itemPriceType.name;


                    paramHolder1.value.itemCurrencyId = item.data.itemCurrencyId;
                    paramHolder1.value.currencyShortForm = item.data.itemCurrency.currencyShortForm;

                    paramHolder1.value.price = item.data.price;
                    paramHolder1.value.discountRate = item.data.discountRate;

                    paramHolder1.value.highlightInformation = item.data.highlightInformation;
                    paramHolder1.value.description = item.data.description;

                    paramHolder1.value.dealOptionId = item.data.dealOptionId;
                    paramHolder1.value.dealOptionName = item.data.dealOption.name;
                    paramHolder1.value.remark = item.data.dealOptionRemark;

                    paramHolder1.value.itemLocationId = item.data.itemLocationId;
                    paramHolder1.value.itemLocationName = item.data.itemLocation.name;
                    paramHolder1.value.locationTownshipId = item.data.itemLocationTownshipId;
                    paramHolder1.value.locationTownshipName = item.data.itemLocationTownship.townshipName;

                    paramHolder1.value.businessModeBool = item.data.businessMode == '1';

                    paramHolder1.value.address = item.data.address;

                    paramHolder1.value.latitude = item.data.lat;
                    paramHolder1.value.longitude = item.data.lng;

                    paramHolder1.value.id = item.data.id;
                    dataReady.value = true;

                }

                const gallery = await galleryProvider.loadGalleryList(appInfoProvider.appInfo.data.frontendConfigSetting.isEnableVideoSetting,itemId,PsConst.ITEM_TYPE, new DefaultPhoto());
                if(gallery != null) {
                    const imgList = gallery.data;

                    for( let i = 0; i < imgList.length; i++){
                            imgId[i] = imgList[i].imgId;
                    }

                }
            }

            function loadLocation() {
                itemlocationProvider.loadItemLocationList(loginUserId, paramHolder);
            }

            function updateCoordinates(location) {
                paramHolder1.value.latitude = location.latLng.lat().toString();
                paramHolder1.value.longitude = location.latLng.lng().toString();

            }

            function filterKeywordUpate(value) {
                itemlocationProvider.filterKeywordUpate(value,loginUserId, paramHolder);
            }

            function filtersubLocationUpdate(value) {
                subparamHolder.keyword = value;
                locationTownshipProvider.filtersubLocationUpdate(loginUserId,subparamHolder);
            }

            function filterSubCatUpdate(value){
                subcatHolder.keyword = value;
                subCategoryProvider.filtersubCatUpdate(loginUserId,subcatHolder);
            }

            function updateLeafletCoordinates(location) {
            
                paramHolder1.value.latitude = location.lat.toString();
                paramHolder1.value.longitude = location.lng.toString();

            }

            function locationFilterClicked(value) {
                
                subparamHolder.locationId = value.id;
                paramHolder1.value.itemLocationId = value.id;
                paramHolder1.value.itemLocationName = value.name;
                paramHolder1.value.latitude = value.lat;
                paramHolder1.value.longitude = value.lng;
                paramHolder1.value.locationTownshipId = '';
                paramHolder1.value.locationTownshipName = '';
                validation.value.itemLocationStatus = false;

            }
            function locationTownshipFilterClicked(value) {
                
            
                paramHolder1.value.locationTownshipId = value.id;
                paramHolder1.value.locationTownshipName = value.townshipName;
                validation.value.locationTownshipStatus = false;

            }


            function loadCategory(){
                categoryProvider.loadItemList(loginUserId, categoryProvider.paramHolder);
            }
            function loadSubCategory(catId) { 
                subCategoryProvider.loadSubCategoryList(catId);      
            }
            function loadItemType() {
                itemTypeProvider.loadItemTypeList( );
            }
            function loadCondition() {
                itemConditionProvider.loadItemConditionList();
            }
            function loadItemPriceType() {
                itemPriceTypeProvider.loadItemPriceTypeList( );
            }
            function loadDealOption() {
                dealOptionProvider.loadDealOptionList();
            }
            function loadLocationTownship(locationId) {
                locationTownshipProvider.loadItemLocationTownshipList(locationId);
            }
            function loadCurrency() {
                itemcurrencyProvider.loadItemCurrencyList();
            }


            function subCategoryFilterClicked(value) {
                
                paramHolder1.value.subCatId = value.id;
                paramHolder1.value.subCatName = value.name;
                validation.value.subCatStatus = false;

            }

            function categoryFilterClicked(value) {

                subcatHolder.catId = value.catId;
                paramHolder1.value.catId = value.catId;
                paramHolder1.value.catName = value.catName;
                validation.value.catStatus = false;
                paramHolder1.value.subCatId = '';
                paramHolder1.value.subCatName = '';
                subCategoryProvider.offset = 0;
                
            }
            function itemTypeFilterClicked(value) {
                
                paramHolder1.value.itemTypeId = value.id;
                paramHolder1.value.itemTypeName = value.name;
                validation.value.itemTypeStatus = false;

            }
            function conditionFilterClicked(value) {
                paramHolder1.value.conditionOfItemId = value.id;
                paramHolder1.value.conditionOfItemName = value.name;
                validation.value.conditionOfItemStatus = false;

            }
            function itemPriceTypeFilterClicked(value) {
                
                paramHolder1.value.itemPriceTypeId = value.id;
                paramHolder1.value.itemPriceTypeName = value.name;
                validation.value.itemPriceTypeStatus = false;

            }
            function dealOptionFilterClicked(value) {
                paramHolder1.value.dealOptionId = value.id ;
                paramHolder1.value.dealOptionName = value.name;
                validation.value.dealOptionStatus = false;
            }
            function currencyFilterClicked(value) {
                paramHolder1.value.itemCurrencyId = value.id ;
                paramHolder1.value.currencyShortForm = value.currencySymbol;
                validation.value.itemCurrencyStatus = false;
            }

            function updateLocation(lat, lng) {
                if(lat == null || lng == null) {
                    return;
                }

                paramHolder1.value.latitude = lat;
                paramHolder1.value.longitude = lng;
            }

                
            function defaultClick(index) {
                
                selectImgIndex.value = index;
                image.value.click();
                
            }

            function onImageSelected(event ) {

                let obj = {'id': 0, 'imgUrl': '','file': ''};
                obj.id = selectImgIndex.value;
                
                for(let i=1; i<selectImgIndex.value; i++) {
                    const id = previewImages.data[i-1] ? previewImages.data[i-1]?.id : 0;
                    if(id == 0){
                        if(galleryProvider.galleryList.data == null){
                            previewImages.data.push({'id': i, 'imgUrl': '', 'file': ''});
                        } else {
                            twoObject.value = true;
                            previewImages.data.push({'id': galleryProvider.galleryList.data[i-1].imgId, 'imgUrl': galleryProvider.galleryList.data[i-1].imgPath, 'file': ''});
                        }
                    
                    }
                }
            
                const selectedFiles = event.target.files;
            
                const reader = new FileReader
                reader.onload = e => {
                    obj["imgUrl"] = e.target ? e.target.result ? e.target.result.toString() : '' : '';
                    previewImages.data.push(obj)
                    
                }
                reader.readAsDataURL(selectedFiles[0])

                selectedFile[selectImgIndex.value-1] = selectedFiles[0];
                obj["file"] = selectedFiles[0];
                
                console.log(previewImages.data);
            }
        
            function dragClick(value) {
                console.log(value);
            console.log(galleryProvider.galleryList.data);
            }


            function onVideoClick() {
                video.value.click();
            }
            

            async function submitItem() {
            
                // limit ad post check
                if(appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == PsConst.ONE && userProvider.user?.data?.postCount == PsConst.LIMITED && userProvider.user?.data?.remainingPost == '0') {
                        limit_item_modal.value.openModal();
                }
                else {
                
                    //do item upload
                    
                        //start item upload
                        paramHolder1.value.businessMode =paramHolder1.value.businessModeBool ? '1' : '0';

                        paramHolder1.value.addedUserId = loginUserId;
                        ps_loading_dialog.value.openModal();
                        ps_loading_dialog.value.message = i18n.global.t('item_entry__uploading_item');
                        let returnData;
                        try {
                            returnData = await itemProvider.submitItemEntry(paramHolder1.value,loginUserId);
                        }catch(e) {
                            PsUtils.log(e);
                        }

                        if(returnData != undefined && returnData.status == PsStatus.SUCCESS) {
                            if(returnData.data.id != '') {
                                if(previewImages.data.length > 0) {
                                    for(let i=0; i<previewImages.data.length; i++) {
                                        //for add item entry and edit rechoose image
                                        if(previewImages.data[i].file == ''){
                                            imgId[i] = previewImages.data[i].id;
                                        } else {
                                            imgId[i] = '';
                                        }
                                        ps_loading_dialog.value.setMessage(i18n.global.t('item_entry__uploading_image'));
                                        
                                        await itemProvider.postItemImageUpload(loginUserId,itemProvider.product.data.id, PsConst.ITEM_TYPE,  i+1, "Image", previewImages.data[i].file, imgId[i] );
                                    }
                                } else {
                                    console.log(galleryProvider.galleryList?.data);
                                    for(let j=0; j<galleryProvider.galleryList?.data.length; j++) {
                                        if(galleryProvider.galleryList?.data[j] != undefined){
                                            let imgPath = '';
                                            let orderIndex = j+1;
                                            ps_loading_dialog.value.setMessage(i18n.global.t('item_entry__uploading_image'));
                                        
                                            await itemProvider.postItemImageUpload(loginUserId,itemProvider.product.data.id, PsConst.ITEM_TYPE,  orderIndex, "Image", imgPath, galleryProvider.galleryList?.data[j].imgId );
                                        }
                                        
                                    }
                                }
                                //for edit drag gallery list
                                // if(twoObject.value == false){
                                //     if(galleryProvider.galleryList?.data.length > 0) {
                                //         for(let j=0; j<galleryProvider.galleryList?.data.length; j++) {
                                //             if(galleryProvider.galleryList?.data[j] != undefined){
                                //                 dragObject[j] = galleryProvider.galleryList?.data[j].imgId.toString()
                                //             }
                                            
                                //         }
                                //     }
                                //     if(dragObject.length > 0) {
                                //         for(let j=0; j<dragObject.length; j++) {
                                //             let dragIndex = j + 1;
                                //             reorderImages.data.push({'img_id': dragObject[j], 'ordering': dragIndex.toString()})
                                //         }
                                //     }
                                //     //update gallery ordering
                                //     if (reorderImages.data.length > 0) {
                                //         await itemProvider.postReorderItemImage(loginUserId,reorderImages.data);
                                //     }
                                // }
                                

                                if(selectedFileVideo != undefined && selectedFileVideo != ''){
                                    ps_loading_dialog.value.setMessage(i18n.global.t('item_entry__uploading_video'));
                                    await itemProvider.postItemVideoUpload(itemProvider.product.data.id, selectedFileVideo,loginUserId);
                                }

                                if(selectedFileVideoThumb != undefined && selectedFileVideoThumb != ''){
                                    ps_loading_dialog.value.setMessage(i18n.global.t('item_entry__uploading_video_thumb'));
                                    await itemProvider.postItemVideoThumbUpload(itemProvider.product.data.id, selectedFileVideoThumb,loginUserId);
                                }
                                ps_loading_dialog.value.closeModal();

                                // Redirect
                                router.push({ name : "dashboard"});
                            }       
                        }else {
                            ps_loading_dialog.value.closeModal();
                            ps_error_dialog.value.openModal('', returnData.message);
                            
                        }  
                        //end item upload
                }    
            }

            function getImageUrl(index) {
                
                if(galleryProvider != null
                    && galleryProvider.galleryList != null
                    && galleryProvider.galleryList.data != null
                    && galleryProvider.galleryList.data.length >= index) {
                        if(galleryProvider.galleryList.data[index-1].imgPath && galleryProvider.galleryList.data[index-1].imgPath != ''){
                            return galleryProvider.imageUrl(galleryProvider.galleryList.data[index-1].imgPath ?? '',2);
                        }else{
                            return '';
                        }
                    
                }else if(previewImages.data != null && previewImages.data.length >= index){
                    if (previewImages.data[index-1]?.file =='') {
                        return galleryProvider.imageUrl(previewImages.data[index-1]?.imgUrl ?? '',2);
                    } else {
                        return previewImages.data[index-1]?.imgUrl;
                    }
                    
                }else {
                    return '';
                }

            } 
            function getImageId(index) {
                
                if(galleryProvider != null
                    && galleryProvider.galleryList != null
                    && galleryProvider.galleryList.data != null
                    && galleryProvider.galleryList.data.length >= index) {
                    return galleryProvider.galleryList.data[index-1].imgId;
                }else {
                    return '';
                }

            } 

            function getVideoUrl() {
                if(itemProvider != null
                    && itemProvider.product != null
                    && itemProvider.product.data != null
                    && itemProvider.product.data.videoThumbnail != null) {
                        if(itemProvider.product.data.videoThumbnail.imgPath && itemProvider.product.data.videoThumbnail.imgPath != ''){
                            return itemProvider.imageUrl(itemProvider.product.data.videoThumbnail.imgPath );
                        }else{
                            return '';
                        }
                    
                }else {
                    return '';
                }
            }
            function getVideoId() {
                if(itemProvider != null
                    && itemProvider.product != null
                    && itemProvider.product.data != null
                    && itemProvider.product.data.video != null) {
                        return itemProvider.product.data.video.imgId;
                }else {
                    return '';
                }
            }
            function getVideoThumbnailId() {
                if(itemProvider != null
                    && itemProvider.product != null
                    && itemProvider.product.data != null
                    && itemProvider.product.data.videoThumbnail != null) {
                        return itemProvider.product.data.videoThumbnail.imgId;
                }else {
                    return '';
                }
            }

            function onVideoSelected(event) {
                
                const selectedFiles = event.target.files;

                if(selectedFiles && selectedFiles.length > 1) {
                    window.alert("Over 1 Video");
                }else {
                    previewVideo.data = [];
                    if(selectedFiles && selectedFiles[0]) {                
                        const fileReader = new FileReader
                        fileReader.onload = () => {                            
                            const file = selectedFiles[0];
                            const blob = new Blob([ fileReader.result ?? ''], {type: file.type});
                            const url = URL.createObjectURL(blob);
                            const video = document.createElement('video');
                            video.oncanplay = function () {
                                    
                                if(video.duration > 60) {
                                    selectedFileVideo = undefined;
                                    ps_warning_dialog.value.openModal('Video Upload!', "Video must be less than a minute.");
                                    return false;
                                }else {
                                    
                                    const timeupdate = function() {
                                        if (snapImage()) {
                                            video.removeEventListener('timeupdate', timeupdate);
                                            video.pause();
                                        }
                                    };
                                    video.addEventListener('loadeddata', function() {
                                        if (snapImage()) {
                                        video.removeEventListener('timeupdate', timeupdate);
                                        }
                                    });
                                    const snapImage  = function() {
                                        const canvas = document.createElement('canvas') as HTMLCanvasElement;
                                        canvas.width = video.videoWidth;
                                        canvas.height = video.videoHeight;
                                        canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height);
                                        const image = canvas.toDataURL();
                                    
                                        const fileData = dataURLtoFile(image);
            
                                        const success = image.length > 100000;
                                        if (success) {
                                            previewVideo.data.push(image);
                                            URL.revokeObjectURL(url);
                                        }
                                        selectedFileVideoThumb = fileData;
                                        return success;
                                        
                                    };
                                    video.addEventListener('timeupdate', timeupdate);
                                    
                                    selectedFileVideo = selectedFiles[0];
                                
                                }
                            }

                            video.preload = 'metadata';
                            video.src = url;
                            // Load video in Safari / IE11
                            video.muted = true;
                            // video.playsInline = true;
                            video.play();
                            
                            
                        };
                        fileReader.readAsArrayBuffer(selectedFiles[0]);
                    }                
                }
            }

            function dataURLtoFile(dataurl) {
                let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                const imgExt = mime.split('/');
                const fileName = Date.now() +'.'+imgExt[1];
                while(n--){
                u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], fileName, {type:mime});
            }

            function validateTitle(e) {
                const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
                const res = pattern.test(e.target.value);
                if (!res) {
                    validation.value.titleStatus = false;
                } else {
                    validation.value.titleStatus = true;
                }
            }

            function validateBrand(e) {
                const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
                const res = pattern.test(e.target.value);
                if (!res) {
                    validation.value.brandStatus = false;
                } else {
                    validation.value.brandStatus = true;
                }
            }

            function validatePrice(e) {
                const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
                const res = pattern.test(e.target.value);
                if (!res) {
                    validation.value.priceStatus = false;
                } else {
                    validation.value.priceStatus = true;
                }
            }

            async function submitClicked() {
                await userProvider.getUser(loginUserId);

                let errorStatus = true;
                
                if (paramHolder1.value.title == '' || paramHolder1.value.title == undefined) {
                    validation.value.titleStatus = true;
                    errorStatus = false;
                }
            
                if (paramHolder1.value.catId == '' || paramHolder1.value.catId == undefined) {
                    validation.value.catStatus = true;
                    errorStatus = false;
                }
                
                if(appInfoProvider?.appInfo?.data.psItemUploadConfig?.subCatId==PsConst.ONE) {
                    if (paramHolder1.value.subCatId == '' || paramHolder1.value.subCatId == undefined) {
                        validation.value.subCatStatus = true;
                        errorStatus = false;
                    }
                }

                if(appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemTypeId==PsConst.ONE) {
                    if (paramHolder1.value.itemTypeId == '' || paramHolder1.value.itemTypeId == undefined) {
                        
                        validation.value.itemTypeStatus = true;
                        errorStatus = false;
                    }
                }

                if(appInfoProvider?.appInfo?.data.psItemUploadConfig?.conditionOfItemId==PsConst.ONE) {
                    if (paramHolder1.value.conditionOfItemId == '' || paramHolder1.value.conditionOfItemId == undefined) {
                        validation.value.conditionOfItemStatus = true;
                        errorStatus = false;
                    }
                }

                if(appInfoProvider?.appInfo?.data.psItemUploadConfig?.itemPriceTypeId==PsConst.ONE) {
                    if (paramHolder1.value.itemPriceTypeId == '' || paramHolder1.value.itemPriceTypeId == undefined) {
                        validation.value.itemPriceTypeStatus = true;
                        errorStatus = false;
                    }
                }

                if (paramHolder1.value.itemCurrencyId == '' || paramHolder1.value.itemCurrencyId == undefined) {
                    validation.value.itemCurrencyStatus = true;
                    errorStatus = false;
                }

                if (paramHolder1.value.price == '' || paramHolder1.value.price == undefined || parseInt(paramHolder1.value.price) == 0) {
                    validation.value.priceStatus = true;
                    errorStatus = false;
                }

                if(appInfoProvider?.appInfo?.data.psItemUploadConfig?.dealOptoionId==PsConst.ONE) {
                    if (paramHolder1.value.dealOptionId == '' || paramHolder1.value.dealOptionId == undefined) {
                        validation.value.dealOptionStatus = true;
                        errorStatus = false;
                    }
                }

                if(appInfoProvider?.appInfo?.data.psItemUploadConfig?.business_mode==PsConst.ONE) {
                    if (paramHolder1.value.businessModeBool == undefined) {
                        validation.value.isShopStatus = true;
                        errorStatus = false;
                    }
                }

                if (paramHolder1.value.itemLocationId == '' || paramHolder1.value.itemLocationId == undefined) {
                    validation.value.itemLocationStatus = true;
                    errorStatus = false;
                }

                if(appInfoProvider?.appInfo?.data.psAppSetting?.isSubLocation==PsConst.ONE) {
                    if (paramHolder1.value.locationTownshipId == '' || paramHolder1.value.locationTownshipId == undefined) {
                        validation.value.locationTownshipStatus = true;
                        errorStatus = false;
                    }
                }
                // End
                if(errorStatus != true) {
                    window.scrollTo(0, 0);
                    return;
                }
                submitItem();
                
            }
            function imageDelete(value){
                
                if(previewImages.data == ''){
                    ps_confirm_dialog.value.openModal(
                        i18n.global.t('ps_confirm_dialog__confirm'),
                        i18n.global.t('ps_confirm_dialog__are_you_confirm'),
                        i18n.global.t('ps_confirm_dialog__yes'),
                        i18n.global.t('ps_confirm_dialog__no'),
                        () => {
                            imgId[value-1] = '';
                            doDeleteImage(getImageId(value));
                        },
                        () => {
                            PsUtils.log("Cancel");
                        }
                    );
                }else{
                    previewImages.data.splice(value-1, 1);
                }
                console.log(previewImages.data);
            }
            function videoDelete(){
                
                if(previewVideo.data == ''){
                    ps_confirm_dialog.value.openModal(
                        i18n.global.t('ps_confirm_dialog__confirm'),
                        i18n.global.t('ps_confirm_dialog__are_you_confirm'),
                        i18n.global.t('ps_confirm_dialog__yes'),
                        i18n.global.t('ps_confirm_dialog__no'),
                        () => {
                            doDeleteVideo(getVideoId(),getVideoThumbnailId());
                        },
                        () => {
                            PsUtils.log("Cancel");
                        }
                    );
                }else{
                    previewVideo.data = [];
                }
            

            }
            async function doDeleteImage(value){
                ps_loading_dialog.value.openModal();

                const status = await galleryProvider.deleteImage(value, loginUserId);
                PsUtils.log(status);
                await galleryProvider.resetGalleryList(itemId,PsConst.ITEM_TYPE);
                ps_loading_dialog.value.closeModal();
            }
            async function doDeleteVideo(video, icon){
                ps_loading_dialog.value.openModal();
                const status = await galleryProvider.deleteVideo(video, loginUserId);
                await galleryProvider.deleteVideo(icon, loginUserId);
                PsUtils.log(status);
                ps_loading_dialog.value.closeModal();
            }

            return {
                itemId,
                dataReady,
                paramHolder1,
                categoryProvider,
                subCategoryProvider,
                itemTypeProvider,
                itemConditionProvider,
                itemPriceTypeProvider,
                userProvider,
                dealOptionProvider,
                locationTownshipProvider,
                itemcurrencyProvider,
                appInfoProvider,

                ps_warning_dialog,
                map_with_pin_picker_modal,
                ps_loading_dialog,
                ps_error_dialog,
                ps_confirm_dialog,
                locationKeyword,
                sublocationKeyword,
                itemlocationProvider,
                loadLocation,

                filterKeywordUpate,
                locationFilterClicked,
                categoryFilterClicked,
                subCategoryFilterClicked,
                itemTypeFilterClicked,
                conditionFilterClicked,
                itemPriceTypeFilterClicked,
                dealOptionFilterClicked,
                locationTownshipFilterClicked,
                currencyFilterClicked,
                submitClicked,
                updateLocation,
                updateCoordinates,
                limit_item_modal,

                // onDefaultSelected,
                onImageSelected,
                onVideoSelected,
                defaultClick,
                loadCategory,
                loadSubCategory,
                loadItemType,
                loadCondition,
                loadItemPriceType,
                loadDealOption,
                loadLocationTownship,
                loadCurrency,
                video,
                // isVideoSetting,
                image,
                onVideoClick,

                imageCount,
                previewImages,
                previewVideo,

                // onImg2Selected,
                // onImg3Selected,
                // onImg4Selected,
                // onImg5Selected,

                getImageUrl,
                getVideoUrl,
                galleryProvider,
                submitItem,
                itemProvider,
                validation,
                validateTitle,
                validateBrand,
                validatePrice,
                imageDelete,
                videoDelete,
                PsConst,
                filtersubLocationUpdate,
                subCatKeyword,
                filterSubCatUpdate,
                PsConfig,
                updateLeafletCoordinates,
                dragClick,
                twoObject
            }
        }
    }

</script>