import { apiGetBlogById, apiLikeBlog, apiDislikeBlog } from "apis/blog"
import DOMPurify from "dompurify"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const DetailBlogs = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState()
  const [loadingLike, setLoadingLike] = useState(false)
  const [loadingDislike, setLoadingDislike] = useState(false)
  const { current } = useSelector((state) => state.user)

  const fetchBlog = async () => {
    const response = await apiGetBlogById(id)
    if (response.success) setBlog(response.rs)
  }

  useEffect(() => {
    if (id) fetchBlog()
  }, [id])

  // Debug log
  useEffect(() => {
    console.log('blog.likes:', blog?.likes)
    console.log('blog.dislikes:', blog?.dislikes)
    console.log('current._id:', current?._id)
  }, [blog, current])

  const handleLike = async () => {
    if (!id || !current?._id) return;
    setLoadingLike(true);
    setBlog((prev) => {
      const isLikedNow = prev.likes?.some((u) => (typeof u === 'string' ? u === current._id : u._id === current._id));
      if (isLikedNow) {
        // Bỏ like
        return {
          ...prev,
          likes: prev.likes.filter((u) => (typeof u === 'string' ? u !== current._id : u._id !== current._id)),
        };
      } else {
        // Thêm like, bỏ dislike nếu có
        return {
          ...prev,
          likes: [...(prev.likes || []), current._id],
          dislikes: (prev.dislikes || []).filter((u) => (typeof u === 'string' ? u !== current._id : u._id !== current._id)),
        };
      }
    });
    try {
      await apiLikeBlog(id);
      await fetchBlog();
    } catch (e) {
      // Nếu lỗi, có thể rollback state hoặc báo lỗi
      console.error('Like error:', e);
    }
    setLoadingLike(false);
  };

  const handleDislike = async () => {
    if (!id || !current?._id) return;
    setLoadingDislike(true);
    setBlog((prev) => {
      const isDislikedNow = prev.dislikes?.some((u) => (typeof u === 'string' ? u === current._id : u._id === current._id));
      if (isDislikedNow) {
        // Bỏ dislike
        return {
          ...prev,
          dislikes: prev.dislikes.filter((u) => (typeof u === 'string' ? u !== current._id : u._id !== current._id)),
        };
      } else {
        // Thêm dislike, bỏ like nếu có
        return {
          ...prev,
          dislikes: [...(prev.dislikes || []), current._id],
          likes: (prev.likes || []).filter((u) => (typeof u === 'string' ? u !== current._id : u._id !== current._id)),
        };
      }
    });
    try {
      await apiDislikeBlog(id);
      await fetchBlog();
    } catch (e) {
      // Nếu lỗi, có thể rollback state hoặc báo lỗi
      console.error('Dislike error:', e);
    }
    setLoadingDislike(false);
  };

  const isLiked = blog?.likes?.some((u) => (typeof u === 'string' ? u === current?._id : u._id === current?._id))
  const isDisliked = blog?.dislikes?.some((u) => (typeof u === 'string' ? u === current?._id : u._id === current?._id))

  return (
    <div className="w-full flex justify-center bg-gray-50 py-10 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full overflow-hidden">
        {blog?.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-72 object-cover object-center rounded-t-xl shadow"
          />
        )}
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-main text-center mb-4">{blog?.title}</h1>
          <div className="flex justify-center items-center text-gray-500 text-sm mb-6 gap-2">
            <span>Được đăng bởi: <span className="font-semibold text-gray-700">{blog?.author}</span></span>
            <span className="mx-2">•</span>
            <span>Ngày đăng: <span className="font-semibold text-gray-700">{moment(blog?.createdAt).format("DD/MM/YYYY")}</span></span>
          </div>
          {/* Like/Dislike buttons */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <button
              onClick={handleLike}
              disabled={loadingLike}
              className={`flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 shadow-sm transition hover:bg-green-50 ${isLiked ? 'bg-green-100 text-green-700 font-bold' : ''} ${loadingLike ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Like"
            >
              <span role="img" aria-label="like">👍</span>
              <span className="font-semibold text-green-600">{blog?.likes?.length || 0}</span>
            </button>
            <button
              onClick={handleDislike}
              disabled={loadingDislike}
              className={`flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 shadow-sm transition hover:bg-red-50 ${isDisliked ? 'bg-red-100 text-red-700 font-bold' : ''} ${loadingDislike ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Dislike"
            >
              <span role="img" aria-label="dislike">👎</span>
              <span className="font-semibold text-red-600">{blog?.dislikes?.length || 0}</span>
            </button>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog?.description),
            }}
            className="prose max-w-none text-lg leading-relaxed mx-auto"
          ></div>
        </div>
      </div>
    </div>
  )
}

export default DetailBlogs
