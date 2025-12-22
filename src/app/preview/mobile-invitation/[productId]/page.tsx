// export const generateStaticParams = () => {
//   const productList = PRODUCT_LIST.map((item) => ({ productId: item.id }));
//   return productList;
// };

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ u: string | null }>;
}) => {
  // const { productId } = await params;
  // const { u } = await searchParams;

  // if (!u) {
  //   // 리다이렉를 notfound로 바꾸기
  //   redirect("/");
  // }
  // const [userInfo, guestBook] = await Promise.all([
  //   getUserInvitationInfo({ userId: u }),
  //   getUserGuestBook({ userId: u }),
  // ]);

  // if (!userInfo) {
  //   redirect("/dashboard");
  // }

  // const guestBookForClient = (guestBook ?? []).map((item) => ({
  //   ...item,
  //   _id: item._id.toString(),
  // }));

  return (
    <div>Preview</div>
    // <Suspense
    //   fallback={
    //     <div className="flex h-screen w-full items-center justify-center">
    //       <Spinner />
    //     </div>
    //   }
    // >
    //   <InvitationContainer
    //     productId={productId}
    //     userInfo={userInfo}
    //     guestBook={guestBookForClient}
    //   />
    // </Suspense>
  );
};

export default Page;
