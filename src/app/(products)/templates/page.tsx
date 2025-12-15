import TemplateCatalog from "@/components/organisms/(template)/TemplateCatalog";

export default function TemplatesPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* <Header /> */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="text-foreground mb-4 text-4xl font-bold text-balance md:text-5xl">
              청첩장 템플릿
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg text-balance">
              당신의 스타일에 맞는 완벽한 템플릿을 찾아보세요
            </p>
          </div>
          <TemplateCatalog />
        </div>
      </div>
    </main>
  );
}
