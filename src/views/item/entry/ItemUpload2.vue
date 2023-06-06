<template>
    <div class='' v-if="itemId == '0' || dataReady == true " >
        <div class="mt-76 mb-20 min-h-36 " v-if="showCell == 1">

            <!-- Start Choose Photo and Video --> 
            <div class="w-full flex flex-col ">
                <!-- First Screen for photo -->
                <div class="flex justify-center ">
                    <!-- Start Select Item Photo Horizontal -->
                    <div class="flex-shink-0 w-76 relative ">
                        <draggable-container :list="galleryProvider.galleryList.data ? galleryProvider.galleryList.data : previewImages.data" :onChange= "dragClick">
                            <div class="me-4 mt-2 cursor-pointer" v-for='index in imageCount' :key='index'>
                                <div :class=" index== 1 ? 'w-76 h-40' : 'w-16 h-8'" class="relative">
                                    <input type="file" accept=".jpg,.jpeg,.png" @change="onImageSelected($event)" ref="image" style="display: none;">
                                    <div class="absolute w-full h-full ">
                                        <div v-if="getImageUrl(index) == ''" class="w-full h-full border-primary-500 dark:border-primaryDark-accent border-dashed border-2 flex flex-col justify-center items-center" @click="defaultClick(index)"> 
                                            <font-awesome-icon :icon="['fas', 'image']" class=" text-primary-500 dark:text-primaryDark-accent " :class=" index== 1 ? 'text-xl' : 'text-sm'"   />
                                            <ps-label v-if="index == 1" class="font-medium text-xs lg:text-xs flex-shink-0" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("item_entry__photo_title") }} </ps-label> 
                                        </div>
                                        <img v-else alt="Placeholder" width="300px" height="300px" class=" w-full h-full object-cover" :src="getImageUrl(index)" @error="galleryProvider.defaultCarImage" @click="defaultClick(index)"  />
                                    </div>
                                    <div class="relative pt-4 ms-10" >
                                        <div @click="imageDelete(index)" v-if="index > 1 && getImageUrl(index) !=''" class="cursor-pointer bg-primary-000 rounded-full dark:bg-primaryDark-black py-0.5 px-2">
                                            <font-awesome-icon :icon="['fas', 'trash-alt']" class=" text-secondary-500 dark:text-secondaryDark-white text-xs"  />
                                        </div>
                                    </div>

                               </div>
                    
                            </div>
                        </draggable-container>
                    </div> 
                    <!-- End Select Item Photo Horizontal -->
                </div>
                <!-- End First Screen for photo -->
                <!-- Start for video -->
                <div v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.isEnableVideoSetting == '1'"  class="flex justify-center ">
                    <div class="flex flex-shink-0">
                        <div class="mt-16 w-76 h-40 relative cursor-pointer"  for="upload-video">
                            <input type="file" size=1 max=1 accept=".mov,.mp4"  @change="onVideoSelected" ref="video" id="upload-video" style="display: none;"  />
                            <div @click="onVideoClick" class=" w-full h-20 rounded-2xl flex items-center justify-center absolute">
                                <div v-if="previewVideo.data == '' && getVideoUrl() ==''" class="w-76 h-40 border-primary-500 dark:border-primaryDark-accent border-dashed border-2 flex flex-col justify-center items-center"> 
                                    <font-awesome-icon :icon="['fas', 'video']" class=" text-primary-500 dark:text-primaryDark-accent text-xl"  />
                                    <ps-label class="font-medium text-xs lg:text-xs flex-shink-0" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("item_entry__video_title") }} </ps-label> 
                                </div>
                                <img v-if="previewVideo.data == '' && getVideoUrl() !=''" alt="Placeholder"  width="300px" height="300px"  class=" w-76 h-40 object-cover " :src="getVideoUrl()" @error="galleryProvider.defaultCarImage" />
                                <img v-else v-for='video in previewVideo.data' :key="video" alt="Placeholder" width="300px" height="300px" class=" w-76 h-40 object-cover" v-lazy="video" @click="defaultClick"  />
                            </div>
                            <div @click="videoDelete()" v-if="previewVideo.data != '' || getVideoUrl() !=''" class="cursor-pointer relative mt-28 ms-68 bg-primary-000 rounded-full dark:bg-primaryDark-black  py-1.5 px-2.5">
                                <font-awesome-icon :icon="['fas', 'trash-alt']" class=" text-secondary-500 dark:text-secondaryDark-white lg:text-base text-sm"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Choose Photo and Video-->
            <div class="w-76 mx-auto flex flex-row justify-between">
                <div />
                <ps-button class="shadow-buttonShadow hover:shadow-none w-32" :theme="showInput.photoStatus ? 'bg-primary-500 dark:bg-primaryDark-accent text-textLight ' : 'bg-secondary-300 text-textLight '"  textSize="lg:text-sm sm:text-xs text-xs " @click="nextClick1"> {{ $t("item_entry__next") }} </ps-button>
            </div>
        </div>

        <div class="mt-76 mb-20 min-h-36 " v-if="showCell == 2">

            <div class="flex flex-col">
                <div v-if="showWarning" class="w-76 sm:w-88 mx-auto items-center text-center px-2 py-2 bg-primary-000 flex flex-row justify-between border-t-2 border-primary-600 lg:mb-6 mb-4">
                    <ps-label textColor="font-bold" class="text-sm" > {{ $t('item_entry__warning') }} </ps-label>
                    <svg @click="showWarning = false" class="cursor-pointer" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.39935 0.398953C0.731296 0.0670075 1.26949 0.0670075 1.60143 0.398953L7.00039 5.79791L12.3994 0.398953C12.7313 0.0670075 13.2695 0.0670075 13.6014 0.398953C13.9334 0.730899 13.9334 1.26909 13.6014 1.60103L8.20247 6.99999L13.6014 12.399C13.9334 12.7309 13.9334 13.2691 13.6014 13.601C13.2695 13.933 12.7313 13.933 12.3994 13.601L7.00039 8.20208L1.60143 13.601C1.26949 13.933 0.731296 13.933 0.39935 13.601C0.0674042 13.2691 0.0674042 12.7309 0.39935 12.399L5.79831 6.99999L0.39935 1.60103C0.0674042 1.26909 0.0674042 0.730899 0.39935 0.398953Z" fill="#1F2937"/>
                    </svg>

                </div>
            </div>
            <div class=" w-76 mx-auto flex flex-col">
                <!-- for title -->
                <div v-if="showInput.titleStatus && manageInput.includes('titleStatus')">
                    <ps-label class=" font-medium text-xs lg:text-xs" id="title">{{ $t("item_entry__title") }}   </ps-label>
                    <ps-input class="mt-1 w-full" type="text" v-bind:placeholder="$t('item_entry__title')" v-model:value="paramHolder1.title" @keyup.enter="showNext('titleStatus')" @keypress="validateTitle"></ps-input>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.titleStatus"> {{ $t("item_entry__title_required_error") }} </ps-label>
                </div>
                <!-- end title -->

                <!-- for type dropdown-->
                <div v-if="showInput.itemTypeStatus && manageInput.includes('itemTypeStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__type") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadItemType" >
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
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
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

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="itemTypeProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadItemType" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.itemTypeStatus"> {{ $t("item_entry__item_type_required_error") }} </ps-label>
                </div>
                <!-- end type dropdown-->

                <!-- for item condition -->
                <div v-if="showInput.conditionOfItemStatus && manageInput.includes('conditionOfItemStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__item_condition") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadCondition" >
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
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
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

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="itemConditionProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadCondition" >{{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.conditionOfItemStatus"> {{ $t("item_entry__item_condition_required_error") }} </ps-label>
                </div>
                <!-- end item condition -->

                <!-- for brand option -->
                <div v-if="showInput.brandStatus && manageInput.includes('brandStatus')">
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  ">{{ $t("item_entry__brand_option") }}   </ps-label>
                    <ps-input class="lg:mt-2 mt-1  w-full" type="text" v-model:value="paramHolder1.brand" @keyup.enter="showNext('brandStatus')" @keypress="validateBrand"></ps-input>
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.brandStatus"> {{ $t("item_entry__brand_required_error") }} </ps-label>
                </div>
                <!-- end brand option -->

                <!-- for price type -->
                <div v-if="showInput.itemPriceTypeStatus && manageInput.includes('itemPriceTypeStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__item_price_type") }}   </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadItemPriceType" >
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
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
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

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="itemPriceTypeProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadItemPriceType" >{{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.itemPriceTypeStatus"> {{ $t("item_entry__price_type_required_error") }} </ps-label>
                </div>
                <!-- end price type -->

                 <!-- for discount rate -->
                 <div v-if="showInput.discountStatus && manageInput.includes('discountStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  ">{{ $t("item_entry__discount_rate") }} </ps-label>
                    <ps-input class=" mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__discount_rate')" v-model:value="paramHolder1.discountRate" @keyup.enter="showNext('discountStatus')"></ps-input>
                    <!-- <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.discountStatus"> {{ $t("item_entry__price_required_error") }} </ps-label> -->
                </div>
                <!-- end discount rate -->

                <!-- for deal option  -->
                <div v-if="showInput.dealOptionStatus && manageInput.includes('dealOptionStatus')">
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__item_deal_option") }} </ps-label>
                    <ps-dropdown align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadDealOption" >
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
                    <!--end deal option -->
                    <!-- for remark -->
                    <ps-input v-if="showInput.dealOptionRemarkStatus && manageInput.includes('dealOptionRemarkStatus')" @keyup.enter="showNext('dealOptionRemarkStatus')" class="lg:mt-2 mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__remark')" v-model:value="paramHolder1.remark"></ps-input>
                    <!-- end remark -->
                </div>
                <!-- deal option and remark -->

                <!-- for isShop -->
                <div v-if="showInput.isShopStatus && manageInput.includes('isShopStatus')">
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  ">{{ $t("item_entry__shop_setting") }} </ps-label>
                    <ps-checkbox-value v-bind:title="$t('item_entry__is_shop')" class="font-medium text-xs sm:text-xxs lg:text-sm lg:mt-2 mt-1  w-full" v-model:value="paramHolder1.businessModeBool" />
                    <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validation.isShopStatus"> {{ $t("item_entry__is_shop_required_error") }} </ps-label>
                </div>
                <!-- end isShop -->

                <!-- for highlight information textarea -->
                <div v-if="showInput.highlightIngoStatus && manageInput.includes('highlightIngoStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__highlight_info") }} </ps-label>
                    <ps-textarea class="mt-1  w-full" v-bind:placeholder="$t('item_entry__highlight_info')" :rows="5" v-model:value="paramHolder1.highlightInformation" @keyup.enter="showNext('highlightIngoStatus')" ></ps-textarea>
                </div>    
                <!-- end highlight information -->

                <!-- for location dropdown -->
                <div v-if="showInput.itemLocationStatus && manageInput.includes('itemLocationStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs "> {{ $t("item_entry__location") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full mb-2' @onClick="loadLocation" v-on:keyup.enter="filterKeywordUpate(locationKeyword)" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.itemLocationName" />
                        </template>
                        <template #filter >
                            <div class="w-56">
                                <ps-input-with-right-icon class="rounded-full flex-1 " v-model:value="locationKeyword" v-bind:placeholder="$t('item_entry__keyword')" >
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
                                        
                                    <div v-for="selectData in itemlocationProvider.itemLocationList.data" :key="selectData.id" class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  @click="locationFilterClicked(selectData)" >
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

                                <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="itemlocationProvider.isNoMoreRecord ? 'hidden' : ''" @click="loadLocation" > {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.itemLocationStatus"> {{ $t("item_entry__location_required_error") }} </ps-label>
                </div>

                <!-- for location Township dropdown -->
                <div v-if="showInput.locationTownshipStatus && manageInput.includes('locationTownshipStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs "> {{ $t("item_entry__location_township") }}  </ps-label>
                    <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadLocationTownship(paramHolder1.itemLocationId)" >
                        <template #select>
                            <ps-dropdown-select :showCenter="true"  :selectedValue="paramHolder1.locationTownshipName" />
                        </template>
                        <template #filter >
                            <div class="w-56">
                                <ps-input-with-right-icon class="rounded-xl flex-1 " @keyup.enter="filtersubLocationUpdate(sublocationKeyword)" v-model:value="sublocationKeyword" v-bind:placeholder= "$t('item_entry__location_township')" >
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
                                        class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
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

                                <ps-label v-if="paramHolder1.itemLocationId != ''" class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer" :class="locationTownshipProvider.isNoMoreRecord ? 'hidden' : ''"  @click="loadLocationTownship(paramHolder1.itemLocationId)" >  {{ $t("item_entry__load_more") }} </ps-label>
                            </div>
                            
                        </template>
                    </ps-dropdown>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.locationTownshipStatus"> {{ $t("item_entry__location_township_required_error") }} </ps-label>
                </div>
                <!-- end location Township -->

                <!-- for address textarea -->
                 <div v-if="showInput.addressStatus && manageInput.includes('addressStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__address") }} </ps-label>
                    <ps-textarea class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__address')" v-model:value="paramHolder1.address"  @keyup.enter="showNext('addressStatus')"></ps-textarea>
                </div>
                <!-- end address -->

                <div v-if="showInput.mapStatus && manageInput.includes('mapStatus')">
                    <div class="flex flex-col justify-start lg:mt-8 mt-6  font-medium text-xs lg:text-xs">
                        <ps-label class="  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__pick_location") }} </ps-label>
                        <div class="mt-1 p-4 pt-2 rounded-md bg-primary-000 dark:bg-primaryDark-black">
                            <ps-label-caption-2 class="mb-2" > {{ $t("item_entry__map_caption") }} </ps-label-caption-2>
                            <map-with-pin-picker v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.googleMap == '1'" :lat="parseFloat(paramHolder1.latitude + '')" :lng="parseFloat(paramHolder1.longitude + '')" class="h-68" :onChange="updateCoordinates" />
                            <open-street-map v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.openStreetMap == '1'" :lat="parseFloat(paramHolder1.latitude + '')" :lng="parseFloat(paramHolder1.longitude + '')" class="h-68" :onChange="updateLeafletCoordinates" />
                        </div>
                    </div>
                </div>
                <!-- end location -->

                <div class="w-76 lg:mt-8 mt-6 mx-auto flex flex-row justify-between">
                    <ps-button class="shadow-buttonShadow hover:shadow-none w-32" textSize="lg:text-sm sm:text-xs text-xs " @click="prevClick2"> {{ $t("item_entry__previous") }} </ps-button>
                    <ps-button class="shadow-buttonShadow hover:shadow-none w-32" :theme="showInput.nextStatus ? 'bg-primary-500 dark:bg-primaryDark-accent text-textLight ' : 'bg-secondary-300 text-textLight '" textSize="lg:text-sm sm:text-xs text-xs " @click="nextClick2"> {{ $t("item_entry__next") }} </ps-button>
                </div>
            </div>
        </div>

        <div class="mt-76 mb-20 min-h-36" v-if="showCell == 3">

            <div class="w-76 mx-auto flex flex-col ">
                <!-- for category dropdown -->
                <div v-if="showInput.catStatus && manageInput.includes('catStatus')">
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
                </div>
                <!-- end category -->

                <!-- for SubCategory dropdown -->
                <div v-if="showInput.subcategoryStatus && manageInput.includes('subcategoryStatus')">
                    <ps-label class="lg:mt-5 mt-4  font-medium text-base lg:text-lg  "> {{ $t("item_entry__sub_category") }} </ps-label>
                    <ps-dropdown align="left" class='lg:mt-2 mt-1  w-full' @onClick="loadSubCategory(paramHolder1.catId)" >
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
                </div>
                <!-- end subCategory -->

                <div class="flex flex-row justify-between lg:mt-8 mt-6" >
                    <!-- for currency symbol dropdown -->
                    <div v-if="showInput.itemCurrencyStatus && manageInput.includes('itemCurrencyStatus')" class='w-36'>
                        <div >
                            <ps-label class=" w-full font-medium text-xs lg:text-xs  "> {{ $t("item_entry__currency_symbol") }}  </ps-label>
                            <ps-dropdown align="left" class='mt-1  w-full' @onClick="loadCurrency" >
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
                                                class="w-56 flex py-4 px-2 hover:bg-primary-100 dark:hover:bg-backgroundDark cursor-pointer items-center"  
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

                                        <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"  :class="itemcurrencyProvider.isNoMoreRecord ? 'hidden' : ''" @click="loadCurrency" >  {{ $t("item_entry__load_more") }} </ps-label>
                                    </div>
                                    
                                </template>
                            </ps-dropdown>
                            <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.itemCurrencyStatus"> {{ $t("item_entry__currency_symbol_required_error") }} </ps-label>
                        </div>
                    </div>
                    <!-- end currency symbol -->

                    <!-- for price -->
                    <div v-if="showInput.priceStatus && manageInput.includes('priceStatus')" class='w-36'>
                        <div >
                            <ps-label class=" w-full font-medium text-xs lg:text-xs  ">{{ $t("item_entry__price") }}   </ps-label>
                            <ps-input class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__price')" v-model:value="paramHolder1.price" @keyup.enter="showNext('priceStatus')" @keypress="validatePrice"></ps-input>
                            <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.priceStatus"> {{ $t("item_entry__price_required_error") }} </ps-label>
                        </div>
                    </div>
                    <!-- end price -->
                   
                </div>

                <!-- for description textarea -->
                <div v-if="showInput.descriptionStatus && manageInput.includes('descriptionStatus')">
                    <ps-label class="lg:mt-8 mt-6  font-medium text-xs lg:text-xs  "> {{ $t("item_entry__description") }} </ps-label>
                    <ps-textarea class="mt-1  w-full" type="text" v-bind:placeholder="$t('item_entry__description')" v-model:value="paramHolder1.description" @keyup.enter="showNext('descriptionStatus')"></ps-textarea>
                    <ps-label class="text-xs mt-1  w-full" textColor="text-primary-500 dark:text-primaryDark-accent " v-if="validation.descriptionStatus"> {{ $t("item_entry__description_required_error") }} </ps-label>
                </div>
                <!-- end description -->

            </div>
            <div class="w-76 lg:mt-8 mt-6 mx-auto flex flex-row justify-between">
                <ps-button class="shadow-buttonShadow hover:shadow-none w-32" textSize="lg:text-sm sm:text-xs text-xs " @click="prevClick3"> {{ $t("item_entry__previous") }} </ps-button>
                <ps-button class="shadow-buttonShadow hover:shadow-none w-32" :theme="showInput.createStatus ? 'bg-primary-500 dark:bg-primaryDark-accent text-textLight ' : 'bg-secondary-300 text-textLight '" textSize="lg:text-sm sm:text-xs text-xs " @click="submitClicked"> {{ itemId == '0' ? $t("item_entry__submit") : $t("item_entry__update")  }} </ps-button>
            </div>
        </div>

        <div class=" bg-background dark:bg-backgroundDark w-full pt-4 pb-2 lg:pt-8 " :class="atTopOfPage ? 'fixed top-24 ' : 'fixed top-12 '" >
            <div class="w-mobile sm:w-median lg:w-large mx-auto">    
                <div class="flex items-center "> 
                    <ps-route-link
                        :to="{name: 'dashboard'}"> 
                        <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey "
                            class="hover:underline cursor-pointer font-medium text-xxs"> 
                                    {{ $t("list__home") }}
                        </ps-label>      
                    </ps-route-link>

                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-grey  mx-2'/>
                    <ps-label v-if="itemId == '0'" textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-medium text-xxs">  {{ $t("item_entry__listing_entry") }} </ps-label>
                    <ps-label v-else textColor="text-secondary-400 dark:text-secondaryDark-grey " class="font-medium text-xxs">  {{ $t("item_entry__update_entry") }} </ps-label>

                </div>
                
                <!-- Item entry title -->
                <div class="flex justify-center">
                    <ps-label v-if="itemId == '0' " textColor="text-secondary-600 dark:text-secondaryDark-white" class="flex-grow-0 font-medium text-2xl lg:text-3xl">{{ $t("item_entry__sell_car") }} </ps-label>
                    <ps-label v-else textColor="text-secondary-600 dark:text-secondaryDark-white" class="flex-grow-0 font-medium text-2xl lg:text-3xl">{{ $t("item_entry__update_car") }} </ps-label>
                </div>
                <!-- End Item entry title -->

                <div class="grid grid-cols-3 my-4">
                    <div class="flex flex-col justify-cener">
                        <ps-label class="text-sm py-2 px-3.5 rounded-full flex-shink-0 mx-auto" textColor="text-white" :class="showCell == 1 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'bg-secondary-300 '" > 1 </ps-label>
                        <ps-label class="lg:text-sm sm:text-xs text-xxs flex-shink-0 mx-auto mt-1" :textColor="showCell == 1 ? 'text-secondary-500 dark:text-secondaryDark-white' : 'text-secondary-400 dark:text-secondaryDark-grey '" > {{ $t("item_entry__upload_image") }} </ps-label>
                    </div>
                    <div class="flex flex-col justify-cener">
                        <ps-label class="text-sm py-2 px-3.5 rounded-full flex-shink-0 mx-auto" textColor="text-white" :class="showCell == 2 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'bg-secondary-300 '" > 2 </ps-label>
                        <ps-label class="lg:text-sm sm:text-xs text-xxs flex-shink-0 mx-auto mt-1" :textColor="showCell == 2 ? 'text-secondary-500 dark:text-secondaryDark-white' : 'text-secondary-400 dark:text-secondaryDark-grey '" > {{ $t("item_entry__fill_information") }} </ps-label>
                    </div>
                    <div class="flex flex-col justify-cener">
                        <ps-label class="text-sm py-2 px-3.5 rounded-full flex-shink-0 mx-auto" textColor="text-white" :class="showCell == 3 ? 'bg-primary-500 dark:bg-primaryDark-accent' : 'bg-secondary-300 '" > 3 </ps-label>
                        <ps-label class="lg:text-sm sm:text-xs text-xxs flex-shink-0 mx-auto mt-1" :textColor="showCell == 3 ? 'text-secondary-500 dark:text-secondaryDark-white' : 'text-secondary-400 dark:text-secondaryDark-grey '" > {{ $t("item_entry__fill_specification") }} </ps-label>
                    </div>
                </div>
            </div>
        
        </div>

        <ps-confirm-dialog ref="ps_confirm_dialog" />

        <ps-loading-dialog ref="ps_loading_dialog" />

        <ps-error-dialog ref="ps_error_dialog" />

        <ps-warning-dialog ref="ps_warning_dialog" />

        <limit-item-modal ref="limit_item_modal" />
    </div>
</template>

<script lang="ts">
    //Vue
    import {reactive, ref, onMounted, onUnmounted, defineAsyncComponent} from 'vue';
    import router from '@/router';
    import { useRoute } from 'vue-router';
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
    import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

    //language
    import { i18n } from '@/assets/locales/index';
    import PsUtils from '@/utils/PsUtils';

    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faTrashAlt,faImage,faVideo } from '@fortawesome/free-solid-svg-icons';
    library.add(faTrashAlt,faImage,faVideo)

    import PsConfig from '@/config/PsConfig';

    const MapWithPinPicker = defineAsyncComponent(() => import('@/components/layouts/map/MapWithPinPicker.vue'));
    const OpenStreetMap = defineAsyncComponent(() => import('@/components/layouts/map/OpenStreetMap.vue'))

export default {
    name : "ItemUpload2",
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
        LimitItemModal,
        PsIcon,
        PsCheckboxValue,
        PsWarningDialog,
        DraggableContainer,
        OpenStreetMap,
        PsRouteLink
    },
    setup() {
      
        // Variables Init
        const itemProvider = createProductProviderState();
        const appInfoProvider = usePsAppInfoProviderState();
        const atTopOfPage = ref(true);
        let manageInput = [''];
        const showWarning = ref(true);
        const showInput = ref({
            photoStatus : false,
            titleStatus : false,
            itemTypeStatus : false,
            conditionOfItemStatus : false,
            brandStatus : false,
            itemPriceTypeStatus : false,
            discountStatus : false,
            dealOptionStatus : false,
            dealOptionRemarkStatus : false,
            isShopStatus : false,
            highlightIngoStatus : false,
            itemLocationStatus : false,
            locationTownshipStatus : false,
            addressStatus : false,
            mapStatus : false,
            catStatus : false,
            subcategoryStatus : false,
            itemCurrencyStatus : false,
            priceStatus : false,
            descriptionStatus : false,
            nextStatus : false,
            createStatus : false,
        });


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

        const showCell = ref(1);

        let isShop = ref({
            id:"0", 
            name: i18n.global.t('item_entry__no')
        });
        const isShopSetting = [
            {
                id:"1", 
                name: i18n.global.t('item_entry__is_shop')
            },{
                id:"0", 
                name: i18n.global.t('item_entry__no')
            }
        ]
     
        const imageCount = ref(1);
        const image = ref();
        let twoObject = ref(false);
        const video = ref();
        const previewImages = reactive({
            data : [] as any
        });

        const previewVideo = reactive({
            data : [] as any
        });
        let selectedFile = new Array();

        let selectImgIndex = ref(0);

        let selectedFileVideo;
        let selectedFileVideoThumb;

        let imgId = new Array();

        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const ps_warning_dialog = ref();

        if(loginUserId == null || loginUserId == '' || loginUserId == PsConst.NO_LOGIN_USER) {
            router.push({ name : "login"});
        }
        const startDate = ref();
        // const startTimeH = ref('0');
        // const startTimeM = ref('0');
        // const startTimeAmpm = ref('1');
        const pickedDate = ref(new Date());
        const paramHolder1 = ref(new ItemEntryParameterHolder());
        const locationKeyword = ref('');
        const sublocationKeyword = ref('');
        const modelKeyword = ref("");
        const paramHolder = new LocationParameterHolder().getDefaultParameterHolder();
        const subparamHolder = new LocationTownshipParameterHolder();
        const subcatHolder = new SubCategoryListParameterHolder();

        paramHolder1.value.latitude =  psValueHolder.locationLat == null || psValueHolder.locationLat == '' ? '0' : psValueHolder.locationLat;
        paramHolder1.value.longitude =  psValueHolder.locationLng == null || psValueHolder.locationLng == '' ? '0' : psValueHolder.locationLng;       
        const route = useRoute();

        // Inject Providers
        const categoryProvider = createCategoryProviderState();
        const subCategoryProvider = createSubCategoryProviderState();
        const itemlocationProvider = createItemLocationProviderState();
        const galleryProvider = createGalleryProviderState();
        const itemTypeProvider = createItemTypeProviderState();
        const dealOptionProvider = createDealOptionProviderState();
        const itemConditionProvider = createItemConditionProviderState();
        const itemPriceTypeProvider = createItemPriceTypeProviderState();
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
            window.addEventListener('scroll', handleScroll);
            const appInfoParameterHolder = new AppInfoParameterHolder();
            appInfoParameterHolder.userId = loginUserId;
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            if(appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == PsConst.ONE && userProvider.user?.data?.postCount == PsConst.LIMITED && userProvider.user?.data?.remainingPost == '0') {
                limit_item_modal.value.openModal();
            }
            if( parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem) >=1 ){
                imageCount.value = parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem);
            }
            if(itemId != '0') {
                
                loadItemForEdit();
            }

            manageInput.push('photoStatus');
            manageInput.push('titleStatus');
            if(appInfoProvider.appInfo.data.psItemUploadConfig.itemTypeId== PsConst.ONE) {
                manageInput.push('itemTypeStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.conditionOfItemId== PsConst.ONE) {
                manageInput.push('conditionOfItemStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.brand== PsConst.ONE) {
                manageInput.push('brandStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.itemPriceTypeId== PsConst.ONE) {
                manageInput.push('itemPriceTypeStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE) {
                manageInput.push('discountStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.dealOptoionId== PsConst.ONE) {
                manageInput.push('dealOptionStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.dealOptionRemark== PsConst.ONE) {
                manageInput.push('dealOptionRemarkStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.business_mode== PsConst.ONE) {
                manageInput.push('isShopStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.highlightInfo== PsConst.ONE) {
                manageInput.push('highlightIngoStatus');
            }
            manageInput.push('itemLocationStatus');
            if(appInfoProvider.appInfo.data.psAppSetting.isSubLocation== PsConst.ONE) {
                manageInput.push('locationTownshipStatus');
            }
            if(appInfoProvider.appInfo.data.psItemUploadConfig.address== PsConst.ONE) {
                manageInput.push('addressStatus');
            }
            manageInput.push('mapStatus');
            manageInput.push('nextStatus');
            manageInput.push('catStatus');
            if(appInfoProvider.appInfo.data.psItemUploadConfig.subCatId== PsConst.ONE) {
                manageInput.push('subcategoryStatus');
            }
            manageInput.push('itemCurrencyStatus');
            manageInput.push('priceStatus');
            manageInput.push('descriptionStatus');
            manageInput.push('createStatus');

        });
        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        })

        async function loadItemForEdit() {

            showInput.value.photoStatus = true;

            for(let tempData in showInput.value){
                showInput.value[tempData] = true;
            }
            
            const item = await itemProvider.loadItem(itemId, loginUserId);
            if(item.status == PsStatus.SUCCESS) {
                paramHolder1.value.title = item.data.title;
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

                paramHolder1.value.highlightInformation = item.data.highlightInformation;
                paramHolder1.value.description = item.data.description;

                paramHolder1.value.dealOptionId = item.data.dealOptionId;
                paramHolder1.value.dealOptionName = item.data.dealOption.name;
                paramHolder1.value.remark = item.data.dealOptionRemark;

                paramHolder1.value.itemLocationId = item.data.itemLocationId;
                paramHolder1.value.itemLocationName = item.data.itemLocation.name;
                paramHolder1.value.locationTownshipId = item.data.itemLocationTownshipId;
                paramHolder1.value.locationTownshipName = item.data.itemLocationTownship.townshipName;

                if(item.data.businessMode == '1'){
                    isShop.value =  { id:'1', name : i18n.global.t('item_entry__is_shop')};
                }

                paramHolder1.value.address = item.data.address;
                paramHolder1.value.latitude = item.data.lat;
                paramHolder1.value.longitude = item.data.lng;
                paramHolder1.value.id = item.data.id;

                PsUtils.log(paramHolder1.value);
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
        function handleScroll(){
            // when the user scrolls, check the pageYOffset
            if(window.pageYOffset>30){
                // user is scrolled
                if(atTopOfPage.value) atTopOfPage.value = false;
            }else{
                // user is at top of page
                if(!atTopOfPage.value) atTopOfPage.value = true;
            }
        }
        function loadCategory(){
            categoryProvider.loadItemList(loginUserId, categoryProvider.paramHolder);
        }

        function loadSubCategory(catId) { 
            subCategoryProvider.loadSubCategoryList(catId);      
        }

        function loadLocation() {
            itemlocationProvider.loadItemLocationList(loginUserId, paramHolder);
        }

        function loadDealOption() {
            dealOptionProvider.loadDealOptionList();
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

        function locationFilterClicked(value) {
            
            subparamHolder.locationId = value.id;
            paramHolder1.value.itemLocationId = value.id;
            paramHolder1.value.itemLocationName = value.name;
            paramHolder1.value.latitude = value.lat;
            paramHolder1.value.longitude = value.lng;
            paramHolder1.value.locationTownshipId = '';
            paramHolder1.value.locationTownshipName = '';
            validation.value.itemLocationStatus = false;
            showNext('itemLocationStatus');

        }
        function locationTownshipFilterClicked(value) {
            
        
            paramHolder1.value.locationTownshipId = value.id;
            paramHolder1.value.locationTownshipName = value.townshipName;
            validation.value.locationTownshipStatus = false;
            showNext('locationTownshipStatus');

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
            showNext('subcategoryStatus');

        }

        function categoryFilterClicked(value) {

            subcatHolder.catId = value.catId;
            paramHolder1.value.catId = value.catId;
            paramHolder1.value.catName = value.catName;
            validation.value.catStatus = false;
            paramHolder1.value.subCatId = '';
            paramHolder1.value.subCatName = '';
            subCategoryProvider.offset = 0;
            showNext('catStatus');
            
        }
     
        function itemTypeFilterClicked(value) {
            
            paramHolder1.value.itemTypeId = value.id;
            paramHolder1.value.itemTypeName = value.name;
            validation.value.itemTypeStatus = false;
            showNext('itemTypeStatus');

        }
    
        function conditionFilterClicked(value) {
            paramHolder1.value.conditionOfItemId = value.id;
            paramHolder1.value.conditionOfItemName = value.name;
            validation.value.conditionOfItemStatus = false;
            showNext('conditionOfItemStatus');

        }
        function itemPriceTypeFilterClicked(value) {
            
            paramHolder1.value.itemPriceTypeId = value.id;
            paramHolder1.value.itemPriceTypeName = value.name;
            validation.value.itemPriceTypeStatus = false;
            showNext('itemPriceTypeStatus');

        }
        function dealOptionFilterClicked(value) {
            paramHolder1.value.dealOptionId = value.id ;
            paramHolder1.value.dealOptionName = value.name;
            validation.value.dealOptionStatus = false;
            showNext('dealOptionStatus');
        }
        function currencyFilterClicked(value) {
            paramHolder1.value.itemCurrencyId = value.id ;
            paramHolder1.value.currencyShortForm = value.currencySymbol;
            validation.value.itemCurrencyStatus = false;
            showNext('itemCurrencyStatus');
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
        function onVideoClick() {
            video.value.click();
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
            showInput.value.photoStatus = true;
        }
        function dragClick(value) {
            console.log(value);
           console.log(galleryProvider.galleryList.data);
        }

        async function submitItem() {

            // limit ad post check
            // if(appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == PsConst.ONE) {
                //do item upload
                if(appInfoProvider?.appInfo?.data.psAppSetting?.isPaidApp == PsConst.ONE && userProvider.user?.data?.postCount == PsConst.LIMITED && userProvider.user?.data?.remainingPost == '0') {
                    limit_item_modal.value.openModal();
                }
                else {
                    PsUtils.log(paramHolder1.value);
                    paramHolder1.value.businessMode = isShop.value.id;

                    paramHolder1.value.addedUserId = loginUserId;
                    ps_loading_dialog.value.openModal();
                    ps_loading_dialog.value.message = i18n.global.t('item_entry__uploading_item');
                    let returnData;
                    try {
                        returnData = await itemProvider.submitItemEntry(paramHolder1.value, loginUserId);
                        // PsUtils.log('check4');
                    }catch(e) {
                        PsUtils.log(e);
                    }
                    PsUtils.log(returnData);

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
                        return itemProvider.imageUrl(itemProvider.product.data.videoThumbnail.imgPath ,2);
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

            if(!showInput.value.createStatus){
                return;
            }

            // PsUtils.log('check1');

            await userProvider.getUser(loginUserId);

            //Start validating check
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
            if(!errorStatus) {
                window.scrollTo(0, 0);
                return;
            }
            // PsUtils.log('check2');
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
                if(previewImages.data == ''){
                    showInput.value.photoStatus = false;
                }
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

        function nextClick1(){
            
            if(!showInput.value.photoStatus){
                return;
            }
            
            window.scrollTo(0, 0);
            showCell.value = 2;
            showNext('photoStatus');
        }
        function prevClick2(){
            window.scrollTo(0, 0);

            showCell.value = 1;
        }
        function nextClick2(){

            if(!showInput.value.nextStatus){
                return;
            }

            window.scrollTo(0, 0);
            let errorStatus = true;
            if (paramHolder1.value.title == '' || paramHolder1.value.title == undefined) {
                validation.value.titleStatus = true;
                console.log('t');
                errorStatus = false;
            }

            if (paramHolder1.value.itemLocationId == '' || paramHolder1.value.itemLocationId == undefined) {
                validation.value.itemLocationStatus = true;
                console.log('lo');
                errorStatus = false;
            }
            // End
            if(!errorStatus) {
                window.scrollTo(0, 0);
                return;
            }
            showCell.value = 3;
        }
        function prevClick3(){
            window.scrollTo(0, 0);

            showCell.value = 2;
        }
        function showNext(value){
            let index = manageInput.indexOf(value);
            index = index + 1;
            if(manageInput[index] == 'titleStatus'){
                showInput.value.titleStatus = true;
            }
            else if(manageInput[index] == 'itemTypeStatus'){
                showInput.value.itemTypeStatus = true;
            }
            else if(manageInput[index] == 'conditionOfItemStatus'){
                showInput.value.conditionOfItemStatus = true;
            }
            else if(manageInput[index] == 'brandStatus'){
                showInput.value.brandStatus = true;
            }
            else if(manageInput[index] == 'itemPriceTypeStatus'){
                showInput.value.itemPriceTypeStatus = true;
            }
            else if(manageInput[index] == 'itemCurrencyStatus'){
                showInput.value.itemCurrencyStatus = true;
            }
            else if(manageInput[index] == 'priceStatus'){
                showInput.value.priceStatus = true;
            }
            else if(manageInput[index] == 'discountStatus'){
                showInput.value.discountStatus = true;
            }
            else if(manageInput[index] == 'dealOptionStatus'){
                showInput.value.dealOptionStatus = true;
            }
            else if(manageInput[index] == 'dealOptionRemarkStatus'){
                showInput.value.dealOptionRemarkStatus = true;
            }
            else if(manageInput[index] == 'isShopStatus'){
                showInput.value.isShopStatus = true;
                showNext('isShopStatus');
            }
            else if(manageInput[index] == 'highlightIngoStatus'){
                showInput.value.highlightIngoStatus = true;
            }
            else if(manageInput[index] == 'descriptionStatus'){
                showInput.value.descriptionStatus = true;
            }
            else if(manageInput[index] == 'itemLocationStatus'){
                showInput.value.itemLocationStatus = true;
            }
            else if(manageInput[index] == 'locationTownshipStatus'){
                showInput.value.locationTownshipStatus = true;
            }
            else if(manageInput[index] == 'addressStatus'){
                showInput.value.addressStatus = true;
            }
            else if(manageInput[index] == 'mapStatus'){
                showInput.value.mapStatus = true;
                showNext('mapStatus');
            }
            else if(manageInput[index] == 'catStatus'){
                showInput.value.catStatus = true;
            }
            else if(manageInput[index] == 'subcategoryStatus'){
                showInput.value.subcategoryStatus = true;
            }
            else if(manageInput[index] == 'nextStatus'){
                showInput.value.nextStatus = true;
                showNext('nextStatus');
            }
            else if(manageInput[index] == 'createStatus'){
                showInput.value.createStatus = true;
            }
        }
        function updateLeafletCoordinates(location) {
           
            paramHolder1.value.latitude = location.lat.toString();
            paramHolder1.value.longitude = location.lng.toString();

        }

        return {
            isShop,
            isShopSetting,
            startDate,
            showInput,
            manageInput,
            atTopOfPage,
            prevClick3,
            nextClick2,
            prevClick2,
            nextClick1,
            pickedDate,
            itemId,
            dataReady,
            paramHolder1,
            itemTypeProvider,
            itemConditionProvider,
            categoryProvider,
            subCategoryProvider,
            itemPriceTypeProvider,
            dealOptionProvider,
            userProvider,
            locationTownshipProvider,
            itemcurrencyProvider,

            ps_warning_dialog,
            map_with_pin_picker_modal,
            ps_loading_dialog,
            ps_error_dialog,
            ps_confirm_dialog,
            limit_item_modal,
            locationKeyword,
            sublocationKeyword,
            modelKeyword,
            itemlocationProvider,
            loadLocation,
            appInfoProvider,

            filterKeywordUpate,
            filtersubLocationUpdate,
            filterSubCatUpdate,
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
            updateLeafletCoordinates,

            onVideoSelected,
            onImageSelected,
            defaultClick,
            loadItemType,
            loadCondition,
            loadItemPriceType,
            loadLocationTownship,
            loadCurrency,
            loadCategory,
            loadSubCategory,
            loadDealOption,
            video,
            image,
            onVideoClick,

            imageCount,
            previewImages,
            previewVideo,

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
            showCell,
            showNext,
            dragClick,
            showWarning,
            PsConfig
        }
    }
}

</script>