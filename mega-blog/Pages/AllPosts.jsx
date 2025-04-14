import React from "react";
import Container from "../src/components/Container/Container";
import PostCard from "../src/components/PostCard";
import databaseService from "../src/appwrite/database";

function AllPosts() {
  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    databaseService
      .getPosts()
      .then((posts) => {
        if (posts) setPosts(posts.documents);
      })
      .catch((error) => setError(error));
  }, []);

  if (!error && posts.length > 0)
    return (
      <div className="w-full py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Container>
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8 text-center">
            All Blog Posts
          </h1>
          <div className="flex flex-wrap justify-center gap-6">
            {posts.map((post) => (
              <div
                key={post.$id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:scale-105"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  else if (error)
    return (
      <div className="w-full py-10 bg-red-50 dark:bg-red-900 text-center">
        <h2 className="text-xl text-red-600 dark:text-red-300 font-medium">
          {error}
        </h2>
      </div>
    );
}

export default AllPosts;
