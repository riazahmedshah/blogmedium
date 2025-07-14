import { SubmitHandler, useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"

import { zodResolver } from "@hookform/resolvers/zod"
import { signinRequestData, signinSchema } from "@schemas/authSchema"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form"
import { CardWrapper } from "./card-wrapper"
import { Input } from "@ui/input"
import { Button } from "@ui/button"
import { loginRequest } from "../api/login"
import { useAuth } from "../hooks/useAuth"
import { isAxiosError } from "axios"
import { toast } from "sonner"

export const LoginForm = () => {
  const auth = useAuth()
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "test1@gmail.com",
      password: "123456"
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: signinRequestData) => loginRequest(data),
    onSuccess: (response) => {
      auth.onLogin(response);
      toast.success("Success!", {
        description: "Successful Login"
      })
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {

        if (error.response.data && error.response.data.errors) {
          const errors = error.response.data.errors
          toast.error("Failed",{
            description:errors
          })
          
          for (const [field, message] of Object.entries(errors)) {
            const messageString = String(message)
            form.setError(field as keyof signinRequestData, {
              type: 'custom',
              message: messageString
            })
          }
        }
      }
    }
  })

  const onSubmit: SubmitHandler<signinRequestData> = (data) => {
    console.log("Sign in")
    mutate(data)
  }

  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="elonmust@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="abcdef"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}