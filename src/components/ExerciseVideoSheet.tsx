import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getExerciseVideoUrl } from "@/lib/exercise-videos";
import { ExternalLink, Play } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseName: string;
  exerciseId?: string;
};

export default function ExerciseVideoSheet({ open, onOpenChange, exerciseName, exerciseId }: Props) {
  const videoUrl = getExerciseVideoUrl(exerciseId || "", exerciseName);
  const isShort = videoUrl.includes("/shorts/");

  const shortId = isShort ? videoUrl.split("/shorts/")[1]?.split("?")[0] : null;
  const videoId = shortId || (videoUrl.match(/[?&]v=([^&]+)/) || [])[1] || null;
  const youtubeWatchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : videoUrl;
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1&rel=0&modestbranding=1`
    : null;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const [embedFailed, setEmbedFailed] = useState(false);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  // Reset state when sheet opens/closes
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setEmbedFailed(false);
      setEmbedLoaded(false);
    }
    onOpenChange(isOpen);
  };

  const showEmbed = open && embedUrl && !embedFailed;
  const showFallback = open && (!embedUrl || embedFailed);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl bg-card border-border/50 p-0">
        <SheetHeader className="px-4 pt-4 pb-2">
          <SheetTitle className="font-display text-lg text-foreground flex items-center gap-2">
            <Play className="h-4 w-4 text-primary" />
            How to: {exerciseName}
            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </SheetTitle>
        </SheetHeader>
        <div className="px-4 pb-4 h-full relative">
          {/* Thumbnail shown while embed loads */}
          {showEmbed && !embedLoaded && thumbnailUrl && (
            <div
              className="absolute inset-x-4 rounded-xl overflow-hidden flex items-center justify-center bg-muted/30"
              style={{ height: "calc(100% - 60px)" }}
            >
              <img
                src={thumbnailUrl}
                alt={exerciseName}
                className="w-full h-full object-cover rounded-xl opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-primary/80 flex items-center justify-center animate-pulse">
                  <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                </div>
              </div>
            </div>
          )}

          {/* Embed iframe - try first */}
          {showEmbed && (
            <iframe
              src={embedUrl}
              className={`w-full rounded-xl transition-opacity duration-300 ${embedLoaded ? "opacity-100" : "opacity-0"}`}
              style={{ height: "calc(100% - 60px)" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`${exerciseName} tutorial`}
              onLoad={() => setEmbedLoaded(true)}
              onError={() => setEmbedFailed(true)}
            />
          )}

          {/* Fallback with thumbnail */}
          {showFallback && (
            <div
              className="flex flex-col items-center justify-center gap-4 rounded-xl overflow-hidden relative"
              style={{ height: "calc(100% - 60px)" }}
            >
              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt={exerciseName}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-30"
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-4">
                <p className="text-muted-foreground text-sm text-center max-w-xs">
                  Embedded playback unavailable. Open the video directly in YouTube instead.
                </p>
                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-primary flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Open in YouTube
                </a>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
