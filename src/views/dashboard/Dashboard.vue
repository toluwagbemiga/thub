<template>

    <div class="">
        
        <div class="">

            <div class="sm:mt-24 mt-24 lg:mt-28 w-full">

                <div class="bg-black h-64 ">
            
                    <div class="relative bg-black sm:h-56 h-36 ">
                        <div class="absolute opacity-60">
                            <!-- <img alt="Placeholder" width="100%" height="auto" class="w-screen lg:h-64 lg:block hidden object-cover rounded-md" src="@/assets/images/chart.jpeg">
                            <img alt="Placeholder" width="100%" height="auto" class="w-screen hidden sm:block lg:hidden h-64 object-cover rounded-md" src="@/assets/images/chart-tb.jpeg">
                            <img alt="Placeholder" width="100%" height="auto" class="w-screen block sm:hidden h-64 object-cover rounded-md" src="@/assets/images/chart-mb.png"> -->
                            <img alt="Placeholder" width="100%" height="auto"  class="w-screen h-64 object-cover" :src="require('@/assets/images/'+appInfoProvider?.appInfo?.data?.frontendConfigSetting?.bannerSrc)">                            
                        </div>
                        <div class="relative w-mobile sm:w-median lg:w-large mx-auto" >
                            <div class="pt-10 grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-2 sm:gap-3.5 lg:gap-4 ">
                                <div class=" opacity-80 flex flex-col items-center w-full col-span-1 sm:col-span-2 lg:col-span-3 my-2 bg-background dark:bg-backgroundDark px-1 py-2 lg:p-4 rounded-x sm:rounded-xl lg:rounded-2xl">
                                    <div class="   mb-2">
                                        <ps-icon textColor="text-primary-500 dark:text-primaryDark-accent" name="edit" h="24" w="28" class="hidden sm:flex" />
                                        <ps-icon textColor="text-primary-500 dark:text-primaryDark-accent" name="edit" h="20" w="24" class="flex sm:hidden"/>
                                    </div>
                                    <div class="flex-1 w-full">
                                        <div class="font-semibold lg:text-base sm:text-xs text-xxs flex justify-center">
                                            <ps-label class="flex-grow-0 font-medium" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("dashboard__create") }} </ps-label>
                                        </div>
                                        <ps-label class = " p-2 text-center hidden text-md sm:text-xs font-light sm:flex"  > {{ $t("dashboard__create_text") }}  </ps-label>
                                    </div>
                                </div>

                                <div class=" opacity-80 flex flex-col items-center w-full col-span-1 sm:col-span-2 lg:col-span-3 my-2 bg-background dark:bg-backgroundDark px-1 py-2 lg:p-4 rounded-x sm:rounded-xl lg:rounded-2xl">
                                    <div class="dark:text-primaryDark-accent text-primary-500 mb-2">
                                        <font-awesome-icon :icon="['fas', 'bullhorn']" class="text-primary-500 dark:text-primaryDark-accent lg:text-base text-sm" />
                                    </div>
                                    <div class="flex-1 w-full ">
                                        <div class="font-semibold lg:text-base sm:text-xs text-xxs flex justify-center">
                                            <ps-label class="flex-grow-0 font-medium"  textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("dashboard__promote") }} </ps-label>
                                        </div>
                                        <ps-label class = " p-2 text-center text-md font-light sm:text-xs hidden sm:flex"  > {{ $t("dashboard__promote_text") }}  </ps-label>
                                    </div>
                                </div>

                                <div class=" opacity-80 flex flex-col items-center w-full col-span-1 sm:col-span-2 lg:col-span-3 my-2 bg-background dark:bg-backgroundDark px-1 py-2 lg:p-4 rounded-x sm:rounded-xl lg:rounded-2xl">
                                    <div class=" mb-2">
                                            <ps-icon textColor="text-primary-500 dark:text-primaryDark-accent" name="chat" h="24" w="28" class="hidden sm:flex" />
                                        <ps-icon textColor="text-primary-500 dark:text-primaryDark-accent" name="chat" h="20" w="24" class="flex sm:hidden"/>
                                    </div>
                                    <div class="flex-1 w-full ">
                                        <div class="font-semibold lg:text-base sm:text-xs text-xxs  flex justify-center">
                                            <ps-label class="flex-grow-0 font-medium"  textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("dashboard__negotiate") }} </ps-label>
                                        </div>
                                        <ps-label class = " p-2 text-center text-md sm:text-xs font-light hidden sm:flex" > {{ $t("dashboard__negotiate_text") }}  </ps-label>
                                    </div>
                                </div>

                                <div class=" opacity-80 flex flex-col items-center w-full col-span-1 sm:col-span-2 lg:col-span-3 my-2 bg-background dark:bg-backgroundDark px-1 py-2 lg:p-4 rounded-x sm:rounded-xl lg:rounded-2xl">
                                    <div class=" dark:text-primaryDark-accent text-primary-500 mb-2">
                                        <font-awesome-icon :icon="['fas', 'handshake']" class=" lg:text-base text-sm"  />
                                    </div>
                                    <div class="flex-1 w-full items-center ">
                                        <div class="font-semibold lg:text-base sm:text-xs text-xxs  flex justify-center">
                                            <ps-label class="flex-grow-0 font-medium"  textColor="text-primary-500 dark:text-primaryDark-accent"> {{ $t("dashboard__accomplished") }} </ps-label>
                                        </div>
                                        <ps-label class = " p-2 text-center text-md sm:text-xs font-light hidden sm:flex" > {{ $t("dashboard__accomplished_text") }}  </ps-label>
                                    </div>
                                </div>

                                
                            </div>
                            
                        </div>
                    </div>
                    <div class="relative w-mobile sm:w-median lg:w-large mx-auto">
                        <div class="bg-background dark:bg-backgroundDark rounded-xl py-2 px-4 shadow-md dark:shadow-xl w-11/12 mx-auto">
                            <search-for-large-screem @clicklocation="locationFilterClicked" @onSubclick="subLocationFilterClicked" />
                        </div>
                    </div>

                </div>

            </div>
            
            <div>

                <div class="mb-6 sm:mt-16 mt-44  w-mobile sm:w-median lg:w-large mx-auto">
                    <div > 
                        <ps-label-header-4 class="font-medium "  >{{ $t("dashboard__category_header") }}</ps-label-header-4>   
                    </div>
                    <div class="grid lg:grid-cols-12 sm:grid-cols-6 grid-cols-4  gap-2 sm:gap-3.5 lg:gap-4 mt-6 gap-y-4" v-if="categoryProvider.itemList.data != null">
                        <div v-for="category in categoryProvider.itemList.data.slice(0,6)" :key="category.catId" class="w-full lg:col-span-2 sm:col-span-1 col-span-2 hidden sm:block">
                            <ps-route-link
                                :to="{name: 'item-list', 
                                query: { 
                                    cat_id: category.catId, 
                                    cat_name: category.catName } }"> 
                                <category-horizontal-item :category="category" />
                            </ps-route-link> 
                        </div>

                        <div v-for="category in categoryProvider.itemList.data.slice(0,4)" :key="category.catId" class="col-span-1 block sm:hidden">
                            <ps-route-link
                                :to="{name: 'item-list', 
                                query: { 
                                    cat_id: category.catId, 
                                    cat_name: category.catName } }"> 
                                <category-horizontal-item :category="category" />
                            </ps-route-link> 
                        </div>
                
                    </div>

                    <div class="flex justify-end mt-4">
                            <ps-route-link :to="{name: 'category-list'}">
                                <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> {{ $t("dashboard__view_all") }} 
                                    <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> </ps-button>
                            </ps-route-link>                            
                    </div>
                </div>
            </div>

            <!-- Start feature items -->
            <div  v-if="itempaidProvider.productList?.data != null">
                
                <div class=" mt-12 w-mobile sm:w-median lg:w-large mx-auto">
                
                    <div class="">
                        <ps-label-header-4 class="font-medium " > {{ $t("dashboard__feature_items") }} </ps-label-header-4> 
                    </div>      
                    <div class="w-full mt-4">
                        <div v-if="itempaidProvider.productList?.data != null">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">

                                <div class="w-full col-span-2 lg:col-span-3" v-for="item in itempaidProvider.productList.data.slice(0,8)" :key="item.id">
                                    <item-horizontal-item v-if="item.title == ''" :item="item" />
                                    <ps-route-link v-else :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()  }}">
                                        <item-horizontal-item  :item="item" />
                                    </ps-route-link>
                                    
                                </div>

                            </div>
                        </div>
                        <div v-else-if="itempaidProvider.productList != null && itempaidProvider.loading.value ">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                        
                                <div class="w-full col-span-2 lg:col-span-3" v-for="i in 10" :key="i">
                                    
                                    <item-horizontal-skeletor-item />
                                    
                                </div>
                        
                            </div>
                        </div>
                    </div>

                <div class="flex justify-end mt-4">
                        <ps-route-link :to="{name: 'item-list', query: paidParams['query'] }" >
                            <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> 
                                {{ $t("dashboard__view_all") }} 
                                <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> 
                                </ps-button>
                        </ps-route-link>
                    </div>
                </div>
 
            </div>
            <!-- End feature items -->

            <!-- Start discount items -->
            <div  v-if="discountListProvider.productList?.data != null && appInfoProvider?.appInfo?.data?.psItemUploadConfig?.discountRate== PsConst.ONE">
                
                <div class=" mt-12 w-mobile sm:w-median lg:w-large mx-auto">
                
                    <div class="">
                        <ps-label-header-4 class="font-medium " > {{ $t("dashboard__discount_items") }} </ps-label-header-4> 
                    </div>      
                    <div class="w-full mt-4">
                        <div v-if="discountListProvider.productList?.data != null">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">

                                <div class="w-full col-span-2 lg:col-span-3" v-for="item in discountListProvider.productList.data.slice(0,8)" :key="item.id">

                                    <item-horizontal-item v-if="item.title == ''" :item="item" />
                                    <ps-route-link v-else :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()  }}">
                                        <item-horizontal-item  :item="item" />
                                    </ps-route-link>
                                    
                                </div>

                            </div>
                        </div>
                        <div v-else-if="discountListProvider.productList != null && discountListProvider.loading.value ">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                        
                                <div class="w-full col-span-2 lg:col-span-3" v-for="i in 10" :key="i">
                                    
                                    <item-horizontal-skeletor-item />
                                    
                                </div>
                        
                            </div>
                        </div>
                    </div>

                <div class="flex justify-end mt-4">
                        <ps-route-link :to="{name: 'item-list', query: discountParams['query'] }" >
                            <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> 
                                {{ $t("dashboard__view_all") }} 
                                <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> 
                                </ps-button>
                        </ps-route-link>
                    </div>
                </div>
 
            </div>
            <!-- End discount items -->
            
            <!-- Start recent Posts -->
            <div  v-if="itemrecentProvider.itemList?.data != null">
                
                <div class=" mt-12 w-mobile sm:w-median lg:w-large mx-auto">
                
                    <div class="">
                        <ps-label-header-4 class="font-medium " > {{ $t("dashboard__recent_items") }} </ps-label-header-4> 
                    </div>      
                    <div class="w-full mt-4">
                        <div v-if="itemrecentProvider.itemList?.data != null">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">

                                <div class="w-full col-span-2 lg:col-span-3" v-for="item in itemrecentProvider.itemList.data.slice(0,8)" :key="item.id">

                                    <item-horizontal-item v-if="item.title == ''" :item="item" />
                                    <ps-route-link v-else :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()  }}">
                                        <item-horizontal-item  :item="item" />
                                    </ps-route-link>
                                    
                                </div>

                            </div>
                        </div>
                        <div v-else-if="itemrecentProvider.itemList != null && itemrecentProvider.loading.value ">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                        
                                <div class="w-full col-span-2 lg:col-span-3" v-for="i in 10" :key="i">
                                    
                                    <item-horizontal-skeletor-item />
                                    
                                </div>
                        
                            </div>
                        </div>
                    </div>

                <div class="flex justify-end mt-4">
                        <ps-route-link :to="{name: 'item-list', query: recentParams['query'] }" >
                            <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> 
                                {{ $t("dashboard__view_all") }} 
                                <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> 
                                </ps-button>
                        </ps-route-link>
                    </div>
                </div>

                
                
            </div>
            <!-- End recent Posts -->
            
            <!-- google adsense desktop view -->
            <div class="w-mobile sm:w-median lg:w-large mx-auto mt-2">
                <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
            </div>
          
            <!-- Start Popular Posts -->
            <div  v-if="itempopularProvider.itemList?.data != null">

                <div class=" mt-8 mb-12 w-mobile sm:w-median lg:w-large mx-auto">
                        
                    <div class="mt-12">
                        <ps-label-header-4 class="font-medium " > {{ $t("dashboard__popular_items") }}  </ps-label-header-4> 
                        
                    </div>
                    <div class="  mt-4">
                        <div v-if="itempopularProvider.itemList?.data != null">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4 ">

                                <div class="w-full col-span-2 lg:col-span-3" v-for="item in itempopularProvider.itemList.data.slice(0,8)" :key="item.id">

                                    <item-horizontal-item v-if="item.title == ''" :item="item" />
                                    <ps-route-link v-else :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                                        <item-horizontal-item  :item="item" />
                                    </ps-route-link>

                                </div>
                              
                            </div>
                        </div>
                        <div v-else-if="itempopularProvider.itemList != null && itempopularProvider.loading.value ">
                            <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                        
                                <div class="col-span-2 lg:col-span-3 w-full" v-for="i in 10" :key="i">
                                    
                                    <item-horizontal-skeletor-item />
                                    
                                </div>
                        
                            </div>
                        </div>

                            <div class="flex justify-end mt-4">
                                <ps-route-link :to="{name: 'item-list', query: popularParams['query'] }" >
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> 
                                        {{ $t("dashboard__view_all") }}
                                        <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> 
                                        </ps-button>
                                </ps-route-link>
                            </div>
                        

                    </div>
                    
                </div>

            </div>
            <!-- End Popular Posts -->

            <!-- item from followers -->
            <div v-if="itemFollowerProvider.itemList?.data != null" >
                <div class="w-mobile sm:w-median lg:w-large mx-auto mt-12">
                    
                    <ps-label-header-4 class="font-medium " >  {{ $t("dashboard__items_from_followers") }}  </ps-label-header-4> 

                    <div class="">
                        <div class="w-full mt-6" >
                            <div class="">
                                <div v-if="itemFollowerProvider.itemList?.data != null">
                                    <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">

                                        <div class="w-full col-span-2 lg:col-span-3" v-for="item in itemFollowerProvider.itemList.data.slice(0,8)" :key="item.id">
                                    
                                            <item-horizontal-item v-if="item.title == ''" :item="item" />
                                            <ps-route-link v-else :to="{ name: 'item', params: { itemName: item.title.split(' ').join('-').toLowerCase() }, query: { item_id: item.id, item_name: item.title.split(' ').join('-').toLowerCase()   }}">
                                                <item-horizontal-item  :item="item" />
                                            </ps-route-link>
                                            
                                        </div>

                                    </div>
                                </div>
                                <div v-else-if="itemFollowerProvider.itemList != null && itemFollowerProvider.loading.value ">
                                    <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4">
                                
                                        <div class="w-full col-span-2 lg:col-span-3" v-for="i in 10" :key="i">
                                            
                                            <item-horizontal-skeletor-item />
                                            
                                        </div>
                                
                                    </div>
                                </div>

                            </div>                       

                        </div>

                        <div class="justify-end flex mt-4">
                            <div class="flex-grow-0">
                                <ps-route-link :to="{name: 'follower-items' }" class="flex-grow-0">
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> 
                                        {{ $t("dashboard__view_all") }} 
                                        <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> 
                                        </ps-button>
                                </ps-route-link>
                            </div>
                        </div>

                    </div>
                    
                    
                </div>
            </div>
            <!-- end item from follower -->
            
            <!-- Start Blog Posts -->
            <div v-if="blogProvider.blogList != null && blogProvider.blogList.data != null">
                <div class="w-mobile sm:w-median lg:w-large mx-auto">
                    <div class="mt-8">
                        <ps-label-header-4 class="font-medium " > {{ $t("dashboard__blog") }} </ps-label-header-4> 
                    </div>
                        

                    <div class=" pb-10 mt-4">
                      
                        <!-- Column -->
                        <!-- temporary trancate  -->
                        <Carousel :items-to-show="3" :wrap-around="true" :autoplay="2000">
                            <Slide v-for="blog in blogProvider.blogList.data" :key="blog.id">
                                <div class="flex pr-6">
                                    <ps-route-link :to="{ name: 'blog-detail', params: { blogId: blog.id, blogName: blog.name  }}">
                                        <blog-horizontal-item  :blog="blog" />
                                    </ps-route-link>
                                </div>
                            </Slide>
                        </Carousel>
                        <!-- END Column -->

                        <div class="justify-end flex mt-4">
                            <div class="flex-grow-0">
                                <ps-route-link :to="{ name: 'blog-list'}" class="flex-grow-0">
                                    <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> 
                                        {{ $t("dashboard__view_all") }} 
                                        <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> 
                                        </ps-button>
                                </ps-route-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Blog Posts -->

            <!-- Start User List -->
            <div v-if="userProvider.userList != null && userProvider.userList.data != null">
                <div class="w-mobile sm:w-median lg:w-large mx-auto">
                    <div class="mt-8">
                        <ps-label-header-4 class="font-medium " > {{ $t("dashboard__account_list") }} </ps-label-header-4> 
                    </div>
                        

                    <div class=" pb-10 mt-4">
                        <div class="">
                            <div class="w-full" >
                                <div class="grid lg:grid-cols-12 sm:grid-cols-8 grid-cols-4  gap-4 sm:gap-3.5 lg:gap-4" >
                                    <!-- Column -->
                                    <!-- temporary trancate  -->
                                    <div class="w-full col-span-4 " v-for="user in userProvider.userList.data.slice(0,3)" :key="user.userId" >

                                        <!-- <ps-route-link :to="{ name: 'other-profile', params: {userId: user.userId } }"> -->
                                            <user-search-list-horizontal @clickFollow="refleshUserData" :user="user" />
                                        <!-- </ps-route-link> -->
                                        
                                    </div>
                                    <!-- END Column -->

                                </div>
                            </div>

                            <div class="justify-end flex mt-4">
                                <div class="flex-grow-0">
                                    <ps-route-link :to="{ name: 'account-list'}" class="flex-grow-0">
                                        <ps-button class="flex flex-row " theme="bg-primary-500 dark:bg-primaryDark-accent text-textLight dark:text-textDark capitalize px-4 py-1"> 
                                            {{ $t("dashboard__view_all") }} 
                                            <ps-icon class="ms-1 mt-1" textColor="text-textLight dark:text-textDark" name="arrowNarrowRight" h="20" w="24"/> 
                                            </ps-button>
                                    </ps-route-link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!-- End User list -->
        </div>

        <ps-confirm-dialog ref='ps_confirm_dialog' />
        <ps-loading-dialog ref="ps_loading_dialog"  :isClickOut='false'/> 

    </div>
</template>

<script lang="ts">

// Libs
import { ref, defineAsyncComponent, onMounted,onUnmounted, onBeforeUnmount } from 'vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { useI18n } from 'vue-i18n';

import PsCoreAuth from "@/global/PsCoreAuth";
import "vue-skeletor/dist/vue-skeletor.css";

// Components
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import CategoryHorizontalItem from "@/components/modules/category/CategoryHorizontalItem.vue";
import BlogHorizontalItem from "@/components/modules/blog/BlogHorizontalItem.vue";
import ItemHorizontalSkeletorItem from "@/components/modules/item/ItemHorizontalSkeletorItem.vue";
import UserSearchListHorizontal from "@/components/modules/user/UserSearchListHorizontal.vue";
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsConfirmDialog from '@/components/core/dialog/PsConfirmDialog.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import SearchForLargeScreem from "@/views/search/SearchForLargeScreen.vue";
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

// Providers
import { useRecentItemProviderState } from "@/store/modules/item/RecentItemProvider";
import { useCategoryProviderState } from "@/store/modules/category/CategoryProvider";
import { createUserListProviderState } from "@/store/modules/user/UserListProvider";
import { useItemLocationProviderState } from '@/store/modules/itemlocation/ItemLocationProvider';
import { useBlogProviderState } from "@/store/modules/blog/BlogProvider";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';

// Holders
import LocationParameterHolder from '@/object/holder/LocationParameterHolder';
import FollowItemParameterHolder from '@/object/holder/FollowItemParameterHolder';
import { usePopularItemProviderState } from '@/store/modules/item/PopularItemProvider';
import { useFollowerItemProviderState } from '@/store/modules/item/FollowerItemProvider';
import { createProductProviderState } from "@/store/modules/item/ProductProvider";
import ProductParameterHolder from '@/object/holder/ProductParameterHolder';
import UserListParameterHolder from '@/object/holder/UserListParameterHolder';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';

import PsConst from '@/object/constant/ps_constants';
import PsUtils from '@/utils/PsUtils';

const ItemHorizontalItem = defineAsyncComponent(() => import('@/components/modules/item/ItemHorizontalItem.vue'))

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBullhorn,faHandshake } from '@fortawesome/free-solid-svg-icons'
library.add(faBullhorn,faHandshake)

export default {
    name : "DashboardView",
    components: {
        ItemHorizontalItem,
        CategoryHorizontalItem,
        PsRouteLink,
        SearchForLargeScreem,
        PsLabelHeader4,
        PsButton,
        PsLabel,
        PsIcon,
        BlogHorizontalItem,
        ItemHorizontalSkeletorItem,
        UserSearchListHorizontal,
        PsLoadingDialog,
        PsConfirmDialog,
        PsAdSense,
        Carousel,
        Slide
    },
    setup() {

        // Inject Provider
        const blogProvider = useBlogProviderState();
        const locationKeyword = ref('');
        const psValueHolder = PsValueProvider.psValueHolder;
        const ps_loading_dialog = ref();
        const ps_confirm_dialog = ref();
    
        psValueHolder.updateExpiryTimeForAction(); // only call from dashboard

        const locationName = ref(psValueHolder.locationName);
        const locationId = ref(psValueHolder.locationId);
        const t = useI18n;

        const itemlocationProvider = useItemLocationProviderState();
        const userProvider = createUserListProviderState();

        // Inject Item Provider
        const itempopularProvider = usePopularItemProviderState();
        const itemFollowerProvider = useFollowerItemProviderState();
        const itemrecentProvider = useRecentItemProviderState();
        const categoryProvider = useCategoryProviderState();
        const itempaidProvider = createProductProviderState();
        const discountListProvider = createProductProviderState();
        const userListHolder = new UserListParameterHolder();
        const appInfoProvider = usePsAppInfoProviderState();


        itempopularProvider.id = "Id from Dashboard";
        itemFollowerProvider.id = "Id from Dashboard";
        itemrecentProvider.id = "Id from Dashboard";
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);

        const paramHolder = new LocationParameterHolder().getDefaultParameterHolder();
        const holder = new FollowItemParameterHolder();
        const paidHolder = new ProductParameterHolder().getPaidItemParameterHolder();
        const discountHolder = new ProductParameterHolder().getDiscountParameterHolder();
        const latitude  =  psValueHolder.locationLat == null || psValueHolder.locationLat == '' ? '0' : psValueHolder.locationLat;
        const longitude =  psValueHolder.locationLng == null || psValueHolder.locationLng == '' ? '0' : psValueHolder.locationLng;
        itemrecentProvider.paramHolder.lat = latitude.toString();
        itemrecentProvider.paramHolder.lng = longitude.toString();
        // itemrecentProvider.paramHolder.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        itemrecentProvider.paramHolder.mile = '8';
        itemrecentProvider.paramHolder.itemLocationId = locationId.value;
        itemrecentProvider.paramHolder.itemLocationTownship = psValueHolder.subLocationId;
        itemrecentProvider.paramHolder.itemLocationName = psValueHolder.locationName;
        itemrecentProvider.paramHolder.itemLocationTownshipName = psValueHolder.subLocationName;
        

        itempopularProvider.paramHolder.lat = latitude.toString();
        itempopularProvider.paramHolder.lng = longitude.toString();
        // itempopularProvider.paramHolder.mile = appInfoProvider.appInfo.data.frontendConfigSetting.mile;
        itempopularProvider.paramHolder.mile = '8';
        itempopularProvider.paramHolder.itemLocationId = locationId.value;
        itempopularProvider.paramHolder.itemLocationTownship = psValueHolder.subLocationId;
        itempopularProvider.paramHolder.itemLocationName = psValueHolder.locationName;
        itempopularProvider.paramHolder.itemLocationTownshipName = psValueHolder.subLocationName;
        
        holder.itemLocationId = locationId.value;
        holder.itemLocationTownship = psValueHolder.subLocationId;
       
        let recentParams = itemrecentProvider.paramHolder.getUrlParamsAndQuery();
        let popularParams = itempopularProvider.paramHolder.getUrlParamsAndQuery();
        let paidParams =  paidHolder.getUrlParamsAndQuery();
        let discountParams =  discountHolder.getUrlParamsAndQuery();
        
        //load Blog List
        blogProvider.paramHolder.locationId = locationId.value;
  
        onMounted(() => {
            if(itempaidProvider.productList.data == null || itempaidProvider.productList.data?.length == 0){
                itempaidProvider.resetPaidProductList(loginUserId,paidHolder);
            }

            if(itemrecentProvider.itemList.data == null || itemrecentProvider.itemList.data?.length == 0){
                itemrecentProvider.resetProductList(loginUserId, itemrecentProvider.paramHolder);
            }

            if(itempopularProvider.itemList.data == null || itempopularProvider.itemList.data?.length == 0){
                itempopularProvider.resetProductList(loginUserId, itempopularProvider.paramHolder);
            }

            if(discountListProvider.productList.data == null || discountListProvider.productList.data?.length == 0){
                discountListProvider.resetItemList(loginUserId,discountHolder);
            }
           
            if(loginUserId != '' && loginUserId != PsConst.NO_LOGIN_USER) {
                itemFollowerProvider.resetProductList(loginUserId, holder);
            }
            
            appInfoParameterHolder.userId = loginUserId;
            appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            categoryProvider.loadItemList(loginUserId, categoryProvider.paramHolder);
            blogProvider.resetBlogList(loginUserId, blogProvider.paramHolder);
            //load User list
            userProvider.loadUserSearchList( loginUserId,userListHolder);
        });
        onBeforeUnmount(() => {
            PsUtils.log('onBeforeUnmount')
        });
        onUnmounted(() => {
            PsUtils.log('unmounting success')
        });

        function loadLocationList() {
            PsUtils.log("Loading ...");
            
            itemlocationProvider.loadItemLocationList(psValueHolder.getLoginUserId(), paramHolder);
        }

        async function locationFilterClicked(value) {

            PsUtils.log(value);
            locationId.value = value.id;
            locationName.value = value.name;

    
            itempopularProvider.paramHolder.itemLocationTownship = '';
            itempopularProvider.paramHolder.itemLocationTownshipName = '';
            itemrecentProvider.paramHolder.itemLocationTownship = '';
            itemrecentProvider.paramHolder.itemLocationTownshipName = '';

            blogProvider.paramHolder.locationId = locationId.value;
            psValueHolder.replaceLocation(value.id, value.name, value.lat, value.lng);    

            itempopularProvider.paramHolder.itemLocationId = value.id;
            itempopularProvider.paramHolder.itemLocationName = value.name;
            itemrecentProvider.paramHolder.itemLocationId = value.id;
            itemrecentProvider.paramHolder.itemLocationName = value.name;

            itempopularProvider.paramHolder.lat = '';
            itempopularProvider.paramHolder.lng = '';
            itemrecentProvider.paramHolder.lat = '';
            itemrecentProvider.paramHolder.lng = '';

            
            recentParams = itemrecentProvider.paramHolder.getUrlParamsAndQuery();
            popularParams = itempopularProvider.paramHolder.getUrlParamsAndQuery();

            ps_loading_dialog.value.openModal();
            await itempaidProvider.resetPaidProductList(loginUserId,paidHolder);
            await itempopularProvider.resetProductList(loginUserId, itempopularProvider.paramHolder);
            await itemrecentProvider.resetProductList(loginUserId, itemrecentProvider.paramHolder);
            await blogProvider.resetBlogList(loginUserId, blogProvider.paramHolder);
            ps_loading_dialog.value.closeModal();

        }

        async function subLocationFilterClicked(value ) {
            PsUtils.log(value);
            locationId.value = value.id;
            locationName.value = value.name;

            itempopularProvider.paramHolder.itemLocationTownship = value.subId;
            itempopularProvider.paramHolder.itemLocationTownshipName = value.subName;
            itemrecentProvider.paramHolder.itemLocationTownship = value.subId;
            itemrecentProvider.paramHolder.itemLocationTownshipName = value.subName;

            itempopularProvider.paramHolder.itemLocationId = value.id;
            itempopularProvider.paramHolder.itemLocationName = value.name;
            itemrecentProvider.paramHolder.itemLocationId = value.id;
            itemrecentProvider.paramHolder.itemLocationName = value.name;

            recentParams = itemrecentProvider.paramHolder.getUrlParamsAndQuery();
            popularParams = itempopularProvider.paramHolder.getUrlParamsAndQuery();

            ps_loading_dialog.value.openModal();
            await itempaidProvider.resetPaidProductList(loginUserId,paidHolder);
            await itempopularProvider.resetProductList(loginUserId, itempopularProvider.paramHolder);
            await itemrecentProvider.resetProductList(loginUserId, itemrecentProvider.paramHolder);
            ps_loading_dialog.value.closeModal();

        }
        

        function filterKeywordUpate(value) {
            itemlocationProvider.filterKeywordUpate(value,loginUserId, paramHolder);
        }
        async function refleshUserData(){

            ps_loading_dialog.value.openModal();
            await userProvider.refleshUserSearchList( loginUserId,userListHolder);

            
            ps_loading_dialog.value.closeModal();
        }

        return {
            appInfoProvider,
            categoryProvider,
            discountListProvider,
            discountParams,
            refleshUserData,
            PsCoreAuth,
            itempopularProvider,
            itemFollowerProvider,
            itemrecentProvider,
            userProvider,
            PsValueProvider,
            blogProvider,
            itemlocationProvider,
            locationName,
            locationId,
            loadLocationList,
            locationFilterClicked,
            recentParams,
            popularParams,
            filterKeywordUpate,
            locationKeyword,
            ps_loading_dialog,
            ps_confirm_dialog,
            subLocationFilterClicked,
            itempaidProvider,
            paidParams,
            t,
            PsConst
        };
    },
};
</script>