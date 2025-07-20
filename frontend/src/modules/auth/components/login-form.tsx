import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinRequestData, signinSchema } from "@schemas/authSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { CardWrapper } from "./card-wrapper";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { loginRequest } from "../api/login";
import { useAuth } from "../hooks/useAuth";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  
  const form = useForm<signinRequestData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: signinRequestData) => loginRequest(data),
    onSuccess: (response) => {
      auth.onLogin(response);
      navigate("/")
      toast.success("Welcome back!", {
        description: "You have successfully logged in",
      });
    },
    onError: (error: unknown) => {
      if (isAxiosError(error) && error.response) {
        if (error.response.data?.errors) {
          const errors = error.response.data.errors;
          toast.error("Login failed", {
            description: "Please check your credentials",
          });
          
          for (const [field, message] of Object.entries(errors)) {
            form.setError(field as keyof signinRequestData, {
              type: 'manual',
              message: Array.isArray(message) ? message.join(' ') : String(message)
            });
          }
        } else {
          toast.error("Login failed", {
            description: error.response.data?.message || "Invalid email or password",
          });
        }
      } else {
        toast.error("Login failed", {
          description: "Network error or server unavailable",
        });
      }
    }
  });

  const onSubmit: SubmitHandler<signinRequestData> = (data) => {
    mutate(data);
  };

  return (
    <CardWrapper
      label="Welcome back"
      title="Login to your account"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                    <button
                      type="button"
                      className="text-xs font-normal text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isPending}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled={isPending}
                        autoComplete="current-password"
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

          <div className="flex items-center justify-between">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};