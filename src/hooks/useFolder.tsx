import { useEffect, useReducer } from "react";

// FIREBASE
import { db } from "@/lib/firebase";

export interface IFolder {
	name: string;
	id: string | null;
	path: string[];
}

interface IState {
	folderId: string | null;
	folder: IFolder;
	childFolders: string[];
	childFiles: string[];
}

const ACTIONS = {
	SELECT_FOLDER: "SELECT_FOLDER",
	UPDATE_FOLDER: "UPDATE_FOLDER",
};

const ROOT_FOLDER: IFolder = { name: "Root", id: null, path: [] };

function reducer(state: IState, action: { type: string; payload: any }) {
	const { type, payload } = action;

	switch (type) {
		case ACTIONS.SELECT_FOLDER:
			return {
				folderId: payload.folderId,
				folder: payload.folder,
				childFolders: [],
				childFiles: [],
			};
		case ACTIONS.UPDATE_FOLDER:
			return {
				...state,
				folder: payload.folder,
			};

		default:
			return state;
	}
}

const useFolder = (
	folderId: string | null = null,
	folder: IFolder | null = null,
) => {
	const initialState: IState = {
		folderId,
		folder,
		childFolders: [],
		childFiles: [],
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
	}, [folderId, folder]);

	useEffect(() => {
		if (folderId == null) {
			// if it is the ROOT folder
			return dispatch({
				type: ACTIONS.UPDATE_FOLDER,
				payload: { folder: ROOT_FOLDER },
			});
		}

		// Otherwise folders fetch from the database
		db.folders
			.doc(folderId)
			.get()
			.then(doc => {
				// console.log("doc:", db.formatDoc(doc));

				dispatch({
					type: ACTIONS.UPDATE_FOLDER,
					payload: { folder: db.formatDoc(doc) },
				});
			})
			.catch(err => {
				dispatch({
					type: ACTIONS.UPDATE_FOLDER,
					payload: { folder: ROOT_FOLDER },
				});
			});
	}, [folderId]);

	return state;
};

export default useFolder;
