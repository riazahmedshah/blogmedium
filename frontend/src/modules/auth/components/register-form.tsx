import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { CardWrapper } from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, signupRequestData } from "@schemas/authSchema";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useMutation } from "@tanstack/react-query";
import { signupRequest } from "../api/signup";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export const RegisterForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<signupRequestData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data:signupRequestData) => signupRequest(data),
        onSuccess: () => {
            toast.success("Account created successfully!", {
                description: "You can now log in with your credentials",
                action: {
                    label: "Go to Login",
                    onClick: () => window.location.href = "/auth/login"
                }
            });
            form.reset();
        },
        onError: (error: unknown) => {
            if (isAxiosError(error) && error.response) {
                if (error.response.data?.errors) {
                    const errors = error.response.data.errors;
                    toast.error("Registration failed", {
                        description: "Please fix the errors below",
                    });

                    for (const [field, message] of Object.entries(errors)) {
                        form.setError(field as keyof signupRequestData, {
                            type: 'manual',
                            message: Array.isArray(message) ? message.join(' ') : String(message)
                        });
                    }
                } else {
                    toast.error("Registration failed", {
                        description: error.response.data?.message || "An unknown error occurred",
                    });
                }
            } else {
                toast.error("Registration failed", {
                    description: "Network error or server unavailable",
                });
            }
        }
    });

    const onSubmit: SubmitHandler<signupRequestData> = (data) => {
        mutate(data);
    };

    return (
        <CardWrapper
            label="Create an account"
            title="Register"
            backButtonHref="/auth/login"
            backButtonLabel="Already have an account? Login here."
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {/* Name field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center justify-between">
                                        Username
                                        <span className="text-xs font-normal text-muted-foreground">
                                            Required
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Elon Musk"
                                            disabled={isPending}
                                            autoComplete="username"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center justify-between">
                                        Email
                                        <span className="text-xs font-normal text-muted-foreground">
                                            Required
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            placeholder="elon@example.com"
                                            disabled={isPending}
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center justify-between">
                                        Password
                                        <span className="text-xs font-normal text-muted-foreground">
                                            Min. 8 characters
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                disabled={isPending}
                                                autoComplete="new-password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={isPending}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full gap-2"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            "Register"
                        )}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};