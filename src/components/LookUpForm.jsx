import React from "react";

function LookUpForm(props) {
  return (
    <div className="lookupform my-10 mx-auto flex-1 w-[80%] md:w-[50%] xl:w-[30%]">
      <h1 className="text-green-700 text-2xl text-center font-bold mb-5">
        TRA CỨU THÔNG TIN ĐẶT VÉ
      </h1>
      <hr class="w-4/5 mx-auto h-0.5 bg-gray-200 md:w-2/5" />
      <form action="" className="flex flex-col gap-y-8 p-5 mx-auto mt-5">
        <input
          type="text"
          className="border border-slate-400 rounded-xl"
          placeholder="Vui lòng nhập số điện thoại"
        />
        <input
          type="text"
          className="border border-slate-400 rounded-xl"
          placeholder="Vui lòng nhập mã vé"
        />
        <button className="font-semibold text-white hover:bg-red-600 transition-all mx-auto border border-transparent bg-red-500 px-10 py-3 rounded-full">
          Tra cứu vé
        </button>
      </form>
    </div>
  );
}

export default LookUpForm;
