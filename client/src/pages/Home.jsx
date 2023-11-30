import React from "react";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Card from "../components/Card";

import FormField from "../components/FormField";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data.map((post) => <Card key={post._id} {...post}></Card>);

  return (
    <h2 className="mt-5 font-bold text-[#164863] text-xl uppercase">{title}</h2>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(response.ok){
            const result=await response.json();
            console.log(result)
            setAllPosts(result.data.reverse())
        }
      } catch (err) {
       console.log(err)
      } finally {
        setLoading(false);
      }
    };
    fetchPost()
  }, []);
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[32px]">The Commiunity Showcase</h1>
        <p className="mt-2 text-gray-600 text-[16px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning
          images genrated by Open Ai
        </p>
        <div className="mt-16 ">
          <FormField />
        </div>
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText ? (
                <h2 className="font-medium text-gray-700 text-xl mb-3 ">
                  Showing Result for <span className=""> {searchText}</span>
                </h2>
              ) : (
                <div className="grid lg:grid-cols-4  sm:grid-cols-3  xs:grid-cols-2  grid-cols-1 gap-3">
                  {searchText ? (
                    <RenderCards
                      data="searchResults"
                      title="No search results found "
                    />
                  ) : (
                    <RenderCards data={allPosts} title="no post found" />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
