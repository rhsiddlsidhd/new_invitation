import Btn from "@/components/atoms/Btn";
import Img from "@/components/atoms/Img";
import DropdownBtn from "@/components/molecules/btns/DropdownBtn";
import PreviewBtn from "@/components/molecules/btns/PreviewBtn";
import { PRODUCT_LIST } from "@/constant";

const Page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;

  const product = PRODUCT_LIST.find((item) => item.id === productId);

  // notfound로던져줘야하고
  if (!product) return <div>상품이 없습니다.</div>;

  return (
    <section className="grid grid-cols-2 gap-4 px-4 pt-4 pb-[48px] max-sm:grid-cols-1 max-sm:pt-[48px] max-sm:pb-4">
      <div className="relative min-h-96 rounded">
        <Img src={`/${product.thumbnail}.webp`} />
      </div>
      <ul className="flex flex-col justify-between gap-2 rounded bg-gray-100 p-4">
        <li>{product.title}</li>
        <li>{product.price}</li>
        <li className="space-y-2">
          {product.options && <DropdownBtn options={product.options.font} />}
          <PreviewBtn
            category={product.category}
            color={product.options.backgroundColor}
          />
          <Btn className="w-full">주문하기</Btn>
        </li>
      </ul>
      <div className="col-span-2 w-full p-4 max-sm:col-span-1">
        <h2>상품설명</h2>
        <p className="bg-gray-100 p-2">{product.description}</p>
      </div>
    </section>
  );
};

export default Page;
