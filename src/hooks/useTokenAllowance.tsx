import { useMemo } from "react";
import { useERC20 } from "./useContract";
import { useContractRead } from "wagmi";
import useActiveChain from "./useActiveChain";

const useTokenAllowance = (
  token: `0x${string}`,
  address1?: any,
  address2?: any
) => {
  const contract = useERC20(token);
  const { chainId } = useActiveChain();
  const { data } = useContractRead({
    address: token,
    abi: contract?.abi,
    functionName: "allowance",
    args: [address1, address2],
    chainId,
  });

  return useMemo(() => {
    return { allowance: data };
  }, []);
};

export default useTokenAllowance;
