interface PinterestSaveButtonProps {
  imageUrl: string;
  description: string;
}

export default function PinterestSaveButton({ imageUrl, description }: PinterestSaveButtonProps) {
  const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : ""
  )}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`;

  return (
    <a
      href={pinterestUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-surface-bright/80 backdrop-blur-md p-3 rounded-full text-primary shadow-sm hover:scale-105 transition-transform"
      aria-label="Guardar en Pinterest"
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
        push_pin
      </span>
    </a>
  );
}
