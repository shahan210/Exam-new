import School from "../../../assets/jpg/school.jpg";
import Master from "../../../assets/jpg/master.jpg";

const Navbar = () => {
    return (
        <div className="fixed z-[20] md:ml-72 left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ">
            <div className="flex justify-between gap-4">
                <img src={School} alt="" className="w-[200px] h-12" />
                <img src={Master} alt="" className="w-[200px] h-12" />
            </div>
        </div>
    );
};

export default Navbar;
