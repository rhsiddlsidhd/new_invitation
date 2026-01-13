export function Footer({
  children,
  message,
}: {
  children: React.ReactNode;
  message?: string;
}) {
  return (
    <footer className="relative h-[50vh] py-4 text-center">
      {children}
      {message && (
        <div className="absolute top-1/3 left-12 -translate-y-1/2 transform text-white drop-shadow">
          <p className="text-lg">{message}</p>
        </div>
      )}
      <div className="relative z-20 mx-auto flex h-full max-w-2xl flex-col items-center justify-end">
        <p className="mb-2 text-sm text-white drop-shadow">모바일 청첩장</p>
        <p className="text-xs text-white drop-shadow">
          © 2025 Wedding Invitation Service. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
