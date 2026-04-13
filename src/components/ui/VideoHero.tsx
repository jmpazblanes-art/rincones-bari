interface VideoHeroProps {
  videoSrc: string;
  title?: string;
  showPlayButton?: boolean;
}

export default function VideoHero({
  videoSrc,
  title = "Cada espacio, una historia",
  showPlayButton = false,
}: VideoHeroProps) {
  return (
    <section className="relative h-[614px] w-full bg-stone-900 overflow-hidden">
      <div className="absolute inset-0 opacity-75">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-stone-900/25" />
      {(title || showPlayButton) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            {title && (
              <h2 className="text-4xl md:text-6xl font-serif-display text-white italic tracking-wide">
                {title}
              </h2>
            )}
            {showPlayButton && (
              <div className="mt-8 flex justify-center">
                <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-white text-3xl">
                    play_arrow
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
