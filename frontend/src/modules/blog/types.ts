// types.ts
export type Blog = {
  id:string
  title: string
  content: string
  image: string | null
  createdAt: Date | string
  authorId: number;
  categoryId: number;
  author: {
    name: string
    profilePhoto: string | null
    role:string
  }
  category: {
    name:string
  }
}

export type BlogList = Blog[]

export type Category = {
  id:number
  name:string
}

export type CategoryList = Category[]