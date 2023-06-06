import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import Product from '@/object/Product';
import ReportItemHolder from '@/object/holder/ReportItemHolder';

export class ReportedItemProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    reportedReportedItemList = reactive<PsResource<Product[]>>(new PsResource());
    item = reactive<PsResource<Product>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 10;
    offset: Number = 0;

    id: string = "";

    private updateReportedItemList(responseData: PsResource<Product[]>) {

        if (this.reportedReportedItemList != null
            && this.reportedReportedItemList.data != null
            && this.reportedReportedItemList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.reportedReportedItemList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }
            this.reportedReportedItemList.code = responseData.code;
            this.reportedReportedItemList.status = responseData.status;
            this.reportedReportedItemList.message = responseData.message;

        } else {

            this.reportedReportedItemList = responseData;


        }

        if (this.reportedReportedItemList != null && this.reportedReportedItemList.data != null) {
            this.offset = this.reportedReportedItemList.data.length;
        }

    }

    async loadReportedItemList(loginUserId: string) {

        this.loading.value = true;

        const responseData = await PsApiService.getReportedItemList<Product>(new Product(), loginUserId, this.limit, this.offset);

        this.updateReportedItemList(responseData);

        this.loading.value = false;


    }

    async resetReportedItemList(loginUserId: string) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getReportedItemList<Product>(new Product(), loginUserId, this.limit, this.offset);

        this.updateReportedItemList(responseData);

        this.loading.value = false;

    }

    async addReportItem(holder: ReportItemHolder): Promise<PsResource<Product>> {
      
        this.loading.value = true;
        
        this.item = await PsApiService.postReportItem<Product>(new Product(), holder.toMap());
       
        this.loading.value = false;

        return this.item;

    }

}

export const reportedItemProvider = Symbol('ReportedItemProvider')
export const createReportedItemProviderState = () => {
    return reactive(new ReportedItemProvider())
}

export const useReportedItemProviderState = () => inject(reportedItemProvider) as ReportedItemProvider
export const provideReportedItemProviderState = () => provide(
    reportedItemProvider,
    createReportedItemProviderState()
)