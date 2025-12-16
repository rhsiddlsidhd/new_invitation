import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Palette, Type, Settings } from "lucide-react";

interface TemplateFeaturesProps {
  features: string[];
  details: Array<{
    title: string;
    content: string;
  }>;
}

export function TemplateFeatures({ features, details }: TemplateFeaturesProps) {
  const icons = [Palette, Type, Settings, Settings];

  return (
    <div className="mb-16 space-y-12">
      {/* Features List */}
      <div>
        <h2 className="text-foreground mb-6 text-3xl font-bold">주요 기능</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-border">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="bg-primary/10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                  <Check className="text-primary h-3 w-3" />
                </div>
                <span className="text-foreground text-sm">{feature}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detailed Features */}
      <div>
        <h2 className="text-foreground mb-6 text-3xl font-bold">상세 정보</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <Icon className="text-primary h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{detail.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-balance">
                    {detail.content}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
