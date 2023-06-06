<template>
  <ps-content-container>
    <template #content>
      <div class="mt-36 mb-16 flex flex-col">
        <div class="flex flex-col mb-4 ">
              
          <div class=" w-auto cursor-pointer my-2">
            <img alt="Placeholder" width="15px" height="10px" class="block w-full h-128 object-cover" :src="aboutUsProvider.imageUrl( aboutUsProvider.aboutus?.data?.defaultPhoto?.imgPath )">
            <div class="mt-4">
              <ps-label-title> {{aboutUsProvider.aboutus?.data?.aboutTitle}} </ps-label-title>
              <p class="mt-4" v-if="aboutUsProvider.aboutus?.data?.aboutDescription != ''">
                  <ps-label v-html="aboutUsProvider.aboutus?.data?.aboutDescription"> </ps-label>
              </p>
            </div>
          </div>

          <div class="mx-8">
            <!-- for phone -->
            <div class="space-x-2 flex mt-2" v-if="aboutUsProvider.aboutus?.data?.aboutPhone != null && aboutUsProvider.aboutus?.data?.aboutPhone != ''">
              <font-awesome-icon :icon="['fas', 'phone-square']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
              <p class="ml-2">
                <ps-label-title-4 class="px-4"> {{ $t("about__phone") }}  </ps-label-title-4>
                <ps-label-caption class="leading-normal px-4"> {{aboutUsProvider.aboutus?.data?.aboutPhone}} </ps-label-caption>
              </p>
            </div>

            <!-- for website -->
            <div class="space-x-2 flex mt-2" v-if="aboutUsProvider.aboutus?.data?.aboutWebsite != null && aboutUsProvider.aboutus?.data?.aboutWebsite != ''">
              <font-awesome-icon :icon="['fas', 'globe']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
              <p class="ml-2">
                <ps-label-title-4 class="px-4"> {{ $t("about__website") }} </ps-label-title-4>
                <ps-label-caption class="leading-normal px-4"> {{aboutUsProvider.aboutus?.data?.aboutWebsite}} </ps-label-caption>
              </p>
            </div>

            <!-- for facebook -->
            <div class="space-x-2 flex mt-2" v-if="aboutUsProvider.aboutus?.data?.facebook != null && aboutUsProvider.aboutus?.data?.facebook != ''">
              <font-awesome-icon :icon="['fab', 'facebook-square']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
              <p class="ml-2">
                <ps-label-title-4 class="px-4"> {{ $t("about__facebook") }} </ps-label-title-4>
                <ps-label-caption class="leading-normal px-4"> {{aboutUsProvider.aboutus?.data?.facebook}} </ps-label-caption>
              </p>
            </div>

            <!-- for twitter -->
            <div class="space-x-2 flex mt-2" v-if="aboutUsProvider.aboutus?.data?.twitter != null && aboutUsProvider.aboutus?.data?.twitter != ''">
              <font-awesome-icon :icon="['fab', 'twitter-square']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
              <p class="ml-2">
                <ps-label-title-4 class="px-4"> {{ $t("about__twitter") }} </ps-label-title-4>
                <ps-label-caption class="leading-normal px-4"> {{aboutUsProvider.aboutus?.data?.twitter}} </ps-label-caption>
              </p>
            </div>

            <!-- for instagram -->
            <div class="space-x-2 flex mt-2" v-if="aboutUsProvider.aboutus?.data?.instagram != null && aboutUsProvider.aboutus?.data?.instagram != ''">
              <font-awesome-icon :icon="['fab', 'instagram-square']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
              <p class="ml-2">
                <ps-label-title-4 class="px-4"> {{ $t("about__instagram") }} </ps-label-title-4>
                <ps-label-caption class="leading-normal px-4"> {{aboutUsProvider.aboutus?.data?.instagram}} </ps-label-caption>
              </p>
            </div>

            <!-- for google plus -->
            <div class="space-x-2 flex mt-2" v-if="aboutUsProvider.aboutus?.data?.googlePlus != null && aboutUsProvider.aboutus?.data?.googlePlus != ''">
             <font-awesome-icon :icon="['fab', 'google-plus-square']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
              <p class="ml-2">
                <ps-label-title-4 class="px-4"> {{ $t("about__google_plus") }} </ps-label-title-4>
                <ps-label-caption class="leading-normal px-4"> {{aboutUsProvider.aboutus?.data?.googlePlus}} </ps-label-caption>
              </p>
            </div>

            <!-- for youtube -->
            <div class="space-x-2 flex mt-2" v-if="aboutUsProvider.aboutus?.data?.youtube != null && aboutUsProvider.aboutus?.data?.youtube != ''">
              <font-awesome-icon :icon="['fab', 'youtube-square']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
              <p class="ml-2">
                <ps-label-title-4 class="px-4"> {{ $t("about__youtube") }} </ps-label-title-4>
                <ps-label-caption class="leading-normal px-4"> {{aboutUsProvider.aboutus?.data?.youtube}} </ps-label-caption>
              </p>
            </div>

            <!-- for pinterest -->
            <div class="space-x-2 flex mt-2" v-if="aboutUsProvider.aboutus?.data?.pinterest != null && aboutUsProvider.aboutus?.data?.pinterest != ''">
              <font-awesome-icon :icon="['fab', 'pinterest-square']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
              <p class="ml-2">
                <ps-label-title-4 class="px-4"> {{ $t("about__pinterest") }} </ps-label-title-4>
                <ps-label-caption class="leading-normal px-4"> {{aboutUsProvider.aboutus?.data?.pinterest}} </ps-label-caption>
              </p>
            </div>
          </div>
            
        </div>
      </div>
      <!-- google adsense desktop view -->
      <div class="mx-auto">
        <ps-ad-sense adFormat="horizontal"></ps-ad-sense>
      </div>
      
    </template>
  </ps-content-container>
</template>

<script lang='ts'>

import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelTitle4 from '@/components/core/label/PsLabelTitle4.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsAdSense from '@/components/core/adsense/PsAdSense.vue';

import PsContentContainer from "@/components/layouts/container/PsContentContainer.vue";
import { createAboutUsProviderState } from "@/store/modules/aboutus/AboutUsProvider";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare,faTwitterSquare,faGooglePlusSquare,faInstagramSquare,faYoutubeSquare,faPinterestSquare } from '@fortawesome/free-brands-svg-icons';
import { faPhoneSquare,faGlobe } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookSquare,faTwitterSquare,faPhoneSquare,faGooglePlusSquare,faGlobe,faInstagramSquare,faYoutubeSquare,faPinterestSquare );

export default {
  name: "AboutView",
  components: {
    PsContentContainer,
    PsLabel,
    PsLabelTitle4,
    PsLabelCaption,
    PsLabelTitle,
    PsAdSense
  },

  setup() {
   
    const aboutUsProvider = createAboutUsProviderState();

    aboutUsProvider.loadAboutUs();

    return {
      aboutUsProvider,
    };
  },
};
</script>