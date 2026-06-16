import GridBackground from "../components/common/GridBackground";
import GlowBackground from "../components/common/GlowBackground";

const MainLayout = ({ children }) => {
  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      <GridBackground />
      <GlowBackground />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MainLayout;