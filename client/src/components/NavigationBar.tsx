import { ReactElement } from "react";
import { Button } from "@/components/ui/button";

export default function NavigationBar(props: {
  onLoginClicked: () => void;
  onPlaylistsClicked: () => void;
  profilePhoto: string;
}): ReactElement {
  return (
    <div className="flex items-center justify-between p-4 bg-[#191414] text-white">
      <div className="flex items-center space-x-4">
        <img
          src="../../../spotify_alt.png"
          className="w-10 h-10 bg-[#1BB954] rounded-full"
          alt="Spotigit logo"
        />
        <span className="text-lg font-semibold">Spotigit</span>
      </div>

      <div className="flex space-x-4">
        <Button
          variant="ghost"
          className="text-white hover:bg-[#1BB954] hover:text-white focus:bg-[#1BB954] focus:text-white"
          asChild
        >
          <button>Your Playlists</button>
        </Button>
        <Button
          variant="ghost"
          className="text-white hover:bg-[#1BB954] hover:text-white focus:bg-[#1BB954] focus:text-white"
        >
          <button>Tracked Playlists</button>
        </Button>
        <Button
          variant="ghost"
          className="text-white hover:bg-[#1BB954] hover:text-white focus:bg-[#1BB954] focus:text-white"
        >
          <button>Terms And Conditions</button>
        </Button>
      </div>

      {props.profilePhoto !== "" ? (
        <div className="flex items-center space-x-4">
          <img
            src={props.profilePhoto}
            alt="Your profile photo"
            className="w-10 h-10 bg-[#1BB954] rounded-full"
          />
        </div>
      ) : (
        <Button
          className="bg-[#1BB954] text-[#191414] hover:bg-[#1BB954]/80"
          onClick={props.onLoginClicked}
        >
          Login
        </Button>
      )}
    </div>
  );
}
