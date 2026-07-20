import Link from 'next/link';

export const Breadcrumbs=({ items = [] }:{items:{href:string,label:string}[]})=> {
  return (
    <nav className="flex items-center gap-2 text-text-muted mb-6 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <span key={index} className="text-text font-medium truncate">
              {item.label}
            </span>
          );
        }

        return (
          <div key={index} className="flex items-center gap-2">
            <Link 
              className="hover:text-primary transition-colors" 
              href={item.href}
            >
              {item.label}
            </Link>
            <span className="material-symbols-outlined text-[14px] select-none">❯</span>
          </div>
        );
      })}
    </nav>
  );
}
