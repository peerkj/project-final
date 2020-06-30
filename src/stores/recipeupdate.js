import { observable, action, computed } from "mobx";
import axios from 'axios';

export default class RecipeupdateStore {
    @observable rec_num = "";

    // **** 추가됨
    constructor(root) {
        this.root = root;
    }




}
