import { Button } from "@/components/ui/button";

export default function AppDescription() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-blackspotify">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-greenspotify mb-4">
          Welcome to Spotigit!
        </h1>
        <p className="text-xl text-whitespotify max-w-3xl mx-auto">
          Revolutionize your playlist management with Spotigit. Track changes,
          collaborate with friends, and never lose a beat of your musical
          journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          <FeatureItem
            icon="🎵"
            title="Playlist Versioning"
            description="Keep track of how your playlists evolve over time. Revert changes or compare different versions with ease."
          />
          <FeatureItem
            icon="👥"
            title="Collaborative Tracking"
            description="Share your tracked playlists with friends and see how your collective music taste changes and grows."
          />
        </div>
        <div className="space-y-8">
          <FeatureItem
            icon="📊"
            title="Insightful Analytics"
            description="Gain valuable insights into your music preferences with detailed analytics on your playlist changes."
          />
          <FeatureItem
            icon="🔒"
            title="Secure Integration"
            description="Seamlessly connect with your Spotify account while keeping your data safe and private."
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-greenspotify">
          How to Get Started
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              number: "1",
              title: "Access Your Playlists",
              description:
                "Click on 'Your Playlists' in the navigation bar to view all your Spotify playlists.",
            },
            {
              number: "2",
              title: "Start Tracking",
              description:
                "Find the playlist you want to track and click the 'Start Tracking' button.",
            },
            {
              number: "3",
              title: "View Tracked Playlists",
              description:
                "Navigate to 'Tracked Playlists' to see all the playlists you're currently tracking.",
            },
            {
              number: "4",
              title: "Manage Your Tracked Playlists",
              description:
                "View previous versions, add or remove songs, and stop tracking when you're done.",
            },
          ].map((step) => (
            <div
              key={step.number}
              className="flex items-start space-x-4 bg-[#1DB954]/10 rounded-lg p-6 transition-all duration-300 ease-in-out hover:bg-[#1DB954]/20"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-greenspotify text-blackspotify flex items-center justify-center font-bold text-xl">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-greenspotify mb-2">
                  {step.title}
                </h3>
                <p className="text-whitespotify">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-greenspotify mb-4">
          Ready to Elevate Your Playlist Game?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Join thousands of music enthusiasts who are already using Spotigit to
          take control of their Spotify playlists. Start tracking, start
          collaborating, and start experiencing your music in a whole new way.
        </p>
        <Button className="bg-greenspotify text-blackspotify hover:bg-[#1ED760] text-lg px-8 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
          Begin Your Spotigit Journey
        </Button>
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-whitespotify text-blackspotify flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-greenspotify mb-2">
          {title}
        </h3>
        <p className="text-whitespotify">{description}</p>
      </div>
    </div>
  );
}
