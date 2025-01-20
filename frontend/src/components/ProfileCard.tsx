
import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card"
import { UserBlogs } from "./userBlogs"

interface User {
    id: string;
    name: string;
    email: string;
  }
  

interface UserProps {
    data: User | null
  }

export const ProfileCard : React.FC<UserProps> = ({data}) => {
    return(
        <Card className="max-w-2xl mx-auto my-14 shadow-none ">
            <CardHeader className="font-semibold text-xl">Your Profile</CardHeader>
            <CardContent className="">
                <div className="space-y-2 bg-gray-100 p-4 rounded-lg">
                    <p className="bg-gray-500 flex items-center justify-center my-auto size-14 rounded-full text-3xl" >
                        {data?.name[0]}
                    </p>
                    <p className="text-xl font-bold mt-2 ">{data?.name}</p>
                    <div className="flex items-center gap-4">
                        <p className="text-sm" >{data?.email}</p>
                        <p className="text-blue-500/80 text-sm">joined on 15Nov 2016</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="text-sm" >120 - <span className="text-gray-500">following</span></p>
                        <p className="text-sm">12k - <span className="text-gray-500">follower</span></p>
                    </div>
                    <p>Total Blogs - 20</p>
                </div>
                {/* Blogs section */}
                <UserBlogs/>
            </CardContent>
            
        </Card>
    )
}