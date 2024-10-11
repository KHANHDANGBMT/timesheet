import { Boxes, ChartBarStacked, Home } from "lucide-react";
import { ReactNode, useMemo } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

export const useNav = (props: { isAdmin?: boolean }) => {
  const { isAdmin = false } = props;

  const navList: NavItem[] = useMemo(() => {
    const defaultNav = [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <Home className="h-5 w-5" />,
      },
      {
        label: "Time sheet",
        href: "/time-sheet",
        icon: <ChartBarStacked className="h-5 w-5" />,
      },
    ];
    const adminNav = [
      {
        label: "Groups",
        href: "/groups",
        icon: <Boxes className="h-5 w-5" />,
      },
    ];
    const result: NavItem[] = [...defaultNav];

    if (isAdmin) {
      result.push(...adminNav);
    }

    return result;
  }, [isAdmin]);

  return { navList };
};
