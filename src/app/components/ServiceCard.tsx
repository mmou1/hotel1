import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  price: string;
}

export function ServiceCard({ icon, title, price }: ServiceCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <span className="text-foreground">{title}</span>
      </div>
      <span className="font-serif">{price}</span>
    </div>
  );
}
