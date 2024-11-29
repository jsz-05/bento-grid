import { useEffect, useRef, useState } from "react";
import { TabKey } from "../App";

export interface NavbarProps {
  tab: TabKey;
  setTab: React.Dispatch<React.SetStateAction<TabKey>>;
  left: number;
  sliderWidth: number;
}

const Navbar: React.FC<NavbarProps> = ({ tab, setTab }) => {
  const tabs = [
    { key: TabKey.About, label: "About" },
    { key: TabKey.Projects, label: "Projects" },
    { key: TabKey.Contact, label: "Contact" },
  ];

  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<HTMLDivElement[]>([]); // Array of refs for each tab

  const updateSliderStyle = () => {
    const activeTabIndex = tabs.findIndex((t) => t.key === tab);
    const activeTabRef = tabRefs.current[activeTabIndex];

    if (activeTabRef) {
      const { offsetLeft, offsetWidth } = activeTabRef;
      setSliderStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateSliderStyle); // Add resize listener
    return () => {
      window.removeEventListener("resize", updateSliderStyle); // Clean up listener
    };
  }, [tab]); // Recalculate whenever the active tab changes

  useEffect(() => {
    updateSliderStyle(); // Initial slider style update
  }, [tab]);

  return (
    <div
      className="text-white mx-auto top-0 z-[10000] backdrop-saturate-180 w-full pt-2"
      style={{
        marginTop: "30px",
        marginBottom: "30px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <div className="bg-black bg-opacity-80 max-w-[500px] w-full m-auto rounded-full text-1.8rem border border-black p-[8px]">
        <div className="flex rounded-full p-2 justify-between items-center text-white mx-auto relative">

          {/* Tabs */}
          {tabs.map(({ key, label }, index) => (
            <div
              key={key}
              ref={(el) => (tabRefs.current[index] = el!)}
              className={`flex items-center h-8 flex-1 cursor-pointer justify-center ${
                tab === key ? "text-white" : "text-white"
              }`}
              onClick={() => setTab(key)}
              style={{ zIndex: 30 }}
            >
              <span className="text-lg hover:text-cyan-500 transition-colors duration-300">
                {label}
              </span>
            </div>
          ))}

          {/* Sliding highlight div */}
          <div
            className="absolute h-10 bg-[#505050]/40 border-0 border-[#FFFFFF] rounded-full z-20"
            style={{
              left: `${sliderStyle.left}px`,
              width: `${sliderStyle.width}px`,
              transition:
                "left 0.38s cubic-bezier(0.4, 0, 0.2, 1), width 0.38s",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
