import { create } from "zustand";

interface Breadcrumb {
  href?: string;
  label: string;
}

type BreadcrumbStore = {
  breadcrumbs: Breadcrumb[];
  setBreadcrumbs: (breadcrumb: Breadcrumb[]) => void;
};

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (breadcrumbs) =>
    set((prevState) => ({ ...prevState, breadcrumbs })),
}));
