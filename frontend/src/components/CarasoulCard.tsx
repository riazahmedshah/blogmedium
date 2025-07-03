import { User2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { StarRating } from "./StarRating";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

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


const CarasoulCard = () => {
    return (
        <div className="px-4 py-8">
            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 1,
                }}
                className="max-w-6xl mx-auto"
            >
                <CarouselContent>
                    {reviewPost.map((review, idx: number) => (
                        <CarouselItem key={idx} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
                            <Card className="h-full flex flex-col border border-gray-200 rounded-lg shadow-2xl hover:shadow-xl transition-shadow">
                                <CardHeader>
                                    <CardTitle>
                                        <div className="flex items-center gap-3">
                                            <User2 strokeWidth={1} size={48} className="border border-gray-300 rounded-full p-1.5" />
                                            <div className="space-y-1">
                                                <p className="text-lg font-semibold">{review.username}</p>
                                                <StarRating rating={review.rating} />
                                            </div>
                                        </div>
                                    </CardTitle>
                                    <CardDescription className="text-sm font-medium text-gray-600 mt-2">
                                        {review.role}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 p-6 overflow-y-auto">
                                    <p className="text-gray-700 line-clamp-5">{review.review}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-6">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                </div>
            </Carousel>
        </div>
    );
};

export default CarasoulCard;