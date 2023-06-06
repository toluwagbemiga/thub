
import PsApiService from '@/api/PsApiService';

export class PsProvider {
    public imageUrl = (path: string, size: number = 0) => {
         return PsApiService.imageUrl(path, size);
    };

    public videoUrl = (path: string) => {
        return PsApiService.videoUrl(path);
    };

    public inspectionDocUrl = (path: string) => {
        return PsApiService.inspectionDocUrl(path);
    }

    public defaultCarImage = (event) => {
        return PsApiService.defaultCarImage(event);
    };

    public defaultProfileImage = (event) => {
        return PsApiService.defaultProfileImage(event);
    };

    
}