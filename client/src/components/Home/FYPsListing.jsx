import FYPCard from "./FYPCard";
import PaginationDemo from "../shared/Pagination";

const FYPsListing = ({ allProjects, page, setPage }) => {
  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allProjects &&
          allProjects.length > 0 &&
          allProjects?.map((fyp, index) => {
            return <FYPCard key={index} fyp={fyp} />;
          })}
      </div>
      <div className="my-8">
        <PaginationDemo page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default FYPsListing;
