import { apiCreateNewBlog } from "apis/blog"
import { Button, InputFile, InputForm, MdEditor } from "components"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const CreateBlog = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const handlePublish = async ({ image, ...data }) => {
    const payload = new FormData()
    for (let i of Object.entries(data)) payload.append(i[0], i[1])
    payload.append("image", image[0])
    setIsLoading(true)
    const response = await apiCreateNewBlog(payload)
    setIsLoading(false)
    if (response.success) {
      setValue("title", "")
      setValue("description", "")
      setValue("hashtags", "")
      setValue("image", "")
      toast.success(response.mes)
    } else toast.error(response.mes)
  }
  return (
    <div className="w-full flex flex-col gap-4 bg-gray-50 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b w-full bg-gray-50 justify-between flex items-center fixed top-0">
        <h1 className="text-3xl font-bold tracking-tight">Create Blog</h1>
      </div>
      <div className="px-4 flex flex-col gap-6">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-semibold mb-1">Title</label>
          <input
            id="title"
            className="border p-2 rounded outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150 text-base"
            placeholder="Enter blog title"
            {...register('title', { required: 'Title is required.' })}
          />
          {errors['title'] && <small className='text-xs text-red-500 mt-1'>{errors['title']?.message}</small>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="hashtags" className="font-semibold mb-1">Tags <span className="font-normal text-gray-500">(comma separated)</span></label>
          <input
            id="hashtags"
            className="border p-2 rounded outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150 text-base"
            placeholder="e.g. technology, ai, blog"
            {...register('hashtags', { required: 'At least one tag is required.' })}
          />
          {errors['hashtags'] && <small className='text-xs text-red-500 mt-1'>{errors['hashtags']?.message}</small>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold mb-1">Blog Content</label>
          <MdEditor
            id="description"
            errors={errors}
            validate={{ required: "Content is required." }}
            register={register}
            label=""
            height={400}
            setValue={setValue}
            value={watch("description")}
          />
          {errors['description'] && <small className='text-xs text-red-500 mt-1'>{errors['description']?.message}</small>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="font-semibold mb-1">Thumbnail Image</label>
          <InputFile
            register={register}
            errors={errors}
            id="image"
            validate={{ required: "Thumbnail image is required." }}
            label=""
          />
          {errors['image'] && <small className='text-xs text-red-500 mt-1'>{errors['image']?.message}</small>}
        </div>
        <div className="my-6">
          <Button
            disabled={isLoading}
            handleOnClick={handleSubmit(handlePublish)}
            style="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition-all duration-150"
          >
            Publish Blog
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateBlog
