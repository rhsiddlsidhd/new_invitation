import { Card } from "@/components/atoms/Card/Card";
import { PremiumFeature } from "@/services/premiumFeature.service";
import clsx from "clsx";
import { Check, Palette, Type, Settings, FileText } from "lucide-react";

interface TemplateFeaturesProps {
  options: PremiumFeature[];
}

export function TemplateFeatures({ options }: TemplateFeaturesProps) {
  const icons = [Check, Palette, Type, Settings];

  return (
    <div className="mb-16 space-y-12">
      {/* Features List */}
      <div className={clsx(options.length === 0 && "hidden")}>
        <h2 className="text-foreground mb-6 text-3xl font-bold">주요 옵션</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {options.map((feature, index) => {
            let Icon;
            if (feature.label.includes("PDF")) {
              Icon = FileText;
            } else {
              Icon = icons[index % icons.length];
            }
            return (
              <Card key={index} className="border-border flex flex-col p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="text-primary h-5 w-5" />
                  </div>
                  <h3 className="text-foreground text-sm font-semibold">
                    {feature.label}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Detailed Features */}
      <div>
        <h2 className="text-foreground mb-6 text-3xl font-bold">상세 정보</h2>
        {/* <div className="grid gap-6 sm:grid-cols-2">
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
        </div> */}
      </div>
    </div>
  );
}
