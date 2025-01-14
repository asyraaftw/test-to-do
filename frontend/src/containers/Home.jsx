import React, { useEffect, useState } from "react";
import { getHello } from "./Api/Api"; // Adjust the path to where your getHello function is located

export const Home = () => {
  const [hello, setHello] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data when the component is mounted
    const fetchData = async () => {
      try {
        const data = await getHello(); // Call the getHello function
        setHello(data); // Set the fetched data into state
      } catch (err) {
        setError("Failed to fetch data"); // Handle any error
        console.error(err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once when the component is mounted
  console.log(hello);
  return (
    <div>
      <h1>{hello}</h1>
    </div>
  );
};
