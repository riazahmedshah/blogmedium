// import { User2 } from "lucide-react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
// import { StarRating } from "./StarRating";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@ui/carousel";

// interface Review {
//     username: string;
//     role: string;
//     rating: number;
//     date: string;
//     review: string;
// }

// const reviewPost: Review[] = [
//     {
//         username: "Adam Zampa",
//         role: "Senior Frontend Developer",
//         rating: 5,
//         date: "2024-05-15",
//         review: "This platform has been incredible for sharing my JavaScript knowledge. The clean interface makes it easy to format code snippets and explanations."
//     },
//     {
//         username: "Sarah Chen",
//         role: "Freelance Fullstack Engineer",
//         rating: 4,
//         date: "2024-04-22",
//         review: "As a freelance developer, this blog application helps me showcase my personal projects to potential clients. The embedding features for code and demos are particularly useful."
//     },
//     {
//         username: "Marcus Johnson",
//         role: "DevOps Engineer",
//         rating: 5,
//         date: "2024-06-10",
//         review: "I love how this platform helps me document my learning journey. Writing about programming concepts reinforces my understanding and helps others too."
//     },
//     {
//         username: "Priya Patel",
//         role: "Technical Writer",
//         rating: 4,
//         date: "2024-03-05",
//         review: "This has become my go-to platform for technical blogging. The Markdown support and live preview make writing about web development concepts so smooth."
//     },
//     {
//         username: "David Kim",
//         role: "Junior Backend Developer",
//         rating: 5,
//         date: "2024-06-28",
//         review: "As a recent coding bootcamp graduate, this blog helps me build my online presence. Recruiters often mention they appreciate seeing my project write-ups here."
//     }
// ];


// export const CarasoulCard = () => {
//     return (
//         <div className="px-4 py-8">
//             <Carousel
//                 opts={{
//                     align: "start",
//                     slidesToScroll: 1,
//                 }}
//                 className="max-w-6xl mx-auto"
//             >
//                 <CarouselContent>
//                     {reviewPost.map((review, idx: number) => (
//                         <CarouselItem key={idx} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
//                             <Card className="h-full flex flex-col border border-gray-200 rounded-lg shadow-2xl hover:shadow-xl transition-shadow">
//                                 <CardHeader>
//                                     <CardTitle>
//                                         <div className="flex items-center gap-3">
//                                             <User2 strokeWidth={1} size={48} className="border border-gray-300 rounded-full p-1.5" />
//                                             <div className="space-y-1">
//                                                 <p className="text-lg font-semibold">{review.username}</p>
//                                                 <StarRating rating={review.rating} />
//                                             </div>
//                                         </div>
//                                     </CardTitle>
//                                     <CardDescription className="text-sm font-medium text-gray-600 mt-2">
//                                         {review.role}
//                                     </CardDescription>
//                                 </CardHeader>
//                                 <CardContent className="flex-1 p-6 overflow-y-auto">
//                                     <p className="text-gray-700 line-clamp-5">{review.review}</p>
//                                 </CardContent>
//                             </Card>
//                         </CarouselItem>
//                     ))}
//                 </CarouselContent>
//                 <div className="flex justify-center gap-4 mt-6">
//                     <CarouselPrevious className="static translate-y-0" />
//                     <CarouselNext className="static translate-y-0" />
//                 </div>
//             </Carousel>
//         </div>
//     );
// };

import { User2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card";
import { StarRating } from "./StarRating";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@ui/carousel";

interface Review {
    username: string;
    role: string;
    rating: number;
    date: string;
    review: string;
}

const reviewPost: Review[] = [
    {
        username: "Adam Zampa",
        role: "Senior Frontend Developer",
        rating: 5,
        date: "2024-05-15",
        review: "This platform has been incredible for sharing my JavaScript knowledge. The clean interface makes it easy to format code snippets and explanations."
    },
    {
        username: "Sarah Chen",
        role: "Freelance Fullstack Engineer",
        rating: 4,
        date: "2024-04-22",
        review: "As a freelance developer, this blog application helps me showcase my personal projects to potential clients. The embedding features for code and demos are particularly useful."
    },
    {
        username: "Marcus Johnson",
        role: "DevOps Engineer",
        rating: 5,
        date: "2024-06-10",
        review: "I love how this platform helps me document my learning journey. Writing about programming concepts reinforces my understanding and helps others too."
    },
    {
        username: "Priya Patel",
        role: "Technical Writer",
        rating: 4,
        date: "2024-03-05",
        review: "This has become my go-to platform for technical blogging. The Markdown support and live preview make writing about web development concepts so smooth."
    },
    {
        username: "David Kim",
        role: "Junior Backend Developer",
        rating: 5,
        date: "2024-06-28",
        review: "As a recent coding bootcamp graduate, this blog helps me build my online presence. Recruiters often mention they appreciate seeing my project write-ups here."
    }
];

export const CarasoulCard = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Community Says</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Join thousands of developers who are sharing knowledge and growing together
                    </p>
                </div>
                
                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: 1,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {reviewPost.map((review, idx) => (
                            <CarouselItem key={idx} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <Card className="h-full flex flex-col border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                                    <CardHeader className="pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <User2 className="text-blue-600" size={24}/>
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-semibold">
                                                    {review.username}
                                                </CardTitle>
                                                <CardDescription className="text-sm">
                                                    {review.role}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <StarRating rating={review.rating} />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1 p-6 pt-0">
                                        <p className="text-gray-700 line-clamp-5">
                                            {review.review}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-4">
                                            {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center gap-4 mt-8">
                        <CarouselPrevious className="static translate-y-0 border-gray-300 text-gray-700 hover:bg-gray-100" />
                        <CarouselNext className="static translate-y-0 border-gray-300 text-gray-700 hover:bg-gray-100" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};