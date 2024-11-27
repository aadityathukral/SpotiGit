import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function NavigationBar(props: {
  onLoginClicked: () => void;
  profilePhoto: string;
}): ReactElement {
  const nav = useNavigate();

  const handleTC = () => {
    nav("/terms");
  };

  const handleLogoClick = () => {
    nav("/home");
  };

  const handleYourPlaylistsClick = () => {
    nav("/playlists");
  };

  const renderProfileSection = () => {
    return props.profilePhoto ? (
      <img
        src={props.profilePhoto}
        alt="Profile"
        className="w-10 h-10 rounded-full"
      />
    ) : (
      <Button
        className="font-semibold bg-[#1BB954] text-[#191414] hover:bg-[#1BB954]/80"
        onClick={props.onLoginClicked}
      >
        Login
      </Button>
    );
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#191414] text-white">
      <div className="flex items-center space-x-4">
        <img
          src="/spotify_alt.png"
          className="w-10 h-10 bg-[#1BB954] rounded-full"
          alt="Spotigit logo"
        />
        <Button
          className="text-lg font-semibold bg-blackspotify hover:bg-inherit"
          onClick={handleLogoClick}
        >
          Spotigit
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button
          variant="ghost"
          className="font-semibold text-white hover:bg-[#1BB954]"
          onClick={handleYourPlaylistsClick}
        >
          Your Playlists
        </Button>
        <Button
          variant="ghost"
          className="font-semibold text-white hover:bg-[#1BB954]"
        >
          Tracked Playlists
        </Button>
        <Button
          variant="ghost"
          className="font-semibold text-white hover:bg-[#1BB954]"
          onClick={handleTC}
        >
          Terms And Conditions
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        {renderProfileSection()}
      </div>
    </div>
  );
}
