// types.ts
export type Blog = {
  id:string
  title: string
  content: string
  image: string
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

export type Author = {
  id: number;
  email: string;
  name: string;
  profilePhoto: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type SingleBlog = {
  id: string;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  categoryId: number;
  author: Author;
};