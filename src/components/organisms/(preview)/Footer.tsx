export function Footer() {
  return (
    <footer className="bg-background border-border border-t px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4">
          <svg
            className="text-primary mx-auto h-12 w-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <p className="text-muted-foreground mb-2 text-sm">모바일 청첩장</p>
        <p className="text-muted-foreground text-xs">
          © 2025 Wedding Invitation Service. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
