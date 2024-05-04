import React from "react";

function BookingTicketForm({ userInfo }) {
  return (
    <div className="w-full bg-slate-50 lg:p-10">
      <div className="flex w-full lg:w-[70%] flex-col lg:flex-row mx-auto gap-8">
        <div className="basis-2/3 w-full flex flex-col gap-5">
          <div className="seat-section bg-white rounded-t-xl p-5 border border-slate-200">
            <h3 className="text-xl font-medium">Chọn ghế</h3>
            <div className="flex flex-row mt-5 gap-8">
              <div>
                <table>
                  <tr className="flex items-center gap-1 justify-between">
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        06
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        05
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        04
                      </span>
                    </td>
                    <td className="relative w-6"></td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        03
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        02
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        01
                      </span>
                    </td>
                  </tr>
                  <tr className="flex items-center gap-1 justify-between">
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        12
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        11
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        10
                      </span>
                    </td>
                    <td className="relative w-6"></td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        09
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        08
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        07
                      </span>
                    </td>
                  </tr>
                  <tr className="flex items-center gap-1 justify-between">
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        18
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        17
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        16
                      </span>
                    </td>
                    <td className="relative w-6"></td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        15
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        14
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        13
                      </span>
                    </td>
                  </tr>
                  <tr className="flex items-center gap-1 justify-between">
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        24
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        23
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        22
                      </span>
                    </td>
                    <td className="relative w-6"></td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        21
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        20
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        19
                      </span>
                    </td>
                  </tr>
                  <tr className="flex items-center gap-1 justify-between">
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        30
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        29
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        28
                      </span>
                    </td>
                    <td className="relative w-6"></td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        27
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        26
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        25
                      </span>
                    </td>
                  </tr>
                  <tr className="flex items-center gap-1 justify-between">
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        36
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        35
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        34
                      </span>
                    </td>
                    <td className="relative w-6"></td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        33
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        32
                      </span>
                    </td>
                    <td className="mt-1 text-center relative flex justify-center">
                      <img
                        width="32"
                        src="https://futabus.vn/images/icons/seat_active.svg"
                        alt="seat icon"
                      />
                      <span class="absolute text-sm font-semibold lg:text-[12px] text-blue-400 top-1">
                        31
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <span class="flex items-center">
                  <div class="mr-2 h-4 w-4 rounded bg-[#D5D9DD] border-[#C0C6CC]"></div>
                  Đã bán
                </span>
                <span class="flex items-center">
                  <div class="mr-2 h-4 w-4 rounded bg-[#DEF3FF] border-[#96C5E7]"></div>
                  Còn trống
                </span>
                <span class="flex items-center">
                  <div class="mr-2 h-4 w-4 rounded bg-[#FDEDE8] border-[#F8BEAB]"></div>
                  Đang chọn
                </span>
              </div>
            </div>
          </div>
          <div className="user-info-section bg-white border border-slate-200 p-5">
            <div className="flex flex-row gap-8">
              <div className="basis-1/2 w-full">
                <h3 className="text-xl font-semibold">Thông tin khách hàng</h3>
                <form action="" className="mt-5">
                  {userInfo.map((info) => (
                    <>
                      <div className="mb-5">
                        <p className="text-sm mb-1">
                          Họ và tên <span className="text-orange-600">*</span>
                        </p>
                        <input
                          type="text"
                          name="fullname"
                          className="rounded-xl border border-slate-200 w-full"
                          value={`${info.last_name} ${info.first_name}`}
                          disabled
                        />
                      </div>
                      <div className="mb-5">
                        <p className="text-sm mb-1">
                          Số điện thoại{" "}
                          <span className="text-orange-600">*</span>
                        </p>
                        <input
                          disabled
                          type="text"
                          name="fullname"
                          className="rounded-xl border border-slate-200 w-full"
                          value={info.phone_number}
                        />
                      </div>
                      <div>
                        <p className="text-sm mb-1">
                          Email <span className="text-orange-600">*</span>
                        </p>
                        <input
                          disabled
                          type="text"
                          name="fullname"
                          className="rounded-xl border border-slate-200 w-full"
                          value={info.email}
                        />
                      </div>
                    </>
                  ))}
                </form>
              </div>
              <div className="basis-1/2 w-full">
                <h3 className="text-orange-500 text-center mb-5 font-semibold">
                  ĐIỀU KHOẢN & LƯU Ý
                </h3>
                <p className="text-[15px] text-justify mb-3 font-[500] leading-6">
                  (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước
                  ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh
                  toán vé thành công có chứa mã vé được gửi từ hệ thống FUTA BUS
                  LINE. Vui lòng liên hệ Trung tâm tổng đài{" "}
                  <span className="text-orange-600">1900 6067</span> để được hỗ
                  trợ.
                </p>
                <p className="text-[15px] text-justify font-[500] leading-6">
                  (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ
                  Tổng đài trung chuyển{" "}
                  <span className="text-orange-600">1900 6918</span> trước khi
                  đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe
                  trung chuyển không thể tới được.
                </p>
              </div>
            </div>
            <div className="mt-5 text-sm font-[400]">
              <input type="checkbox"></input>
              <span>
                <span class="cursor-pointer text-orange-500 underline ml-3">
                  Chấp nhận điều khoản
                </span>{" "}
                đặt vé &amp; chính sách bảo mật thông tin của FUTABusline
              </span>
            </div>
          </div>
          <div className="address-info-section bg-white border border-slate-200 p-5">
            <div className="flex flex-row items-center gap-x-3 mb-5">
              <h3 className="text-xl font-semibold">Thông tin đón trả</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7 text-orange-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="basis-1/2 w-full">
                <h4 className="text-medium font-[500] mb-5">ĐIỂM ĐÓN</h4>
                <div className="flex flex-row items-center gap-x-5">
                  <div>
                    <input
                      disabled
                      checked
                      id="disabled-radio-1"
                      type="radio"
                      value=""
                      name="disabled-radio1"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    ></input>
                    <label
                      for="disabled-radio-1"
                      class="ms-2 text-sm font-medium text-blue-500 "
                    >
                      Điểm đón
                    </label>
                  </div>
                  <div>
                    {" "}
                    <input
                      disabled
                      id="disabled-radio-2"
                      type="radio"
                      value=""
                      name="disabled-radio2"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    ></input>
                    <label
                      for="disabled-radio-2"
                      class="ms-2 text-sm font-medium text-gray-400"
                    >
                      Trung chuyển
                    </label>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-7 h-7 text-orange-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="my-5">
                  <input
                    type="text"
                    value="Bến Xe Miền Tây"
                    disabled
                    className="border border-slate-300 rounded-xl w-full"
                  />
                </div>
                <div class="flex flex-wrap gap-1 text-justify font-[420] text-[15px] leading-6">
                  <span>
                    Quý khách vui lòng có mặt tại Bến xe/Văn Phòng{" "}
                    <span className="font-bold">BX Miền Tây</span>
                    <span className="font-bold text-orange-500">
                      {" "}
                      Trước 19:15 04/05/2024
                    </span>{" "}
                    để được trung chuyển hoặc kiểm tra thông tin trước khi lên
                    xe.
                  </span>
                </div>
              </div>
              <div className="basis-1/2 w-full">
                <h4 className="text-medium font-[500] mb-5">ĐIỂM TRẢ</h4>
                <div className="flex flex-row items-center gap-x-5">
                  <div>
                    <input
                      disabled
                      checked
                      id="disabled-radio-3"
                      type="radio"
                      value=""
                      name="disabled-radio-3"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    ></input>
                    <label
                      for="disabled-radio-3"
                      class="ms-2 text-sm font-medium text-blue-500 "
                    >
                      Điểm đón
                    </label>
                  </div>
                  <div>
                    {" "}
                    <input
                      disabled
                      id="disabled-radio-4"
                      type="radio"
                      value=""
                      name="disabled-radio-4"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    ></input>
                    <label
                      for="disabled-radio-4"
                      class="ms-2 text-sm font-medium text-gray-400"
                    >
                      Trung chuyển
                    </label>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-7 h-7 text-orange-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="my-5">
                  <input
                    type="text"
                    value="Vũng Tàu"
                    disabled
                    className="border border-slate-300 rounded-xl w-full"
                  />
                </div>
              </div>
            </div>
            <div className="payment-section"></div>
          </div>
          <div className="payment-section bg-white border border-slate-200 p-5 rounded-b-xl flex items-center">
            <div class="flex flex-col">
              <span class="w-16 rounded-xl bg-[#00613D] py-1 text-center text-xs text-white">
                FUTAPAY
              </span>
              <span class="mt-2 text-2xl font-medium text-black">0đ</span>
            </div>
            <div class="flex flex-auto items-center justify-end">
              <button
                type="button"
                className="px-10 py-2 border border-slate-200 text-blue-600 rounded-full mr-6 hover:bg-blue-600 hover:text-white transition-all"
              >
                <span className="text-sm font-medium">Hủy</span>
              </button>
              <button
                type="button"
                class="px-5 py-2 text-white rounded-full mr-6 bg-orange-500 hover:bg-orange-600 transition-all"
              >
                <span className="text-sm font-medium">Thanh toán</span>
              </button>
            </div>
          </div>
        </div>
        <div className="basis-1/3 w-full flex flex-col gap-y-5">
          <div className="bg-white border border-slate-200 p-5 rounded-xl">
            <h3 className="text-xl font-medium">Thông tin lượt đi</h3>
            <div class="mt-4 flex justify-between">
              <span class="text-slate-500">Tuyến xe</span>
              <span class="text-right font-medium">
                BX Mien Tay - Quan 1 - Vung Tau
              </span>
            </div>
            <div class="mt-1 flex items-center justify-between">
              <span class="text-slate-500">Thời gian xuất bến</span>
              <span class="text-green-600 font-medium">05:30 05-05-2024</span>
            </div>
            <div class="mt-1 flex items-center justify-between">
              <span class="text-slate-500">Số lượng ghế</span>
              <span class="font-semibold">0 Ghế</span>
            </div>
            <div class="mt-1 flex items-center justify-between">
              <span class="text-slate-500">Số ghế</span>
              <span class="text-green-600 font-medium"></span>
            </div>
            <div class="mt-1 flex items-center justify-between">
              <span class="text-slate-500">Tổng tiền lượt đi</span>
              <span class="text-green-600 font-medium">0đ</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl">
            <div className="flex flex-row items-center gap-x-3">
              {" "}
              <h3 className="text-xl font-medium">Chi tiết giá</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-7 h-7 text-orange-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <span class="text-slate-500">Giá vé lượt đi</span>
              <span class="text-orange-600 font-medium">0đ</span>
            </div>
            <div class="mt-1 flex items-center justify-between">
              <span class="text-slate-500">Phí thanh toán</span>
              <span class="font-medium">0đ</span>
            </div>
            <hr className="my-3" />
            <div class="flex items-center justify-between">
              <span class="text-slate-500">Tổng tiền</span>
              <span class="text-orange-600 font-medium">0đ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingTicketForm;
