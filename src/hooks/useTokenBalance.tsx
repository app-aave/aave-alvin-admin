import { useMemo } from "react";
import { Address, useAccount, useBalance, useToken } from "wagmi";
import useActiveChain from "./useActiveChain";

function useTokenBalance() {
  return <div>useTokenBalance</div>;
}

function useGetNativeCurrencyBalance() {
  const { address: account } = useAccount();

  const { chainId } = useActiveChain();
  const { status, refetch, data } = useBalance({
    chainId,
    address: account,
    watch: true,
    enabled: !!account,
  });

  console.log(data, chainId);
  return useMemo(() => {
    return {
      balance: data?.value ? BigInt(data.value) : BigInt(0),
      fetchStatus: status,
      refresh: refetch,
      symbol: data?.symbol ?? "",
    };
  }, [data]);
}

function useTokenInfo(address: Address) {
  const { data } = useToken({
    address: address,
  });

  return useMemo(() => {
    return {
      name: data?.name,
      decimals: data?.decimals,
      symbol: data?.symbol,
    };
  }, [data]);
}
export default useTokenBalance;
export { useGetNativeCurrencyBalance, useTokenInfo };
