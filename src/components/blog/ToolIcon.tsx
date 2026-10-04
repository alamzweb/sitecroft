interface ToolIconProps {
  svg?: React.ReactNode;
  cdnUrl?: string;
  name: string;
}

export default function ToolIcon({ svg, cdnUrl, name }: ToolIconProps) {
  return (
    <div className="tool-icon">
      {svg}
      {!svg && cdnUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cdnUrl}
          alt={`${name} logo`}
          width="26"
          height="26"
          loading="lazy"
        />
      )}
    </div>
  );
}