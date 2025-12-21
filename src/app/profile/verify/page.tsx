import VerifyForm from "../../../components/organisms/forms/VerifyForm";

const Page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ next: string }>;
}) => {
  // const token = await getAuthToken();
  // const result = await decrypt({ token, type: 'REFRESH' });
  // if (!result.payload) {
  //   redirect("/");
  // }
  // const query = await searchParams;

  // if (!query) {
  //   redirect("/");
  // }

  // return <VerifyForm path={query.next} />;
  return <div>verify</div>;
};

export default Page;
