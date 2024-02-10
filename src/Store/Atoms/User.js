import { atom } from "recoil";

const userAtom = atom({
    key:"userAtom",
    default:{},
})

const tokenAtom = atom({
    key:"tokenAtom",
    default:localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
})

const AccountAtom = atom({
    key:"AccountAtom",
    default:{},
})

export {userAtom , tokenAtom , AccountAtom}

