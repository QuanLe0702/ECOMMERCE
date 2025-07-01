import React, { useEffect, useState } from "react"
import payment from "assets/payment.svg"
import { useSelector } from "react-redux"
import { formatMoney } from "ultils/helpers"
import { Congrat, InputForm, Paypal } from "components"
import withBaseComponent from "hocs/withBaseComponent"
import { getCurrent } from "store/user/asyncActions"
import Swal from "sweetalert2"
import { apiCreateOrder } from "apis"

const Checkout = ({ dispatch, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user)
  const [isSuccess, setIsSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")
  useEffect(() => {
    if (isSuccess) dispatch(getCurrent())
  }, [isSuccess])
  useEffect(() => {
    if (paymentMethod === "OFFLINE") {
      const total = Math.round(
        +currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0)
      )
      Swal.fire({
        icon: "info",
        title: "Payment",
        text: `Please pay in cash the amount of ${formatMoney(
          total
        )} VND upon delivery.`,
        showConfirmButton: true,
        confirmButtonText: "Pay",
        showCancelButton: true,
        cancelButtonText: "Go back",
      }).then((result) => {
        if (result.isConfirmed) {
          handleSaveOrder()
        } else {
          setPaymentMethod("")
        }
      })
    }
  }, [paymentMethod])
  const handleSaveOrder = async () => {
    const payload = {
      products: currentCart,
      total: Math.round(
        +currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0) /
          23500
      ),
      address: current?.address,
    }
    const response = await apiCreateOrder({ ...payload, status: "Pending" })
    if (response.success) {
      setIsSuccess(true)
      setTimeout(() => {
        Swal.fire("Congrat!", "Order was created.", "success").then(() => {
          navigate("/")
        })
      }, 1500)
    }
  }
  const subtotal = currentCart?.reduce((sum, el) => +el?.price * el.quantity + sum, 0)
  const amountUSD = Math.round(+subtotal / 23500)
  return (
    <div className="p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6">
      {isSuccess && <Congrat />}
      <div className="w-full flex justify-center items-center col-span-4">
        <img src={payment} alt="payment" className="h-[70%] object-contain" />
      </div>
      <div className="flex w-full flex-col justify-center col-span-6 gap-6">
        <h2 className="text-3xl mb-6 font-bold">Checkout your order</h2>
        <div className="flex w-full gap-6">
          <div className="flex-1">
            <table className="table-auto h-fit">
              <thead>
                <tr className="border bg-gray-200">
                  <th className="p-2 text-left">Products</th>
                  <th className="text-center p-2">Quantity</th>
                  <th className="text-right p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentCart?.map((el) => (
                  <tr className="border" key={el._id}>
                    <td className="text-left p-2">{el.title}</td>
                    <td className="text-center p-2">{el.quantity}</td>
                    <td className="text-right p-2">
                      {formatMoney(el.price) + " VND"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-1 flex flex-col justify-between gap-[45px]">
            <div className="flex flex-col gap-6">
              <span className="flex items-center gap-8 text-sm">
                <span className="font-medium">Subtotal:</span>
                <span className="text-main font-bold">{`${formatMoney(
                  currentCart?.reduce(
                    (sum, el) => +el?.price * el.quantity + sum,
                    0
                  )
                )} VND`}</span>
              </span>
              <span className="flex items-center gap-8 text-sm">
                <span className="font-medium">Address:</span>
                <span className="text-main font-bold">{current?.address}</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>Select payment method: </span>
              <select
                onChange={(e) => {
                  if (subtotal === 0) {
                    Swal.fire('Error', 'Your cart is empty or the total amount is zero!', 'error')
                    return
                  }
                  setPaymentMethod(e.target.value)
                }}
                value={paymentMethod}
                className="border rounded-md px-4 py-3 flex-auto"
                disabled={subtotal === 0}
              >
                <option value="">Select</option>
                <option value="OFFLINE">Cash on Delivery</option>
                <option value="ONLINE">Pay with Paypal</option>
              </select>
            </div>
            {paymentMethod === "ONLINE" && amountUSD > 0 && (
              <div className="w-full mx-auto">
                <Paypal
                  payload={{
                    products: currentCart,
                    total: amountUSD,
                    address: current?.address,
                  }}
                  setIsSuccess={setIsSuccess}
                  amount={amountUSD}
                />
              </div>
            )}
            {paymentMethod === "ONLINE" && amountUSD === 0 && (
              <div className="text-red-500 font-bold">Cannot pay with Paypal when the total amount is zero!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withBaseComponent(Checkout)
