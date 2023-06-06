<template>
  
  <ps-content-container class="sm:mt-32 lg:mt-36 mt-28">
    <template #content>
      <!-- Blog list -->
      <div class="flex flex-col mb-4">
        <div class="flex flex-col items-center ">
          <ps-label-header-4 class="font-medium"> {{ $t("blog_list__blog") }} </ps-label-header-4>
          <ps-label class="mt-2 mb-4 text-center"> {{ $t("blog_list__get_latest_update") }} </ps-label>
        </div>
        <div class="flex flex-row ">
          <div class='w-full h-auto' >
            <ps-ad-sense class="mb-4" adFormat="horizontal"></ps-ad-sense>
            <div class="grid grid-cols-2 sm:grid-cols-3  gap-2 sm:gap-3.5 lg:gap-4 ">
              
              <!-- Column -->
              <div class="w-full" v-for="blog in blogProvider.blogList.data" :key="blog.id">

                <ps-route-link :to="{ name: 'blog-detail', params: { blogId: blog.id, blogName: blog.name  }}">
                  <blog-horizontal-item  :blog="blog" />
                </ps-route-link>
              </div>
              <!-- END Column -->

            </div>

                
            <div class=" items-center justify-center flex">
              <ps-button v-if="blogProvider.loading.value == false" class="w-60 flex-grow-0 mt-6" @click="loadMore" :class="blogProvider.isNoMoreRecord ? 'hidden' : ''"> {{ $t("blog_list__load_more") }} </ps-button>
              <ps-button v-else  class="w-60 flex-grow-0 mt-36" @click="loadMore" :disabled="true"> {{ $t("blog_list__loading") }} </ps-button>
            </div>

          </div>
          
        </div>
       
      </div>
      <!-- End Blog List -->
     <div class="">
        <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
    </div>
    </template>
  </ps-content-container>
    <!-- google adsense desktop view -->
   <div class="">
      <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
    </div>
</template>

<script lang="ts">

// Vue
import { ref } from 'vue';

import PsContentContainer from "@/components/layouts/container/PsContentContainer.vue";
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

// Models
import { createBlogProviderState } from "@/store/modules/blog/BlogProvider";

// Modules
import BlogHorizontalItem from "@/components/modules/blog/BlogHorizontalItem.vue";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";

export default {
  name: "BlogListView",
  components: {
    PsAdSense,
    PsContentContainer,
    BlogHorizontalItem,
    PsButton,
    PsLabel,
    PsLabelHeader4,
    PsRouteLink,
  },
  setup() {
  
    const blogProvider = createBlogProviderState();
    const psValueHolder = PsValueProvider.psValueHolder;
    const locationId = ref(psValueHolder.locationId);
    const loginUserId = psValueHolder.getLoginUserId();

    blogProvider.paramHolder.locationId = locationId.value;
    blogProvider.loadBlogList(loginUserId, blogProvider.paramHolder);

    function loadMore() {             
      blogProvider.loadBlogList(loginUserId, blogProvider.paramHolder);
    }

    return {
      blogProvider,
      loadMore
    };
  },
};
</script>