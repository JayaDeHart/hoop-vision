import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import { FaBasketball } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { signOut } from "next-auth/react";
import SignOut from "./signout";

type Props = {};

function TopNav({}: Props) {
  return (
    <NavigationMenu className="w-full justify-start bg-gray-200 p-4">
      <NavigationMenuList className="flex gap-4">
        <NavigationMenuItem>
          <h2 className="flex items-center gap-4 font-bold">
            Hoop Vision <FaBasketball size={30} />
          </h2>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/profile" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Profile
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-auto">
          <SignOut />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default TopNav;
