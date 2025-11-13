import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function NotFoundPage() {
  const location = window.location;
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <h1 className="text-6xl sm:text-7xl font-heading font-bold text-primary mb-2">404</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        <p className="text-xl font-heading font-bold text-foreground mb-2">Halaman Tidak Ditemukan</p>
        <p className="text-muted-foreground mb-8">Maaf, kami tidak bisa menemukan halaman yang Anda cari.</p>
        <RouterLink to="/music">
          <Button className="rounded-xl">Kembali ke Beranda</Button>
        </RouterLink>
      </div>
    </div>
  );
}
