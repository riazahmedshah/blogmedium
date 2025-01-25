import zod from 'zod';
export const signupInputs = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    name: zod.string().optional()
});
export const signinInputs = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});
export const createBlogInput = zod.object({
    title: zod.string(),
    content: zod.string()
});
export const updateBlogInput = zod.object({
    title: zod.string(),
    content: zod.string(),
    id: zod.string()
});
export const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});
