import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducer/authReducer";

// Cấu hình cho redux-persist
const persistConfig = {
	key: "root",
	storage,
	//whitelist: ["auth"],
};

// Cấu hình reducer với persistReducer
const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
	reducer: {
		auth: persistedReducer, // Đảm bảo sử dụng persistedReducer cho auth
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

// Tạo persistor để sử dụng với redux-persist
export const persistor = persistStore(store);

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
