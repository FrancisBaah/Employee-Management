import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
import HeaderTitle from "./HeaderTitle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const [closeSidebar, setCloseSidebar] = useState(false);
  const [lightOrDark, setLightOrDark] = useState("light");

  const router = useNavigate();
  return (
    <Layout className="w-full h-screen flex flex-row overflow-hidden">
      <div className="max-w-[200px] border-r-[1px] border-gray-200">
        <div className={`${closeSidebar && "hidden"} h-full w-full`}>
          <Sidebar lightOrDark={lightOrDark} setLightOrDark={setLightOrDark} />
        </div>
      </div>
      <div className="w-full">
        <Header
          style={{
            background: "#FFFFFF",
            color: "#000000",
          }}
          className={`${
            lightOrDark === "dark" && "dark-mode"
          } w-full p-0 md:px-5 shadow-sm flex justify-between items-center`}
        >
          <div className="flex items-center gap-2">
            <HiBars3
              onClick={() => setCloseSidebar(!closeSidebar)}
              className="w-7 h-7 cursor-pointer"
            />
            {/* Importing Header Title */}
            <HeaderTitle lightOrDark={lightOrDark} />
          </div>
          <Button
            onClick={() => router("/chain-of-command")}
            className="nav-btn"
          >
            Hierarchy
          </Button>
        </Header>
        <Content
          className="p-0 py-2 md:px-5 w-full h-full"
          style={{
            marginTop: "1px",
            minHeight: 280,
            background: lightOrDark === "dark" ? "#151718" : "#FFFFFF",
          }}
        >
          {children}
        </Content>
      </div>
    </Layout>
  );
};

export default MainLayout;
