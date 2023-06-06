
import { reactive, provide, inject } from 'vue';
import { PsProvider } from '../core/PsProvider';
import PsApiService from '@/api/PsApiService';
import PsResource from '@/api/common/PsResource';
import Blog from '@/object/Blog';
import BlogListParameterHolder from '@/object/holder/BlogListParameterHolder';

export class BlogProvider extends PsProvider {

    isNoMoreRecord = reactive({
        value: false
    })
    blogList = reactive<PsResource<Blog[]>>(new PsResource());
    blog = reactive<PsResource<Blog>>(new PsResource());
    loading = reactive({
        value: false
    });

    limit: Number = 30;
    offset: Number = 0;

    paramHolder = reactive<BlogListParameterHolder>(new BlogListParameterHolder().BlogListParameterHolder());

    private updateBlogList(responseData: PsResource<Blog[]>) {

        if (this.blogList != null
            && this.blogList.data != null
            && this.blogList.data.length > 0
            && this.offset != 0) {

            if (responseData.data != null && responseData.data.length > 0) {
                this.blogList.data.push(...responseData.data);
            }else {
                this.isNoMoreRecord.value = true;
            }

            this.blogList.code = responseData.code;
            this.blogList.status = responseData.status;
            this.blogList.message = responseData.message;

        } else {

            this.blogList = responseData;


        }

        if (this.blogList != null && this.blogList.data != null) {
            this.offset = this.blogList.data.length;
        }

    }

    async loadBlogList(loginUserId:string,holder: BlogListParameterHolder) {

        this.loading.value = true;

        const responseData = await PsApiService.getBlogList<Blog>(new Blog(), this.limit, this.offset, loginUserId, holder.toMap());

        this.updateBlogList(responseData);


        this.loading.value = false;

    }

    async loadBlog(blogId: string, loginUserId: string) {

        this.loading.value = true;
        
        this.blog = await PsApiService.getBlogDetail<Blog>(new Blog(), blogId, loginUserId, this.limit, this.offset);

        this.loading.value = false;
        return this.blog;

    }

    async resetBlogList(loginUserId:string,holder: BlogListParameterHolder) {

        this.offset = 0;

        this.loading.value = true;

        const responseData = await PsApiService.getBlogList<Blog>(new Blog(), this.limit, this.offset, loginUserId, holder.toMap());

        this.updateBlogList(responseData);

        this.loading.value = false;

    }

}

export const blogProviderSymbol = Symbol('BlogProvider')
export const createBlogProviderState = () => {
    return reactive(new BlogProvider())
}

export const useBlogProviderState = () => inject(blogProviderSymbol) as BlogProvider
export const provideBlogProviderState = () => provide(
    blogProviderSymbol,
    createBlogProviderState()
)