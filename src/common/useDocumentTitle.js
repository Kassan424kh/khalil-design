import {useEffect} from "react";

export const useDocumentTitle = (title) => {
    document.title = "Lhub - " + title;
}
