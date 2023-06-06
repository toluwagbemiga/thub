<template>
    <ps-label class="select-none  inline-flex items-center">  
        <input type="radio" class="form-radio me-2 checked:bg-primary-500 dark:bg-primaryDark-accent" :id="title" :checked="title === value" @change="handleInput(title)" />
        {{title}}
    </ps-label>
</template>

<script lang='ts'>
import PsLabel from "../label/PsLabel.vue";

export default {    
    name: "PsRadioValue",
    components: { PsLabel },
    props: {
        "value" : String,
        "title" : {
            type : String,
            default : "N.A"
        }
    },
    setup( _ , {emit}) {
        function handleInput(v) {                
            emit('update:value', v);
        }

        return {
            handleInput
        }
    }
}
</script>























