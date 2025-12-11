import { ForgotPasswordForm } from "@/components/template/ForgetPasswordForm";

import React from "react";

const ForgotPasswordPage = () => {
  return (
    <ForgotPasswordForm />
    // <main className="bg-background min-h-screen">
    //   <div className="container mx-auto px-4 pt-24 pb-12">
    //     <div className="mx-auto max-w-6xl">
    //       <div className="grid items-center gap-12 lg:grid-cols-2">
    //         {/* Left side - Image */}
    //         <div className="relative hidden h-[500px] overflow-hidden rounded-2xl lg:block">
    //           <Image
    //             src="/assets/images/output.webp"
    //             alt="Wedding celebration"
    //             fill
    //             className="object-cover"
    //           />
    //           <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
    //           <div className="absolute right-8 bottom-8 left-8">
    //             <h2 className="mb-2 text-3xl font-bold text-balance text-white">
    //               비밀번호를 재설정하세요
    //             </h2>
    //             <p className="text-balance text-white/90">
    //               이메일로 재설정 링크를 보내드립니다
    //             </p>
    //           </div>
    //         </div>

    //         {/* Right side - Forgot Password Form */}
    //         <div className="mx-auto w-full max-w-md lg:mx-0">
    //           <ForgotPasswordForm />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
};

export default ForgotPasswordPage;
