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
      .catch((error) => setError(error))
  }, []);

  if (!error && posts.length > 0)
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  else if (error) return <h2>{error}</h2>;
}

export default AllPosts;
