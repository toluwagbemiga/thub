<template>
    <div class="w-mobile sm:w-median lg:w-large mx-auto">
       
        <div class="sm:mt-32 lg:mt-36 mt-28">
            
            <div class="flex flex-wrap sm:flex-row justify-between  mb-4 ">
                <div class="flex items-center "> 
                    <ps-route-link
                        :to="{name: 'dashboard'}"> 
                        <ps-label
                            class="hover:underline cursor-pointer font-medium lg:text-sm sm:text-xs text-xxs"> 
                                 {{ $t("item_detail__home") }}
                        </ps-label>      
                    </ps-route-link>
                    
                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-white mx-2'/>
                    
                    <ps-route-link
                        :to="{name: 'item-list', 
                        query: { 
                        cat_id: productProvider.product?.data?.category?.catId, 
                        cat_name: productProvider.product?.data?.category?.catName } }"> 
                        <ps-label 
                            class="hover:underline cursor-pointer font-medium lg:text-sm sm:text-xs text-xxs"> 
                                {{ productProvider.product.data ? productProvider.product?.data?.category?.catName : '' }}
                        </ps-label>      
                    </ps-route-link>
                    

                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-white mx-2'/>
                    <ps-route-link :to="{ 
                        name: 'item-list',
                        query: { 
                            cat_id: productProvider.product?.data?.category?.catId, 
                            cat_name: productProvider.product?.data?.category?.catName,
                            sub_cat_id: productProvider.product?.data?.subCategory?.id,
                            sub_cat_name: productProvider.product?.data?.subCategory?.name }  }">
                        <ps-label 
                            class="hover:underline cursor-pointer font-medium lg:text-sm sm:text-xs text-xxs"> 
                                {{ productProvider.product.data ? productProvider.product?.data?.subCategory?.name : '' }}
                        </ps-label>
                    </ps-route-link>

                    <ps-icon name="rightArrow" class='text-secondary-400 dark:text-secondaryDark-white mx-2'/>
                    <ps-label class="font-medium lg:text-sm sm:text-xs text-xxs"> {{ productProvider.product.data ? productProvider.product?.data?.title : '' }} </ps-label>
                </div>
                <div class="flex space-x-2 flex-row w-full sm:w-auto mt-2 sm:mt-0">
                    <div class="flex-grow sm:hidden">

                    </div>
                    <div v-if="loginUserId != productProvider.product?.data?.user?.userId">
                        <ps-button class="flex items-center normal-case " textSize="lg:text-xs sm:text-xxs text-3xs" @click="reportItemClicked" theme="text-primary-500 bg-secondary-100 dark:text-primaryDark-white dark:bg-secondaryDark-grey p-2 rounded-2xl" >
                        {{ $t("item_detail__report") }}
                        </ps-button>
                    </div>
                    <ps-button class="flex items-center normal-case " textSize="lg:text-xs sm:text-xxs text-3xs" @click="shareClicked(productProvider.product?.data?.dynamicLink)" theme="text-textLight dark:text-textDark bg-primary-500 dark:bg-primaryDark-accent p-2 rounded-2xl" >
                        {{ $t("item_detail__share") }}
                    </ps-button>
                </div>
            </div>

            <!-- Start Item gallery -->
            <div class="w-full cursor-pointer" >
                <!-- Start Gallery Swiper -->
                <div class="z-0">
                    <gallery-horizontal-swiper :totalCount="totalCount" :imageCount="imageCount" :galleryList="galleryProvider.galleryList.data" :isLoading="galleryProvider.galleryList.data == null && dataReady ? false : true" @clickImage="showGalleryDetail" class='z-0' />
                </div>
                <!-- End Gallery Swiper -->
            </div>
            <!-- End item gallery -->
            
            <div class="w-full mt-8 grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-x-4 sm:gap--x3.5 lg:gap-x-4 justify-between container">
                <ps-label class="col-span-4 flex sm:hidden text-lg font-medium" > {{ productProvider.product.data ? productProvider.product?.data?.title : '' }} </ps-label> 
                <div class="col-span-2 sm:col-span-5  lg:col-span-8 w-full">
                    <div class="flex flex-col ">
                        <ps-label class="hidden sm:flex lg:text-2xl sm:text-xl text-lg font-medium" > {{ productProvider.product.data ? productProvider.product?.data?.title : '' }} </ps-label> 
                        <div class=" mt-2">
                            <div class="flex flex-wrap">
                                <div v-if="productProvider.product.data && productProvider.product?.data?.discountRate!='0' && appInfoProvider?.appInfo?.data?.psItemUploadConfig.discountRate== PsConst.ONE" class="flex flex-col  ">  
                                    <div class="flex flex-row">
                                        <ps-label class="line-through font-medium lg:text-base text-xs" > {{ productProvider.product.data ? productProvider.product?.data?.itemCurrency.currencySymbol : '' }} {{ formatPrice(productProvider.product?.data ? productProvider.product?.data?.price : '') }} </ps-label>
                                        <ps-label class=" ps-1 font-medium lg:text-base text-xs" > {{ ' - '+parseFloat(productProvider.product?.data.discountRate)+'%' }} </ps-label>
                                    </div> 
                                    <ps-label class="lg:text-xl text-sm font-medium" textColor="text-primary-500 dark:text-primaryDark-accent" > {{ productProvider.product.data ? productProvider.product?.data?.itemCurrency.currencySymbol : '' }} {{ formatPrice(productProvider.product?.data ? parseFloat(productProvider.product?.data?.price)-(parseFloat(productProvider.product?.data?.price)*(parseFloat(productProvider.product?.data?.discountRate)/100)) : '') }} </ps-label>
                                    
                                </div>
                                <div v-else class=" ">                    
                                    <ps-label class="lg:text-xl text-sm font-medium " textColor="text-primary-500 dark:text-primaryDark-accent"> {{ productProvider.product?.data ? productProvider.product?.data?.itemCurrency.currencySymbol : '' }} {{ formatPrice(productProvider.product?.data ? productProvider.product?.data?.price : '') }} </ps-label>
                                </div>
                                
                                <!-- <ps-label class="lg:text-xl text-sm font-medium" textColor="text-primary-500 dark:text-primaryDark-accent" >{{productProvider.product?.data?.itemCurrency?.currencySymbol}} {{formatPrice(productProvider.product?.data ? productProvider.product?.data?.price : '')}} </ps-label> -->
                                <ps-label class="sm:ml-2 ml-0 mt-1 lg:text-base text-xs font-light"> {{ productProvider.product.data ? productProvider.product?.data?.itemPriceType?.name : '' }} </ps-label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-2 sm:col-span-3  lg:col-span-4 w-full">
                    <!-- Start favourite icon and chat button -->
                    <div v-if="loginUserId != productProvider.product?.data?.user?.userId" class="flex space-x-3 text-sm font-medium mt-2">
                        <ps-button theme="bg-white dark:bg-primaryDark-black"  @click="favouriteClicked">

                            <div>
                                <ps-icon name="favourite" w="28" h="28" class="text-primary-500 dark:text-primaryDark-accent " v-if="productProvider.product?.data?.isFavourited == '1'"/>
                                <font-awesome-icon :icon="['far', 'heart']" class="text-primary-500 dark:text-primaryDark-accent text-2xl" v-else  />
                            </div>

                        </ps-button>
                        <ps-route-link class="flex flex-grow" :to="{ 
                            name: 'chat',
                            query: { 
                                buyer_user_id : loginUserId,
                                seller_user_id : productProvider.product?.data?.addedUserId,
                                item_name : productProvider.product?.data?.title,
                                item_id : productProvider.product?.data?.id,
                                item_image_name : productProvider.product?.data?.defaultPhoto.imgPath,
                                item_price : getPrice(),
                                currency : productProvider.product?.data?.itemCurrency.currencySymbol,
                                condition : productProvider.product?.data?.conditionOfItem.name,
                                chat_flag : PsConst.CHAT_FROM_SELLER,
                                is_sold_out : productProvider.product?.data?.isSoldOut,

                            }
                        }">
                        <ps-button class="w-full flex font-medium items-center justify-center" theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark" textSize="lg:text-base sm:text-xs text-xxs" >
                            {{ $t("item_detail__chat") }}
                        </ps-button>
                        </ps-route-link>
                        
                    </div>
                    <!-- End favourite icon and chat button -->
                    <div v-if="isPromote" class=" flex flex-row ">
                        <!-- Start delete and edit button -->
                        <div v-if="loginUserId == productProvider.product?.data?.user?.userId" class="flex flex-row text-sm font-medium mt-2">
                            <ps-label @click="deleteClicked()" class="cursor-pointer flex items-center justify-center lg:me-2 me-1 py-1 sm:py-2 px-2 lg:px-3 bg-primary-500 dark:bg-primaryDark-accent rounded-x sm:rounded-xl lg:rounded-2xl" textColor="text-textLight dark:text-textDark ">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-textLight dark:text-textDark lg:text-lg text-base"  />
                            </ps-label>
                            <ps-route-link class="flex flex-grow lg:me-2 me-1" :to="{ name: 'item-entry' ,query: { item_id: productProvider.product?.data?.id }}">
                                <ps-label class="flex items-center justify-center py-1 sm:py-2 px-2 lg:px-3 bg-primary-500 dark:bg-primaryDark-accent rounded-x sm:rounded-xl lg:rounded-2xl" textColor="text-textLight dark:text-textDark ">
                                    <font-awesome-icon :icon="['fas', 'edit']" class="text-textLight dark:text-textDark lg:text-lg text-base"  />
                                </ps-label>
                            </ps-route-link>
                            
                        </div>
                        <!-- End delete and edit button -->
                        <!-- Start promote button -->
                        <div class="flex-grow text-sm font-medium mt-2">
                            <ps-button  textSize="lg:text-md sm:text-xs text-xxs" class="w-full sm:py-3 flex items-center justify-center" theme="text-textLight dark:text-textDark bg-primary-500 dark:bg-primaryDark-accent"  @click="promoteClicked">
                                <span class="sm:hidden block">{{ $t("item_detail__promote") }}</span>
                                <span class="hidden sm:block">{{ $t("item_detail__promote_now") }}</span>
                            </ps-button>
                        </div>
                        <!-- End promote button -->
                    </div>
                    <div v-else class="">
                        <!-- Start delete and edit button -->
                        <div v-if="loginUserId == productProvider.product?.data?.user?.userId" class="cursor-pointer flex flex-row text-sm font-medium mt-2">
                            <ps-label @click="deleteClicked()" class="lg:me-2 me-1 flex w-1/2 items-center justify-center py-1 sm:py-3 px-2 lg:px-3 bg-primary-500 dark:bg-primaryDark-accent rounded-x sm:rounded-xl lg:rounded-2xl" textColor="text-textLight dark:text-textDark ">
                            <font-awesome-icon :icon="['fas', 'trash-alt']" class="text-textLight dark:text-textDark lg:text-lg text-base"  />
                            </ps-label>
                            <ps-route-link class="lg:me-2 me-1 flex flex-grow" :to="{ name: 'item-entry' ,query: { item_id: productProvider.product?.data?.id }}">
                                <ps-label class="flex w-full items-center justify-center py-1 sm:py-3 px-2 lg:px-3 bg-primary-500 dark:bg-primaryDark-accent rounded-x sm:rounded-xl lg:rounded-2xl" textColor="text-textLight dark:text-textDark ">
                                    <font-awesome-icon :icon="['fas', 'edit']" class="text-textLight dark:text-textDark lg:text-lg text-base"  />
                                </ps-label>
                            </ps-route-link>
                            
                        </div>
                        <!-- End delete and edit button -->
                    </div>
                    <div v-if="productProvider.product?.data && productProvider.product.data.isSoldOut == PsConst.ZERO && loginUserId == productProvider.product?.data?.user?.userId" class="mt-2">
                        <ps-button  textSize="lg:text-md sm:text-xs text-xxs" class="w-full sm:py-3 flex items-center justify-center" theme="text-textLight dark:text-textDark bg-primary-500 dark:bg-primaryDark-accent"  @click="markAsSold">
                            <span class=" block">{{ $t("item_detail__mark_as_sold") }}</span>
                        </ps-button>
                    </div>    
                </div>
            </div>
                
            <div class="w-full grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-x-4 sm:gap-x-3.5 lg:gap-x-4 justify-between container">
                
                <div class="col-span-4 sm:col-span-5  lg:col-span-8 w-full">


                    <div class="space-x-2 flex mt-4">
                        <ps-icon name="heart" class="text-primary-500 dark:text-primaryDark-accent"></ps-icon>
                        <p class="">
                            <ps-label class="font-light lg:text-sm text-xs" > {{ productProvider.product.data ? productProvider.product?.data.favouriteCount : '' }} {{ $t("item_detail__likes") }} </ps-label>
                        </p>
                    </div>

                    <div class="flex flex-row lg:space-x-9 sm:spaxe-x-5 space-x-2 my-4 ">

                        <div class=" flex flex-col " v-if="productProvider.product?.data && productProvider.product.data.itemType.name != ''">
                            <ps-label-caption-2 class="font-light" textColor="text-secondary-400 dark:text-secondaryDark-white "> {{ $t("item_detail__ad_type") }} </ps-label-caption-2>

                            <ps-label-caption-3 class="font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.itemType?.name : '' }} </ps-label-caption-3>

                        </div>
                        <div v-if="productProvider.product?.data?.brand" >
                            <div v-if="productProvider.product.data.brand != '' " class=" flex flex-col">
                                <ps-label-caption-2 class="font-light" textColor="text-secondary-400 dark:text-secondaryDark-white"> {{ $t("item_detail__brand") }} </ps-label-caption-2>

                                <ps-label-caption-3 class="font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.brand : '' }} </ps-label-caption-3>

                            </div>
                        </div>
                        
                        <div class=" flex flex-col" v-if="productProvider.product?.data && productProvider.product.data.conditionOfItem.name != ''">
                            <ps-label-caption-2 class="font-light" textColor="text-secondary-400 dark:text-secondaryDark-white"> {{ $t("item_detail__condition") }} </ps-label-caption-2>

                            <ps-label-caption-3 class="font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.conditionOfItem?.name : '' }} </ps-label-caption-3>

                        </div>


                        <div class=" flex flex-col" v-if="productProvider.product?.data &&  productProvider.product.data.dealOption.name != ''">
                            <ps-label-caption-2 class="font-light" textColor="text-secondary-400 dark:text-secondaryDark-white"> {{ $t("item_detail__deal_option") }} </ps-label-caption-2>

                            <ps-label-caption-3 class="font-medium" textColor="text-secondary-500 dark:text-secondaryDark-white"> {{ productProvider.product.data ? productProvider.product?.data?.dealOption?.name : '' }} </ps-label-caption-3>

                        </div>

                        <div class=" flex flex-col" v-if="productProvider.product?.data && productProvider.product.data.isSoldOut != ''">
                            <ps-label-caption-2 class="font-light" textColor="text-secondary-400 dark:text-secondaryDark-white"> {{ $t("item_detail__status") }} </ps-label-caption-2>

                            <ps-label-caption-3 class="font-medium" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ productProvider.product?.data?.isSoldOut == '1' ? $t("item_detail__sold_out") : $t("item_detail__available") }} </ps-label-caption-3>

                        </div>
                    </div>
                    <div v-if=" productProvider.product?.data?.businessMode == '1' " class="flex flex-row space-x-2">
                        <font-awesome-icon :icon="['fas', 'store']" class="text-primary-500 dark:text-primaryDark-accent text-xl "  />
                        
                            <ps-label-caption-2 class="font-light" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("item_detail__is_shop") }} </ps-label-caption-2>
                    </div>
                    <div v-else class="flex flex-row space-x-2">
                        <font-awesome-icon :icon="['fas', 'store-slash']" class="text-primary-500 dark:text-primaryDark-accent text-xl "  />
                        
                        <ps-label-caption-2 class="font-light" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("item_detail__not_shop") }} </ps-label-caption-2>
                    </div>


                    <div class="w-full my-6">
                        <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.highlightInfo==PsConst.ONE" class="px-5 lg:text-sm text-xs font-medium" > {{ productProvider.product.data ? productProvider.product?.data?.highlightInformation : '' }} </ps-label>
                    </div>

                    <ps-label v-if="productProvider.product?.data && productProvider.product.data.description != ''" class="lg:text-base text-sm" > {{ $t("item_detail__description") }} </ps-label>
                    <ps-label class="lg:text-sm text-xs font-light mt-2" > {{ productProvider.product.data ? productProvider.product?.data?.description : '' }} </ps-label>

                    <!-- safety tips  -->
                    <div class="my-2 mt-4 p-4 bg-primary-000 dark:bg-primaryDark-black lg:rounded-2xl sm:rounded-xl rounded-x">
                        <div class="flex flex-row">
                            <ps-icon name="safety" class="text text-secondary-500 dark:text-secondaryDark-white"></ps-icon>
                            <p class="ml-2">
                                <ps-label class="lg:text-base text-sm" > {{ $t("item_detail__safety_tips") }}  </ps-label>
                            </p>
                        </div>
                        
                            
                        <ps-label v-if="showSafetyTip" class="p-2 lg:text-sm text-xs font-light" > 
                            <p class="mt-4" v-if="aboutUsProvider.aboutus.data != null">
                                <span v-html="aboutUsProvider.aboutus?.data?.safetyTips"> </span>
                            </p>
                            {{ showSafetyTip ? aboutUsProvider.aboutus?.data?.safetyTips : aboutUsProvider.aboutus?.data?.safetyTips.slice(0,175)+'....' }} 
                        </ps-label>
                        <ps-label v-else class="p-2 lg:text-sm text-xs font-light" > 
                            <p class="mt-4" v-if="aboutUsProvider.aboutus.data != null">
                                <span v-html="aboutUsProvider.aboutus.data.safetyTips.slice(0,175)+'....'"> </span>
                            </p>
                            <!-- {{ showSafetyTip ? aboutUsProvider.aboutus?.data?.safetyTips : aboutUsProvider.aboutus?.data?.safetyTips.slice(0,175)+'....' }}  -->
                        </ps-label>
                        <div class="flex items-end justify-end">
                        <ps-label v-if="showSafetyTip == false" @click="showSafetyTip=true" class="flex-grow-0 text-xxs lg:text-xs font-medium cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("item_detail__see_more") }} </ps-label>
                        <ps-label v-else @click="showSafetyTip=false" class="flex-grow-0 text-xxs lg:text-xs font-medium cursor-pointer" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("item_detail__ok") }} </ps-label>
                        </div>
                    </div>        
                    <!-- end safety tips  -->
                    
                </div>
                <div class="col-span-4 sm:col-span-3  lg:col-span-4 w-full">

                    <!-- admin Pscard -->
                    <ps-card v-if="productProvider.product?.data?.user?.userId != loginUserId" class="mt-0 sm:mt-2">
                        <div class="p-4 bg-primary-000 dark:bg-primaryDark-black rounded-xl lg:rounded-2xl">
                            <ps-route-link :to="{ name: 'other-profile', params: {userId: productProvider.product?.data?.user?.userId } }">
                            <div class="flex items-start justify-between leading-none" >
                                <div class="flex items-start no-underline text-black cursor-pointer">
                                    <div class="flex">
                                        <img alt="admin" class="rounded-full bg-transparent w-10 h-10 flex items-center object-cover" :src="productProvider.imageUrl( productProvider.product?.data?.user?.userProfilePhoto, 1 )" @error="productProvider.defaultProfileImage" >
                                        
                                    </div>
                                    <div class="flex flex-col ml-4">
                                        <div class="flex">
                                            <ps-label class="font-medium lg:text-base text-sm" > {{ productProvider.product.data ? productProvider.product?.data?.user?.userName : '' }} </ps-label>
                                            <img alt="Placeholder" class="mx-1 w-3 h-3" width="15" height="10" src="@/assets/images/mark2.png" v-if="productProvider.product?.data?.user?.isVerifybluemark == '1'">    
                                        </div>
                                        <ps-route-link :to="{ name: 'review-list',query: { user_id: loginUserId } }">
                                        <div class="flex items-center mt-1.5">
                                            
                                            <rating :grade="productProvider.product.data ? productProvider.product?.data?.user?.overallRating:0" :maxStars="5" :hasCounter="true" />
                                            <ps-label class="font-light ml-2 lg:text-xs text-xxs" > {{productProvider.product.data ? productProvider.product?.data?.user?.overallRating:0}} </ps-label>
                                        </div>
                                        </ps-route-link>
                                        <ps-label v-if="productProvider.product.data && productProvider.product.data?.user?.isShowEmail == '1' " class="font-light text-xxs lg:text-xs mt-1"> {{  productProvider.product.data ? productProvider.product?.data?.user?.userEmail:'' }} </ps-label>
                                        <ps-label v-if="productProvider.product.data && productProvider.product.data?.user?.isShowPhone == '1' " class="font-light text-xxs lg:text-xs mt-1"> {{  productProvider.product.data ? productProvider.product?.data?.user?.userPhone:'' }} </ps-label>
                                        <ps-label class="font-light text-xxs lg:text-xs mt-2"> {{  productProvider.product.data ? productProvider.product?.data?.user?.userAboutMe:'' }} </ps-label>
                                    </div>
                                </div>
                            </div>  
                            </ps-route-link>
                        </div> 
                    </ps-card>
                    <!-- end admin Pscard -->

                    <!-- statistic Pscard -->
                    <div v-if="productProvider.product?.data?.user?.userId == loginUserId" class="mt-0 sm:mt-2">
                        <div class="bg-primary-000 dark:bg-primaryDark-black p-4 lg:rounded-2xl rounded-xl">
                            <div class="flex flex-row">
                                <ps-icon name="signal" class="text-secondary-500 dark:text-secondaryDark-white"></ps-icon>
                                <p class="ml-2 font-medium">
                                    <ps-label class="lg:text-base text-sm"> {{ $t("item_detail__statistic") }} </ps-label>
                                </p>
                            </div>
                            <div class="mt-3">
                                <div class="flex flex-row items-center justify-around">
                                    <div class="flex flex-col space-y-1 items-center">
                                        
                                        <ps-label class="font-medium text-xl lg:text-2xl"> {{productProvider.product?.data?.touchCount}} </ps-label>
                                        <div class="flex flex-row">
                                            <font-awesome-icon :icon="['fas', 'eye']" class="text-secondary-400 dark:text-secondaryDark-white text-base "  />
                                            <ps-label class="ms-1 font-light text-xs lg:text-sm" textColor="text-secondary-400 dark:text-secondaryDark-white"> {{ $t("item_detail__views") }} </ps-label>
                                        </div>
                                    </div>
                                    <div class="h-12 border border-gray-500 dark:border-dark-200" />
                                    <div class="flex flex-col space-y-1 items-center">
                                        
                                        <ps-label class="font-medium text-xl lg:text-2xl"> {{productProvider.product?.data?.favouriteCount}} </ps-label>
                                        <div class="flex flex-row">
                                            <ps-icon name="favourite" class="text-secondary-400 dark:text-textdark-100" w='14' h='14'></ps-icon>
                                            <ps-label class="ms-1 font-light text-xs lg:text-sm" textColor="text-secondary-400 dark:text-secondaryDark-white"> {{ $t("item_detail__favourite") }} </ps-label>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                    </div> 
                    <!-- end statistic Pscard -->

                    <!-- item location Pscard -->
                    <div v-if="productProvider.product?.data" class="mt-2 mb-4 p-4 lg:rounded-2xl rounded-xl bg-primary-000 dark:bg-primaryDark-black">
                        <div class="flex flex-row mb-2">
                            <ps-icon name="location" class="text-secondary-400 dark:text-textdark-100" h="24" w="24" ></ps-icon>
                            <p class="ml-2 font-medium">
                                <ps-label  class=" lg:text-base text-sm "  > {{ $t("item_detail__item_location") }} </ps-label>
                            </p>
                        </div>
                        <ps-label v-if="appInfoProvider?.appInfo?.data.psItemUploadConfig?.address==PsConst.ONE" class="font-light lg:text-sm text-xs my-2" > {{ productProvider.product?.data?.address }} </ps-label>

                        <map-with-pin-picker v-if="appInfoProvider?.appInfo?.data.frontendConfigSetting.googleMap == PsConst.ONE" :lat="parseFloat(productProvider.product?.data?.lat + '')" :lng="parseFloat(productProvider.product?.data?.lng + '')" :draggable="false" />

                        <open-street-map v-if="appInfoProvider?.appInfo?.data.frontendConfigSetting.openStreetMap == PsConst.ONE" class="h-68" :lat="parseFloat(productProvider.product?.data?.lat + '')" :lng="parseFloat(productProvider.product?.data?.lng + '')" :dragValue="false" />
                    </div>
                    <!-- end item location Pscard -->
                    
                </div>
            </div>
            
        
        </div>
       
    </div>

    <!-- google adsense desktop view -->
    <div class="w-mobile sm:w-median lg:w-large mx-auto mt-2">
        <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
    </div>
    <map-with-pin-modal ref="map_with_pin_modal" />
    <ps-loading-dialog ref="ps_loading_dialog" />
    <ps-confirm-dialog ref="ps_confirm_dialog" />
    <ps-error-dialog ref="ps_error_dialog" />
    <gallery-detail-horizontal-swiper ref="gallery_detail"  />
    <promote-item-modal ref="promote_item_modal" />
    <share-to-social-modal ref="share_modal" />
</template>

<script  lang="ts">
//Libs
import { useRoute } from 'vue-router';
import router from "@/router";

// Objects
import PsConst from '@/object/constant/ps_constants';
import { ref, defineAsyncComponent, onMounted } from 'vue';

// Components
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelCaption2 from '@/components/core/label/PsLabelCaption2.vue';
import PsLabelCaption3 from '@/components/core/label/PsLabelCaption3.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsCard from '@/components/core/card/PsCard.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import GalleryHorizontalSwiper from '@/components/modules/gallery/GalleryHorizontalSwiper.vue';
import GalleryDetailHorizontalSwiper from '@/components/modules/gallery/GalleryDetailHorizontalSwiper.vue';
import Rating from '@/components/core/rating/Rating.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PromoteItemModal from '@/components/modules/item/PromoteItemModal.vue';
import MapWithPinModal from '@/components/layouts/map/MapWithPinModal.vue';
import ShareToSocialModal from '@/components/layouts/share/ShareToSocialModal.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

// Models
import { createProductProviderState } from '@/store/modules/item/ProductProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import { createGalleryProviderState } from '@/store/modules/gallery/GalleryProvider';
import { createAboutUsProviderState } from "@/store/modules/aboutus/AboutUsProvider";
import { createFavouriteItemProviderState } from "@/store/modules/item/FavouriteItemProvider";
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import { createTouchCountProviderState } from '@/store/modules/item/TouchCountProvider';
import { createOfferProviderState } from '@/store/modules/offer/OfferProvider';

// Holders
import ReportItemHolder from '@/object/holder/ReportItemHolder';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import TouchCountParameterHolder from "@/object/holder/TouchCountParameterHolder";
import { i18n } from '@/assets/locales/index';
import PsUtils from '@/utils/PsUtils';
import { createReportedItemProviderState } from '@/store/modules/item/ReportedItemProvider';
import MarkSoldOutItemParameterHolder from '@/object/holder/MarkSoldOutItemParameterHolder'
import PsStatus from '@/api/common/PsStatus';
import format from 'number-format.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt,faEdit,faStore,faStoreSlash,faEye } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart,faTrashAlt,faEdit,faStore,faStoreSlash,faEye)

const MapWithPinPicker = defineAsyncComponent(() => import('@/components/layouts/map/MapWithPinPicker.vue'))
const OpenStreetMap = defineAsyncComponent(() => import('@/components/layouts/map/OpenStreetMap.vue'))

export default {
    name : "ItemDetailView",
    components : {
        PsConfirmDialog,
        PsLabel,
        PsLabelCaption2,
        PsLabelCaption3,
        PsIcon,
        PsCard,
        PsButton,
        GalleryHorizontalSwiper,
        Rating,
        PsLoadingDialog,
        PsErrorDialog,
        GalleryDetailHorizontalSwiper,
        PromoteItemModal,
        MapWithPinModal,
        ShareToSocialModal,
        PsRouteLink,
        PsAdSense,
        OpenStreetMap
    },
    setup() {
        const route = useRoute();
        // Get Route Data
        const itemId = route.query.item_id?.toString() ?? '';
        const itemName = route.query.item_name?.toString() ?? '';
     
        // Inject Providers
        const productProvider = createProductProviderState();
        const galleryProvider = createGalleryProviderState();
        const aboutUsProvider = createAboutUsProviderState();
        const reportedItemProvider = createReportedItemProviderState();
        const FavouriteItemProvider = createFavouriteItemProviderState();
        const touchCountProvider = createTouchCountProviderState();
        const markAsSoldHolder = new MarkSoldOutItemParameterHolder().markSoldOutItemHolder();
        const offerProvider = createOfferProviderState();

        const showSafetyTip = ref(false);
        const dataReady = ref(false);
        const imageCount = ref(1);
        let totalCount = ref(0);

        // Init Variables
        const psValueHolder = PsValueProvider.psValueHolder;
        
        const reportItemHolder =new ReportItemHolder();
        const loginUserId = ref(psValueHolder.getLoginUserId());
        const ps_loading_dialog = ref();
        const ps_confirm_dialog = ref();
        const ps_error_dialog = ref();
        const gallery_detail = ref();
        const isPromote = ref(false);
        const isAllPaymentDisable = ref();
        const promote_item_modal = ref();
        const map_with_pin_modal = ref();
        const share_modal = ref();
        const holder = new TouchCountParameterHolder();

        let isVideoSetting = ref(false);


        onMounted(() => {
            // Load Item Data
            loadDataForItemDetail();
            holder.itemId = itemId;
            holder.userId = loginUserId.value;
            touchCountProvider.postTouchCount(holder);
            
        });
        

        async function loadDataForItemDetail() {
            aboutUsProvider.loadAboutUs();
            await productProvider.loadItem(itemId, loginUserId.value );
            await galleryProvider.loadGalleryList(appInfoProvider.appInfo.data.frontendConfigSetting.isEnableVideoSetting, itemId,PsConst.ITEM_TYPE, productProvider.product?.data.videoThumbnail);
            if(productProvider.product?.data.isOwner == PsConst.ONE &&
                productProvider.product?.data.status == PsConst.ONE &&
                (productProvider.product?.data.paidStatus == PsConst.ADSNOTAVAILABLE || 
                productProvider.product?.data?.paidStatus == PsConst.ADSFINISHED) &&
                !isAllPaymentDisable.value) {
                isPromote.value = true;
               
            }else {
                isPromote.value = false;
                                
            }
            dataReady.value = true;
        }

        if(!isAllPaymentDisable.value) {
            isAllPaymentDisableFun();
        }

        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = PsValueProvider.psValueHolder.getLoginUserId();
        
        async function loadAppInfo(){
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            if(appInfoProvider.appInfo.data.frontendConfigSetting.isEnableVideoSetting == PsConst.ONE){
                isVideoSetting.value = true;
            }
            if( parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem) >=1 ){
                imageCount.value = parseInt(appInfoProvider.appInfo.data.psAppSetting.maxImgUploadOfItem);
                //for video upload
                totalCount.value = imageCount.value + 1;
                
            }
        }
        loadAppInfo();
       
        function isAllPaymentDisableFun() {
            
            if(appInfoProvider?.appInfo?.data != null &&
                appInfoProvider?.appInfo?.data.inAppPurchasedEnabled == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.stripeEnable == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.paypalEnable == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.payStackEnabled == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.razorEnable == PsConst.ZERO &&
                appInfoProvider?.appInfo?.data.offlineEnabled == PsConst.ZERO ) {
                    isAllPaymentDisable.value = true;
                } else {
                    isAllPaymentDisable.value = false;
                }
        }

        function promoteClicked() {
            promote_item_modal.value.openModal(
                productProvider.product?.data?.id
            );
        }

        function showGalleryDetail(gallery, galleryList ){

            let tempGallery = JSON.parse(JSON.stringify(gallery));
            let tempGalleryList = JSON.parse(JSON.stringify(galleryList));

            
            if(productProvider.product.data.video.imgId != '' && isVideoSetting.value == true){

                if(gallery == galleryList[0]){
                    tempGallery = productProvider.product.data.video;
                }
                tempGalleryList.shift();
                tempGalleryList.unshift(productProvider.product.data.video);
                
            }
            PsUtils.log(tempGalleryList);
          
            gallery_detail.value.openModal(tempGallery , tempGalleryList);
        }

        async function markAsSold(){
            if(psValueHolder.isUserLoggedIn()){
                ps_confirm_dialog.value.openModal(
                    i18n.global.t('item_detail__confirm'),
                    i18n.global.t('item_detail__confirm_to_mark_as_sold'),
                    i18n.global.t('item_detail__mark_as_sold'),
                    i18n.global.t('item_detail__cancel'),
                    async () => {
                        markAsSoldHolder.itemId = productProvider.product?.data?.id;

                        ps_loading_dialog.value.openModal();

                        await offerProvider.markAsSoldFromDetail(loginUserId.value, markAsSoldHolder);
                        await loadDataForItemDetail();

                        ps_loading_dialog.value.closeModal();
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
        
                
            }else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
        }

        async function favouriteClicked() {
           
            if(psValueHolder.isUserLoggedIn()){
                ps_loading_dialog.value.openModal();
                if( productProvider.product.data.isFavourited == '1' ){
                    ps_loading_dialog.value.message = i18n.global.t('item_detail__removing_item_from_favourite');
                }else{
                    ps_loading_dialog.value.message = i18n.global.t('item_detail__adding_item_to_favourite');
                }
                
                await FavouriteItemProvider.postFavourite(itemId, loginUserId.value);
               
                await loadDataForItemDetail();
                ps_loading_dialog.value.closeModal();
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
        }

        // Report Item Functions
        function deleteClicked() {
            ps_confirm_dialog.value.openModal(
                i18n.global.t('item_detail__confirm'),
                i18n.global.t('item_detail__confirm_to_delete_item'),
                i18n.global.t('item_detail__delete'),
                i18n.global.t('item_detail__cancel'),
                () => {
                    doDelete()
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
            
        }
        async function doDelete(){
            
            const item = await productProvider.userDeleteItem(itemId);
            if(item.status == PsStatus.SUCCESS){
                router.push({
                    name: "dashboard",
                });
            }
            else{
                ps_error_dialog.value.openModal(item.message);
             
            }
            
        }

        // Report Item Functions
        function reportItemClicked() {
            if(psValueHolder.isUserLoggedIn()){
                ps_confirm_dialog.value.openModal(
                    i18n.global.t('item_detail__confirm'),
                    i18n.global.t('item_detail__confirm_to_report_item'),
                    i18n.global.t('item_detail__report'),
                    i18n.global.t('item_detail__cancel'),
                    () => {
                        doReport();
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
            
        }
        async function doReport(){
            reportItemHolder.itemId = itemId;
            reportItemHolder.reportedUserId = loginUserId.value;
            const item = await reportedItemProvider.addReportItem(reportItemHolder);
            if(item.message == "You have already reported to this item."){
                ps_error_dialog.value.openModal(item.message);
              
            }
            else{
                router.push({
                    name: "dashboard",
                });
            }
            
        }
        function shareClicked(url){ 
            share_modal.value.openModal(url, itemId, itemName);
        }
        function formatPrice(value) {
            if(value.toString() == '0') {
                return i18n.global.t('item_price__free');
            }else {
                return format(appInfoProvider.appInfo.data.frontendConfigSetting.priceFormat, value)
            }
        }
        function getPrice(){
            if(productProvider.product.data && productProvider.product.data.discountRate!='0' && appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE){
                return parseFloat(productProvider.product.data.price)-(parseFloat(productProvider.product.data.price)*(parseFloat(productProvider.product.data.discountRate)/100));
            }else{
                return productProvider.product?.data?.price;
            }
        }

        return {
            getPrice,
            dataReady,
            appInfoProvider,
            loginUserId,
            itemId,
            itemName,
            productProvider,
            galleryProvider,
            aboutUsProvider,
            favouriteClicked,
            ps_loading_dialog,
            reportItemClicked,
            ps_confirm_dialog,
            ps_error_dialog,
            showGalleryDetail,
            gallery_detail,
            isPromote,
            promoteClicked,
            promote_item_modal,
            map_with_pin_modal,
            share_modal,
            shareClicked,
            deleteClicked,
            PsConst,
            MapWithPinPicker,
            showSafetyTip,
            formatPrice,
            markAsSold,
            totalCount,
            imageCount
        }
    }
}
</script>