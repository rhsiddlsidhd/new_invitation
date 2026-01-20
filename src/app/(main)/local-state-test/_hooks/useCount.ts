import useCountStore from "../_store/useCountStore";

const useGlobalCount = () => {
  const { count, increment } = useCountStore();
  return { count, increment };
};

export default useGlobalCount;
