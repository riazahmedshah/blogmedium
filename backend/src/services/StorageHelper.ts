export class StorageHelper{
    public static async uploadAndProcessImage(key: string, imageBuffer: Blob , options?: {
        width?: number
        height?: number
        format?: 'jpeg' | 'png' | 'webp'
        quality?: number
    }):Promise<void>{
        
    }
}