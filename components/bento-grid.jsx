import Image from "next/image";
import { cn } from "@/lib/utils";

export function BentoItem({
  image,
  className,
  size = "medium",
  uploadedBy = "IanDev",
}) {
  // Map size to grid span classes
  const sizeClasses = {
    small: "col-span-1 row-span-1",
    medium: "col-span-1 row-span-1 md:col-span-1 md:row-span-1",
    large: "col-span-2 row-span-2",
    fullWidth: "col-span-2 md:col-span-4", // New size for full width items
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-background transition-all",
        sizeClasses[size],
        className
      )}
    >
      <div className="relative w-full h-full aspect-square">
        <Image
          src={image || "/placeholder.svg"}
          alt="Meme image"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Subtle gradient overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Attribution at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-xs text-white">
                {uploadedBy.charAt(0)}
              </div>
              <a href="https://iandev.xyz" target="_blank" rel="noreferrer">
                <span className="text-white text-sm">
                  Uploaded by {uploadedBy}
                </span>
              </a>
            </div>

            {/* Download button */}
            <a
              href={image || "/placeholder.svg"}
              download
              className="bg-white/90 hover:bg-white text-black text-xs rounded-full px-3 py-1 flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BentoGrid({ items, className }) {
  // Ensure we don't try to access items that don't exist
  const safeItems = items || [];

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-3 p-4 auto-rows-auto bg-gray-100 dark:bg-gray-900",
        className
      )}
    >
      {/* First row with one large item and two small items */}
      <BentoItem
        image={safeItems[0]?.image || "/placeholder.svg"}
        size="large"
        className="row-span-2"
      />

      {/* Middle section */}
      <BentoItem
        image={safeItems[1]?.image || "/placeholder.svg"}
        size="small"
      />
      <BentoItem
        image={safeItems[2]?.image || "/placeholder.svg"}
        size="small"
      />
      <BentoItem
        image={safeItems[6]?.image || "/placeholder.svg"}
        size="small"
      />
      <BentoItem
        image={safeItems[7]?.image || "/placeholder.svg"}
        size="small"
      />
      {/* b4.jpg as full width */}
      <BentoItem
        image={safeItems[3]?.image || "/placeholder.svg"}
        size="fullWidth"
        className="aspect-[2/1]" // Adjust aspect ratio for full width
      />

      {/* Remaining items in a balanced grid */}
      <BentoItem
        image={safeItems[4]?.image || "/placeholder.svg"}
        size="small"
      />
      <BentoItem
        image={safeItems[5]?.image || "/placeholder.svg"}
        size="small"
      />
      <BentoItem
        image={safeItems[13]?.image || "/placeholder.svg"}
        size="small"
      />
      <BentoItem
        image={safeItems[7]?.image || "/placeholder.svg"}
        size="small"
      />

      {/* Another large item */}
      <BentoItem
        image={safeItems[8]?.image || "/placeholder.svg"}
        size="large"
        className="row-span-2"
      />

      {/* Remaining items */}
      <BentoItem
        image={safeItems[9]?.image || "/placeholder.svg"}
        size="small"
      />
      <BentoItem
        image={safeItems[10]?.image || "/placeholder.svg"}
        size="small"
      />
      <BentoItem
        image={safeItems[11]?.image || "/placeholder.svg"}
        size="small"
      />
      <BentoItem
        image={safeItems[12]?.image || "/placeholder.svg"}
        size="small"
      />
    </div>
  );
}
