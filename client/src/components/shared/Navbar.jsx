import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function Navbar() {
  return (
    <nav className="border-b font-primary">
      <div className="flex h-16 items-center justify-between px-2 sm:px-8 lg:px-16">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <div className="mr-4 md:mr-6">
          <Logo />
        </div>
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <DesktopNav />
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <div className="hidden sm:flex">
            <ModeToggle />
          </div>
          <div className="flex gap-x-2 items-center">
            <div className="space-x-2 max-sm:hidden">
              <Link to="/login">
                <Button variant="ghost" className=" md:inline-flex border">
                  Login
                </Button>
              </Link>
              <Link to="signup">
                <Button className="">Sign up</Button>
              </Link>
            </div>
            <Avatar />
          </div>
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <a href="/" className="flex items-center space-x-2">
      {/* <span className="font-bold text-xl">Fcit Connect</span> */}
      <img src="/log.jpeg" alt="Logo" className="h-[30px] w-[50px]" />
    </a>
  );
}

function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Product Name
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Product description goes here.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/product-1" title="Product 1">
                Description for Product 1
              </ListItem>
              <ListItem href="/product-2" title="Product 2">
                Description for Product 2
              </ListItem>
              <ListItem href="/product-3" title="Product 3">
                Description for Product 3
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/docs" title="Documentation">
                Start integrating products and tools
              </ListItem>
              <ListItem href="/blog" title="Blog">
                Read our latest news and articles
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/about" className={navigationMenuTriggerStyle()}>
            About
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav() {
  return (
    <div className="space-y-4 py-4">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Products
        </h2>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            Product 1
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Product 2
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Product 3
          </Button>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Resources
        </h2>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start">
            Documentation
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Blog
          </Button>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          About
        </h2>
        <Button variant="ghost" className="w-full justify-start">
          About Us
        </Button>
      </div>
      <div className="space-x-4 flex justify-center">
        <Link to="/login">
          <Button variant="ghost" className=" md:inline-flex border">
            Login
          </Button>
        </Link>
        <Link to="signup">
          <Button>Sign up</Button>
        </Link>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef((props, ref) => {
  const { className, title, children, ...rest } = props;
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...rest}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
