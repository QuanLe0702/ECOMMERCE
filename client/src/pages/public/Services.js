import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <>
      {/* Breadcrumb giống Products/FAQs */}
      <div className="h-[81px] w-full bg-gray-100 flex items-center">
        <div className="lg:w-main w-full px-4 lg:px-0 mx-auto">
          <h3 className="font-semibold uppercase">Services</h3>
          <div className="flex items-center text-sm text-gray-700 gap-2 mt-1">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-1">&gt;</span>
            <span className="text-black font-medium">Services</span>
          </div>
        </div>
      </div>
      {/* Nội dung dịch vụ */}
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <img src='https://digital-world-2.myshopify.com/cdn/shop/files/9069783_orig_400x_5a30224e-9dc2-442a-85fd-0b09a896a89a_400x.jpg?v=1613168570' alt="Service" className='w-full rounded-lg shadow-md object-cover max-h-[320px]' />
          <div className='text-gray-700 text-base space-y-4'>
            <div>
              Cras magna tellus, congue vitae congue vel, facilisis id risus. Proin semper in lectus id faucibus. Aenean vitae quam eget mi aliquam viverra quis quis velit.
            </div>
            <div>
              Curabitur mauris diam, posuere vitae nunc eget, blandit pellentesque mi. Pellentesque placerat nulla at ultricies malesuada. Aenean mi lacus, malesuada at leo vel, blandit iaculis nisl.
            </div>
            <div>
              Praesent vestibulum nisl sed diam euismod, a auctor neque porta. Vestibulum varius ligula non orci tincidunt rutrum. Suspendisse placerat enim eu est egestas, aliquam venenatis elit accumsan. Donec metus quam, posuere sit amet odio et, ultricies consequat nibh.
            </div>
          </div>
        </div>
        <div className='text-center font-bold text-2xl md:text-3xl text-gray-800 my-10'>We Offer Best Services</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition'>
            <i className="fa-solid fa-gear text-5xl text-red-500 mb-4"></i>
            <div className='text-lg font-semibold mb-2'>Customizable Page</div>
            <div className='text-gray-600 text-sm text-center'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
          </div>
          <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition'>
            <i className="fa-regular fa-image text-5xl text-blue-500 mb-4"></i>
            <div className='text-lg font-semibold mb-2'>Revolution Slider</div>
            <div className='text-gray-600 text-sm text-center'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
          </div>
          <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition'>
            <i className="fa-solid fa-box-archive text-5xl text-green-500 mb-4"></i>
            <div className='text-lg font-semibold mb-2'>Drag & Drop Page</div>
            <div className='text-gray-600 text-sm text-center'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
          </div>
          <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition'>
            <i className="fa-regular fa-image text-5xl text-blue-500 mb-4"></i>
            <div className='text-lg font-semibold mb-2'>Revolution Slider</div>
            <div className='text-gray-600 text-sm text-center'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
          </div>
          <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition'>
            <i className="fa-solid fa-box-archive text-5xl text-green-500 mb-4"></i>
            <div className='text-lg font-semibold mb-2'>Drag & Drop Page</div>
            <div className='text-gray-600 text-sm text-center'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
          </div>
          <div className='flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition'>
            <i className="fa-solid fa-gear text-5xl text-red-500 mb-4"></i>
            <div className='text-lg font-semibold mb-2'>Customizable Page</div>
            <div className='text-gray-600 text-sm text-center'>Fusce arcu molestie eget libero consectetur congue consectetur in bibendum litora</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Services;