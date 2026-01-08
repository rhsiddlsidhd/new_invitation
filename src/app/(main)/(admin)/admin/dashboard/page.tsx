import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Package, DollarSign, ShoppingCart, Users } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "총 상품",
      value: "24",
      icon: Package,
      description: "등록된 템플릿 수",
      trend: "+2 이번 달",
    },
    {
      title: "총 매출",
      value: "₩1,234,000",
      icon: DollarSign,
      description: "이번 달 매출",
      trend: "+12.5% 지난 달 대비",
    },
    {
      title: "주문",
      value: "89",
      icon: ShoppingCart,
      description: "이번 달 주문 수",
      trend: "+8 지난 주 대비",
    },
    {
      title: "회원",
      value: "342",
      icon: Users,
      description: "총 회원 수",
      trend: "+23 이번 달",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-muted-foreground">
          모바일 청첩장 관리자 대시보드에 오신 것을 환영합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-foreground mb-1 text-2xl font-bold">
                {stat.value}
              </div>
              <p className="text-muted-foreground mb-1 text-xs">
                {stat.description}
              </p>
              <p className="text-primary text-xs font-medium">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            최근 활동 내역이 여기에 표시됩니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
