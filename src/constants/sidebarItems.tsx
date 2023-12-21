import { Image } from "react-native";

export const SidebarItems = [
  {
    name: "Home",
    route: "/home",
    icon_web: (
      <Image
        source={require("../../assets/home_1.svg")}
        style={{ width: 19, height: 17 }}
      />
    ),
  },
  {
    name: "Course",
    route: "/home",
    icon_web: (
      <Image
        source={require("../../assets/bookmark_1.svg")}
        style={{ width: 12, height: 15 }}
      />
    ),
  },
  {
    name: "Students",
    route: "/students",
    icon_web: (
      <Image
        source={require("../../assets/graduation-cap_1.svg")}
        style={{ width: 20, height: 16 }}
      />
    ),
  },
  {
    name: "Payment",
    route: "/home",
    icon_web: (
      <Image
        source={require("../../assets/usd-square_1.svg")}
        style={{ width: 15, height: 17 }}
      />
    ),
  },
  {
    name: "Report",
    route: "/home",
    icon_web: (
      <Image
        source={require("../../assets/file-chart-line_1.svg")}
        style={{ width: 13, height: 17 }}
      />
    ),
  },
  {
    name: "Settings",
    route: "/home",
    icon_web: (
      <Image
        source={require("../../assets/sliders-v-square_1.svg")}
        style={{ width: 15, height: 17 }}
      />
    ),
  },
];
