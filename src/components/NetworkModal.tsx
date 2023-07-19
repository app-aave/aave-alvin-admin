import { useState } from "react";
import { Button, Card, Modal, Spin, Typography, message, theme } from "antd";

import { useConnect, useDisconnect } from "wagmi";
import { LoadingOutlined } from "@ant-design/icons";
import { useWeb3React } from "../hooks/useWeb3React";
import { useGetNativeCurrencyBalance } from "../hooks/useTokenBalance";
import { formatUnits } from "viem";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { formatNumber } from "../utils/formatValue";
// import Ethereum from "../../assets/SVG/Ethereum";
const ConnectWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const [messageApi, contextHolder] = message.useMessage();
  const { isConnected } = useWeb3React();
  const { connectors, connectAsync, isLoading, pendingConnector } =
    useConnect();
  const { disconnectAsync } = useDisconnect();
  const { account } = useWeb3React();
  const colorPrimary = "#fff";
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const wallet = [
    {
      id: "metaMask",
      title: "Metamask",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png",
    },
  ];
  const getWalletUsingId = (walletId: string) => {
    const value = wallet.find((item) => item.id === walletId);
    return value ? value : null;
  };
  const { balance, symbol } = useGetNativeCurrencyBalance();

  return (
    <>
      {contextHolder}

      {!isConnected ? (
        <Button type="primary" className="bg-green-500" onClick={showModal}>
          Connect Wallet
        </Button>
      ) : (
        <Button
          type="default"
          shape="round"
          size="large"
          style={{
            alignItems: "center",
            display: "flex",
          }}
          icon={<RiMoneyDollarCircleFill size={22} color={"#faad14"} />}
          onClick={() => {
            disconnectAsync()
              .then(() => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                messageApi.open({
                  type: "success",
                  content: "Wallet has disconnected",
                });
              })
              .catch((error: any) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                messageApi.open({
                  type: "error",
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                  content: error?.message,
                });
              });
          }}
        >
          <div className="text-xs flex flex-col items-end">
            <span style={{ color: colorPrimary }} className="font-semibold">
              {account?.slice(0, 7)}...
            </span>
            <span className="font-bold text-white">
              {formatNumber(Number(formatUnits(balance, 18))) + " " + symbol}
            </span>
          </div>
        </Button>
      )}

      <Modal
        title="Connect to a wallet"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="grid grid-cols-3 gap-3">
          {connectors.map(
            (connector, index) =>
              getWalletUsingId(connector?.id)?.icon && (
                <Card
                  style={{
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  hoverable
                  key={index}
                  onClick={() =>
                    connectAsync({ connector })
                      .then(() => {
                        handleCancel();
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                        messageApi.open({
                          type: "success",
                          content: "Wallet connected successfully",
                        });
                      })
                      .catch((error) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                        messageApi.open({
                          type: "error",
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                          content: error.cause.message,
                        });
                      })
                  }
                >
                  {connector.id === pendingConnector?.id && isLoading ? (
                    <Spin
                      indicator={
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      }
                    />
                  ) : (
                    <div className="flex justify-center flex-col  items-center">
                      <div className="w-[32px]">
                        <img src={getWalletUsingId(connector?.id)?.icon} />
                      </div>
                      <Typography.Text strong style={{ fontSize: "12px" }}>
                        {connector?.name}
                      </Typography.Text>
                    </div>
                  )}
                </Card>
              )
          )}
        </div>
      </Modal>
    </>
  );
};

export default ConnectWallet;
