import ConnectWallet from "./NetworkModal";

function Header() {
  return (
    <div className="px-5 bg-[#1b2030]">
      <header className="flex justify-between h-[80px] items-center text-white  ">
        <div>Logo</div>
        <div>
          {/* <NetworkModal /> */}
          <ConnectWallet />
        </div>
      </header>
    </div>
  );
}

export default Header;
