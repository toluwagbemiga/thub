<template>
  
    <ps-model-view ref='psmodal' />

    <ps-modal ref="psMapModal" :isClickOut="false" >
        <template #title>
            <ps-label-title> {{ $t('ui_collection__select_location') }} </ps-label-title>
        </template>
        <template #body>
            <GoogleMap id="map" ref="mapRef" :api-key="map.key"
                :center="map.center" :zoom="map.zoom"  style="width: 100%; height: 500px">
             
                <!-- For circle -->
                <Circle id="circle" :options="circleCenter" ref="cirRef" />
            </GoogleMap>
        </template>
        <template #footer>
            <div class="flex justify-end">
                <ps-button @click="psMapModal.toggle(false)"> {{ $t('ui_collection__ok') }} </ps-button>
            </div>
        </template>
    </ps-modal>

    <ps-content-container>
        <template #content>
            <div class="flex flex-col mt-36">

                <!-- White/Dark Mode -->
                <ps-label-title class="mt-4"> {{ $t('ui_collection__white_dark') }} </ps-label-title>
                <ps-label v-on:click="toggleDarkMode" 
                    class="cursor-pointer ml-4 mt-4 font-bold underline" textColor="text-primary-500" >
                        {{isDarkMode ? "Light Mode" : "Dark Mode"}}
                </ps-label>

                <ps-line />
                <!-- Text -->
                <ps-label-title class="mt-4">{{ $t('ui_collection__label_ui') }} </ps-label-title>
                <ps-label-header-1>{{ $t('ui_collection__label_h1') }}</ps-label-header-1>
                <ps-label-header-2>{{ $t('ui_collection__label_h2') }}</ps-label-header-2>
                <ps-label-header-3>{{ $t('ui_collection__label_h3') }}</ps-label-header-3>
                <ps-label-header-4>{{ $t('ui_collection__label_h4') }}</ps-label-header-4>
                <ps-label-header-5>{{ $t('ui_collection__label_h5') }}</ps-label-header-5>
                <ps-label-header-6>{{ $t('ui_collection__label_h6') }} </ps-label-header-6>
                <ps-label-title>{{ $t('ui_collection__label_title1') }}</ps-label-title>
                <ps-label-title-2>{{ $t('ui_collection__label_title2') }}</ps-label-title-2>
                <ps-label-title-3>{{ $t('ui_collection__label_title3') }}</ps-label-title-3>
                <ps-label>{{ $t('ui_collection__body') }}</ps-label>
                <ps-label-caption>{{ $t('ui_collection___label_caption') }}</ps-label-caption>
                <ps-label-caption-2>{{ $t('ui_collection__label_caption2') }}</ps-label-caption-2>
                <ps-line />

                <!-- Input -->
                <ps-label-title class="mt-4 "> {{ $t('ui_collection__input_ui') }} </ps-label-title>

                <ps-input class="mt-2" theme="input-warning" type="email" v-bind:placeholder="$t('ui_collection__email')"></ps-input>
                <ps-input class="mt-2" theme="input-error" type="email" v-bind:placeholder="$t('ui_collection__email')"></ps-input>
                <ps-input class="mt-2" theme="input-success" type="email" v-bind:placeholder="$t('ui_collection__email')"></ps-input>
                <ps-input class="mt-2" theme="input-second" type="email" v-bind:placeholder="$t('ui_collection__email')"></ps-input>
                <ps-input class="mt-2" type="password" v-bind:placeholder="$t('ui_collection__password')"></ps-input>

                <ps-input-with-right-icon class="rounded-full flex-1 mt-2"  v-bind:placeholder="$t('ui_collection__what_are_you_looking_for')" >
                    <template #icon>
                        <ps-icon name="search" class='cursor-pointer'/>
                    </template>
                </ps-input-with-right-icon>

                <ps-input-with-right-icon class="rounded-full flex-1 mt-2" theme="input-success"  v-bind:placeholder="$t('ui_collection__what_are_you_looking_for')" >
                    <template #icon>
                        <ps-icon name="search" class='cursor-pointer'/>
                    </template>
                </ps-input-with-right-icon>

                <ps-input-with-left-icon class="rounded-full flex-1 mt-2"  v-bind:placeholder="$t('ui_collection__what_are_you_looking_for')" >
                    <template #icon >
                        <ps-icon name="search" class='cursor-pointer'/>
                    </template>
                </ps-input-with-left-icon>

                <ps-input-with-left-icon class="rounded-full flex-1 mt-2" theme="input-error" v-bind:placeholder="$t('ui_collection__what_are_you_looking_for')" >
                    <template #icon >
                        <ps-icon name="search" class='cursor-pointer'/>
                    </template>
                </ps-input-with-left-icon>
                
                <ps-line />

                <!-- Button -->
                <ps-label-title class="mt-4"> {{ $t('ui_collection__button') }} </ps-label-title>

                <ps-button class="mt-2" theme="btn-warning"> {{ $t('ui_collection__warning_button') }} </ps-button>
                <ps-button class="mt-2" theme="btn-success"> {{ $t('ui_collection__success_button') }} </ps-button>
                <ps-button class="mt-2" theme="btn-error"> {{ $t('ui_collection__error_button') }}  </ps-button>
                <ps-button class="mt-2" theme="btn-second"> {{ $t('ui_collection__second_button') }}  </ps-button>
                <ps-button class="mt-2"> {{ $t('ui_collection__primary_button') }}  </ps-button>
                <ps-button class="mt-2" :disabled="true"> {{ $t('ui_collection__disabled_button') }}  </ps-button>

                <ps-line />

                <!-- CheckBox -->
                <ps-label-title class="mt-4"> {{ $t('ui_collection__checkbox_fixed') }}  </ps-label-title>
                <div class="flex items-center mt-4">
                    <ps-checkbox-value v-model:value="checkedFruits.apple" v-bind:title="$t('ui_collection__apple')" class="me-4" />
                    <ps-checkbox-value v-model:value="checkedFruits.ornage" v-bind:title="$t('ui_collection__orange')" class="me-4" />
                    <ps-checkbox-value v-model:value="checkedFruits.grape" v-bind:title="$t('ui_collection__grape')" class="me-4" />
                </div>

                <ps-label class="mt-4">{{checkedFruits}}</ps-label>

                <ps-label-title class="mt-4 mb-4"> {{ $t('ui_collection__checkbox_dynamic') }} </ps-label-title>

                <ps-checkbox v-for=" selectData  in checkedDataList" 
                    :key="selectData.id" 
                    :value="selectData" 
                    v-model:selectedValue="checkedSelectedList"
                    :title="selectData.name" 
                    class="focus:bg-primary-500 dark:bg-primaryDark-accent" > {{selectData.name}} </ps-checkbox>

                <ps-label class="mt-4">{{checkedSelectedList}}</ps-label>

                <ps-line />

                <!-- Radio -->
                <ps-label-title class="mt-8">  {{ $t('ui_collection__radio_fixed') }} </ps-label-title>
                <div class="flex items-center mt-4" id="r1">
                    <ps-radio-value v-model:value="radioFruits" v-bind:title="$t('ui_collection__apple')" class="me-4" />
                    <ps-radio-value v-model:value="radioFruits" v-bind:title="$t('ui_collection__orange')" class="me-4" />
                    <ps-radio-value v-model:value="radioFruits" v-bind:title="$t('ui_collection__grape')" class="me-4" />
                    <ps-radio-value v-model:value="radioFruits" v-bind:title="$t('ui_collection__mango')" class="me-4" />
                </div>
                <ps-label class="mt-4">{{radioFruits}}</ps-label> 

                <ps-label-title class="mt-4"> {{ $t('ui_collection__radio_dynamic') }} </ps-label-title>
                <div class="flex items-center mt-4" id="r1">
                    <ps-radio v-for=" selectData  in radioDataList" 
                    :key="selectData.id" 
                    :value="selectData" 
                    v-model:selectedValue="radioSelectedList"
                    :title="selectData.name" 
                    class="focus:bg-primary-500 dark:bg-primaryDark-accent me-4"></ps-radio>
                </div>
                <ps-label class="mt-4">{{radioSelectedList}}</ps-label>

                <ps-line />

                <!-- Select -->
                <ps-label-title class="mt-8"> {{ $t('ui_collection__select_dynamic') }} </ps-label-title>

                <ps-select v-model:value="selectedValue" class="mt-4" :dataList="selectDataList" />

                <ps-label class="mt-4">{{selectedValue}}</ps-label> 
                <div class="flex justify-between">
                    <p> {{ $t('ui_collection__test') }} </p>
                
                    <ps-dropdown align="right"  >
                        <template #select>
                            <ps-dropdown-select :selectedValue="'Transaction History ' + selectedIndex " />
                        </template>
                        <template #list>
                            <div
                                class="rounded-md bg-white shadow-xs"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu">
                                <div class="pt-2">
                                    <div v-for="i in 5" :key="i" class="flex py-4 px-2 hover:bg-red-100 cursor-pointer items-center"  @click="onItemClick(i)" >
                                        
                                        <img  width="300px" height="200px" alt="Placeholder"
                                            src="https://s.svgbox.net/hero-outline.svg?ic=currency-rupee"
                                            class="h-6 w-6"  
                                        />
                                        <span class="ms-2" :class="i==selectedIndex ? 'text-red-500' : 'text-primary-500'"  > {{ $t("ui_collection__transaction_history") }} {{i}} </span>
                                        
                                    </div>
                                </div>
                                <div class="border-t border-gray-100"></div>
                            </div>
                        </template>
                    </ps-dropdown>

                </div>
                <ps-line />

                <!-- Icons -->
                <ps-label-title class="mt-8"> {{ $t("ui_collection__icons") }} </ps-label-title>

                <div class="flex mt-8" >

                    <ps-icon name="downArrow" class="text-orange-500" />

                    <ps-icon name="heart" class='text-orange-500 ms-4'/>

                    <ps-icon name="plusCircle" class='ms-4' />

                    <ps-icon name="dashboard" class='ms-4'  />

                    <ps-icon name="apps" class='ms-4' />

                    <ps-icon name="rhombusMedium" class='ms-4' />

                    <ps-icon name="hexagonMultiple" class='ms-4' />

                    <ps-icon name="menu" class='ms-4' />

                    <ps-icon name="printer" class='ms-4' />

                    <ps-icon name="plus" class='ms-4' />

                    <ps-icon name="minus" class='ms-4' />

                    <ps-icon name="cogOutline" class='ms-4' />

                    <ps-icon name="search" class='ms-4' />


                </div>
                    
                <ps-label class='mt-4'> {{ $t("ui_collection__icon_60_60") }} </ps-label>
                <ps-icon name="dashboard" class='mt-4' w='60' h='60'  />
                <ps-icon name="cogOutline" class='mt-4 text-purple-500' w='60' h='60'  />

                <ps-line />

                <!-- Images -->
                <ps-label-title class="mt-8"> {{ $t("ui_collection__images") }} </ps-label-title>

                <ps-line />

                <!-- Full Page Loading -->
                <ps-label-title class="mt-8"> {{ $t("ui_collection__full_page_loading") }} </ps-label-title>

                <ps-button class="mt-2" @click="loadMore">  {{ $t("ui_collection__full_page_loading") }} </ps-button>

                <ps-line />

                <!-- Countdown -->
                <ps-label-title class="mt-8 "> {{ $t("ui_collection__countdown") }} </ps-label-title>
                {{countDown}}

                <ps-line />

                <!-- Speak -->
                <ps-label-title class="mt-8"> {{ $t("ui_collection__speak") }} </ps-label-title>

                <ps-button class="mt-2" @click="speak">  {{ $t("ui_collection__speak") }} </ps-button>

                <ps-line />


                <!-- Modal -->
                <ps-label-title class="mt-8">{{ $t("ui_collection__modal") }}  </ps-label-title>

                <ps-button class="mt-2" @click="psmodal.openModal()">  {{ $t("ui_collection__open") }} </ps-button>
                <ps-button class="mt-2" @click="psMapModal.toggle(true)">  {{ $t("ui_collection__open_map_modal") }} </ps-button>
                
                
                <ps-line />

                <!-- Skeletor -->
                <ps-label-title class="mt-8"> {{ $t("ui_collection__skeletor") }} </ps-label-title>

                <div class='w-96 my-8' >
                    <div class='flex items-start'>
                        <div>
                            <Skeletor circle size="48" />
                        </div>
                        <div class="w-52 rounded-md ms-4 mt-1">
                            <Skeletor height="15" class='rounded-md' />
                            <Skeletor height="20" class='rounded-md mt-2' />
                        </div>
                    </div>
                    
                </div>

                <ps-line />
               

            </div>
        </template>
    </ps-content-container>

</template>

<script lang="ts">
import { defineComponent, onUnmounted, reactive, ref} from 'vue';
import PsCheckbox from '@/components/core/checkbox/PsCheckbox.vue';
import PsRadio from '@/components/core/radio/PsRadio.vue';
import PsSelect from '@/components/core/select/PsSelect.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsLabelTitle2 from '@/components/core/label/PsLabelTitle2.vue';
import PsLabelTitle3 from '@/components/core/label/PsLabelTitle3.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsCheckboxValue from '@/components/core/checkbox/PsCheckboxValue.vue';
import PsRadioValue from '@/components/core/radio/PsRadioValue.vue';
import PsLabelHeader6 from '@/components/core/label/PsLabelHeader6.vue';
import PsLabelHeader5 from '@/components/core/label/PsLabelHeader5.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsLabelHeader3 from '@/components/core/label/PsLabelHeader3.vue';
import PsLabelHeader2 from '@/components/core/label/PsLabelHeader2.vue';
import PsLabelHeader1 from '@/components/core/label/PsLabelHeader1.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsLabelCaption2 from '@/components/core/label/PsLabelCaption2.vue';
import PsLine from '@/components/core/line/PsLine.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsInputWithRightIcon from '@/components/core/input/PsInputWithRightIcon.vue';
import PsInputWithLeftIcon from '@/components/core/input/PsInputWithLeftIcon.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@/components/core/dropdown/PsDropdownSelect.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import { useLoading } from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import $ from "cash-dom";
import { Skeletor } from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";
import PsModal from '@/components/core/modals/PsModal.vue';
import PsModelView from '@/views/general/PsModelView.vue';
import { GoogleMap , Circle  } from 'vue3-google-map'; //
import PsUtils from '@/utils/PsUtils';

export default defineComponent({
    name : "UiCollection",
    components: {
        PsCheckbox,
        PsRadio,
        PsSelect,
        PsLabel,
        PsLabelTitle,
        PsLabelTitle2,
        PsLabelTitle3,
        PsCheckboxValue,
        PsRadioValue,
        PsLabelHeader6,
        PsLabelHeader5,
        PsLabelHeader4,  
        PsLabelHeader3,
        PsLabelHeader2,
        PsLabelHeader1,
        PsLabelCaption,
        PsLabelCaption2,
        PsLine,
        PsInput,
        PsInputWithRightIcon,
        PsInputWithLeftIcon,
        PsIcon,
        PsButton,
        PsContentContainer,
        Skeletor,
        PsDropdown,
        PsDropdownSelect,
        PsModal,
        GoogleMap, 
        PsModelView,
        // Marker,
        
        Circle
    },
    setup() {

        const isDarkMode = ref(true);
        function toggleDarkMode() {
            
            if(localStorage.isDarkMode != null && localStorage.isDarkMode == 'true') {
                localStorage.isDarkMode = 'false';
                isDarkMode.value = false;
            }else {
                localStorage.isDarkMode = 'true';
                isDarkMode.value = true;
            }
            loadIsDarkMode();
        }

        loadIsDarkMode();
        function loadIsDarkMode() {
            if(localStorage.isDarkMode != null && localStorage.isDarkMode == 'true') {
                $("html").addClass("dark");
                isDarkMode.value = true;
            }else {
                $("html").removeClass("dark");
                isDarkMode.value = false;
            }
        }

        const isMenuOpen = ref(false);

        const checkedFruits = reactive({
            apple : true,
            ornage : true,
            grape : false
        });

        const checkedDataList = reactive([
            {
                id:1, name:"Apple"
            },
            {
                id:2, name:"Orange"
            },
            {
                id:3, name:"Grape"
            }
        ]);

        const checkedSelectedList = reactive([{id:1, name:"Apple"}]);

        const radioDataList = reactive([
            {
                id:1, name:"Apple"
            },
            {
                id:2, name:"Orange"
            },
            {
                id:3, name:"Grape"
            }
        ]);

        const radioSelectedList = reactive({id:2, name:"Apple"});

        // For Radio
        const radioFruits = ref("Apple");
        
        // For Select
        const selectDataList = reactive([
            {
                id:1, name:"$1,000"
            },
            {
                id:2, name:"$2,000"
            },
            {
                id:3, name:"$3,000"
            },
            {
                id:4, name:"$4,000"
            },
            {
                id:5, name:"$5,000"
            },
        ]); 
        const selectedValue = ref("5");

        // Full Page Loading
        const fullPage = ref(true);
        const formContainer = ref(null);

         function onCancel() {

        }


        function loadMore() {
            const loader = useLoading();
            loader.show({
                // Optional parameters
                container: fullPage.value ? null : formContainer.value,
                canCancel: true,
                onCancel: onCancel,
            });

                   // simulate AJAX
            setTimeout(() => {
                loader.hide()
            },5000)
        }

        const endDate = new Date();
        endDate.setTime(endDate.getTime() + 100000);
        const color = ref('font-bold');
        function onTick() {
            
            if(color.value == 'font-bold') {
                color.value = 'font-normal';
            }else {
                color.value = 'font-bold'
            }
            
        }
        const countRef= ref(HTMLDivElement);

        // Speak
        const greetingSpeech = new window.SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();
        greetingSpeech.voice = voices[17];
        
        function speak() {
            greetingSpeech.text = "Hello! Welcome from PanaceaSoft. Your bidding is going to finish. 5, 4, 3, 2, 1. bidding completed. Thanks for using our service.";
            window.speechSynthesis.speak(greetingSpeech);
        }

        const psmodal = ref();
        const psMapModal = ref();

        //MAP
        const mcenter = ref({
            position : {
            lat: 38.735086,
            lng: -9.141247
            },
            draggable: false
        });

        function updateCoordinates(location) {
            PsUtils.log(location.latLng.lat());
            PsUtils.log(location.latLng.lng());
        }


        // Radius * 2 = meters
        const circleCenter = ({
            editable : true,
            center: mcenter.value.position,
            radius: 300,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            
            draggable: false,
            crossOnDrag: false
        })

        const map = {
            key: '000',
            center: mcenter.value.position,
            zoom: 15
        };

        const countDown = ref('');
        const toHHMMSS = (seconds) => {
            seconds = Number(seconds);
            const d = Math.floor(seconds / (3600*24));
            const h = Math.floor(seconds % (3600*24) / 3600);
            const m = Math.floor(seconds % 3600 / 60);
            const s = Math.floor(seconds % 60);

            const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
            const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        // Interval
        const timer = setInterval(() => {
            const now = new Date();
            const end = new Date(2023, 1, 22, 19, 40, 1 );
            const distance = end.getTime() - now.getTime();

            if(distance < 0) {
                clearInterval(timer);
                return;
            }
            countDown.value = toHHMMSS(distance/1000);
           
        }, 1000);

        onUnmounted(() => {
            clearInterval(timer);
        })

        // Select
        const selectedIndex = ref(3);
        function onItemClick(i) {
            selectedIndex.value = i;
        }
        

        return {
            checkedFruits,
            checkedDataList,
            checkedSelectedList,
            radioFruits,
            radioDataList,
            radioSelectedList,
            selectedValue,
            selectDataList,
            toggleDarkMode,
            isDarkMode,
            loadMore,
            endDate,
            onTick,
            countRef,
            color,
            speak,
            psmodal,
            psMapModal,
            mcenter,
            circleCenter,
            map,
            countDown,
            isMenuOpen,
            selectedIndex,
            onItemClick,
            updateCoordinates
        };
    } 
});
</script>

