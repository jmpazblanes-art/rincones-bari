interface AffiliateButtonProps {
  query: string;
  label?: string;
}

export default function AffiliateButton({
  query,
  label = "Ver productos relacionados en Amazon",
}: AffiliateButtonProps) {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG || "rinconesbari-21";
  const url = `https://www.amazon.es/s?k=${encodeURIComponent(query)}&tag=${tag}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="nofollow sponsored"
      className="inline-flex items-center text-xs font-label font-bold tracking-widest uppercase text-primary border-b border-primary-container pb-1 hover:text-primary-container transition-all"
    >
      {label} <span className="ml-2">→</span>
    </a>
  );
}
