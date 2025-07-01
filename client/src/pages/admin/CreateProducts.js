import React, { useCallback, useState, useEffect } from 'react'
import { InputForm, Select, Button, MarkdownEditor, Loading } from 'components'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { validate, getBase64 } from 'ultils/helpers'
import { toast } from 'react-toastify'
import { apiCreateProduct } from 'apis'
import { showModal } from 'store/app/appSlice'


const CreateProducts = () => {
    const { categories } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()

    const [payload, setPayload] = useState({
        description: ''
    })
    const [preview, setPreview] = useState({
        thumb: null,
        images: []
    })
    const [invalidFields, setInvalidFields] = useState([])
    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])
    const [hoverElm, setHoverElm] = useState(null)
    const [newCategory, setNewCategory] = useState('');
    const [newBrand, setNewBrand] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [brandInput, setBrandInput] = useState('');
    const [showCategorySuggest, setShowCategorySuggest] = useState(false);
    const [showBrandSuggest, setShowBrandSuggest] = useState(false);

    const categoryList = categories?.map(el => el.title) || [];
    const selectedCategory = categories?.find(el => el.title === categoryInput);
    const brandList = selectedCategory?.brand || [];

    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file)
        setPreview(prev => ({ ...prev, thumb: base64Thumb }))
    }
    const handlePreviewImages = async (files) => {
        const imagesPreview = []
        for (let file of files) {
            if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
                toast.warning('File not supported!')
                return
            }
            const base64 = await getBase64(file)
            imagesPreview.push({ name: file.name, path: base64 })
        }
        setPreview(prev => ({ ...prev, images: imagesPreview }))

    }
    useEffect(() => {
        handlePreviewThumb(watch('thumb')[0])
    }, [watch('thumb')])
    useEffect(() => {
        handlePreviewImages(watch('images'))
    }, [watch('images')])

    const handleCreateProduct = async (data) => {
        const invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            if (categoryList.includes(categoryInput)) {
                data.category = categoryInput;
            } else {
                data.category = categoryInput;
            }
            if (brandInput && brandList.includes(brandInput)) {
                data.brand = brandInput;
            } else if (brandInput) {
                data.brand = brandInput;
            }
            const finalPayload = { ...data, ...payload }
            const formData = new FormData()
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1])
            if (finalPayload.thumb) formData.append('thumb', finalPayload.thumb[0])
            if (finalPayload.images) {
                for (let image of finalPayload.images) formData.append('images', image)
            }
            dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
            const response = await apiCreateProduct(formData)
            dispatch(showModal({ isShowModal: false, modalChildren: null }))
            if (response.success) {
                toast.success(response.mes)
                reset()
                setPayload({
                    thumb: '',
                    image: []
                })
                setCategoryInput('');
                setBrandInput('');
            } else toast.error(response.mes)
        }
    }
    return (
        <div className='w-full'>
            <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
                <span>Create New Product</span>
            </h1>
            <div className='p-4'>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <div className='flex flex-col mb-6'>
                        <label className='font-semibold mb-1' htmlFor='title'>Product name:</label>
                        <input
                            id='title'
                            className='border p-2 rounded outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150'
                            placeholder='Enter product name'
                            {...register('title', { required: 'This field is required' })}
                        />
                        {errors['title'] && <small className='text-xs text-red-500'>{errors['title']?.message}</small>}
                    </div>
                    <div className='w-full my-6 flex gap-4'>
                        <div className='flex flex-col flex-auto'>
                            <label className='font-semibold mb-1' htmlFor='price'>Price:</label>
                            <input
                                id='price'
                                className='border p-2 rounded outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150'
                                placeholder='Enter product price'
                                type='number'
                                {...register('price', { required: 'This field is required' })}
                            />
                            {errors['price'] && <small className='text-xs text-red-500'>{errors['price']?.message}</small>}
                        </div>
                        <div className='flex flex-col flex-auto'>
                            <label className='font-semibold mb-1' htmlFor='quantity'>Quantity:</label>
                            <input
                                id='quantity'
                                className='border p-2 rounded outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150'
                                placeholder='Enter product quantity'
                                type='number'
                                {...register('quantity', { required: 'This field is required' })}
                            />
                            {errors['quantity'] && <small className='text-xs text-red-500'>{errors['quantity']?.message}</small>}
                        </div>
                        <div className='flex flex-col flex-auto'>
                            <label className='font-semibold mb-1' htmlFor='color'>Color:</label>
                            <input
                                id='color'
                                className='border p-2 rounded outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150'
                                placeholder='Enter product color'
                                {...register('color', { required: 'This field is required' })}
                            />
                            {errors['color'] && <small className='text-xs text-red-500'>{errors['color']?.message}</small>}
                        </div>
                    </div>
                    <div className='w-full my-6 flex gap-4'>
                        <div className='flex flex-col flex-auto relative'>
                            <label className='font-semibold mb-1'>Category</label>
                            <input
                                className='border p-2 rounded outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150'
                                type='text'
                                placeholder='Select or enter category'
                                value={categoryInput}
                                onChange={e => {
                                    setCategoryInput(e.target.value);
                                    setShowCategorySuggest(true);
                                }}
                                onFocus={() => setShowCategorySuggest(true)}
                                onBlur={() => setTimeout(() => setShowCategorySuggest(false), 100)}
                                autoComplete='off'
                                name='categoryInput'
                            />
                            {showCategorySuggest && (
                                <div className='absolute top-full left-0 right-0 bg-white border border-blue-400 shadow-lg z-20 max-h-52 overflow-y-auto rounded mt-1 transition-all duration-150'>
                                    {(categoryInput ? categoryList.filter(item => item.toLowerCase().includes(categoryInput.toLowerCase())) : categoryList).map((item, idx) => (
                                        <div
                                            key={idx}
                                            className='p-3 hover:bg-blue-100 cursor-pointer transition-all duration-100 text-base'
                                            onMouseDown={() => {
                                                setCategoryInput(item);
                                                setShowCategorySuggest(false);
                                            }}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                    {(categoryInput && categoryList.filter(item => item.toLowerCase().includes(categoryInput.toLowerCase())).length === 0) && (
                                        <div className='p-3 text-gray-400 text-base'>No result, will create new</div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col flex-auto relative'>
                            <label className='font-semibold mb-1'>Brand (Optional)</label>
                            <input
                                className='border p-2 rounded outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-150'
                                type='text'
                                placeholder='Select or enter brand'
                                value={brandInput}
                                onChange={e => {
                                    setBrandInput(e.target.value);
                                    setShowBrandSuggest(true);
                                }}
                                onFocus={() => setShowBrandSuggest(true)}
                                onBlur={() => setTimeout(() => setShowBrandSuggest(false), 100)}
                                autoComplete='off'
                                name='brandInput'
                                disabled={!categoryInput}
                            />
                            {showBrandSuggest && (
                                <div className='absolute top-full left-0 right-0 bg-white border border-blue-400 shadow-lg z-20 max-h-52 overflow-y-auto rounded mt-1 transition-all duration-150'>
                                    {(brandInput ? brandList.filter(item => item.toLowerCase().includes(brandInput.toLowerCase())) : brandList).map((item, idx) => (
                                        <div
                                            key={idx}
                                            className='p-3 hover:bg-blue-100 cursor-pointer transition-all duration-100 text-base'
                                            onMouseDown={() => {
                                                setBrandInput(item);
                                                setShowBrandSuggest(false);
                                            }}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                    {(brandInput && brandList.filter(item => item.toLowerCase().includes(brandInput.toLowerCase())).length === 0) && (
                                        <div className='p-3 text-gray-400 text-base'>No result, will create new</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <MarkdownEditor
                        name='description'
                        changeValue={changeValue}
                        label='Description'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <div className='flex flex-col gap-2 mt-8'>
                        <label className='font-semibold' htmlFor="thumb">Upload thumbnail</label>
                        <input
                            type="file"
                            id="thumb"
                            {...register('thumb', { required: 'This field is required' })}
                        />
                        {errors['thumb'] && <small className='text-xs text-red-500'>{errors['thumb']?.message}</small>}
                    </div>
                    {preview.thumb && <div className='my-4'>
                        <img src={preview.thumb} alt="thumbnail" className='w-[200px] object-contain' />
                    </div>}
                    <div className='flex flex-col gap-2 mt-8'>
                        <label className='font-semibold' htmlFor="products">Upload product images</label>
                        <input
                            type="file"
                            id="products"
                            multiple
                            {...register('images', { required: 'This field is required' })}
                        />
                        {errors['images'] && <small className='text-xs text-red-500'>{errors['images']?.message}</small>}
                    </div>
                    {preview.images.length > 0 && <div className='my-4 flex w-full gap-3 flex-wrap'>
                        {preview.images?.map((el, idx) => (
                            <div
                                key={idx}
                                className='w-fit relative'
                            >
                                <img src={el.path} alt="product" className='w-[200px] object-contain' />
                            </div>
                        ))}
                    </div>}
                    <div className='my-6'><Button type='submit'>Create new product</Button></div>
                </form>
            </div>
        </div>
    )
}

export default CreateProducts