import sterticon from "../assets/icons/darkMode.svg";
import form from "../assets/icons/form.svg";
import setting from "../assets/icons/setting.svg";
import support from "../assets/icons/support.svg";
import support2 from "../assets/icons/support2.svg";
import start from "../assets/icons/start.svg";
import chat from "../assets/icons/chat.svg";
import equipment from "../assets/icons/equipment.svg";
import credit from "../assets/icons/credit.svg";
import dashboard from "../assets/icons/dashboard.svg";

export const links = [
  {
    name: "Getting Started",
    path: "/getting-started/setup",
    icon: start,
    subLinks: [
      { name: "Setup your Factory", path: "/getting-started/setup" },
      { name: "Documentation", path: "/getting-started/documentation" },
    ],
  },
  {
    name: "Dashboard",
    path: "/dashboard/factory",
    icon: dashboard,
    subLinks: [
      { name: "Factory", path: "/dashboard/factory" },
      { name: "chemicals", path: "/dashboard/chemicals" },
    ],
  },
  {
    name: "Equipment",
    path: "/equipment/machines",
    icon: equipment,
    subLinks: [
      { name: "Lifting machines", path: "/equipment/machines" },
      { name: "Lifting accessories", path: "/equipment/accessories" },
    ],
  },
  {
    name: "Forms",
    path: "/forms/factory",
    icon: form,
    subLinks: [
      { name: "Factory Froms", path: "/forms/factory" },
      { name: "Subcontractor Forms", path: "/forms/subcontractor-form" },
    ],
  },
  {
    name: "Chat",
    path: "/chat",
    icon: chat,
  },
  // Add more main links here
];

export const buttomLinks = [
  { name: "Billing", path: "/Billing", icon: credit },
  { name: "setting", path: "/setting", icon: setting },
  { name: "Support", path: "/Support", icon: support2 },
  { name: "Contact Sales", path: "/Contact", icon: support },
];
