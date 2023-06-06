
import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import Package from '@/object/Package';
import ItemLimitParameterHolder from '@/object/holder/ItemLimitParameterHolder';
import ApiStatus from '@/object/ApiStatus';


export class PackageProvider extends PsProvider {

    packageList = reactive<PsResource<Package[]>>(new PsResource());
    limititem = reactive<PsResource<ApiStatus>>(new PsResource());

    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;
    isNoMoreRecord = reactive({
        value: false
    })

    private updatePackageList(responseData: PsResource<Package[]>) {

        if (this.packageList != null
            && this.packageList.data != null
            && this.packageList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.packageList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.packageList.code = responseData.code;
            this.packageList.status = responseData.status;
            this.packageList.message = responseData.message;

        } else {

            this.packageList = responseData;


        }

        if (this.packageList != null && this.packageList.data != null) {
            this.offset = this.packageList.data.length;
        }

    }
    async resetPackageList() {

        this.offset = 0;
        this.loading.value = true;
        
        const responseData = await PsApiService.getPackageList<Package>(new Package());
        this.updatePackageList(responseData);

        this.loading.value = false;

    }

    async loadPackageList() {

        this.loading.value = true;
        
        const responseData = await PsApiService.getPackageList<Package>(new Package());
        this.updatePackageList(responseData);

        this.loading.value = false;

    }

    async postPackageBought(holder:ItemLimitParameterHolder) : Promise<PsResource<ApiStatus>>  {

        this.loading.value = true;
        // console.log(holder.toMap())

        this.limititem = await PsApiService.postPackageBought<ApiStatus>(new ApiStatus(),holder.toMap());
        
        this.loading.value = false;
        
        return this.limititem;

    }

}

export const packageProviderSymbol = Symbol('PackageProvider')
export const createPackageProviderState = () => {
    return reactive(new PackageProvider())
}

export const usePackageProviderState = () => inject(packageProviderSymbol) as PackageProvider
export const providePackageProviderState = () => provide(
    packageProviderSymbol,
    createPackageProviderState()
)