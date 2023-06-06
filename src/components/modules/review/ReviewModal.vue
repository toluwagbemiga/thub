<template>
       <ps-modal ref="psmodal" line="hidden" maxWidth="500px" :isClickOut='false' > 
        <template #title>            
        </template>
        <template #body>
            <div class=" w-full p-2">
                <div class="w-full flex flex-col ">
                
                    <ps-label >  {{ $t("review_entry__your_rating") }} </ps-label>
                    <rating-selected ref="rating" class="mt-5" :grade="0" :maxStars="5" :hasCounter="true" />
                       
                    <ps-label class="mt-4">  {{ $t("review_entry__title") }} </ps-label>
                    <ps-input class="mt-2" type="text" v-bind:placeholder="$t('review_entry__title')" v-model:value="title"></ps-input>
                   
                    <ps-label class="mt-4">  {{ $t("review_entry__message") }} </ps-label>
                    <ps-textarea class=" mt-2" v-bind:placeholder="$t('review_entry__message')" :rows="5" v-model:value="description"></ps-textarea>
                </div>
            </div>
        </template>
        <template #footer>
            <div class=" flex flex-row justify-between">
                <ps-button @click="cancel()" textSize="text-xxs lg:text-sm" class="py-3 " theme="bg-secondary-100 dark:bg-secondaryDark-grey text-primary-500 dark:text-primaryDark-white"> {{ $t("review_entry__cancel") }} </ps-button>  
                <ps-button v-if="ratingProvider.loading.value == false"  @click="clicked" textSize="text-xxs lg:text-sm" class="py-3"  > {{ $t("review_entry__submit") }}</ps-button> 
                <ps-button :disabled="true" v-else textSize="text-xxs lg:text-sm" class="py-3"  > {{ $t("review_entry__loading") }}</ps-button>                 
            </div>
            
        </template>
    </ps-modal>
</template>


<script lang="ts">
//Libs
import {ref} from 'vue';
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabel from '@/components/core/label/PsLabel.vue'
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsInput from '@/components/core/input/PsInput.vue'
import RatingSelected from '@/components/core/rating/RatingSelected.vue';
import PsTextarea from '@/components/core/textarea/PsTextarea.vue';
import PsStatus from '@/api/common/PsStatus';

// Models
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { createRatingProviderState } from "@/store/modules/rating/RatingProvider";

// Params Holders
import RatingHolder from '@/object/holder/RatingHolder';


export default {
    name : "ReviewModal",
    components : {
        PsLabel,
        PsButton,
        PsModal,
        PsInput,
        PsTextarea,
        RatingSelected,
    },
    setup() {
        const psmodal = ref();
        const psValueHolder = PsValueProvider.psValueHolder;
        const holder = new RatingHolder();
        const ratingProvider = createRatingProviderState();
        const loginUserId = psValueHolder.getLoginUserId();
        
        const toUserId = ref('');
        let okClicked: Function;
        let cancelClicked: Function;

        const rating = ref();
        const title = ref();
        const description = ref();

        function cancel(){
            psmodal.value.toggle(false);
        }

        function openModal(
                userId, 
                cancelClickedAction: Function,
                okClickedAction: Function, 
                ) {
            okClicked = okClickedAction;
            cancelClicked= cancelClickedAction;
            toUserId.value = userId;
            psmodal.value.toggle(true);
        }

        async function clicked() {
            holder.fromUserId = loginUserId;
            holder.toUserId = toUserId.value;
            holder.rating = rating.value.getRating();
            holder.title = title.value;
            holder.description = description.value;
           
            const status = await ratingProvider.postRating(holder);
            if(status.status == PsStatus.SUCCESS){
                okClicked();
            }else{
                cancelClicked();
            }
            psmodal.value.toggle(false);
        }

        return{
            ratingProvider,
            openModal,
            clicked,
            cancel,
            description,
            rating,
            title,
            loginUserId,
            psmodal
        }
    }
}
</script>