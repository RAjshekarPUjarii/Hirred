import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const { isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  // console.log(dataJobs);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return (
      <div>
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb8 ">
        Latest Jobs
      </h1>

      {/* Add filter here */}

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard key={job.id} job={job} />;
            })
          ) : (
            <div>No Jobs Found 🥲</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
