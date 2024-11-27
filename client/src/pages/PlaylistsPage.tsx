import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { loadUserPlaylists, loadUserPlaylistsData } from "../server";

type Playlist = {
  id: string;
  name: string;
  description: string;
  external_urls: {
    spotify: string;
  };
  owner: {
    display_name: string;
  };
  tracks: {
    total: number;
  };
  images: { url: string }[] | null;
};

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    setIsLoading(true);
    setError(null);

    const handlePlaylistsData = (data: loadUserPlaylistsData) => {
      if (!data.signedIn) {
        setError(
          "You are not signed in. Please log in to view your playlists."
        );
      } else if (data.items) {
        setPlaylists(data.items);
      } else {
        setError(
          "No playlists found or an error occurred while fetching playlists."
        );
      }
      setIsLoading(false);
    };

    try {
      await loadUserPlaylists(handlePlaylistsData);
    } catch (err) {
      console.error("Error in fetchPlaylists:", err);
      setError("An unexpected error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  const startTracking = async (playlistId: string) => {
    // TODO: Implement the actual tracking logic here
    console.log(`Start tracking playlist: ${playlistId}`);
    // You would typically make an API call here to your backend
    // to start tracking the playlist in your version control system
    // For now, we'll just log to the console
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-blackspotify">
        <div className="w-16 h-16 border-4 border-greenspotify border-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-blackspotify text-whitespotify">
        <p className="text-xl mb-4">{error}</p>
        <Button
          onClick={fetchPlaylists}
          className="bg-greenspotify text-blackspotify hover:bg-[#1ED760]"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-blackspotify min-h-screen p-8">
      <h1 className="text-4xl font-bold text-greenspotify mb-8">
        Your Playlists
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {playlists.map((playlist) => (
          <Card
            key={playlist.id}
            className="bg-[#181818] text-whitespotify border-none overflow-hidden transition-all duration-300 ease-in-out hover:bg-[#282828] hover:shadow-lg group"
          >
            <div className="p-4">
              <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-md group-hover:shadow-md">
                {playlist.images && playlist.images[0] ? (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#282828] flex items-center justify-center">
                    <span className="text-greenspotify text-4xl">♪</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button
                    className="bg-greenspotify text-blackspotify hover:bg-[#1ED760] font-semibold px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
                    onClick={() =>
                      window.open(playlist.external_urls.spotify, "_blank")
                    }
                  >
                    Open in Spotify
                  </Button>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1 truncate group-hover:text-greenspotify transition-colors duration-300">
                {playlist.name}
              </h3>
              <p className="text-sm text-[#b3b3b3] mb-2">
                By {playlist.owner.display_name}
              </p>
              <p className="text-sm text-[#b3b3b3] mb-2">
                {playlist.tracks.total} tracks
              </p>
              {playlist.description && (
                <p className="text-sm text-[#b3b3b3] mb-4 line-clamp-2">
                  {playlist.description}
                </p>
              )}
              <Button
                className="w-full bg-[#1DB954] text-white hover:bg-[#1ED760] font-semibold transition-all duration-300 ease-in-out mt-2"
                onClick={() => startTracking(playlist.id)}
              >
                Start Tracking
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
