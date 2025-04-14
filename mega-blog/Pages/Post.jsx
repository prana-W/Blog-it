import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import databaseService from "../src/appwrite/database";
import { useNavigate } from "react-router-dom";
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
      navigate(`/edit/${post.$id}`);
    }
  };

  return (
    <>
      <h1>test</h1>

      {isAuthor && (
        <div className="flex justify-end gap-4 mb-4">
          <button onClick={handleEditPost} className="btn btn-primary">
            Edit
          </button>
          <button onClick={handleDeletePost} className="btn btn-danger">
            Delete
          </button>
        </div>
      )}

      {post && (
        <>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="browser-css">{parse(post.content)}</div>
        </>
      )}
    </>
  );
}

export default Post;
