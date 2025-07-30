import VerifyForm from "../_components/VerifyForm";

const page = async (props: { searchParams: Promise<{ next: string }> }) => {
  const { searchParams } = await props;

  const resolvedSearchParams = await searchParams;

  console.log("Verify page searchParams:", resolvedSearchParams.next);

  return <VerifyForm path={resolvedSearchParams.next} />;
};

export default page;
