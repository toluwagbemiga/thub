
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import AboutUs from '@/object/AboutUs';
import PsResource from '@/api/common/PsResource';

export class AboutUsProvider extends PsProvider {

    aboutus = reactive<PsResource<AboutUs>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    async loadAboutUs() {
       
        this.loading.value = true;

        const result = await PsApiService.getAboutUsDataList<AboutUs>(new AboutUs());
        if(result.data != null && result.data.length > 0) {
            this.aboutus.data = result.data[0];
        }
        this.loading.value = false;

    }

    async resetAboutUs() {

        this.offset = 0;

        this.loading.value = true;

        await PsApiService.getAboutUsDataList<AboutUs>(new AboutUs());


        this.loading.value = false;

    }

}

export const aboutUsProviderSymbol = Symbol('AboutUsProvider')
export const createAboutUsProviderState = () => {
    return reactive(new AboutUsProvider())
}

export const useAboutUsProviderState = () => inject(aboutUsProviderSymbol) as AboutUsProvider
export const provideAboutUsProviderState = () => provide(
    aboutUsProviderSymbol,
    createAboutUsProviderState()
)