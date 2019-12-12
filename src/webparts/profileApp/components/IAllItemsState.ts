import {IListItem} from './IListItem';

export interface IAllItemsState {
    items: IListItem[];
    /* isOpen: boolean;
    modalIsOpen: boolean;
    modalShow: boolean;
    modalBody: string;
    modalId: number; */
    show: boolean;
    onHide: boolean;
    modalBody: string;
    modalId: number;
    heading: string;
/*     isOpen: boolean; */
/*     show: boolean; */
}