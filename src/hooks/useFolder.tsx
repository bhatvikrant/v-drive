import { useEffect, useReducer } from "react";

// FIREBASE
import { db } from "@/lib/firebase";

// CONTEXTS
import { useAuth } from "@/contexts/AuthContext";

export interface IFolder {
	name: string;
	id: string | null;
	path: string[];
}

interface IState {
	folderId: string | null;
	folder: IFolder;
	childFolders: IFolder[];
	childFiles: string[];
}

const ACTIONS = {
	SELECT_FOLDER: "SELECT_FOLDER",
	UPDATE_FOLDER: "UPDATE_FOLDER",
	SET_CHILD_FOLDERS: "SET_CHILD_FOLDERS",
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
		case ACTIONS.SET_CHILD_FOLDERS:
			return {
				...state,
				childFolders: payload.childFolders,
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

	const { currentUser } = useAuth();

	useEffect(() => {
		dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
	}, [folderId, folder]);

	useEffect(() => {
		/*
		*	To set folder 
		*/
		if (folderId == null) {
			// if it is the ROOT folder
			return dispatch({
				type: ACTIONS.UPDATE_FOLDER,
				payload: { folder: ROOT_FOLDER },
			});
		}

		// Otherwise fetch folders from the database
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

	useEffect(() => {
		/*
		*	To set childFolders
		*/
		const cleanup = db.folders.where("parentId", "==", folderId).where("userId", "==", currentUser.uid)
			.orderBy("createdAt")
			.onSnapshot(snapshot => { // onSnapshot runs automatically everytime whenever a folder is created / changed / edited
				dispatch({
					type: ACTIONS.SET_CHILD_FOLDERS, payload: {
						childFolders: snapshot.docs.map(doc => db.formatDoc(doc)),
					}
				})
			})

		return () => cleanup();
	}, [folderId, currentUser])

	return state;
};

export default useFolder;
