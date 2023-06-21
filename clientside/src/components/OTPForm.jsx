import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useBoundStore } from "../store";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  OTPFirstDigit: yup.number().min(0).max(9).required(),
  OTPSecondDigit: yup.number().min(0).max(9).required(),
  OTPThirdDigit: yup.number().min(0).max(9).required(),
  OTPFourthDigit: yup.number().min(0).max(9).required(),
});

const OTPFORM = ({modalClose,setModalOpen}) => {
    
    const forgetPasswordResponse = useBoundStore(
        (store) => store.forgetPasswordResponse
      );
      const forgetPasswordReset = useBoundStore(
        (store) => store.forgetPasswordReset
      );
      const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

  //   useEffect(()=>{
  //     console.log(forgetPasswordResponse.OTP);
  //     console.log(OTP);
  //     forgetPasswordResponse.OTP===OTP?navigate("/resetpassword"):alert('invalid otp')
  //   forgetPasswordReset()
  //   },[forgetPasswordResponse,OTP])

      const onSubmitHandler = (data) => {
        console.log(data);
        const{OTPFirstDigit,OTPSecondDigit,OTPThirdDigit,OTPFourthDigit}=data
        const otp=`${OTPFirstDigit}${OTPSecondDigit}${OTPThirdDigit}${OTPFourthDigit}`
        
        if(forgetPasswordResponse.OTP===otp)
        {sessionStorage.setItem("OTP","SET");navigate("/resetpassword");forgetPasswordReset()}
        else{alert('invalid otp')
      forgetPasswordReset()}
      };
  return (
    <>
      <div id="modal-body"   onClick={(e) => e.target.id === "modal-body" } className="fixed z-10 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.5)]" >
        {/* <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl"> */}
          <div className="w-[28rem] bg-white rounded-md px-6 py-8">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {forgetPasswordResponse.email}</p> 
          </div>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="flex flex-col space-y-16 mt-2">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input
                        {...register("OTPFirstDigit")}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="numeric"
                        // name="OTP1"
                        // id="OTP1"
                        maxLength={1}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        {...register("OTPSecondDigit")}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="numeric"
                        // name="OTP2"
                        // id="OTP2"
                        maxLength={1}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        {...register("OTPThirdDigit")}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="numeric"
                        // name="OTP3"
                        // id="OTP3"
                        maxLength={1}
                      />
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        {...register("OTPFourthDigit")}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="numeric"
                        // name="OTP4"
                        // id="OTP4"

                        maxLength={1}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        type="submit"
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code? </p>
                      <a
                        className="flex flex-row items-center text-blue-600 cursor-pointer"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={()=>{modalClose();setModalOpen()}}
                      >
                        Go Back 
                      </a>
                      <p> and try again</p>
                    </div>
                  </div>
                </div>
              </form>
              <p className="text-red-500">{errors.OTPFirstDigit?.message}</p>
              <p className="text-red-500">{errors.OTPSecondDigit?.message}</p>
              <p className="text-red-500">{errors.OTPThirdDigit?.message}</p>
              <p className="text-red-500">{errors.OTPFourthDigit?.message}</p>
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default OTPFORM;



