import { RelatedTemplates } from "@/components/template/RelatedTemplates";
import { TemplateDetail } from "@/components/template/TemplateDetail";
import { TemplateFeatures } from "@/components/template/TemplateFeatures";
import React from "react";

const templateData = {
  id: 1,
  name: "로즈 가든",
  price: 29000,
  thumbnail: "/elegant-wedding-invitation-with-roses.jpg",
  category: "로맨틱",
  featured: true,
  description:
    "우아한 장미 모티브로 디자인된 로맨틱한 청첩장입니다. 사랑스러운 색감과 섬세한 디테일로 특별한 날을 더욱 빛나게 만들어줍니다.",
  features: [
    "반응형 모바일 디자인",
    "구글 지도 통합",
    "갤러리 기능",
    "방명록 기능",
    "카카오톡 공유",
    "RSVP 기능",
    "무제한 수정",
    "평생 호스팅",
  ],
  details: [
    {
      title: "디자인 스타일",
      content: "로맨틱한 장미 테마로 우아하고 감성적인 분위기를 연출합니다.",
    },
    {
      title: "색상 구성",
      content:
        "부드러운 핑크와 로즈 골드 조합으로 따뜻하고 사랑스러운 느낌을 표현합니다.",
    },
    {
      title: "타이포그래피",
      content:
        "세련된 한글 서체와 영문 서체의 조화로 가독성과 아름다움을 동시에 갖췄습니다.",
    },
    {
      title: "맞춤 설정",
      content:
        "텍스트, 이미지, 색상 등 모든 요소를 자유롭게 수정할 수 있습니다.",
    },
  ],
};

export default function TemplateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* Template Detail Section */}
          <TemplateDetail template={templateData} />

          {/* Features Section */}
          <TemplateFeatures
            features={templateData.features}
            details={templateData.details}
          />

          {/* Related Templates */}
          <RelatedTemplates currentTemplateId={templateData.id} />
        </div>
      </div>
    </main>
  );
}
