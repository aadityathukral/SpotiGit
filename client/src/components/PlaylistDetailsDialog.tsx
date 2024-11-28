import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { loadPlaylistTracks, loadPlaylistTracksData } from "../server";

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
    href: string;
  };
  images: { url: string }[] | null;
};

type Track = {
  added_at: string;
  track: {
    name: string;
    artists: { name: string }[];
    album: {
      name: string;
      images: { url: string }[];
    };
    duration_ms: number;
  };
};

type PlaylistDetailsDialogProps = {
  playlist: Playlist;
  onClose: () => void;
  startTracking: (playlistId: string) => void;
};

export function PlaylistDetailsDialog({
  playlist,
  onClose,
  startTracking,
}: PlaylistDetailsDialogProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTracks();
  }, [playlist.id]);

  const fetchTracks = async () => {
    setIsLoading(true);
    setError(null);

    const handleTracksData = (data: loadPlaylistTracksData) => {
      if (!data.signedIn) {
        setError(
          "You are not signed in. Please log in to view playlist tracks."
        );
      } else if (data.items && data.items.length > 0) {
        setTracks(data.items);
      } else {
        setError("No tracks found or an error occurred while fetching tracks.");
      }
      setIsLoading(false);
    };

    try {
      await loadPlaylistTracks(playlist.tracks.href, handleTracksData);
    } catch (err) {
      console.error("Error in fetchTracks:", err);
      setError("An unexpected error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-blackspotify bg-opacity-80 text-whitespotify border-none max-w-3xl w-full backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-greenspotify">
            {playlist.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-[1fr,auto] gap-4">
          <div>
            {playlist.description && (
              <p className="text-whitespotify mb-4">{playlist.description}</p>
            )}
            <p className="text-whitespotify text-sm mb-2">
              By {playlist.owner.display_name}
            </p>
            <p className="text-whitespotify text-sm mb-4">
              {playlist.tracks.total} tracks
            </p>
            <Button
              className="bg-greenspotify text-blackspotify hover:bg-[#1ED760] font-semibold transition-all duration-300 ease-in-out"
              onClick={() => startTracking(playlist.id)}
            >
              Start Tracking
            </Button>
          </div>
          <div className="flex flex-col items-end">
            <a
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 text-greenspotify hover:text-[#1ED760] transition-colors duration-300"
            >
              Open in Spotify
            </a>
            {playlist.images && playlist.images[0] && (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>
        </div>
        <ScrollArea className="mt-4 h-64">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-8 h-8 border-4 border-greenspotify border-solid rounded-full animate-spin border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">
              <p>{error}</p>
              <Button
                onClick={fetchTracks}
                className="mt-4 bg-greenspotify text-blackspotify hover:bg-[#1ED760]"
              >
                Retry
              </Button>
            </div>
          ) : tracks.length === 0 ? (
            <p className="text-center text-whitespotify">
              This playlist is empty.
            </p>
          ) : (
            <div className="space-y-2">
              {tracks.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-4 hover:bg-[#ffffff1a] rounded-md transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-whitespotify mr-4">{index + 1}</span>
                    <div>
                      <p className="font-semibold text-whitespotify">
                        {item.track.name}
                      </p>
                      <p className="text-sm text-[#b3b3b3]">
                        {item.track.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-[#b3b3b3]">
                    {formatDuration(item.track.duration_ms)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
