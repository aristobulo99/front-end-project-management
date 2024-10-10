
export interface Actions {
    icon: string,
    tooltip: string
}

export interface DataSource{
    [key: string]: string | number | Date | boolean | Actions[];
}