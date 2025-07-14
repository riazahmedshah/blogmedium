interface CategoryProps {
  categoryArray: string[];
}

export const Category: React.FC<CategoryProps> = ({ categoryArray }) => {
    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
                {categoryArray.map((category, idx) => (
                    <button
                        key={idx}
                        className="
                            group relative
                            px-6 py-2
                            rounded-full
                            bg-gradient-to-r from-blue-700 to-indigo-800
                            text-white
                            font-medium
                            shadow-md
                            hover:from-blue-600 hover:to-indigo-700
                            transition-all duration-300
                            overflow-hidden
                        "
                    >
                        <span className="relative z-10 flex items-center">
                            <span className="mr-1 text-blue-200 group-hover:text-blue-100 transition-colors">
                                #
                            </span>
                            {category}
                        </span>
                        <span className="
                            absolute inset-0
                            bg-gradient-to-r from-blue-600 to-indigo-700
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                        "></span>
                    </button>
                ))}
            </div>
        </div>
    )
}