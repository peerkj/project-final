import { observable, action } from "mobx";
import axios from "axios";


export default class CommentStore {
    @observable modal_open = false;

    @action
    handleOpen = () => {
        this.modal_open = !this.modal_open;
    };
}