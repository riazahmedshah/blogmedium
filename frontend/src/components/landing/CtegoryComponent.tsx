interface CategoryProps {
  categoryArray: string[];
}

const Categoty: React.FC<CategoryProps> = ({categoryArray}) => {
    return(
        <div className=" max-w-2xl mx-auto">
            <div className="flex items-center justify-center flex-wrap">
                {
                    categoryArray.map((category,idx:number) => (
                        <div key={idx}  className="">
                            <div className="bg-[#3B3B4F] text-[#D0D0D5] hover:text-[#3B3B4F] font-semibold hover:bg-[#D0D0D5] hover:ease-in-out py-2 px-8 mx-2 my-2">
                                <span>#</span>
                                {category.toUpperCase()}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categoty;