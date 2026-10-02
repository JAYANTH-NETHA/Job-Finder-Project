import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/Home.css";

function Home() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [sort, setSort] = useState("");

  const navigate = useNavigate();


  useEffect(() => {

    fetch("http://localhost:8080/jobs")

      .then((response) => response.json())

      .then((data) => {

        setJobs(data);

        console.log(data);

        setLoading(false);

      })

      .catch((error) => {

        console.error(error);

        setLoading(false);

      });

  }, []);


  const filteredJobs = jobs

    .filter((job) =>
      job.job_title
        .toLowerCase()
        .includes(search.toLowerCase())
    )

    .filter((job) =>
      job.job_location
        .toLowerCase()
        .includes(location.toLowerCase())
    )

    .filter((job) =>
      jobType === "" ||
      job.job_type === jobType
    );


  const sortedJobs = [...filteredJobs].sort((a, b) => {

    if (sort === "salary-low") {

      return (
        Number(a.job_salary) -
        Number(b.job_salary)
      );

    }

    if (sort === "salary-high") {

      return (
        Number(b.job_salary) -
        Number(a.job_salary)
      );

    }

    if (sort === "title") {

      return a.job_title.localeCompare(
        b.job_title
      );

    }

    return 0;

  });


  return (

    <div className="home-wrapper">

      <div className="home-container">

        <Navbar />


        <header className="home-header">

          <h1 className="brand-title">
            Job Finder
          </h1>

          <h2 className="section-title">
            Explore Opportunities
          </h2>

          <p className="section-subtitle">
            Find your next career step from open
            positions worldwide
          </p>

        </header>


        {/* SEARCH & FILTER */}

        <div className="search-section">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
          />


          <select
            value={jobType}
            onChange={(e) =>
              setJobType(e.target.value)
            }
          >

            <option value="">
              All Job Types
            </option>

            <option value="FULL_TIME">
              Full Time
            </option>

            <option value="PART_TIME">
              Part Time
            </option>

            <option value="INTERNSHIP">
              Internship
            </option>

            <option value="CONTRACT">
              Contract
            </option>

          </select>


          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >

            <option value="">
              Sort By
            </option>

            <option value="salary-low">
              Salary: Low to High
            </option>

            <option value="salary-high">
              Salary: High to Low
            </option>

            <option value="title">
              Job Title: A-Z
            </option>

          </select>

        </div>


        {loading ? (

          <div className="jobs-grid">

            {[1, 2, 3, 4].map((i) => (

              <div
                key={i}
                className="job-card skeleton-card"
              >

                <div className="skeleton line-title"></div>

                <div className="skeleton line-text"></div>

                <div className="skeleton line-badge"></div>

              </div>

            ))}

          </div>


        ) : sortedJobs.length === 0 ? (

          <div className="empty-state">

            <p>
              No jobs found. Try different search
              or filter options.
            </p>

          </div>


        ) : (

          <div className="jobs-grid">

            {sortedJobs.map((job) => (

              <article
                key={job.job_id}
                className="job-card"
              >

                <div className="job-card-header">

                  <h3 className="job-title">
                    {job.job_title}
                  </h3>

                  <span className="badge job-type">
                    {job.job_type}
                  </span>

                </div>


                <div className="job-details">

                  <p className="job-location">

                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >

                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />

                      <circle
                        cx="12"
                        cy="9"
                        r="2.5"
                      />

                    </svg>

                    {job.job_location}

                  </p>


                  <p className="job-salary">

                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >

                      <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />

                    </svg>

                    {job.job_salary}

                  </p>

                </div>


                <button
                  className="apply-btn"
                  onClick={() =>
                    navigate(`/jobs/${job.job_id}`)
                  }
                >
                  View Job
                </button>

              </article>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default Home;