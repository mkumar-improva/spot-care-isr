type SiteHeaderProps = {
  title: string;
  subtitle?: string;
};

export function SiteHeader({ title, subtitle }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container-tight flex flex-col gap-2 py-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
    </header>
  );
}
