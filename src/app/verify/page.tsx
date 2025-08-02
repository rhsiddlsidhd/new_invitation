import VerifyForm from "../../components/VerifyForm";

const page = async (props: { searchParams: Promise<{ next: string }> }) => {
  const { searchParams } = await props;

  const resolvedSearchParams = await searchParams;

  return <VerifyForm path={resolvedSearchParams.next} />;
};

export default page;
