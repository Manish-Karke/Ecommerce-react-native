import debounce from "lodash.debounce";
import { searchCache, searchVar} from "./localState/cache"
import { SEARCH_PRODUCT } from "./localState/localQuery";

export const debouncedWriteSearch = debounce(
  (text: string) => {
    searchCache.writeQuery({
      query: SEARCH_PRODUCT,
      data: {
        searchText: searchVar(text),
      },
    });
  },
  
);