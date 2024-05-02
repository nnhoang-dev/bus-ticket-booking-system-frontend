import React from "react";

function LookUpResult({ result }) {
  return (
    <>
      {result.map((data) => (
        <div className="flex flex-col w-[80%] justify-center items-center md:mx-auto gap-y-5 mx-auto">
          <div>
            <img
              src="https://futabus.vn/images/icons/check_success.svg"
              alt="check-success"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Mua vé xe thành công</h3>
          </div>
          <div className="lg:w-[90%] 2xl:w-[80%] border border-slate-300 rounded-xl flex flex-col my-10">
            <div className="bg-gray-100 w-full text-center p-3 rounded-t-xl text-lg font-semibold">
              Thông tin mua vé
            </div>
            <div className="flex flex-row p-5 mb-5">
              <div className="basic-1/2 w-full">
                <div className="flex flex-row">
                  <div className="basis-1/4 text-gray-500 font-medium text-medium mb-2">
                    Họ và tên:
                  </div>
                  <div className="font-semibold">
                    {data.last_name} {data.first_name}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="basis-1/4 text-gray-500 font-medium text-medium mb-2">
                    Số điện thoại:
                  </div>
                  <div className="font-semibold">{data.phone_number}</div>
                </div>
                <div className="flex flex-row">
                  <div className="basis-1/4 text-gray-500 font-medium text-medium mb-2">
                    Email:
                  </div>
                  <div className="font-semibold">{data.email}</div>
                </div>
              </div>
              <div className="basic-1/2 w-full">
                <div className="flex flex-row">
                  <div className="basis-1/4 text-gray-500 font-medium text-medium mb-2">
                    Tổng giá vé:
                  </div>
                  <div className="font-semibold basis-1/4">{data.price}</div>
                  <div className="mx-auto">
                    <span className="bg-orange-500 text-white py-2 px-4 rounded-full cursor-pointer text-sm hover:bg-orange-600 hidden md:flex">
                      Mua lại vé xe
                    </span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="basis-1/4 text-gray-500 font-medium text-medium mb-2">
                    PTTT:
                  </div>
                  <div className="font-semibold">{data.method_pay}</div>
                </div>
                <div className="flex flex-row">
                  <div className="basis-1/4 text-gray-500 font-medium text-medium mb-2">
                    Trạng thái:
                  </div>
                  <div className="font-semibold">{data.status}</div>
                </div>
              </div>
            </div>
            <div className="w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] border border-slate-300 rounded-xl mx-auto flex flex-col mb-5">
              <div className="flex justify-center items-center my-10">
                <img
                  src="https://qrcode-gen.com/images/qrcode-default.png"
                  alt="sample-qr"
                  className="w-[180px]"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-row mb-3">
                  <div className="text-gray-500 font-medium basis-1/2">
                    Mã đặt vé:
                  </div>
                  <div className="basis-1/2 text-end text-green-700 font-semibold">
                    {data.ticket_id}
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="text-gray-500 font-medium basis-1/2">
                    Tuyến xe:
                  </div>
                  <div className="basis-1/2 text-end text-green-700 font-semibold">
                    {data.name}
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="text-gray-500 font-medium basis-1/2">
                    Thời gian đi:
                  </div>
                  <div className="basis-1/2 text-end text-green-700 font-semibold">
                    {data.date} - {data.time}
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="text-gray-500 font-medium basis-1/2">
                    Số ghế:
                  </div>
                  <div className="basis-1/2 text-end text-green-700 font-semibold">
                    {data.seat}
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="text-gray-500 font-medium basis-1/2">
                    Điểm lên xe:
                  </div>
                  <div className="basis-1/2 text-end text-green-700 font-semibold">
                    {data.address1}
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="text-gray-500 font-medium basis-1/2">
                    Điểm xuống xe:
                  </div>
                  <div className="basis-1/2 text-end text-green-700 font-semibold">
                    {data.address2}
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="text-gray-500 font-medium basis-1/2">
                    Giá vé:
                  </div>
                  <div className="basis-1/2 text-end text-green-700 font-semibold">
                    {data.price}
                  </div>
                </div>
                <div className="flex flex-row mb-3">
                  <div className="text-gray-500 font-medium basis-1/2">
                    Biển số xe:
                  </div>
                  <div className="basis-1/2 text-end text-green-700 font-semibold">
                    {data.license}
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-b-xl p-3 text-center text-green-700 font-semibold">
                Mang vé đến văn phòng để đổi vé lên xe trước giờ xuất bến ít
                nhất 60 phút
              </div>
            </div>
            <div className="mx-auto flex flex-row justify-items-center w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] mb-20">
              <div className="basis-1/2">
                <p className="bg-orange-500 w-[95%] text-center text-white rounded-full px-5 py-2 hover:bg-orange-600 cursor-pointer flex flex-row items-center">
                  <div className="basis-1/4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                      />
                    </svg>
                  </div>
                  <div className="basis-3/4">Chia sẻ</div>
                </p>
              </div>
              <div className="basis-1/2">
                <p className="bg-orange-500 w-[95%] text-center text-white rounded-full px-5 py-2 hover:bg-orange-600 cursor-pointer flex flex-row items-center">
                  <div className="basis-1/4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                  </div>
                  <div className="basis-3/4">Tải về</div>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default LookUpResult;
