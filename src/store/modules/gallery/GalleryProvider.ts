
import { reactive, provide, inject, ref } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import DefaultPhoto from '@/object/DefaultPhoto';
import ApiStatus from '@/object/ApiStatus';
import PsUtils from '@/utils/PsUtils';
export class GalleryProvider extends PsProvider {
    
    galleryList  = reactive<PsResource<DefaultPhoto[]>>(new PsResource());

    loading = reactive({
        value : false
    });

    isNoMoreRecord = reactive({
        value: false
    })
   
    limit: Number = 30;
    offset: Number = 0;

    private updateGalleryList(responseData : PsResource<DefaultPhoto[]>) {
        
        if(this.galleryList != null 
            && this.galleryList.data != null 
            && this.galleryList.data.length > 0
            && this.offset != 0) {

            if(responseData.data != null && responseData.data.length > 0) {
                this.galleryList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.galleryList.code = responseData.code;
            this.galleryList.status = responseData.status;
            this.galleryList.message = responseData.message;            

        }else {
            
            this.galleryList = responseData;
            
            
        }

        if(this.galleryList != null && this.galleryList.data != null ) {
            this.offset = this.galleryList.data.length;
        }

    }

    async loadGalleryList(isEnableVideoSetting : string, imgParentId : string, imgType : string, videoThumbnail : DefaultPhoto) {

        this.loading.value = true;
        const responseData = await PsApiService.getImageList<DefaultPhoto>(new DefaultPhoto(), imgParentId, imgType, this.limit, this.offset);
        
        
        if( isEnableVideoSetting == '1' && videoThumbnail != null && videoThumbnail != undefined &&  videoThumbnail.imgId != '' && videoThumbnail.imgId != undefined ) {
            responseData.data.unshift(videoThumbnail);
        }
        

        PsUtils.log(responseData);
        
        this.updateGalleryList(responseData);

        this.loading.value = false;

        return responseData;
        
    }

    async resetGalleryList(imgParentId : string, imgType : string) {

        this.offset = 0;

        this.loading.value = true;
        
        const responseData = await PsApiService.getImageList<DefaultPhoto>(new DefaultPhoto(), imgParentId, imgType, this.limit, this.offset);
        
        this.updateGalleryList(responseData);
    }

    async deleteImage( imageId: string, loginUserId :string) {

        this.loading.value = true;

        const map = {};

        map['img_id'] = imageId;
        
        const responseData = await PsApiService.deleteImage<ApiStatus>(new ApiStatus(), this.limit, this.offset, loginUserId, map);
        
        this.loading.value = false;
        return responseData;
        
        
    }
    async deleteVideo( imageId: string, loginUserId :string) {

        this.loading.value = true;

        const map = {};

        map['img_id'] = imageId;
        
        const responseData = await PsApiService.deleteVideo<ApiStatus>(new ApiStatus(), this.limit, this.offset, loginUserId, map);
        
        this.loading.value = false;
        return responseData;
        
        
    }

    async postChatImageUpload(senderId : string, 
                                sellerUserId : string, 
                                buyerUserId : string, 
                                itemId : string, 
                                type : string, 
                                imageFile : File) {

        this.loading.value = true;

        const returnData = await PsApiService.postChatImageUpload<DefaultPhoto>(new DefaultPhoto(), senderId, sellerUserId, buyerUserId, itemId, type, imageFile);
        
        this.loading.value = false;

        return returnData;

    }

    
    
}

export const galleryProviderSymbol = Symbol('GalleryProvider')
export const createGalleryProviderState = () => {
  return reactive(new GalleryProvider())
}

export const useGalleryProviderState = () => inject(galleryProviderSymbol) as GalleryProvider
export const provideGalleryProviderState = () => provide(
    galleryProviderSymbol,
    createGalleryProviderState()
)