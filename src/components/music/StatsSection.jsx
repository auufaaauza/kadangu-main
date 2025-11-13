export function StatsSection() {
  return (
    <div className="bg-white dark:bg-card py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Artis Tersedia</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-heading font-bold text-accent mb-2">1000+</div>
            <p className="text-muted-foreground">Pesanan Selesai</p>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="text-3xl sm:text-4xl font-heading font-bold text-secondary mb-2">98%</div>
            <p className="text-muted-foreground">Pelanggan Puas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
