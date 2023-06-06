<template>
       <ps-modal ref="psmodal" :isClickOut='false' :maxWidth="'400px'" theme="p-6 border lg:rounded-2xl rounded-xl"> 
        <template #title>
             <!-- Item entry title -->
            <div >
                <ps-label-header-6 > {{ $t('offer_modal__make_offer_for_this_item') }}</ps-label-header-6>
            </div>
        </template>
        <template #body>           
          
            <!-- Start Input Field for md .. -->
            <div class="flex justify-between container w-full p-4">
                <!-- Start Left Screen -->
                <div class="flex flex-col w-full  ">
                    <div class="flex flex-row w-full justify-center shadow-lg mb-4">

                        <div class="my-4">
                            <img alt="Placeholder" width="300px" height="300px" class="rounded-sm w-20 h-20 flex items-center justify-center object-contail" :src="chatHistoryProvider.imageUrl(itemImage? itemImage : '',2)" @error="chatHistoryProvider.defaultCarImage" >
                        </div>
                        <div class="ms-6 my-auto">
                            <ps-label class="text-medium text-lg "> {{ itemName }} </ps-label>
                            <ps-label class="mt-2 ">{{ $t('offer_modal__price') }} {{currency }} {{ itemPrice }} </ps-label>
                        </div>
                        
                     </div>  
                     <div class="flex flex-row w-full justify-center">

                        <div>
                            <ps-label class="mt-4 "> {{currency }}</ps-label>
                        </div>
                        <div>
                            <ps-input class="mt-2  ms-2" type="text"  v-bind:placeholder="$t('report_item_modal__title')" v-model:value="negoPrice"></ps-input>
                        </div>

                    
                     </div>    
                </div>
                <!-- End Left Screen -->

            </div>
            <!-- End Input Field -->
          
        </template>
        <template #footer>             
            <div class="flex items-center justify-center mb-4">
              

                <ps-button class="text-center w-60 mx-auto " @click="submitClicked(negoPrice)" > {{ $t('offer_modal__make_offer') }}</ps-button>
                <ps-button class="text-center w-60 mx-auto  ms-4" theme="btn-second" @click="psmodal.toggle(false)" > {{ $t('offer_modal__cancel') }}  </ps-button>
                
                <!-- @click="clicked"> Submit </ps-button> -->
            </div>
        </template>
    </ps-modal>
    
    <ps-loading-dialog ref="ps_loading_dialog"  :isClickOut='false'/> 

    <ps-error-dialog ref="ps_error_dialog" />


</template>

<script lang='ts'>

// Libs
import { defineComponent, ref } from 'vue';

// Compone
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabelHeader6 from '@/components/core/label/PsLabelHeader6.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsInput from '@/components/core/input/PsInput.vue'
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import { createGetChatHistoryProviderState } from "@/store/modules/chat/GetChatHistoryProvider";

export default defineComponent({
    name: "OfferModal",
    components: {
        PsModal,
        PsLabelHeader6,
        PsLabel,
        PsButton,
        PsErrorDialog,
        PsLoadingDialog,
        PsInput
    },
    props : {
        price : {
            type : String,
            default : '0'
        }
    },
    emits: ['submit'],
    setup(props, context) {
        const psmodal = ref();
        const title = ref('');
        const message = ref('');
        const ps_loading_dialog = ref();
        const ps_error_dialog = ref();
        const itemId = '';
        let itemName = ref('');
        let itemImage = ref('');
        let currency = ref('');
        const buyerUserId = '';
        const sellerUserId = '';

        let negoPrice = ref(props.price);
        let itemPrice= ref('');
        // Init Provider
        const chatHistoryProvider = createGetChatHistoryProviderState();
     
        function openModal(itemNameParam, itemImageNameParam, currencyParam, priceParam) { 

            itemName.value = itemNameParam;
            itemImage.value =itemImageNameParam;
            currency.value = currencyParam;
            negoPrice.value = priceParam;
            itemPrice.value = priceParam;
            psmodal.value.toggle(true);
                        
        }

        function submitClicked(negoPrice) {
            context.emit('submit',negoPrice,);
            psmodal.value.toggle(false);
        }

        return {
            psmodal,
            openModal,
            itemId,
            itemName,
            itemImage,
            currency,
            buyerUserId,
            sellerUserId,
            negoPrice,
            itemPrice,
            title,
            message,
            submitClicked,
            ps_loading_dialog,
            ps_error_dialog,
            chatHistoryProvider
        }
    },
})
</script>
