import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
import HeaderTitle from "./HeaderTitle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const [closeSidebar, setCloseSidebar] = useState(false);
  const router = useNavigate();
  return (
    <Layout className="w-full overflow-auto flex flex-row">
      <div className="max-w-[200px] border-r-[1px] border-gray-200">
        <div className={`${closeSidebar && "hidden"} h-full w-full`}>
          <Sidebar />
        </div>
      </div>
      <div className="w-full">
        <Header
          style={{
            background: "#FFFFFF",
            color: "#000000",
          }}
          className="w-full p-0 md:px-5 shadow-sm flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <HiBars3
              onClick={() => setCloseSidebar(!closeSidebar)}
              className="w-7 h-7 cursor-pointer"
            />
            <HeaderTitle />
          </div>
          <Button
            onClick={() => router("/chain-of-command")}
            className="nav-btn"
          >
            Hierarchy
          </Button>
        </Header>
        <Content
          className="p-0 py-2 md:px-5 w-full"
          style={{
            marginTop: "15px",
            minHeight: 280,
            background: "#FFFFFF",
          }}
        >
          {children}
        </Content>
      </div>
    </Layout>
  );
};

export default MainLayout;
