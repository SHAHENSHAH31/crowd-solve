import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSolutionsQuery,useVoteSolutionMutation } from "../Services/authapi";

const ProblemSolutionsPage = () => {
  const { id: problemId } = useParams(); // /problems/:id
  const { data, isLoading, isError, refetch } = useGetSolutionsQuery(problemId);
  const [voteSolution] = useVoteSolutionMutation();

  const [loadingVotes, setLoadingVotes] = useState({}); // track loading per solution

  if (isLoading) return <p>Loading solutions...</p>;
  if (isError) return <p>Error fetching solutions</p>;

  const handleVote = async (solutionId) => {
    try {
      setLoadingVotes((prev) => ({ ...prev, [solutionId]: true }));
      await voteSolution(solutionId).unwrap();
      await refetch(); // refresh solutions after vote
    } catch (err) {
      console.error("Error voting solution:", err);
    } finally {
      setLoadingVotes((prev) => ({ ...prev, [solutionId]: false }));
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Problem Details */}
      {data.solutions.length > 0 && (
        <div
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {data.solutions[0].problem?.image?.url && (
            <img
              src={data.solutions[0].problem.image.url}
              alt="Problem"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />
          )}
          <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px" }}>
            {data.solutions[0].problem?.title}
          </h2>
          <p style={{ fontSize: "16px", color: "#555" }}>
            {data.solutions[0].problem?.description}
          </p>
        </div>
      )}

      {/* Solutions Section */}
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
        Solutions
      </h2>
      {data.solutions.length === 0 ? (
        <p>No solutions yet. Be the first to submit!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.solutions.map((solution) => (
            <li
              key={solution._id}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                marginBottom: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <p style={{ fontSize: "16px", color: "#333" }}>{solution.text}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                <span>By: {solution.author?.name || "Anonymous"}</span>
                <span>{new Date(solution.createdAt).toLocaleString()}</span>
              </div>

              {/* Like Button */}
              <button
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  opacity: loadingVotes[solution._id] ? 0.6 : 1,
                }}
                onClick={() => handleVote(solution._id)}
                disabled={loadingVotes[solution._id]}
              >
                👍 Like ({solution.upvotes?.length || 0})
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProblemSolutionsPage;
