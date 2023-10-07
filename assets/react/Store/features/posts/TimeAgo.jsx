import { parseISO, formatDistanceToNow } from "date-fns";

import React, { useState } from "react";

const TimeAgo = ({ timestamp }) => {
  // const [timeAgo, setTimeAgo] = useState("");
  let timeAgo = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
    // setTimeAgo(`${timePeriod} ago`);
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
