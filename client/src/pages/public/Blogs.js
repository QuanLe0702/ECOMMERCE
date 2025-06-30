import React, { useEffect, useState } from "react";
import { apiGetBlogs } from "../../apis/blog";
import { Link } from "react-router-dom";
import moment from "moment";
import path from "../../ultils/path";
import Breadcrumb from "../../components/common/Breadcrumb";
import Pagination from "../../components/pagination/Pagination";

const LIMIT = 9;

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [counts, setCounts] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("-createdAt");

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await apiGetBlogs({ page, limit: LIMIT, sort });
      if (response.success) {
        setBlogs(response.blogs);
        setCounts(response.counts || 0);
      }
    };
    fetchBlogs();
  }, [page, sort]);

  const from = (page - 1) * LIMIT + 1;
  const to = Math.min(page * LIMIT, counts);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="h-[81px] flex justify-center items-center bg-gray-100 w-full mb-2">
        <div className="lg:w-main w-screen px-4 lg:px-0">
          <h3 className="font-semibold uppercase">BLOGS</h3>
          <Breadcrumb category="Blogs" />
        </div>
      </div>
      <div className="max-w-5xl w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4 mt-4">
          <h1 className="text-3xl font-bold text-main text-center md:text-left">ALL BLOG POSTS</h1>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Sort by:</span>
            <select
              className="border rounded px-2 py-1 text-sm outline-main"
              value={sort}
              onChange={e => { setPage(1); setSort(e.target.value); }}
            >
              <option value="-createdAt">Newest</option>
              <option value="createdAt">Oldest</option>
              <option value="title">Title A-Z</option>
              <option value="-title">Title Z-A</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((el) => (
            <div key={el._id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
              <Link to={`/${path.BLOGS}/${el._id}/${el.title}`}>
                <img src={el.image} alt={el.title} className="w-full h-48 object-cover rounded-2xl border border-gray-200 shadow mb-4" />
              </Link>
              <div className="p-4 flex-1 flex flex-col">
                <Link to={`/${path.BLOGS}/${el._id}/${el.title}`} className="text-xl font-semibold text-main hover:underline line-clamp-2 mb-2">
                  {el.title}
                </Link>
                <div className="flex flex-col gap-1 mb-2">
                  <div className="text-gray-500 text-sm">
                    Posted by: <span className="font-medium text-gray-700">{el.author}</span>
                  </div>
                  <div className="text-gray-400 text-xs">
                    Created at: {moment(el.createdAt).format("DD/MM/YYYY")}
                  </div>
                </div>
                <Link to={`/${path.BLOGS}/${el._id}/${el.title}`} className="mt-auto text-blue-500 hover:underline font-medium">Read more</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-main m-auto flex justify-between items-center gap-4 mb-2">
        <span className="italic whitespace-nowrap">Show blogs {from} - {to} of {counts}</span>
        <Pagination totalCount={counts} currentPage={page} pageSize={LIMIT} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default Blogs; 