import { SignupForm } from "@/components/template/SignupForm";
import Image from "next/image";

export default function SignupPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left side - Image */}
            <div className="relative hidden h-[700px] overflow-hidden rounded-2xl lg:block">
              <Image
                src="/assets/images/output.webp"
                alt="Wedding celebration"
                fill
                className="object-cover"
              />
              <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
              <div className="absolute right-8 bottom-8 left-8">
                <h2 className="mb-2 text-3xl font-bold text-balance text-white">
                  지금 시작하세요
                </h2>
                <p className="text-balance text-white/90">
                  무료로 가입하고 나만의 청첩장을 만들어보세요
                </p>
              </div>
            </div>

            {/* Right side - Signup Form */}
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
