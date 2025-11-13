import { motion } from "framer-motion";
interface TabProps {
  tabs: string[];
  activeTab: string;
  SetActiveTab: (tab:string)=>void;
}
function Tab({ tabs, activeTab, SetActiveTab }: TabProps) {
  return (
    <ul className="flex items-center gap-2">
      {tabs.map((tab, idx) => {
        const active = activeTab.toLowerCase() === tab.toLowerCase();
        return (
          <li
            className={`px-4 min-w-18 text-center cursor-pointer py-2 rounded-full relative transition-colors duration-300 ease-in-out delay-150 ${
              active ? "text-white " : "text-gray-100 hover:bg-blue-200"
            } capitalize`}
            key={tab + idx}
            role="tab"
            onClick={() => SetActiveTab(tab)}
          >
            <span className="relative z-20">{tab}</span>
            {active && (
              <motion.div
                className="absolute inset-0 bg-blue-300 rounded-full"
                layout="preserve-aspect"
                layoutId="active-tab"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Tab;
