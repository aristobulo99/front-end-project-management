import { MatMenuTrigger } from "@angular/material/menu";


export class Menu {

    onMenuItemClick(event: Event, menuTrigger: MatMenuTrigger) {
        event.stopPropagation();
        event.preventDefault();
        menuTrigger.openMenu();
    }
}