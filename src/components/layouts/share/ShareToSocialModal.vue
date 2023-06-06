<template>
    <ps-modal ref="psmodal" :isClickOut="false" :maxWidth="'400px'">
        <template #title>
            <ps-label-title>  {{ $t("share_with_social_modal__share_with") }} </ps-label-title>
        </template>
        <template #body>
            
            <ps-link :url="facebookURL"> 
                <div class="space-x-2 flex flex-row mt-4">
                    <font-awesome-icon :icon="['fab', 'facebook-square']" class="text-secondary-500 dark:text-secondaryDark-accent " size="2x" />
                    <p class="mt-2">
                        <ps-label> {{ $t("share_with_social_modal__facebook") }} </ps-label>
                    </p>
                </div> 
            </ps-link>

             
            <ps-link :url="twitterURL"> 
                <div class="space-x-2 flex flex-row mt-4">
                    <font-awesome-icon :icon="['fab', 'twitter-square']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
                    <p class="mt-2">
                        <ps-label> {{ $t("share_with_social_modal__twitter") }} </ps-label>
                    </p>
                </div> 
            </ps-link>

             
            <ps-link :url="linkedinURL"> 
                <div class="space-x-2 flex flex-row mt-4">
                    <font-awesome-icon :icon="['fab', 'linkedin']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
                    <p class="mt-2">
                        <ps-label> {{ $t("share_with_social_modal__linkedin") }} </ps-label>
                    </p>
                </div> 
            </ps-link>

            <div @click="copy" class="cursor-pointer"> 
                <div class="space-x-2 flex flex-row mt-4">
                    <font-awesome-icon :icon="['fas', 'clone']" class="text-secondary-500 dark:text-secondaryDark-accent  " size="2x" />
                    <p class="mt-2">
                        <ps-label> {{ $t("share_with_social_modal__copy_link") }}</ps-label>
                    </p>
                </div> 
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <ps-button @click="psmodal.toggle(false)"> {{ $t("share_with_social_modal__cancel") }} </ps-button>
            </div>
        </template>
    </ps-modal>
    <ps-success-dialog ref="success" />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsLink from '@/components/core/link/PsLink.vue'
import PsSuccessDialog from '@/components/core/dialog/PsSuccessDialog.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faClone } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookSquare,faTwitterSquare,faLinkedin,faClone )

export default defineComponent({
    name : "ShareToSocialModal",
    components: {
        PsModal,
        PsLabelTitle,
        PsLabel,
        PsButton,
        PsLink,
        PsSuccessDialog
    },
    setup() {
        const psmodal = ref();
        const url = ref();
        const facebookURL = ref();
        const twitterURL = ref();
        const linkedinURL = ref();
        const success = ref();

        function openModal(link, id, title){
         
            url.value = link;
            facebookURL.value=  'http://www.facebook.com/sharer/sharer.php?u='+ link +'&title='+title;
            twitterURL.value =  'https://twitter.com/intent/tweet?text=' + title + '&url=' + link;
            linkedinURL.value = 'http://www.linkedin.com/shareArticle?mini=true&url=' + link + '&title=' + title;
            psmodal.value.toggle(true);
        }
        async function copy() {
            await navigator.clipboard.writeText(url.value);
            psmodal.value.toggle(false);
            success.value.openModal('Copy Success','Link to item copied to clipboard');
        }

        return {
            psmodal,        
            openModal,
            facebookURL,
            twitterURL,
            linkedinURL,
            copy,
            success
         }
    },
})
</script>
