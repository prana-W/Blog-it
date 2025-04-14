import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import storageService from "../appwrite/storage";
import databaseService from "../appwrite/database";
import { useSelector } from "react-redux";
import Input from "./Input";
import Select from "./Select";
import RTE from "./RTE";
import Button from "./Button";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        await storageService.deleteFile(post.featuredImage);
      }

      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await storageService.uploadFile(data.image[0]);

      if (file) {
        data.featuredImage = file.$id;

        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md gap-4 transition-all"
    >
      {/* Left Column */}
      <div className="w-full lg:w-2/3 space-y-4">
        <Input
          label="Title:"
          placeholder="Title"
          className="mb-2"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-2"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/3 space-y-4">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-2"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full">
            <img
              src={storageService.fileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full h-48 object-cover"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-2"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          className={`w-full ${
            post ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-semibold py-2 rounded-lg transition`}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
