export interface BreadcrumbItem {
    label: string;

    // url, not slug, because we need to use the router to navigate
    url?: string;
}
