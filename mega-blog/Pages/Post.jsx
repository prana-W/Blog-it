import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import databaseService from "../src/appwrite/database";
import { useSelector } from "react-redux";
import parse from "html-react-parser";

function Post() {
  const slug = useParams();
  const [post, setPost] = React.useState("");
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug.slug) {
      databaseService
        .getPost(slug.slug)
        .then((post) => {
          if (post) setPost(post);
          else navigate("/");
        })
        .catch((error) => console.error(error));
    } else navigate("/");
  }, [slug, navigate]);

  const handleDeletePost = () => {
    if (isAuthor) {
      databaseService
        .deletePost(post.$id)
        .then(() => {
          navigate("/");
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEditPost = () => {
    if (isAuthor) {
      navigate(`/edit-post/${post.$id}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {isAuthor && (
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={handleEditPost}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDeletePost}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}

      {post && (
        <>
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
              {post.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By {post.username || "Anonymous"}
            </p>
          </div>
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400">
            {parse(post.content)}
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
