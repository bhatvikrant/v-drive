import { useLayoutEffect } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import FilesAndFoldersDisplay from "@/components/FilesAndFoldersDisplay";

// CONTEXT
import { useAuth } from "@/contexts/AuthContext";

// TS INTERFACES
interface Props { }

const DynamicFolder: React.FC<Props> = props => {
    const { } = props;

    const router = useRouter();
    const { currentUser } = useAuth();

    useLayoutEffect(() => {
        if (!currentUser) {
            router.push("/");
        }
    }, [currentUser, router]);

    return (
        <FilesAndFoldersDisplay folderId={router.query.folderId as string} />
    );
};

export default DynamicFolder;
