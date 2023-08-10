import React, { useState } from "react";

const TruncatedText = ({ text, maxWords }) => {
  const wordsArray = text.split(" ");
  const truncatedText = wordsArray.slice(0, maxWords).join(" ");
  const shouldShowSeeMore = wordsArray.length > maxWords;
  const [expanded, setExpanded] = useState(false);

  const handleSeeMoreClick = () => {
    setExpanded(true);
  };

  const handleParagraphClick = () => {
    if (shouldShowSeeMore) {
      setExpanded(!expanded);
    }
  };

  return (
    <div>
      <p onClick={handleParagraphClick}>{expanded ? text : truncatedText}</p>
      {shouldShowSeeMore && !expanded && (
        <a
          style={{
            color: "#15a362",
            textDecoration: "none",
          }}
          onClick={handleSeeMoreClick}
        >
          see more
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-arrow-right ms-2"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            ></path>
          </svg>
        </a>
      )}
    </div>
  );
};

export default TruncatedText;
