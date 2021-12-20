import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// @ts-ignore
import type { AppDispatch, AppState } from "../redux/store.ts";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>()

