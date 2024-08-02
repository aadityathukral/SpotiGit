import { ReactElement } from "react";

type NavBarProps = {
  imageDetails?: {
    image: string;
    altText: string;
  };
  bgColor?: string;
  children: string;
};

const NavBar = (props: NavBarProps): ReactElement => {
  const backgroundColor = props.bgColor
    ? "bg-" + props.bgColor
    : "bg-greenspotify";
  return (
    <div className={`h-1/8 ${backgroundColor}`}>
      <div className="flex flex-row items-center w-fit">
        <img
          className="size-24 items-center"
          src={`../../${
            props.imageDetails ? props.imageDetails.image : "vite.svg"
          }`}
          alt={props.imageDetails ? props.imageDetails.altText : "Logo"}
        />
        <h1 className="text-blackspotify font-bold text-3xl">
          {props.children}
        </h1>
      </div>
    </div>
  );
};

export default NavBar;
