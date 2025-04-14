import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storage";
import parse from "html-react-parser";
import Container from "./Container/Container";

function PostCard({ $id, title, featuredImage, content }) {
  return (
    <Container>
      <Link
        to={`/post/${$id}`}
        className="block bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      >
        <img
          src={storageService.fileView(featuredImage)}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl"
        />

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {title}
          </h2>

          <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {parse(content)}
          </div>
        </div>
      </Link>
    </Container>
  );
}

export default PostCard;
