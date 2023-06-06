import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import PsAppInfo from '@/object/PsAppInfo';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import PsUtils from '@/utils/PsUtils';
import PsConst from '@/object/constant/ps_constants';

export class PsAppInfoProvider extends PsProvider {

    appInfo = reactive<PsResource<PsAppInfo>>(new PsResource());
    loading = reactive({
        value: false
    });
    isThumbnailGenerate : boolean = false;

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";
    realStartDate: string = '0';
    realEndDate: string = '0';


    async loadDeleteHistory(holder: AppInfoParameterHolder) {

        this.loading.value = true;
        if (PsValueProvider.psValueHolder == null || PsValueProvider.psValueHolder.startDate == null) {
            this.realStartDate = PsUtils.formatDate(new Date());
        } else {
            this.realStartDate = PsValueProvider.psValueHolder.endDate;
           
        }

        this.realEndDate = PsUtils.formatDate(new Date());

        holder.startDate = this.realStartDate;
        holder.endDate = this.realEndDate;

        const psValueHolder = PsValueProvider.psValueHolder;
        this.appInfo = await PsApiService.postPsAppInfo<PsAppInfo>(new PsAppInfo(), holder.toMap());
    
        const appInfo = this.appInfo.data;

        if(appInfo.psAppSetting?.isThumbnailGenerate == PsConst.ONE){
            this.isThumbnailGenerate = true;
        }
        
        psValueHolder.replacePublishKey(appInfo.stripePublishableKey);

        this.loading.value = false;

        return this.appInfo;

    }

    async loadDeleteHistorywithNotifier() {

        this.loading.value = true;

        if (PsValueProvider.psValueHolder == null || PsValueProvider.psValueHolder.startDate == null) {
            this.realStartDate = PsUtils.formatDate(new Date());
        } else {
            this.realStartDate = PsValueProvider.psValueHolder.endDate;

            this.realEndDate = PsUtils.formatDate(new Date());

            const appInfoholder = new AppInfoParameterHolder();
            appInfoholder.startDate = this.realStartDate;
            appInfoholder.endDate = this.realEndDate;
            appInfoholder.userId = PsValueProvider.psValueHolder.getLoginUserId();
           
            await PsApiService.postPsAppInfo<PsAppInfo>(new PsAppInfo(), appInfoholder.toMap());

            this.loading.value = false;
        }

    }

}

export const appInfoProviderSymbol = Symbol('PsAppInfoProvider')
export const createPsAppInfoProviderState = () => {
    return reactive(new PsAppInfoProvider())
}

export const usePsAppInfoProviderState = () => inject(appInfoProviderSymbol) as PsAppInfoProvider
export const providePsAppInfoProviderState = () => provide(
    appInfoProviderSymbol,
    createPsAppInfoProviderState()
)