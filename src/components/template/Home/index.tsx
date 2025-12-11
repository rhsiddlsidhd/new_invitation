import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BoltIcon,
  CheckCircleIcon,
  DevicePhoneMobileIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { PRODUCT_LIST } from "@/constant";

const highlights = [
  {
    title: "15분 완성 에디터",
    description:
      "필요한 정보만 입력하면 실시간 미리보기로 즉시 확인할 수 있어요.",
    icon: SparklesIcon,
  },
  {
    title: "모바일 맞춤 디자인",
    description:
      "세로형 인터랙션과 고해상도 이미지를 최적화해 선명한 경험을 전해요.",
    icon: DevicePhoneMobileIcon,
  },
  {
    title: "발송/응답 추적",
    description:
      "초대장을 보낸 뒤 열람 여부, 방명록, 참석 의사를 한곳에서 관리합니다.",
    icon: BoltIcon,
  },
];

const steps = [
  {
    title: "기본 정보 입력",
    description:
      "웨딩 일정, 장소, 연락처 등 꼭 필요한 항목만 깔끔하게 수집합니다.",
  },
  {
    title: "디자인 선택",
    description:
      "컬러 팔레트와 글꼴을 고르고 이미지 업로드만 하면 초안이 완성돼요.",
  },
  {
    title: "미리보기 & 공유",
    description:
      "QR·카카오·SMS 링크를 한 번에 생성해 누구나 모바일로 열람할 수 있어요.",
  },
];

const testimonials = [
  {
    name: "수진 & 현우",
    role: "5월 예식",
    quote:
      "초대장 제작에 쓸 시간을 절약할 수 있었고, 하객 응답도 한눈에 정리돼서 준비가 정말 수월했어요.",
  },
  {
    name: "민재",
    role: "웨딩 플래너",
    quote:
      "브랜드 무드에 맞춘 디자인이 가능해 여러 커플에게 추천하고 있습니다. 모바일 경험이 특히 우수해요.",
  },
];

const faqs = [
  {
    question: "초대장을 실제로 배포하기 전에 테스트가 가능한가요?",
    answer:
      "네. 미리보기 링크를 통해 모든 인터랙션과 애니메이션을 확인한 뒤, 공유용 URL을 발급할 수 있습니다.",
  },
  {
    question: "이미지를 꼭 준비해야 하나요?",
    answer:
      "샘플 이미지가 기본 제공되며, 나중에 원하는 사진으로 언제든 교체할 수 있습니다.",
  },
  {
    question: "제작 후에도 내용을 수정할 수 있나요?",
    answer:
      "대시보드에서 실시간으로 텍스트, 계좌 정보, 지도 등 모든 요소를 다시 편집할 수 있습니다.",
  },
];

const statBadges = [
  { label: "완성까지 평균", value: "12분" },
  { label: "실제 배포 링크", value: "4.3만+" },
  { label: "하객 만족도", value: "4.9 / 5.0" },
];

export default function Home() {
  const templates = PRODUCT_LIST.slice(0, 4);

  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,186,186,0.18),_transparent_55%)]" />
      <section className="px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm tracking-wide text-white/80">
                <SparklesIcon className="h-4 w-4" />
                모바일 청첩장 제작 · 배포 · 관리
              </p>
              <div>
                <h1 className="text-4xl leading-tight font-semibold text-white sm:text-5xl">
                  결혼 소식을 스마트하게 전하는
                  <br />
                  모바일 청첩장 배포 서비스
                </h1>
                <p className="mt-6 text-base text-white/70 sm:text-lg">
                  커플의 스토리를 담은 디자인, 직관적인 편집기, 발송/응답
                  데이터까지 한 번에 제공해 웨딩 준비 시간을 아껴드립니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/preview/mobile-invitation/akwmrlawz"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  라이브 샘플 보기
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:text-white"
                >
                  템플릿 살펴보기
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {statBadges.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-[136px] flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  >
                    <p className="text-xs tracking-widest text-white/60 uppercase">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[360px] rounded-[36px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 sm:h-[420px]">
              <div className="absolute -top-6 left-8 hidden h-12 w-12 rounded-2xl border border-white/20 bg-black/40 backdrop-blur lg:block" />
              <div className="relative h-full rounded-[28px] bg-black/40 p-4">
                <div className="h-full rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className="relative h-full overflow-hidden rounded-[20px] border border-white/20 bg-black">
                    <Image
                      src="/wedding-1850.jpg"
                      alt="모바일 청첩장 미리보기"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                    <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-sm text-white/80">
                        한결 & 예린 · 2025.06.21
                      </p>
                      <p className="text-lg font-semibold">
                        모바일 초대장 예시
                      </p>
                      <p className="text-sm text-white/70">
                        날씨 알림 · 지도 · 계좌 안내 · 방명록 등을 모바일 한
                        화면에서.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="space-y-3 rounded-2xl border border-white/5 bg-black/30 p-6"
            >
              <item.icon className="h-8 w-8 text-white" />
              <p className="text-xl font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/70">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 pb-10 text-center">
            <p className="text-sm tracking-[0.4em] text-white/60 uppercase">
              Templates
            </p>
            <h2 className="text-3xl font-semibold">
              분위기에 맞는 템플릿을 선택하세요
            </h2>
            <p className="text-base text-white/70">
              컬러와 글꼴, 인터랙션을 자유롭게 조합하고 공개 전 미리보기로
              꼼꼼히 확인할 수 있습니다.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-1 hover:bg-white/[0.05]"
              >
                <div className="relative h-64 overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <Image
                    src={`/${template.thumbnail}.webp`}
                    alt={`${template.title} 템플릿`}
                    fill
                    className="object-cover object-center transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 pt-4">
                  <p className="text-lg font-semibold">{template.title}</p>
                  <p className="text-sm text-white/70">
                    {template.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-sm text-white/60">
                    <span>₩ {Number(template.price).toLocaleString()}</span>
                    <Link
                      href={`/preview/${template.category}/${template.id}`}
                      className="inline-flex items-center gap-1 text-white transition hover:text-white/70"
                    >
                      미리보기
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 lg:flex-row">
          <div className="flex-1 space-y-4">
            <p className="text-sm tracking-[0.4em] text-white/60 uppercase">
              Workflow
            </p>
            <h2 className="text-3xl font-semibold">모바일 청첩장 제작 과정</h2>
            <p className="text-white/70">
              대시보드에서 단계별로 안내해 처음 만드는 분도 막힘없이 편집할 수
              있도록 설계했습니다.
            </p>
          </div>
          <div className="flex-1 space-y-6">
            {steps.map((step, idx) => (
              <div
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-black/40 p-5"
                key={step.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                  0{idx + 1}
                </div>
                <div>
                  <p className="text-lg font-semibold">{step.title}</p>
                  <p className="text-sm text-white/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-8">
              <p className="text-sm tracking-[0.4em] text-white/60 uppercase">
                Testimonials
              </p>
              <h2 className="text-3xl font-semibold">
                하객과 플래너가 먼저 경험한 서비스
              </h2>
              <p className="text-white/70">
                방명록, 계좌 안내, 오시는 길을 모바일 한 곳에 담아 전달하니
                응답률이 크게 높아졌어요.
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                {["무제한 수정", "실시간 데이터", "카카오 · SMS 공유"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-white" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                대시보드 살펴보기
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-3xl border border-white/10 bg-black/50 p-6"
                >
                  <p className="text-sm text-white/70">“{item.quote}”</p>
                  <p className="mt-4 text-base font-semibold">{item.name}</p>
                  <p className="text-xs tracking-[0.3em] text-white/60 uppercase">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl space-y-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <div className="text-center">
            <p className="text-sm tracking-[0.4em] text-white/60 uppercase">
              FAQ
            </p>
            <h2 className="mt-2 text-3xl font-semibold">자주 묻는 질문</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-white/10 bg-black/40 p-5 transition open:bg-black/60"
              >
                <summary className="cursor-pointer text-lg font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-white/70">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/15 to-white/5 p-6 text-center">
            <p className="text-lg font-semibold text-white">
              당신만의 모바일 청첩장을 지금 만들어보세요
            </p>
            <p className="mt-2 text-sm text-white/70">
              무료 템플릿으로 시작하고, 필요한 기능만 선택해 비용을 절약하세요.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/products/mobile-invitation/akwmrlawz"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                무료 템플릿 시작하기
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:border-white"
              >
                내 정보로 미리 채워보기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
