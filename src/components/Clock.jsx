import React, { useState, useEffect } from "react";

// Shows current local time, updates every second
export default function Clock({ className = "" }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`font-mono text-base text-gray-300 ${className}`}>
      {now.toLocaleString()} {/* Shows date and time */}
    </div>
  );
}
