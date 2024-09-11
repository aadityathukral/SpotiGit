import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#1BB954] hover:text-white focus:bg-[#1BB954] focus:text-white"
          {...props}
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

export default function NavigationBar(props: {
  onLoginClicked: () => void;
  profilePhoto: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#191414] text-white">
      <div className="flex items-center space-x-4">
        <img
          src="../../../spotify_alt.png"
          className="w-10 h-10 bg-[#1BB954] rounded-full"
          aria-hidden="true"
        />
        <span className="text-lg font-semibold">Spotigit</span>
      </div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-blackspotify text-white hover:bg-greenspotify focus:bg-greenspotify">
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-[#191414] text-white">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[#1BB954]/50 to-[#1BB954] p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Featured Product
                      </div>
                      <p className="text-sm leading-tight text-white/90">
                        Discover our latest and greatest offering.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/product-a" title="Product A">
                  Our flagship product with amazing features.
                </ListItem>
                <ListItem href="/product-b" title="Product B">
                  The perfect solution for small businesses.
                </ListItem>
                <ListItem href="/product-c" title="Product C">
                  Enterprise-grade tools for large organizations.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-[#191414] text-white hover:bg-[#1BB954] focus:bg-[#1BB954]">
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#191414] text-white">
                {[
                  {
                    title: "Consulting",
                    href: "/services/consulting",
                    description: "Expert advice to grow your business.",
                  },
                  {
                    title: "Implementation",
                    href: "/services/implementation",
                    description: "Seamless integration of our solutions.",
                  },
                  {
                    title: "Training",
                    href: "/services/training",
                    description: "Learn how to maximize our products.",
                  },
                  {
                    title: "Support",
                    href: "/services/support",
                    description: "24/7 assistance for all your needs.",
                  },
                ].map((service) => (
                  <ListItem
                    key={service.title}
                    title={service.title}
                    href={service.href}
                  >
                    {service.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-blackspotify text-white hover:bg-greenspotify focus:bg-[#1BB954]">
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-[#191414] text-white">
                {[
                  {
                    title: "Blog",
                    href: "/resources/blog",
                    description: "Latest insights and updates.",
                  },
                  {
                    title: "Documentation",
                    href: "/resources/docs",
                    description: "Detailed guides and API references.",
                  },
                  {
                    title: "Webinars",
                    href: "/resources/webinars",
                    description: "Educational online sessions.",
                  },
                  {
                    title: "Community",
                    href: "/resources/community",
                    description: "Join our vibrant user community.",
                  },
                ].map((resource) => (
                  <ListItem
                    key={resource.title}
                    title={resource.title}
                    href={resource.href}
                  >
                    {resource.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {props.profilePhoto !== "" ? (
        <div className="flex items-center justify-between p-4 bg-[#191414] text-white">
          <div className="flex items-center space-x-4">
            <img
              src={props.profilePhoto}
              alt="This is your profile photo"
              className="w-10 h-10 bg-[#1BB954] rounded-full"
              aria-hidden="true"
            />
          </div>
        </div>
      ) : (
        <Button
          className="bg-greenspotify text-blackspotify hover:bg-[#1BB954]/80"
          onClick={props.onLoginClicked}
        >
          Login
        </Button>
      )}
    </div>
  );
}
