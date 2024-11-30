import groupImage from '../../assets/PageNotFound/404.png';
import walkingMan from '../../assets/PageNotFound/Group.png';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-[#06B6D4] text-white h-[100vh] relative">
            {/* 404 Image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src={groupImage}
                    alt="404"
                    className="w-[300px] md:w-[600px] lg:w-[1024px] opacity-20"
                />
            </div>

            {/* Walking Man Image */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src={walkingMan}
                    alt="Walking man"
                    className="w-[150px] md:w-[250px] lg:w-[800px]"
                />
            </div>

            {/* Text above the 404 */}
            <p className="absolute top-[12%] text-xl lg:text-4xl text-white">You musn&apos;t be here!</p>

            {/* Back to Home Button */}
            <div className="absolute bottom-[5%]">
                <Link to={"/"}>
                    <button className="bg-white text-primary py-4 px-8 rounded-full font-semibold shadow-md">
                        Back to home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;